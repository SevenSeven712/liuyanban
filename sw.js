// Seven戚社区 Service Worker
// v2：修复缓存导致的「改了代码页面还是旧的 / 打不开」问题
var CACHE_VERSION = 'sevenqi-v2';
var CACHE_NAME = CACHE_VERSION;

var PRECACHE_URLS = [
  './index.html',
  './posts.html',
  './chats.html',
  './messages.html',
  './user.html',
  './profile.html',
  './shop.html',
  './activity.html',
  './assets.html',
  './new-post.html',
  './set-uid.html',
  './room.html',
  './doudizhu.html',
  './common.js',
  './gomoku.js',
  './bubbles.css',
  './vendor/supabase.js',
  './vendor/purify.min.js',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
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

// 页面可主动要求跳过等待，立即接管
self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

// 接口/登录态一律不缓存
function isBypass(url) {
  // 原代码这里被写成了注释，导致正则永久失效
  if (/(auth|rest|realtime|storage|functions)\/v1\//.test(url.pathname)) return true;
  if (url.pathname.indexOf('/api/') > -1) return true;
  return false;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  // 跨域（Supabase、CDN 等）直接走网络，不缓存
  if (url.origin !== self.location.origin) return;
  if (isBypass(url)) return;

  // 导航请求 + HTML：网络优先，失败回缓存，再失败给离线提示
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('./posts.html').then(function (p) {
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

  // 静态资源：缓存优先，命中后后台更新
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
  var url = (e.notification.data && e.notification.data.url) || './chats.html';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ('focus' in list[i]) return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
