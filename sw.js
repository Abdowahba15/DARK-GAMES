const CACHE_NAME = "game-site-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/main.css",
  "/main.js",
  "/gameprofile.js",
  "/gameprofile.css",
  "/hollowknight.html",
  "/hollowknightsilksong.html",
  "/eldenring.html",
  "/eldenring.jpg",
  "/hollowknight.jpg",
  "/silksong.jpg"
  // أضف كل الصور المهمة هنا
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// التقاط الطلبات وتحميلها من الكاش أولاً
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// تحديث الكاش عند وجود نسخة جديدة
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});