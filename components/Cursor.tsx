"use client";

import { useEffect, useRef, useState } from "react";

// Small circle by default. Over anything with [data-cursor], it swaps to a
// filled chip showing that label ("VIEW", "TICKETS", "DRAG"). Fine-pointer
// devices only; never on touch.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const el = dot.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] flex items-center justify-center"
    >
      {label ? (
        <span className="meta whitespace-nowrap bg-chilli px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-paper">
          {label}
        </span>
      ) : (
        <span
          className="block rounded-full bg-ink transition-transform duration-150"
          style={{
            width: 12,
            height: 12,
            transform: down ? "scale(0.6)" : "scale(1)",
            mixBlendMode: "difference",
          }}
        />
      )}
    </div>
  );
}
