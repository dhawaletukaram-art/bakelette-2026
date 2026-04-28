import { useEffect, useRef } from "react";

/**
 * Subtle pointer-tracking 3D tilt.
 * Apply the returned ref to any element. Pair with `transform-style: preserve-3d`
 * on the element (Tailwind: `preserve-3d`) and `perspective-1000` on its parent.
 */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}
