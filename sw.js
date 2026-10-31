const CACHE='moncongelo-v15';
const FILES=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png','./qr-generator.html','./icon-printer.png','./icon-inventory.png','./icon-backup.png','./icon-raw.png','./icon-cooked.png','./icon-settings.png','./icon-barcode-scan.png','./icon-qr-scan.png','./icon-freezer-label.png','./drawer-labels.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(resp=>{if(resp.ok&&resp.type==='basic'){const copy=resp.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy)))}return resp}))) });
