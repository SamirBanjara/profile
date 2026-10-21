"use client";

import { useState } from "react";
import { companyUrl, profile } from "./profile";

export function Projects() {
  const [active, setActive] = useState("All");
  const items = profile.projects.filter((p) => active === "All" || p.category === active);
  const rest = items.filter((p) => !("featured" in p && p.featured)).length;

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {profile.projectCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === c
                ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                : "border-border bg-card text-muted hover:border-accent hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div key={active} className="fade-up grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {items.map((p, i) => {
          const featured = "featured" in p && p.featured;
          // Position among the regular cards, used to fill the last row without gaps.
          const ri = items.slice(0, i).filter((q) => !("featured" in q && q.featured)).length;
          const lastOne = ri === rest - 1;
          const lastTwo = ri >= rest - 2;
          let span = "lg:col-span-2";
          if (rest % 3 === 1 && lastOne) span = "lg:col-span-6";
          else if (rest % 3 === 2 && lastTwo) span = "lg:col-span-3";
          const wide = featured ? "" : `${span} ${rest % 2 === 1 && lastOne ? "md:col-span-2" : ""}`;
          return (
            <article
              key={p.short}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10 ${wide} ${
                featured ? "md:col-span-2 lg:col-span-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-8" : ""
              }`}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className={featured ? "lg:max-w-xl" : "flex-1"}>
                <div className="flex flex-wrap items-center gap-2">
                  {(() => {
                    const logos: string[] =
                      "logos" in p && p.logos ? p.logos : "logo" in p && p.logo ? [p.logo] : [];
                    if (logos.length === 0) {
                      return (
                        <span className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5">
                          <span className="text-sm font-bold text-accent">{p.short.slice(0, 2)}</span>
                        </span>
                      );
                    }
                    return (
                      <span className="mr-1 flex items-center gap-2">
                        {logos.map((src) => (
                          <span
                            key={src}
                            className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-1.5 py-1.5"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" loading="lazy" className="h-full w-auto max-w-28 object-contain" />
                          </span>
                        ))}
                      </span>
                    );
                  })()}
                  <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                    {p.short}
                  </span>
                  <span className="text-xs text-muted">{p.level}</span>
                  {featured && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Flagship
                    </span>
                  )}
                </div>
                <h3 className={`mt-3 font-semibold leading-snug ${featured ? "text-xl sm:text-2xl" : "text-base"}`}>
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                {"funder" in p && p.funder && (
                  <a
                    href={p.funder.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Funded by ${p.funder.name}`}
                    className="mt-4 inline-flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-1.5 transition hover:border-accent hover:shadow-md"
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Funded by</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.funder.logo} alt={p.funder.name} loading="lazy" className="h-8 w-auto" />
                  </a>
                )}
              </div>

              <div className={featured ? "mt-6 lg:mt-0 lg:text-right" : "mt-5"}>
                {"metric" in p && p.metric && (
                  <div className={`mb-4 ${featured ? "" : "flex items-baseline gap-2"}`}>
                    <span
                      className={`bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-bold text-transparent ${
                        featured ? "text-5xl sm:text-6xl" : "text-2xl"
                      }`}
                    >
                      {p.metric.value}
                    </span>
                    <span className={`text-xs text-muted ${featured ? "block" : ""}`}>{p.metric.label}</span>
                  </div>
                )}
                <p className="border-t border-border pt-3 text-xs text-muted">
                  {companyUrl(p.org) ? (
                    <a
                      href={companyUrl(p.org)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground underline-offset-4 transition hover:text-accent hover:underline"
                    >
                      {p.org} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{p.org}</span>
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
