"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TOTAL, CATEGORIES, type Category } from "@/lib/skills-data";

const GITHUB = "https://github.com/ZAX-MILLION/agent-skill-bundle";

/* ---------- small bits ---------- */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      className="btn-ghost mono text-[11px] tracking-wider px-3 py-1.5 rounded-md uppercase shrink-0 cursor-pointer"
      aria-label="Copy install command"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

/* ---------- header ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07070c]/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="w-2 h-2 rounded-full bg-[#c9a86a] glow-gold" />
          <span className="display text-[15px] tracking-[0.18em] uppercase text-[#e8e6f0]">
            Skill&nbsp;Bundle
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-7 text-[13px] text-[#9b97ad]">
          <a href="#categories" className="hover:text-[#e8e6f0] transition-colors">Categories</a>
          <a href="#index" className="hover:text-[#e8e6f0] transition-colors">Index</a>
          <a href="#install" className="hover:text-[#e8e6f0] transition-colors">Install</a>
          <a href="#sources" className="hover:text-[#e8e6f0] transition-colors">Sources</a>
        </nav>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-[12px] px-3.5 py-1.5 rounded-md uppercase tracking-wider"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <Reveal>
          <p className="mono text-[11px] uppercase tracking-[0.35em] text-[#8a7448] mb-6">
            Curated · Verified · One Command
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            <span className="num text-[#c9a86a]">{TOTAL}</span> skills.
            <br />
            <span className="text-[#e8e6f0]">Zero vibe-coding mistakes.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="max-w-xl mx-auto mt-7 text-[15px] sm:text-base leading-relaxed text-[#9b97ad]">
            A single collection of battle-tested agent skills — design quality, security
            audits, process discipline, multiplayer patterns, WordPress, marketing, and
            QA — from the best open-source packs on GitHub. Install once, everywhere.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#install"
              className="btn-gold text-[13px] px-6 py-3 rounded-lg uppercase tracking-wider font-medium"
            >
              Get Started
            </a>
            <a
              href="#categories"
              className="btn-ghost text-[13px] px-6 py-3 rounded-lg uppercase tracking-wider"
            >
              Browse the Index
            </a>
          </div>
        </Reveal>

        {/* stat row — numbers dominant */}
        <Reveal delay={320}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px glass rounded-2xl overflow-hidden">
            {[
              { n: String(TOTAL), l: "Skills" },
              { n: "7", l: "Categories" },
              { n: "8", l: "Source Packs" },
              { n: "1", l: "Install Command" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0c0c14]/80 px-6 py-7 text-center">
                <div className="num text-3xl sm:text-4xl text-[#e8cf9a]">{s.n}</div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-[#5c5a6e]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- categories ---------- */

function CategoryCard({ cat, i }: { cat: Category; i: number }) {
  return (
    <Reveal delay={(i % 3) * 70}>
      <a
        href="#index"
        className="card-cat group block glass rounded-2xl p-6 h-full"
      >
        <div className="flex items-start justify-between">
          <span className="mono text-[11px] uppercase tracking-[0.25em] text-[#8a7448]">
            {cat.id}
          </span>
          <span className="num text-2xl text-[#c9a86a]">{cat.count}</span>
        </div>
        <h3 className="display text-lg mt-4 text-[#e8e6f0]">{cat.label}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#9b97ad]">{cat.blurb}</p>
        <p className="mono text-[10px] uppercase tracking-wider text-[#5c5a6e] mt-4">
          {cat.sources}
        </p>
      </a>
    </Reveal>
  );
}

function Categories() {
  return (
    <section id="categories" className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
      <Reveal>
        <h2 className="display text-2xl sm:text-3xl text-[#e8e6f0]">
          Seven categories. <span className="text-[#c9a86a]">One standard.</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[#9b97ad] leading-relaxed">
          Every skill ships with its full structure — SKILL.md, scripts, examples, and
          references — so nothing breaks when an agent loads it.
        </p>
      </Reveal>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c, i) => (
          <CategoryCard key={c.id} cat={c} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- searchable index ---------- */

function SkillIndex() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("all");

  const flat = useMemo(
    () =>
      CATEGORIES.flatMap((c) =>
        c.skills.map((s) => ({ ...s, cat: c.label, catId: c.id }))
      ),
    []
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return flat.filter((s) => {
      if (active !== "all" && s.catId !== active) return false;
      if (!needle) return true;
      return s.name.toLowerCase().includes(needle) || s.desc.toLowerCase().includes(needle);
    });
  }, [q, active, flat]);

  return (
    <section id="index" className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="display text-2xl sm:text-3xl text-[#e8e6f0]">
              The <span className="text-[#c9a86a]">Index</span>
            </h2>
            <p className="mt-2 text-sm text-[#9b97ad]">
              {TOTAL} skills, searchable. Type to filter across every pack.
            </p>
          </div>
          <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 w-full sm:w-72">
            <svg className="w-4 h-4 text-[#5c5a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search skills…"
              className="bg-transparent outline-none text-sm w-full placeholder:text-[#5c5a6e]"
            />
          </div>
        </div>

        {/* category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={`btn-ghost text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
              active === "all" ? "!border-[#c9a86a]/50 !text-[#e8cf9a]" : ""
            }`}
          >
            All · {TOTAL}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`btn-ghost text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
                active === c.id ? "!border-[#c9a86a]/50 !text-[#e8cf9a]" : ""
              }`}
            >
              {c.label} · {c.count}
            </button>
          ))}
        </div>
      </Reveal>

      {/* results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-sm text-[#9b97ad]">No skills match “{q}”.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((s) => (
              <div
                key={s.name}
                className="glass rounded-xl px-5 py-4 hover:border-[#c9a86a]/25 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="mono text-[12px] text-[#e8e6f0] truncate">{s.name}</h4>
                  <span className="mono text-[9px] uppercase tracking-wider text-[#8a7448] shrink-0">
                    {s.catId}
                  </span>
                </div>
                {s.desc && (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#9b97ad] line-clamp-2">
                    {s.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- install ---------- */

function Install() {
  const commands = [
    { label: "Claude Code", cmd: "git clone https://github.com/ZAX-MILLION/agent-skill-bundle && cd agent-skill-bundle && ./install.sh ~/.claude/skills" },
    { label: "Cursor", cmd: "git clone https://github.com/ZAX-MILLION/agent-skill-bundle && cd agent-skill-bundle && ./install.sh ~/.cursor/skills" },
    { label: "Any agent", cmd: "git clone https://github.com/ZAX-MILLION/agent-skill-bundle && cd agent-skill-bundle && ./install.sh /path/to/skills" },
  ];
  return (
    <section id="install" className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
      <Reveal>
        <div className="glass rounded-3xl p-8 sm:p-12 glow-violet">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.3em] text-[#8a7448] mb-3">
                Install
              </p>
              <h2 className="display text-2xl sm:text-3xl text-[#e8e6f0]">
                One command. <span className="text-[#c9a86a]">Everywhere.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-[#9b97ad] leading-relaxed">
                The installer copies each skill&apos;s full directory — SKILL.md, scripts,
                examples, references — into any agent&apos;s skills folder.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[#5c5a6e]">
              <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
              Tested · 116 skills verified
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {commands.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="mono text-[10px] uppercase tracking-wider text-[#8a7448] w-24 shrink-0">
                  {c.label}
                </span>
                <code className="flex-1 mono text-[11px] sm:text-[12px] leading-relaxed bg-[#07070c]/80 border border-white/5 rounded-lg px-4 py-3 overflow-x-auto whitespace-nowrap text-[#e8e6f0]">
                  {c.cmd}
                </code>
                <CopyButton text={c.cmd} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- sources ---------- */

function Sources() {
  const sources = [
    ["anthropics/skills", "https://github.com/anthropics/skills"],
    ["daymade/claude-code-skills", "https://github.com/daymade/claude-code-skills"],
    ["google-labs-code/design.md", "https://github.com/google-labs-code/design.md"],
    ["VoltAgent/awesome-design-md", "https://github.com/VoltAgent/awesome-design-md"],
    ["obra/superpowers", "https://github.com/obra/superpowers"],
    ["rivet-dev/skills", "https://github.com/rivet-dev/skills"],
    ["WordPress/agent-skills", "https://github.com/WordPress/agent-skills"],
    ["coreyhaines31/marketingskills", "https://github.com/coreyhaines31/marketingskills"],
  ];
  return (
    <section id="sources" className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
      <Reveal>
        <h2 className="display text-2xl sm:text-3xl text-[#e8e6f0]">
          Built from the best <span className="text-[#c9a86a]">open-source packs</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[#9b97ad]">
          Every skill keeps its original license. Full credits in the repo README.
        </p>
      </Reveal>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sources.map(([name, url], i) => (
          <Reveal key={name} delay={(i % 4) * 60}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-xl px-5 py-4 hover:border-[#c9a86a]/30 transition-colors"
            >
              <div className="mono text-[12px] text-[#e8e6f0]">{name}</div>
              <div className="mt-1 text-[11px] text-[#5c5a6e]">github ↗</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#c9a86a] glow-gold" />
          <span className="display text-[13px] tracking-[0.18em] uppercase text-[#9b97ad]">
            Agent Skill Bundle
          </span>
        </div>
        <p className="mono text-[11px] text-[#5c5a6e]">
          {TOTAL} skills · 7 categories · 8 sources · MIT-friendly
        </p>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

export default function Page() {
  return (
    <div className="bg-ambient min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <SkillIndex />
        <Install />
        <Sources />
      </main>
      <Footer />
    </div>
  );
}
