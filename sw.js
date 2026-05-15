/* ============================================================
   SERVICE WORKER — Pemeriksa Tenggat Waktu Sengketa Informasi
   Strategi: Cache First → Network Fallback
   Semua file di-cache agar bisa dipakai tanpa internet.
   ============================================================ */

const CACHE_NAME   = 'ceksengketa-v2';
const CACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
];

/* ── INSTALL: cache semua asset utama ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: hapus cache lama ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: cache first, fallback ke network ── */
self.addEventListener('fetch', event => {
  // Hanya handle request GET
  if (event.request.method !== 'GET') return;

  // Lewati request ke Google Fonts (biarkan browser handle)
  if (event.request.url.includes('fonts.googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            // Cache response baru untuk request lokal
            if (response.ok && event.request.url.startsWith(self.location.origin)) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => {
            // Offline fallback → tampilkan index.html
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
