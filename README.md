# Agent Skill Bundle — Website

Static Next.js landing page for the [Agent Skill Bundle](https://github.com/ZAX-MILLION/agent-skill-bundle) — 116 curated agent skills, hosted on GitHub Pages.

## Live site
https://zax-million.github.io/agent-skill-bundle/

## Stack
- Next.js 16 (static export) + TypeScript + Tailwind CSS v4
- Deployed via GitHub Actions → GitHub Pages

## Development
```bash
npm install        # Node 22+ required
npm run dev        # local dev server
npm run build      # static export → out/
```

## Notes
- `basePath: /agent-skill-bundle` in `next.config.ts` matches the repo name on GitHub Pages — do not change unless the repo moves.
- Skill data is generated from the bundle repo: `src/lib/skills-data.ts` (auto-generated, do not edit by hand; regenerate from `/root/zax-skill-bundle`).
- Design: dark glass + thin gold accent, numbers-dominant, low outer glow (per user taste — no AI-slop gradients, no moving buttons, prefers-reduced-motion respected).
