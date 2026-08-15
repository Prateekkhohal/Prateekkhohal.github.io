"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Vec3 = { x: number; y: number; z: number };

const NODE_COUNT = 46;
const FOCAL = 3.1;

/** Evenly distributed points on a sphere, so the fleet reads as a lattice. */
function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

/**
 * The hero object: a control plane at the origin, devices on a rotating
 * lattice, and one command channel lit at a time.
 *
 * Written directly against the 2D canvas API with hand-rolled perspective
 * projection, so the page ships no 3D library and no image asset. Pauses when
 * scrolled out of view, and paints a single still frame under reduced motion.
 */
export function FleetLattice({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = fibonacciSphere(NODE_COUNT);
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let start = performance.now();

    // Cursor parallax, damped. Stays at rest on touch because pointermove
    // never fires without a hover-capable device moving across the element.
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(p: Vec3, scale: number) {
      const depth = FOCAL / (FOCAL + p.z);
      return {
        x: width / 2 + p.x * scale * depth,
        y: height / 2 + p.y * scale * depth,
        depth,
      };
    }

    function rotate(p: Vec3, ry: number, rx: number): Vec3 {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y1, z: z2 };
    }

    function draw(now: number) {
      if (!ctx) return;
      const t = (now - start) / 1000;
      const spin = reduced ? 0.6 : t * 0.16;
      const wobble = reduced ? 0.22 : Math.sin(t * 0.28) * 0.18 + 0.16;

      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;

      const scale = Math.min(width, height) * 0.32;
      ctx.clearRect(0, 0, width, height);

      const transformed = nodes.map((n) => rotate(n, spin + tiltY, wobble + tiltX));
      const origin = project({ x: 0, y: 0, z: 0 }, scale);

      // Latitude rings, so the lattice reads as a volume rather than scatter.
      for (const lat of [-0.55, 0, 0.55]) {
        const ringRadius = Math.sqrt(Math.max(0, 1 - lat * lat));
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          const point = rotate(
            { x: Math.cos(a) * ringRadius, y: lat, z: Math.sin(a) * ringRadius },
            spin + tiltY,
            wobble + tiltX
          );
          const s = project(point, scale);
          if (i === 0) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.055)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // One command channel is live at a time. The index advances on a timer,
      // which is the whole point of the visual.
      const activeIndex = reduced ? 7 : Math.floor(t / 1.7) % NODE_COUNT;
      const channelProgress = reduced ? 0.62 : (t % 1.7) / 1.7;

      const order = transformed
        .map((p, i) => ({ p, i }))
        .sort((a, b) => b.p.z - a.p.z);

      // Links from the control plane out to each device.
      for (const { p, i } of order) {
        const screen = project(p, scale);
        const isActive = i === activeIndex;
        const fog = Math.max(0, Math.min(1, (screen.depth - 0.55) / 0.7));

        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(screen.x, screen.y);
        ctx.strokeStyle = isActive
          ? `rgba(59,130,246,${0.55 * fog + 0.3})`
          : `rgba(255,255,255,${0.11 * fog + 0.03})`;
        ctx.lineWidth = isActive ? 1.5 : 0.7;
        ctx.stroke();

        // Device node.
        const r = (isActive ? 3.8 : 2.5) * screen.depth;
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, Math.max(0.7, r), 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? `rgba(96,165,250,${0.85 * fog + 0.15})`
          : `rgba(228,228,231,${0.55 * fog + 0.12})`;
        ctx.fill();

        // Command pulse travelling out along the live channel.
        if (isActive) {
          const px = origin.x + (screen.x - origin.x) * channelProgress;
          const py = origin.y + (screen.y - origin.y) * channelProgress;
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147,197,253,0.95)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(screen.x, screen.y, 8 * screen.depth, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59,130,246,${0.35 * (1 - channelProgress)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // The control plane itself, drawn last so it sits on top.
      const coreGlow = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, 46);
      coreGlow.addColorStop(0, "rgba(59,130,246,0.30)");
      coreGlow.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = coreGlow;
      ctx.fillRect(origin.x - 46, origin.y - 46, 92, 92);

      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(219,234,254,0.95)";
      ctx.fill();

      if (!reduced && visible) {
        frame = requestAnimationFrame(draw);
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetTiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
      targetTiltX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    }

    function onPointerLeave() {
      targetTiltX = 0;
      targetTiltY = 0;
    }

    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // Stop burning frames once the hero scrolls away.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          start = performance.now() - 1;
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    if (!reduced) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="A control plane at the centre of a rotating lattice of devices, with one command channel active at a time."
    />
  );
}
