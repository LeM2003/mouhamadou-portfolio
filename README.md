# Mouhamadou Diouf · Portfolio

> **AI Product Builder · Master Data Science / IA · 🇸🇳 Dakar**
> Mon portfolio personnel — *Je construis des produits web où l'IA est au cœur, pas un add-on.*

[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-12-FF0080?style=flat&logo=framer&logoColor=white)](https://motion.dev)

---

## 🎯 Le projet

Ce portfolio est **mon outil de positionnement principal** comme AI Product Builder à Dakar. Pensé comme un *produit*, pas une page CV — chaque section est une preuve : architecture, animation, performance, accessibilité.

**Cible** : recruteurs tech internationaux, fondateurs de startups, clients freelance EU/US/Afrique francophone.

**Stack volontairement minimale** : Next.js 16 + React 19 + TypeScript + Tailwind v4 + Motion (Framer Motion). Pas de CMS, pas de plugin marketing, pas de tracker invasif — juste du code propre qui rend bien.

## 🧱 Architecture

```
src/
├── app/
│   ├── layout.tsx        Layout global + ScrollProgress
│   ├── page.tsx          Landing principale (hero · proof · projets · contact)
│   └── globals.css       Variables design + base Tailwind
└── components/
    ├── AnimatedHeadline.tsx  Animation mot-à-mot du hero
    ├── ScrollProgress.tsx    Barre de progression scroll
    ├── FadeIn.tsx            Wrapper d'apparition au scroll
    └── ProofMetric.tsx       Carte de preuve sociale (chiffres, badges)
```

**Documents de pilotage** (versionnés mais non publiés) :
- [`positionnement.md`](./positionnement.md) — la boussole : identité, cibles, tone of voice, projets vitrine
- [`inspirations.md`](./inspirations.md) — moodboard et choix de design

## 🚀 Run local

```bash
git clone https://github.com/LeM2003/mouhamadou-portfolio.git
cd mouhamadou-portfolio
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## 🗺️ Roadmap

- [x] v1 — Landing éditoriale premium
- [x] v2 — Polish design + crédibilité + CV intégré
- [ ] v3 — Pages détail projets (`/projects/[slug]` pour Olèle, Personal OS, MuslimApp)
- [ ] v4 — Page `/services` (offres freelance) + `/collaboration` (CV-like)
- [ ] v5 — Carte de contact digitale + QR code (vCard)
- [ ] v6 — Blog "Build in public" + apprentissages Master IA
- [ ] **Déploiement** sur [mouhamadou-diouf.com](https://mouhamadou-diouf.com) *(à venir)*

## 🎨 Choix de design

| Décision | Pourquoi |
|---|---|
| **Pas de CMS** | Site presque statique, build instantané, perf max |
| **Tailwind v4** | Tokens design centralisés, gain DX |
| **Motion (Framer)** | Animations *spring* fluides, contrôle fin du timing |
| **next/font Geist** | Performance perçue (font swap optimisé, FOUT évité) |
| **Pas de tracker invasif** | Respect visiteur, GDPR ready dès V1 |

## 🤝 Inspiration / crédits

- Design générique inspiré par les portfolios de [Brittany Chiang](https://brittanychiang.com), [Lee Robinson](https://leerob.io), [Linear](https://linear.app)
- Stack initiale : `create-next-app`
- Animation patterns : [Motion.dev](https://motion.dev)

## 📬 Contact

Si tu veux échanger sur un projet, une mission freelance, ou une collaboration long terme :

- 📧 **Mouhamadoud_Diouf@proton.me**
- 💼 [LinkedIn](https://www.linkedin.com/in/mouhamadou-diouf)
- 🌐 Plus d'infos sur mon [profil GitHub](https://github.com/LeM2003)

---

> *Si ça existe déjà, c'est pas assez ambitieux.*

**Licence** : code source publié sous une licence personnelle restrictive — usage libre pour s'inspirer, pas pour cloner tel quel ou pour revendre.
