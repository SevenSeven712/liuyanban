// Seven戚社区 Service Worker
var CACHE_NAME = 'sevenqi-v1';
var PRECACHE_URLS = [
  '/liuyanban/index.html',
  '/liuyanban/posts.html',
  '/liuyanban/chats.html',
  '/liuyanban/messages.html',
  '/liuyanban/room.html',
  '/liuyanban/profile.html',
  '/liuyanban/shop.html',
  '/liuyanban/common.js',
  '/liuyanban/bubbles.css',
  '/liuyanban/icon.svg',
  '/liuyanban/manifest.json'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(PRECACHE_URLS.map(function (url) {
        // 单个资源失败不影响整体安装
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// 这些路径一律不缓存（登录态/实时数据/上传）
function isBypass(url) {
  return //(auth|rest|realtime|storage)/v1//.test(url.pathname) ||
         url.pathname.indexOf('/liuyanban/api/') === 0;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  // 跨域（Supabase、CDN 等）直接走网络，不缓存
  if (url.origin !== self.location.origin) return;
  // 鉴权/数据接口不缓存
  if (isBypass(url)) return;

  // 导航请求：网络优先，失败回缓存，再失败给离线提示
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('/liuyanban/posts.html').then(function (p) {
            return p || new Response('<h3 style="font-family:sans-serif;padding:24px">当前处于离线状态，请联网后重试</h3>', {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        });
      })
    );
    return;
  }

  // 静态资源：缓存优先，命中直接返回并后台更新
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) {
        fetch(req).then(function (res) {
          if (res && res.status === 200) {
            caches.open(CACHE_NAME).then(function (c) { c.put(req, res); });
          }
        }).catch(function () {});
        return hit;
      }
      return fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || '/liuyanban/chats.html';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf('/liuyanban/') >= 0 && 'focus' in list[i]) return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
