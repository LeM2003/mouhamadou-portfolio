# CONTEXT.md — Dossier de passation

## Où on en est

- Portfolio v3.0 "éditorial" en production (mouhamadou-portfolio.vercel.app), branche `feat/phase1-living-portfolio`. 3 commits locaux prêts à pousser (`3230252`, `2af1812`, `05411db`, `<commit du jour>`) — push bloqué depuis ce shell (pas de credentials git), à faire manuellement par LeM.
- `mouhamadou-cv` : CV en ligne one-shot (izisaas/Antigravity) — poussé sur GitHub (`LeM2003/mouhamadou-cv`), lié à Vercel, déployé (`mouhamadou-cv-lem2003s-projects.vercel.app`).
- `src/data/projects.ts` : 8 projets (dont Liggeyo, DABA Email Assistant, Ndimbeul ajoutés cette session). Compteurs page d'accueil et stats LinkedIn à jour.
- **Architecture Liggeyo clarifiée et propagée** : Liggeyo = Cockpit (landing publique, liggeyo.com) + LMS marque blanche (espace formateur : contenu, certificats, apprenants, paiements Wave/OM/Free Money/MTN). Olèle Systems (olelesystems.company) est un espace LMS déployé pour ce client, comme n'importe quel autre formateur — pas une agence séparée. Corrigé dans `projects.ts` (fiche liggeyo), `now/page.tsx`, et `lib/ragPlayground/corpus.ts`.
- **`/lab/rag` — nouvelle étape 04 "Génération"** : le retrieval reste déterministe (pédagogique, volontaire), mais une vraie réponse LLM ancrée est maintenant générée via une route serveur `/api/rag/answer` (Groq, `llama-3.1-8b-instant`), strictement bornée aux chunks récupérés, avec citation des sources et refus explicite hors corpus. Correction au passage : le code affirmait à tort que Groq expose un endpoint d'embeddings — vérifié (recherche web, doc officielle console.groq.com) que ce n'est pas le cas. La projection 2D reste donc déterministe ; un vrai upgrade d'embeddings passerait par un autre fournisseur (OpenAI) ou un modèle client-side (transformers.js), pas Groq.

## Pas encore construit / bloqué sur une décision ou une action de LeM

- **Push git du portfolio** — LeM doit lancer `git push origin feat/phase1-living-portfolio` depuis son terminal.
- **`GROQ_API_KEY`** — la route `/api/rag/answer` répond 501 (proprement, sans casser la page) tant que cette variable n'est pas définie. LeM doit : créer une clé sur console.groq.com, l'ajouter en local (`.env.local`, gitignored) ET dans les env vars du projet Vercel `mouhamadou-portfolio` (Production + Preview), puis redéployer.
- Décision sur `flagshipProjectSlugs` (profile.ts) : Liggeyo n'y figure toujours pas.
- Attribution ASTC BTP / "audits digitaux exécutifs" : toujours non confirmée (absente de tout le dossier Auryntix vérifié).
- Le "challenge" annoncé deux fois par LeM en conversation n'a jamais été précisé.

## Décisions d'architecture à connaître

- Les fiches Liggeyo/DABA/Ndimbeul restent volontairement sobres (pas de stack/métriques inventées) — à enrichir quand LeM fournira les vraies spécificités.
- `/lab/rag` : séparation stricte retrieval (déterministe, client-side, pédagogique) / génération (vrai LLM, serveur, ancré). Ne pas fusionner les deux — la valeur pédagogique de l'étape retrieval dépend de sa transparence totale.
- Modèle Groq par défaut : `llama-3.1-8b-instant` (override possible via `GROQ_MODEL`). Choisi pour vitesse/coût ; à revérifier sur console.groq.com/docs/models si le modèle est déprécié.

## Limitations connues (assumées, pas des bugs à corriger silencieusement)

- **Relation Olèle Systems ↔ Liggeyo dans la fiche `olele-systems` elle-même** : cette fiche décrit toujours un projet client bespoke sans mention explicite de Liggeyo/LMS. Cohérent pour l'instant avec la fiche `liggeyo` (qui, elle, mentionne Olèle), mais pas encore harmonisé dans les deux sens. Ne pas réécrire `olele-systems` sans confirmation de LeM sur la chronologie exacte.
- **Attribution ASTC BTP** : non résolue, voir ci-dessus.

## Dernier audit de sécurité

Aucun effectué cette session. La nouvelle route `/api/rag/answer` ne touche ni auth ni RLS ni paiement — elle lit uniquement le corpus statique en mémoire et proxy un appel Groq server-side (clé jamais exposée au client). Pas de rate-limiting ajouté : à surveiller si le trafic augmente (coût Groq + abus possible du endpoint).

## Prochaine étape suggérée

1. LeM pousse le portfolio + ajoute `GROQ_API_KEY` sur Vercel.
2. LeM exécute le prompt d'audit Antigravity (fourni en conversation) pour obtenir un angle d'analyse externe (UX/conversion) sur le portfolio actuel, et en rapporte les résultats.
3. Trancher les points ouverts ci-dessus (flagship Liggeyo, ASTC BTP, olele-systems ↔ liggeyo) avant tout merge vers la branche de production.
