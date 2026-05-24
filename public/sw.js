// Service Worker minimal (no-op) — pour éviter les 404 sur /sw.js
// Le portfolio n'a pas besoin de SW pour l'instant.
// Si on en veut un plus tard, on le remplacera ici.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
