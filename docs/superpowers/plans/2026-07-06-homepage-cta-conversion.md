# Homepage CTA & Preuve Sociale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réduire la friction de contact sur la homepage (WhatsApp direct au lieu de 2 clics via `/card`) et remplacer 2 métriques LinkedIn faibles par des preuves honnêtes, en support de l'outreach client en cours.

**Architecture:** Extraction d'un objet `CONTACT` partagé (actuellement dupliqué en dur dans `card/page.tsx`) vers `src/data/contact.ts`, puis réutilisation sur la homepage pour le lien WhatsApp/email. Modifications purement présentationnelles sur `src/app/page.tsx` (sections 05 et 06). Pas de nouvelle route, pas de nouvelle dépendance.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. Pas de framework de test dans ce repo (`package.json` n'a pas de script `test`) — vérification par lancement du serveur de dev + inspection visuelle/HTML, pas de tests automatisés inventés pour l'occasion.

---

### Task 1: Extraire `CONTACT` en source unique

**Files:**
- Create: `src/data/contact.ts`
- Modify: `src/app/card/page.tsx:16-32` (supprime la définition locale, ajoute l'import)

- [ ] **Step 1: Créer `src/data/contact.ts`**

```ts
export const CONTACT = {
  fullName: "Mouhamadou Diouf",
  firstName: "Mouhamadou",
  lastName: "Diouf",
  title: "AI Product Builder & Product Owner",
  org: "Auryntix",
  location: "Dakar, Sénégal",
  email: "Mouhamadoud_Diouf@proton.me",
  linkedin: "https://www.linkedin.com/in/mouhamadoudiouf",
  github: "https://github.com/LeM2003",
  phoneInternational: "+221783019983",
  phoneDisplay: "+221 78 301 99 83",
  whatsappUrl: "https://wa.me/221783019983",
  website: "https://mouhamadou-portfolio.vercel.app",
  note: "AI Product Builder & PO @Auryntix · Master DS/IA · Dakar · Open to freelance & collaborations",
};
```

- [ ] **Step 2: Modifier `src/app/card/page.tsx`**

Supprimer le bloc `const CONTACT = { ... };` (lignes 16-32) et ajouter l'import à la place, avec les autres imports en haut du fichier :

```ts
import { CONTACT } from "@/data/contact";
```

Le reste du fichier (`vcardString`, `channels`, JSX) ne change pas — `CONTACT` est utilisé exactement pareil, juste importé au lieu d'être défini localement.

- [ ] **Step 3: Vérifier que `/card` rend à l'identique**

Run: `npm run dev`, puis ouvrir `http://localhost:3000/card` dans le navigateur.
Expected: page identique à avant (nom, titre, 4 channels dont WhatsApp, QR code) — aucune régression visuelle ni erreur dans la console.

- [ ] **Step 4: Commit**

```bash
git add src/data/contact.ts src/app/card/page.tsx
git commit -m "refactor: extract CONTACT into src/data/contact.ts as single source of truth"
```

---

### Task 2: WhatsApp direct dans le CTA final de la homepage (section 06)

**Files:**
- Modify: `src/app/page.tsx` (import + lignes 316-330)

- [ ] **Step 1: Ajouter l'import `CONTACT`**

En haut de `src/app/page.tsx`, avec les autres imports :

```ts
import { CONTACT } from "@/data/contact";
```

- [ ] **Step 2: Remplacer le bloc de boutons de la section 06**

Remplacer ce bloc existant (lignes 316-330) :

```tsx
            <div className="flex flex-col gap-4 shrink-0">
              <Link
                href="/card"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Voir ma carte
                <span>→</span>
              </Link>
              <a
                href="mailto:Mouhamadoud_Diouf@proton.me"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--hairline)] font-mono text-sm uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Email direct
              </a>
            </div>
```

Par :

```tsx
            <div className="flex flex-col gap-4 shrink-0">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                WhatsApp direct
                <span>→</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--hairline)] font-mono text-sm uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Email direct
              </a>
              <Link
                href="/card"
                className="group inline-flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Voir ma carte
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
```

- [ ] **Step 3: Vérifier visuellement**

Run: `npm run dev`, ouvrir `http://localhost:3000` et scroller jusqu'à la section 06 ("Contact").
Expected : bouton accent "WhatsApp direct →" en premier, "Email direct" en dessous, puis un simple lien texte "Voir ma carte →". Cliquer sur "WhatsApp direct" ouvre un nouvel onglet vers `https://wa.me/221783019983`.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: prioritize WhatsApp as primary contact CTA on homepage"
```

---

### Task 3: Remplacer les métriques LinkedIn faibles (section 05)

**Files:**
- Modify: `src/app/page.tsx` (lignes ~275-281, tableau de stats de la section 05)

- [ ] **Step 1: Remplacer les 2 premières entrées du tableau**

Remplacer ce bloc :

```tsx
          {[
            { value: "281", label: "Connexions LinkedIn", sub: "réseau professionnel actif" },
            { value: "286", label: "Abonnés LinkedIn", sub: "en croissance" },
            { value: "3", label: "Produits en prod", sub: "clients réels · Olèle Systems" },
            { value: "2", label: "Open source", sub: "MuslimApp · ImportManager SN" },
          ].map((stat) => (
```

Par :

```tsx
          {[
            { value: "24h", label: "Temps de réponse", sub: "email · LinkedIn · WhatsApp" },
            { value: "100%", label: "Remote", sub: "Dakar · EU-friendly · GMT+0" },
            { value: "3", label: "Produits en prod", sub: "clients réels · Olèle Systems" },
            { value: "2", label: "Open source", sub: "MuslimApp · ImportManager SN" },
          ].map((stat) => (
```

- [ ] **Step 2: Vérifier visuellement (desktop + mobile)**

Run: `npm run dev`, ouvrir `http://localhost:3000`, scroller jusqu'à la section 05 ("Présence & preuve").
Expected : 4 stats affichées sans débordement de texte, ni en desktop (grid-cols-4) ni en mobile (grid-cols-2) — vérifier avec les devtools en réduisant la largeur de la fenêtre à ~375px.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "content: replace vanity LinkedIn stats with response-time and remote proof"
```
