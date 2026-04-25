const CACHE_NAME='vocabulario-vivo-v2';
const ASSETS=['./','./index.html','./manifest.json','./sw.js','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME)return caches.delete(k)}))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(r=>{if(r.ok&&e.request.url.includes(self.location.origin)){const clone=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone))}return r}).catch(()=>{if(e.request.mode==='navigate')return caches.match('./index.html')})}))});
