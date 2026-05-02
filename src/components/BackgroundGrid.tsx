"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";

const VERT = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// fragment: thin 1px grid lines matching original's CSS rgba(255,255,255,0.5) look,
// with cursor proximity brightening. Values are in linear space; browser sRGB gamma
// makes linear ~0.12 appear close to sRGB 0.5-alpha white over #0e0f0f.
const FRAG = `
  precision highp float;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec2  uMouseTrail;
  uniform float uTime;

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 res = uResolution;

    // 10 square columns per row
    float CELL_X = res.x * 0.10;
    float CELL_Y = CELL_X;

    vec2 gridUV = vec2(mod(frag.x, CELL_X), mod(frag.y, CELL_Y));

    // Single 1-physical-pixel edge per cell boundary (one side only, not both)
    float gx = step(gridUV.x, 1.0);
    float gy = step(gridUV.y, 1.0);
    float grid = clamp(gx + gy, 0.0, 1.0);

    vec2 mousePx = uMouseTrail * res;
    float d = distance(frag, mousePx);
    float radius = res.x * 0.42;
    float bright = smoothstep(radius, 0.0, d);

    vec3 bg = vec3(0.055, 0.058, 0.058);

    // lines always faintly visible, gently brighter near cursor
    float lineAlpha = mix(0.04, 0.18, bright);
    vec3 gridColor = mix(bg, vec3(1.0), lineAlpha);

    vec3 col = mix(bg, gridColor, grid);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isHiddenPage = pathname === "/artists" || pathname === "/careers";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseTrail: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      const pr = renderer.getPixelRatio();
      uniforms.uResolution.value.set(w * pr, h * pr);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
    };

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      // lerp trail toward mouse
      const m = uniforms.uMouse.value;
      const t = uniforms.uMouseTrail.value;
      t.x += (m.x - t.x) * 0.12;
      t.y += (m.y - t.y) * 0.12;
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    // Grid masking: hide below Artists section, re-show when PreAbout scribble is visible
    let gridMasked = false;
    const onScroll = () => {
      const artistsEl = document.getElementById("artists");
      const preAboutEl = document.getElementById("pre-about");
      if (!artistsEl || !preAboutEl || !canvas) return;
      const sy = window.scrollY;
      const artistsTop = artistsEl.offsetTop;
      const preAboutBottom = preAboutEl.offsetTop + preAboutEl.offsetHeight;
      if (sy >= artistsTop && !gridMasked) {
        gridMasked = true;
        canvas.style.opacity = "0";
      } else if (sy < preAboutBottom && gridMasked) {
        gridMasked = false;
        canvas.style.opacity = "1";
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        transition: "opacity 0.3s ease",
        opacity: isHiddenPage ? 0 : undefined,
      }}
    />
  );
}
