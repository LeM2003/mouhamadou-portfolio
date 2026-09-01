# CONTEXT.md — Dossier de passation

## Où on en est

- Portfolio v3.0 "éditorial" en production (mouhamadou-portfolio.vercel.app), branche `feat/phase1-living-portfolio`.
- Page `/collaboration` (CV-like pour recruteurs/CDI) + `PrintCvButton` + styles d'impression + intent command palette "collaboration/CDI" — committés (3230252).
- `src/data/projects.ts` : 3 nouveaux projets ajoutés (Liggeyo, DABA Email Assistant, Ndimbeul), stack 04→08 projets. Compteurs "Chiffres réels" et "Présence & preuve" (page.tsx) mis à jour en conséquence, stats LinkedIn rafraîchies (440/455).
- `mouhamadou-cv` (Vite/React/GSAP, prompt izisaas dédié) : CV en ligne one-shot fini côté design, PDF branché dans `public/`, pas encore git-initialisé ni déployé.

## Pas encore construit

- Push du commit `3230252` sur `origin/feat/phase1-living-portfolio` — bloqué : pas de credentials git dans le shell distant utilisé pour cette session. À pousser manuellement.
- `mouhamadou-cv` : git init + repo + déploiement Vercel.
- Décision sur `flagshipProjectSlugs` (profile.ts, page /collaboration) : Liggeyo n'y figure pas encore — à ajouter si LeM veut le mettre en avant pour les recruteurs.

## Décisions d'architecture à connaître

- Les 3 nouvelles fiches projet (Liggeyo, DABA, Ndimbeul) sont volontairement plus sobres que les fiches existantes (Olèle, Personal OS, Auryntix) sur `fullStack`/`keyDecisions`/`metrics` : seuls des faits confirmés par LeM ont été utilisés, aucune stack technique ni métrique n'a été inventée. À enrichir avec de vraies spécificités techniques quand LeM les fournira.
- `status` de Liggeyo et Ndimbeul mis à "active" (pas "production") par prudence — Liggeyo a une phase d'enregistrement d'entreprise en cours en parallèle de son usage réel (olelesystems.company).

## Limitations connues (assumées, pas des bugs à corriger silencieusement)

- **Relation Olèle Systems ↔ Liggeyo pas totalement stabilisée dans le contenu.** La fiche `olele-systems` existante décrit un projet client bespoke (repo privé, stack sur-mesure) sans mention de Liggeyo. Le texte ajouté sur la fiche `liggeyo` affirme qu'olelesystems.company "est un déploiement client en production sur la plateforme" — cohérent avec ce que LeM a dit en conversation, mais pas encore reflété dans la fiche `olele-systems` elle-même. Ne pas réécrire la fiche `olele-systems` sans confirmation explicite de LeM sur la chronologie exacte (bespoke d'abord, généralisé en SaaS ensuite ?).
- **Attribution des missions clients (ASTC BTP, "audits digitaux exécutifs") non résolue.** Une note mémoire antérieure les associait à "Olèle Systems" comme agence de LeM — LeM a explicitement contesté ce lien en session et a renvoyé vers le dossier `Auryntix` sur son PC pour clarifier. Vérification faite : ASTC BTP n'apparaît dans aucun des dossiers `Auryntix/Clients` (seulement Daaru et MCE_Senegal). La bonne attribution reste à confirmer avec LeM avant de l'écrire où que ce soit sur le portfolio.

## Dernier audit de sécurité

Aucun effectué dans cette session — travail purement contenu/data, pas de code touchant auth/paiement/RLS.

## Prochaine étape suggérée

Pousser le commit vers GitHub (depuis un terminal authentifié), vérifier le déploiement preview Vercel du contenu ajouté, puis trancher les deux points ouverts ci-dessus avec LeM avant tout merge vers la branche de production.
