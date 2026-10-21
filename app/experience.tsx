"use client";

import { useEffect, useRef, useState } from "react";
import { companyUrl, profile } from "./profile";

function years(period: string) {
  const m = period.match(/\d{4}/g) ?? [];
  return { start: m[0] ?? "", end: m[1] ?? "Present" };
}

function Odometer({ value, tone }: { value: string; tone: string }) {
  if (!/^\d{4}$/.test(value)) {
    return (
      <span key={value} className={`year-in ${tone}`}>
        {value}
      </span>
    );
  }
  return (
    <span className={`inline-flex ${tone}`} aria-label={value}>
      {value.split("").map((d, i) => (
        <span key={i} aria-hidden className="relative inline-block h-[1.4em] w-[0.62em] overflow-hidden">
          <span
            className="absolute left-0 top-0 flex flex-col transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateY(-${Number(d) * 1.4}em)`, transitionDelay: `${i * 70}ms` }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className="block h-[1.4em] leading-[1.4em]">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Experience() {
  const items = profile.experience;
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLOListElement>(null);
  const [ready, setReady] = useState(false);
  const [fill, setFill] = useState(0);
  const [reached, setReached] = useState(0);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => items.map(() => true));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const f = Math.max(0, Math.min(rect.height, mid - rect.top));

      let r = 0;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.offsetTop + 28 <= f) r = i + 1;
        const b = el.getBoundingClientRect();
        const dist = Math.abs(b.top + b.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      // The highlighted card's dot must always be lit, so the line reaches at least that far.
      const activeY = (itemRefs.current[best]?.offsetTop ?? 0) + 28;
      setFill(Math.max(f, activeY));
      setReached(Math.max(r, best + 1));
      setActive(best);
      if (!reduce) {
        setSeen((prev) => {
          const next = prev.map((v, i) => {
            const el = itemRefs.current[i];
            return v || (el ? el.getBoundingClientRect().top < window.innerHeight * 0.92 : false);
          });
          return next.every((v, i) => v === prev[i]) ? prev : next;
        });
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (!reduce) {
      setSeen(
        items.map((_, i) => {
          const el = itemRefs.current[i];
          return el ? el.getBoundingClientRect().top < window.innerHeight * 0.92 : true;
        }),
      );
      setReady(true);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const yr = years(items[active]?.period ?? "");

  return (
    <div className="relative">
      <div className="pointer-events-none sticky top-20 z-30 mb-4 flex justify-center sm:justify-start sm:pl-16">
        <div className="relative flex items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-2 shadow-lg shadow-accent/10 backdrop-blur">
          <span
            key={active}
            aria-hidden
            className="absolute inset-0 rounded-full ring-2 ring-accent/60 animate-[ring-pulse_0.8s_ease-out_1]"
          />
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Timeline</span>
          <span className="flex items-center gap-2 font-mono text-base font-bold">
            <Odometer value={yr.start} tone="text-accent" />
            <span aria-hidden className="text-muted">
              →
            </span>
            <Odometer value={yr.end} tone="text-accent-2" />
          </span>
        </div>
      </div>
    <ol ref={listRef} className="relative ml-3 sm:ml-16">
      <span aria-hidden className="absolute bottom-0 left-0 top-0 w-0.5 bg-border" />
      <span
        aria-hidden
        className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-accent to-accent-2"
        style={{ height: fill }}
      />
      <span
        aria-hidden
        className="absolute -left-[5px] h-3 w-3 rounded-full bg-accent-2 shadow-[0_0_14px_3px] shadow-accent-2/60"
        style={{ top: Math.max(0, fill - 6), opacity: fill > 0 ? 1 : 0 }}
      />

      {items.map((e, i) => {
        const hidden = ready && !seen[i];
        const isActive = active === i;
        const dotOn = reached > i;
        return (
          <li
            key={e.role + e.company + e.period}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`relative pb-6 pl-8 last:pb-0 sm:pl-10 ${active === i ? "z-10" : "z-0"}`}
          >
            <span
              className={`absolute -left-4 top-[22px] hidden -translate-x-full font-mono text-xs transition-all duration-500 sm:block ${
                isActive
                  ? "scale-125 font-bold text-accent"
                  : dotOn
                    ? "font-semibold text-accent/80"
                    : "text-muted"
              }`}
              style={{ transformOrigin: "right center" }}
            >
              {e.current ? "Now" : years(e.period).start}
            </span>
            {isActive && (
              <span
                aria-hidden
                className="absolute -left-[9px] top-6 h-4 w-4 animate-ping rounded-full bg-accent/50 [animation-iteration-count:3]"
              />
            )}
            <span
              className={`absolute -left-[9px] top-6 h-4 w-4 rounded-full border-[3px] border-background transition-all duration-500 ${
                dotOn ? "scale-110 bg-accent ring-4 ring-accent/20" : "bg-zinc-300 dark:bg-zinc-600"
              }`}
            />
            <div
              onMouseMove={(ev) => {
                if (!isActive) return;
                const el = ev.currentTarget;
                const r = el.getBoundingClientRect();
                const x = (ev.clientX - r.left) / r.width - 0.5;
                const y = (ev.clientY - r.top) / r.height - 0.5;
                el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
                el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.setProperty("--rx", "0deg");
                ev.currentTarget.style.setProperty("--ry", "0deg");
              }}
              style={
                ready
                  ? {
                      transform: isActive
                        ? "perspective(1200px) translateZ(24px) scale(1.02) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))"
                        : "perspective(1200px) scale(0.965) rotateY(-4deg)",
                      transformOrigin: "center center",
                    }
                  : undefined
              }
              className={`rounded-2xl border bg-card p-5 transition-all duration-500 ease-out will-change-transform sm:p-6 ${
                hidden ? "translate-y-10 opacity-0" : isActive || !ready ? "translate-y-0 opacity-100" : "translate-y-0 opacity-70"
              } ${
                isActive
                  ? "border-accent/70 shadow-2xl shadow-accent/25 ring-1 ring-accent/30"
                  : "border-border shadow-none"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5 transition-transform duration-500 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  {e.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.logo} alt="" loading="lazy" className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-sm font-bold text-accent">
                      {e.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold leading-tight">{e.role}</h3>
                    {e.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-medium text-accent">
                    {companyUrl(e.company) ? (
                      <a
                        href={companyUrl(e.company)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {e.company} <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      e.company
                    )}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                    <span>{e.period}</span>
                    {e.duration && (
                      <>
                        <span aria-hidden className="hidden sm:inline">·</span>
                        <span>{e.duration}</span>
                      </>
                    )}
                    <span aria-hidden className="hidden sm:inline">·</span>
                    <span>{e.place}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted">{e.type}</p>
                  {e.work.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted">Key work</span>
                      {e.work.map((w, wi) => (
                        <a
                          key={w}
                          href="#projects"
                          style={{ transitionDelay: hidden ? "0ms" : `${200 + wi * 70}ms` }}
                          className={`rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs font-semibold text-accent transition-all duration-500 hover:opacity-80 ${
                            hidden ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                          }`}
                        >
                          {w}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
    </div>
  );
}
