# Bitscale Dashboard

A production-quality GTM intelligence platform dashboard — dark/light mode, Framer Motion animations, premium hover effects, and a faithful recreation of the Figma design.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 🏗 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy (Vercel)

```bash
npx vercel
```
Or push to GitHub and connect at vercel.com for auto-deploy.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dark / Light mode** | Toggle in the topbar — persists design on both |
| **Light mode** | Matches the Figma design exactly (white cards, #EDF0F7 bg) |
| **Dark mode** | Premium dark theme with green accent, ambient orbs |
| **Sidebar** | Collapsible with smooth slide animation, active indicator |
| **Typewriter** | "Welcome back, Tim!" animates character-by-character |
| **Counter** | Credit usage counts up with easing on load |
| **Progress bar** | Animated shimmer fill tied to checklist completion |
| **Checklist** | Click tasks to toggle; progress bar updates live |
| **Carousel** | Auto-cycles every 3.2s; click dots to jump |
| **Grids table** | My Grids / Starred tabs, live search with highlight, star toggle |
| **Star animation** | Spring pop keyframe on toggle |
| **Row hover** | Green left-border inset flash + name color shift |
| **Find People/Companies** | Full modal with animated accordion filters, tag selection |
| **Toast notifications** | Slide-up toast for every action |
| **Theme toggle** | Pill toggle in topbar with sun/moon icon |

---

## 📁 Structure

```
bitscale-dashboard/
├── app/
│   ├── globals.css          # All CSS vars (light & dark), keyframes, component styles
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── BitscaleDashboard.tsx  # Full dashboard — self-contained
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🎨 Design Tokens

CSS custom properties on `:root` (light) and `.dark` — see `globals.css`.

Key light-mode values match the Figma file:
- Background: `#EDF0F7`
- Cards: `#ffffff`
- Sidebar: `#0C0E14` (always dark)
- Accent: `#22C55E` (green)

Dark mode extends with:
- Background: `#0a0a0f`
- Cards: `#1c1c26`
- Animated ambient orbs

## Tech Stack

| Tool | Version |
|---|---|
| Next.js | 14.2.5 |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3.4 |
| Lucide React | 0.400 |

