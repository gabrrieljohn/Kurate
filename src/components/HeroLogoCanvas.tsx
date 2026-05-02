"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Exact WaterEffect shader from kuratemusic.com — reads velocity (R,G) and intensity (B)
// from the trail canvas and displaces the logo UV accordingly
const MAIN_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uText;
  uniform sampler2D uTrail;
  uniform vec4  uLogoRect;
  uniform vec2  uCanvasSize;

  void main() {
    vec2 textPx = uLogoRect.zw;
    vec2 offset = uLogoRect.xy;
    vec2 textUv = (vUv * uCanvasSize - offset) / textPx;

    // Decode trail: R=vx encoded, G=vy encoded, B=intensity
    vec4 trail = texture2D(uTrail, vUv);
    float vx = -(trail.r * 2.0 - 1.0);
    float vy = -(trail.g * 2.0 - 1.0);
    float intensity = trail.b;

    // Displace in velocity direction — scale screen-UV displacement into logo UV space
    vec2 disp = vec2(vx, vy) * 0.2 * intensity * uCanvasSize / textPx;
    vec2 uv2 = textUv + disp;

    vec4 col = (uv2.x >= 0.0 && uv2.x <= 1.0 && uv2.y >= 0.0 && uv2.y <= 1.0)
      ? texture2D(uText, uv2)
      : vec4(0.0);

    gl_FragColor = col;
  }
