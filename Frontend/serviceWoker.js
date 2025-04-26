const staticAnimeSite = 'my-favorite-anime-v1';
const assets = [
  "/Frontend/cadastro/login.html",       // Página de login
  "/Frontend/cadastro/login.js",          // Script do login
  "/Frontend/cadastro/styles.css",        // CSS do login
  "/Frontend/cadastro/img/icon.png",      // Imagem usada no login
  "/Frontend/index.html",                 // Página inicial após login
  "/Frontend/styles.css",                 // CSS geral
  "/Frontend/scripts.js",                 // Se existir JS geral
  "/Frontend/icon/android-icon-48x48.png",
  "/Frontend/icon/android-icon-72x72.png",
  "/Frontend/icon/android-icon-96x96.png",
  "/Frontend/icon/android-icon-144x144.png",
  "/Frontend/icon/android-icon-152x152.png",
  "/Frontend/icon/android-icon-180x180.png",
  "/Frontend/icon/favicon-16x16.png",
  "/Frontend/icon/favicon-32x32.png",
  "/Frontend/icon/icon-512x512.png",
  "/Frontend/icon/ms-icon-310x310.png"
];
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticAnimeSite).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});