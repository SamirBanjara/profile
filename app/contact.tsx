"use client";

import { useState } from "react";
import { profile } from "./profile";

const icons: Record<string, React.ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {}
  }
  return (
    <button
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
    >
      {done ? "Copied ✓" : "Copy"}
    </button>
  );
}

export function Contact() {
  const email = profile.links.find((l) => l.icon === "mail");
  const linkedin = profile.links.find((l) => l.icon === "linkedin");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-accent/25 to-accent-2/20 blur-3xl"
      />
      <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open to conversations
          </span>
          <h3 className="mt-5 text-2xl font-bold leading-snug sm:text-3xl">
            Let&apos;s talk about your next{" "}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              digital system
            </span>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            Business analysis, systems architecture and digital government projects: reach out and I&apos;ll get
            back to you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {email && (
              <a
                href={email.href}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:opacity-90"
              >
                Send an email
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium transition hover:border-accent"
              >
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>

        <ul className="min-w-0 space-y-3 lg:col-span-3">
          {profile.links.map((l) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Svg>{icons[l.icon]}</Svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted">{l.label}</span>
                  <span className="block truncate font-medium">{l.value}</span>
                </span>
              </>
            );
            return (
              <li
                key={l.label}
                className="group flex items-center gap-2 rounded-2xl border border-border bg-background p-3 pr-4 transition hover:border-accent hover:shadow-lg hover:shadow-accent/10"
              >
                {l.href ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex min-w-0 flex-1 items-center gap-4">{inner}</div>
                )}
                {l.copy ? (
                  <CopyButton text={l.copy} label={l.label} />
                ) : l.href ? (
                  <span aria-hidden className="text-muted transition group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