`;

async function loadLogoTexture(url: string): Promise<{
  texture: THREE.Texture;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const SCALE = 4;
      const off = document.createElement("canvas");
      off.width = img.naturalWidth * SCALE;
      off.height = img.naturalHeight * SCALE;
      const ctx = off.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, off.width, off.height);
      const tex = new THREE.CanvasTexture(off);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      resolve({ texture: tex, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Trail parameters — exact values from kuratemusic.com source
const TRAIL_SIZE = 64;
const MAX_AGE = 64;
const TRAIL_RADIUS = 0.1 * TRAIL_SIZE; // 6.4px
const TRAIL_SPEED = 1 / MAX_AGE;

// Easing functions from original (Kj and eq)
const kjEase = (e: number, t: number, n: number, r: number) =>
  n * Math.sin((e / r) * (Math.PI / 2)) + t;
const eqEase = (e: number, t: number, n: number, r: number) => {
  e /= r;
  return -n * e * (e - 2) + t;
};

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  force: number;
  vx: number;
  vy: number;
}

export default function HeroLogoCanvas({
  logoSrc = "/images/Preloader/logo.svg",
  logoAreaRef,
}: {
  logoSrc?: string;
  logoAreaRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let cleanupResize: (() => void) | null = null;
    let cleanupMove: (() => void) | null = null;
    let raf = 0;

    (async () => {
      const { texture: textTex } = await loadLogoTexture(logoSrc);
      if (disposed) return;

      // --- 2D canvas trail (CPU-side, exact replication of original rq class) ---
      const trailCanvas = document.createElement("canvas");
      trailCanvas.width = TRAIL_SIZE;
      trailCanvas.height = TRAIL_SIZE;
      const trailCtx = trailCanvas.getContext("2d")!;
      trailCtx.fillStyle = "black";
      trailCtx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE);

      const trailTex = new THREE.CanvasTexture(trailCanvas);
      trailTex.minFilter = THREE.LinearFilter;
      trailTex.magFilter = THREE.LinearFilter;
      trailTex.generateMipmaps = false;

      const trail: TrailPoint[] = [];
      let trailLast: { x: number; y: number } | null = null;

      const addTouch = (x: number, y: number) => {
        let force = 0, vx = 0, vy = 0;
        const last = trailLast;
        if (last) {
          const dx = x - last.x;
          const dy = y - last.y;
          if (dx === 0 && dy === 0) return;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          vx = dx / dist;
          vy = dy / dist;
          force = Math.min(distSq * 1e4, 1);
        }
        trailLast = { x, y };
        trail.push({ x, y, age: 0, force, vx, vy });
      };

      const drawTrailPoint = (p: TrailPoint) => {
        // Age-based intensity: ease-in for first 30%, ease-out for remaining 70%
        let intensity: number;
        if (p.age < MAX_AGE * 0.3) {
          intensity = kjEase(p.age / (MAX_AGE * 0.3), 0, 1, 1);
        } else {
          intensity = eqEase(1 - (p.age - MAX_AGE * 0.3) / (MAX_AGE * 0.7), 0, 1, 1);
        }
        intensity *= p.force;

        const px = p.x * TRAIL_SIZE;
        const py = (1 - p.y) * TRAIL_SIZE;
        const r = Math.floor(((p.vx + 1) / 2) * 255);
        const g = Math.floor(((p.vy + 1) / 2) * 255);
        const b = Math.floor(intensity * 255);

        // Off-screen arc trick: draw circle far off-screen, shadow falls on-canvas
        const offset = TRAIL_SIZE * 5;
        trailCtx.shadowOffsetX = offset;
        trailCtx.shadowOffsetY = offset;
        trailCtx.shadowBlur = TRAIL_RADIUS;
        trailCtx.shadowColor = `rgba(${r},${g},${b},${0.2 * intensity})`;
        trailCtx.beginPath();
        trailCtx.fillStyle = "rgba(255,0,0,1)";
        trailCtx.arc(px - offset, py - offset, TRAIL_RADIUS, 0, Math.PI * 2);
        trailCtx.fill();
      };

      const updateTrail = () => {
        trailCtx.fillStyle = "black";
        trailCtx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE);

        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          const s = p.force * TRAIL_SPEED * (1 - p.age / MAX_AGE);
          p.x += p.vx * s;
          p.y += p.vy * s;
          p.age++;
          if (p.age > MAX_AGE) {
            trail.splice(i, 1);
            continue;
          }
          drawTrailPoint(p);
        }
        trailTex.needsUpdate = true;
      };
      // --- end trail ---

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const fsGeom = new THREE.PlaneGeometry(2, 2);

      const mainUniforms = {
        uText: { value: textTex },
        uTrail: { value: trailTex },
        uLogoRect: { value: new THREE.Vector4(0, 0, 1, 1) },
        uCanvasSize: { value: new THREE.Vector2(1, 1) },
      };
      const mainMat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: MAIN_FRAG,
        uniforms: mainUniforms,
        transparent: true,
      });
      const mainScene = new THREE.Scene();
      mainScene.add(new THREE.Mesh(fsGeom, mainMat));

      const onMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;
        if (x < -0.05 || x > 1.05 || y < -0.05 || y > 1.05) {
          trailLast = null;
          return;
        }
        addTouch(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
      };
      window.addEventListener("mousemove", onMove);
      cleanupMove = () => window.removeEventListener("mousemove", onMove);

      const resize = () => {
        const rect = wrapper.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer!.setSize(w, h, false);
        const pr = renderer!.getPixelRatio();
        const bw = Math.floor(w * pr);
        const bh = Math.floor(h * pr);
        mainUniforms.uCanvasSize.value.set(bw, bh);

        if (logoAreaRef?.current) {
          const lr = logoAreaRef.current.getBoundingClientRect();
          const logoX = (lr.left - rect.left) * pr;
          const logoY = (rect.bottom - lr.bottom) * pr;
          const logoW = Math.max(1, lr.width * pr);
          const logoH = Math.max(1, lr.height * pr);
          mainUniforms.uLogoRect.value.set(logoX, logoY, logoW, logoH);
        } else {
          mainUniforms.uLogoRect.value.set(0, 0, bw, bh);
        }
      };
      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);
      resize();

      const tick = () => {
        if (disposed || !renderer) return;

        // Re-measure logo position every frame for GSAP scroll tracking
        if (logoAreaRef?.current) {
          const rect = wrapper.getBoundingClientRect();
          const lr = logoAreaRef.current.getBoundingClientRect();
          const pr = renderer.getPixelRatio();
          const logoX = (lr.left - rect.left) * pr;
          const logoY = (rect.bottom - lr.bottom) * pr;
          const logoW = Math.max(1, lr.width * pr);
          const logoH = Math.max(1, lr.height * pr);
          mainUniforms.uLogoRect.value.set(logoX, logoY, logoW, logoH);
        }

        updateTrail();

        renderer.setRenderTarget(null);
        renderer.render(mainScene, camera);

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupResize?.();
      cleanupMove?.();
      renderer?.dispose();
    };
  }, [logoSrc]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
