const CACHE='moncongelo-v9';
const FILES=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png','./qr-generator.html','./icon-printer.png','./icon-inventory.png','./icon-backup.png','./icon-raw.png','./icon-cooked.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match('./index.html'))))});
