"use client";

import { useState } from "react";
import { useActiveSection } from "./nav";

export function MobileMenu({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted transition hover:text-foreground"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav className="year-in absolute inset-x-0 top-full border-b border-border bg-background/95 px-6 py-3 shadow-xl backdrop-blur-md">
          <ul className="flex flex-col">
            {items.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium capitalize transition ${
                    active === s ? "bg-accent-soft text-accent" : "text-muted hover:bg-accent-soft hover:text-accent"
                  }`}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
