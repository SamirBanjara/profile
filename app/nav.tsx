"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently under the header ("" while in the hero). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

export function DesktopNav({ items }: { items: string[] }) {
  const active = useActiveSection(items);
  return (
    <ul className="hidden gap-1 text-sm md:flex">
      {items.map((s) => {
        const on = active === s;
        return (
          <li key={s}>
            <a
              href={`#${s}`}
              aria-current={on ? "true" : undefined}
              className={`group relative block rounded-full px-3 py-1.5 capitalize transition-colors duration-300 ${
                on ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {s}
              <span
                aria-hidden
                className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300 ${
                  on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden className="absolute bottom-0 left-0 h-0.5 w-full">
      <div className="h-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${pct}%` }} />
    </div>
  );
}
