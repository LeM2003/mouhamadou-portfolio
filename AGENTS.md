<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Économie de contexte

- Ne pas relire un fichier juste après l'avoir édité pour "vérifier" — l'outil d'édition échoue déjà si le changement est invalide.
- Ignorer les fichiers de plus de 100KB (assets, lockfiles) sauf nécessité explicite.
- Ne pas deviner un nom d'API, une version, un flag ou un nom de package sur cette version de Next.js (voir ci-dessus) — vérifier dans `node_modules/next/dist/docs/` ou le code avant d'affirmer.
