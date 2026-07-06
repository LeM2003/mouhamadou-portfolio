# Homepage CTA & preuve sociale — design

**Date** : 2026-07-06
**Contexte** : l'outreach LinkedIn en cours (5 premières cibles contactées le jour même, `marketing/suivi-leads.md`) pointe vers ce portfolio. Deux frictions repérées dans le code actuel :
1. Le contact direct passe par `/card` (2 clics) et le canal WhatsApp — pertinent pour les cibles sénégalaises actuelles — n'apparaît nulle part sur la homepage.
2. La section "Présence & preuve" (05) affiche des métriques faibles (connexions/abonnés LinkedIn) qui font doublon avec la section "Chiffres réels" (03).

## Périmètre

3 fichiers touchés, aucune nouvelle route, aucune nouvelle dépendance.

### 1. `src/data/contact.ts` (nouveau)
Extraire l'objet `CONTACT` actuellement défini en local dans `src/app/card/page.tsx` (email, LinkedIn, GitHub, téléphone, `whatsappUrl`, `website`, `note`) vers ce fichier, comme source unique. Le format de vCard (`vcardString`) reste construit dans `card/page.tsx` à partir de `CONTACT` importé.

### 2. `src/app/card/page.tsx` (modifié)
Importer `CONTACT` depuis `@/data/contact` au lieu de la définition locale. Aucun changement de comportement ou de rendu.

### 3. `src/app/page.tsx` (modifié)
- **Section 06 (CTA Contact)** : remplacer les 2 boutons actuels ("Voir ma carte" en primaire accent, "Email direct" en secondaire) par :
  - Bouton accent primaire → WhatsApp direct (`CONTACT.whatsappUrl`)
  - Bouton secondaire → Email direct (inchangé)
  - Lien texte tertiaire → "Voir ma carte →" (`/card`)
- **Section 05 (Présence & preuve)** : remplacer les 2 stats "281 Connexions LinkedIn" et "286 Abonnés LinkedIn" par :
  - `< 24h` — Temps de réponse
  - `7h–23h` — Disponibilité (GMT+0 · EU-friendly)
  Les 2 autres stats ("3 Produits en prod", "2 Open source") restent inchangées.

## Hors périmètre
- Pas de refonte du hero ni de `/services` — non demandé, pas de signal de problème dessus.
- Pas de nouvelles métriques inventées (ex. pas de faux témoignages) — seulement des affirmations déjà présentes ailleurs sur le site (`/card`, section 06 actuelle).

## Vérification
`npm run dev`, vérifier visuellement :
- Le lien WhatsApp de la homepage ouvre bien `wa.me/221783019983`.
- `/card` rend à l'identique après le refactor (pas de régression).
- Les nouvelles stats de la section 05 s'affichent correctement en desktop et mobile.
