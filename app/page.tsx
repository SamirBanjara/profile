import Image from "next/image";
import { profile } from "./profile";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { MobileMenu } from "./mobile-menu";
import { DesktopNav, ScrollProgress } from "./nav";
import { Projects } from "./projects";
import { ThemeToggle } from "./theme-toggle";

const skillIcons: Record<string, React.ReactNode> = {
  "Analysis & Planning": (
    <>
      <path d="M9 11l3 3 8-8" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  "Architecture & Integration": (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14M14 17.5h-4a3 3 0 0 1-3-3V10" />
    </>
  ),
  "Back End": (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  "Front End": (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  Database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  "Cloud & Tools": <path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7z" />,
};

const skillColors: Record<string, { tile: string; chip: string; bar: string }> = {
  "Analysis & Planning": {
    tile: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    chip: "border-violet-500/25 bg-violet-500/10 text-violet-700 hover:bg-violet-500/20 dark:text-violet-200",
    bar: "from-violet-500 to-fuchsia-500",
  },
  "Architecture & Integration": {
    tile: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    chip: "border-sky-500/25 bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 dark:text-sky-200",
    bar: "from-sky-500 to-cyan-400",
  },
  "Back End": {
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    chip: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-200",
    bar: "from-emerald-500 to-teal-400",
  },
  "Front End": {
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 dark:text-amber-200",
    bar: "from-amber-500 to-orange-400",
  },
  Database: {
    tile: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
    chip: "border-rose-500/25 bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 dark:text-rose-200",
    bar: "from-rose-500 to-pink-400",
  },
  "Cloud & Tools": {
    tile: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
    chip: "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 dark:text-indigo-200",
    bar: "from-indigo-500 to-blue-400",
  },
};

const navItems = ["about", "projects", "experience", "education", "contact"];

function Icon({ children }: { children: React.ReactNode }) {
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

function Highlight({ text }: { text: string }) {
  const escaped = profile.highlights.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-accent">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

const factIcons: Record<string, React.ReactNode> = {
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
};

const capIcons: Record<string, React.ReactNode> = {
  analysis: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 13l2 2 4-4" />
    </>
  ),
  systems: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.5l2.6 8M15.8 7.5l-2.6 8M8.5 6h7" />
    </>
  ),
  architecture: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 10v2h11v-2M12 12v2" />
    </>
  ),
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mb-8 mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 text-sm">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
              SB
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>
          <div className="flex items-center gap-5">
            <DesktopNav items={navItems} />
            <ThemeToggle />
            <MobileMenu items={navItems} />
          </div>
        </nav>
        <ScrollProgress />
      </header>

      <main id="top">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent/25 via-accent-2/20 to-transparent blur-3xl"
          />
          <div className="relative mx-auto flex max-w-5xl flex-col-reverse items-start gap-10 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-24">
            <div className="fade-up max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {profile.location}
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>
              <p className="mt-3 text-lg font-medium text-muted sm:text-xl">{profile.title}</p>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:opacity-90"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium transition hover:border-accent"
                >
                  Contact me
                </a>
              </div>
            </div>
            <div className="fade-up relative shrink-0 [animation-delay:150ms]">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-accent-2 opacity-70 blur-md" />
              <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-background sm:h-64 sm:w-64">
                <Image
                  src="/samir.jpg"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="256px"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          {/* Stats */}
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                <dt className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-3xl font-bold text-transparent">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>

          {/* About */}
          <Section id="about" eyebrow="About" title="Who I am">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative h-28 bg-gradient-to-r from-accent to-accent-2">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]"
                  />
                </div>
                <div className="px-6 pb-7 sm:px-8">
                  <div className="-mt-12 flex items-start gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-card shadow-lg">
                      <Image
                        src="/samir.jpg"
                        alt={profile.name}
                        fill
                        sizes="96px"
                        className="object-cover object-[50%_30%]"
                      />
                    </div>
                    <div className="pt-14">
                      <p className="text-xl font-bold leading-tight">{profile.name}</p>
                      <p className="mt-1 text-sm text-muted">Government digital systems · Nepal</p>
                    </div>
                  </div>

                  <p className="mt-6 text-lg leading-relaxed">
                    <Highlight text={profile.about[0]} />
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">
                    <Highlight text={profile.about[1]} />
                  </p>

                  <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                    {profile.facts.map((f) => (
                      <div key={f.label} className="flex gap-3 rounded-xl border border-border bg-background p-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                          <Icon>{factIcons[f.icon]}</Icon>
                        </span>
                        <div className="min-w-0">
                          <dt className="text-xs font-medium uppercase tracking-wider text-muted">{f.label}</dt>
                          <dd className="mt-0.5 text-sm font-medium leading-snug">{f.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">What I do</h3>
                <ul className="space-y-3">
                  {profile.capabilities.map((c) => (
                    <li
                      key={c.title}
                      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent-2 opacity-0 transition group-hover:opacity-100"
                      />
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/20">
                        <Icon>{capIcons[c.icon]}</Icon>
                      </span>
                      <div>
                        <h4 className="font-semibold">{c.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="mb-4 mt-14 text-sm font-semibold uppercase tracking-widest text-muted">Skills & tools</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.skills.map((g) => (
                <div
                  key={g.group}
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10"
                >
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${skillColors[g.group].bar}`}
                  />
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${skillColors[g.group].tile}`}>
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
                        {skillIcons[g.group]}
                      </svg>
                    </span>
                    <h4 className="text-base font-semibold">{g.group}</h4>
                    <span className="ml-auto font-mono text-sm text-muted">{g.items.length}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${skillColors[g.group].chip}`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section id="projects" eyebrow="Work" title="Featured projects">
            <Projects />
          </Section>

          {/* Experience */}
          <Section id="experience" eyebrow="Career" title="Experience">
            <Experience />
          </Section>

          {/* Education */}
          <Section id="education" eyebrow="Background" title="Education & languages">
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.education.map((e) => (
                <a
                  key={e.school}
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
                >
                  <div className="flex h-28 items-center justify-center bg-white px-6 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.logo} alt={e.school} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-border p-6">
                    <h3 className="font-semibold">{e.degree}</h3>
                    <p className="mt-1 text-sm">{e.school}</p>
                    <p className="text-sm text-muted">{[e.place, e.period].filter(Boolean).join(" · ")}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Visit website
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon>{factIcons.globe}</Icon>
              </span>
              <h3 className="font-semibold">Languages</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <li key={l} className="rounded-full bg-accent-soft px-3.5 py-1 text-sm font-medium text-accent">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" eyebrow="Contact" title="Let's get in touch">
            <Contact />
          </Section>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        <p>
          © {profile.name} ·{" "}
          <a href="#top" className="font-medium text-accent hover:underline">
            Back to top ↑
          </a>
        </p>
      </footer>
    </>
  );
}
