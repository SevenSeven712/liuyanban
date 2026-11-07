common.js 先看 第 1～971 行，总共 1023 行，还剩 52 行

1: // ============================================================
2: // 初始化 Supabase 客户端
3: // ============================================================
4: if (!window.sb) {
5:     var SUPABASE_URL = "https://ulvhuqtpdafspbdvkogs.supabase.co";
6:     var SUPABASE_ANON_KEY = "sb_publishable_b3zSRFSj9k73_tIxO1yJYw_IEK9tPLg";
7:     window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
8: }
9: 
10: // ============================================================
11: // 启动动画
12: // ============================================================
13: (function bootLoader() {
14:     if (sessionStorage.getItem('sq_boot_shown') === '1') return;
15:     sessionStorage.setItem('sq_boot_shown', '1');
16: 
17:     if (!document.getElementById('boot-loader-styles')) {
18:         var style = document.createElement('style');
19:         style.id = 'boot-loader-styles';
20:         style.textContent =
21:             '.boot-loader-wrapper{position:fixed;inset:0;z-index:9999999;background:#000;display:flex;align-items:center;justify-content:center;font-family:"Poppins","Space Grotesk","PingFang SC",sans-serif;font-size:1.6em;font-weight:600;user-select:none;color:#fff;transition:opacity 1s ease;overflow:hidden;}' +
22:             '.boot-loader-wrapper.fade-out{opacity:0;pointer-events:none;}' +
23:             '.boot-loader-inner{position:relative;display:flex;align-items:center;justify-content:center;height:120px;width:auto;margin:2rem;transform:scale(1.55);}' +
24:             '.boot-loader{position:absolute;top:0;left:0;height:100%;width:100%;z-index:1;background-color:transparent;-webkit-mask:repeating-linear-gradient(90deg,transparent 0,transparent 6px,black 7px,black 8px);mask:repeating-linear-gradient(90deg,transparent 0,transparent 6px,black 7px,black 8px);}' +
25:             '.boot-loader::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 50% 50%, #ff0 0%, transparent 50%),radial-gradient(circle at 45% 45%, #f00 0%, transparent 45%),radial-gradient(circle at 55% 55%, #0ff 0%, transparent 45%),radial-gradient(circle at 45% 55%, #0f0 0%, transparent 45%),radial-gradient(circle at 55% 45%, #00f 0%, transparent 45%);-webkit-mask:radial-gradient(circle at 50% 50%,transparent 0%,transparent 10%,black 25%);mask:radial-gradient(circle at 50% 50%,transparent 0%,transparent 10%,black 25%);animation:boot-transform 2s infinite alternate, boot-opacity 4s infinite;animation-timing-function:cubic-bezier(0.6,0.8,0.5,1);}' +
26:             '@keyframes boot-transform{0%{transform:translate(-55%);}100%{transform:translate(55%);}}' +
27:             '@keyframes boot-opacity{0%,100%{opacity:0;}15%{opacity:1;}65%{opacity:0;}}' +
28:             '.boot-letter{display:inline-block;opacity:0;animation:boot-letter-anim 4s infinite linear;z-index:2;white-space:pre;}' +
29:             '@keyframes boot-letter-anim{0%{opacity:0;}5%{opacity:1;text-shadow:0 0 4px #fff;transform:scale(1.1) translateY(-2px);}20%{opacity:0.2;}100%{opacity:0;}}';
30:         document.head.appendChild(style);
31:     }
32: 
33:     function insert() {
34:         if (!document.body) { document.addEventListener('DOMContentLoaded', insert); return; }
35:         var wrap = document.createElement('div');
36:         wrap.className = 'boot-loader-wrapper';
37:         wrap.id = 'bootLoader';
38:         var inner = document.createElement('div');
39:         inner.className = 'boot-loader-inner';
40:         var text = 'Seven戚  出品';
41:         var chars = text.split('');
42:         chars.forEach(function (c, i) {
43:             var span = document.createElement('span');
44:             span.className = 'boot-letter';
45:             span.style.animationDelay = (0.1 + i * 0.105).toFixed(3) + 's';
46:             span.textContent = c;
47:             inner.appendChild(span);
48:         });
49:         var loaderDiv = document.createElement('div');
50:         loaderDiv.className = 'boot-loader';
51:         inner.appendChild(loaderDiv);
52:         wrap.appendChild(inner);
53:         document.body.appendChild(wrap);
54: 
55:         setTimeout(function() {
56:             setTimeout(function() {
57:                 wrap.classList.add('fade-out');
58:                 document.documentElement.classList.remove('sq-boot-hide');
59:                 setTimeout(function() { wrap.remove(); }, 1000);
60:             }, 300);
61:         }, 3500);
62:     }
63:     insert();
64: })();
65: 
66: // ============================================================
67: // 页面加载转圈（所有页面通用）
68: // ============================================================
69: (function pageLoading() {
70:     // 注入样式
71:     if (!document.getElementById('page-loading-styles')) {
72:         var st = document.createElement('style');
73:         st.id = 'page-loading-styles';
74:         st.textContent =
75:             '.page-loading-mask{position:fixed;inset:0;z-index:999999;background:var(--bg,#f5faf5);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;transition:opacity .35s ease;}' +
76:             '.page-loading-mask.fade-out{opacity:0;pointer-events:none;}' +
77:             '.page-loading-spinner{width:40px;height:40px;border:3px solid var(--border,#c8e0c8);border-top-color:var(--primary,#2e7d32);border-radius:50%;animation:pageLoadSpin .8s linear infinite;}' +
78:             '@keyframes pageLoadSpin{to{transform:rotate(360deg);}}' +
79:             '.page-loading-text{font-size:.8em;color:var(--text-muted,#5a7a6a);font-family:var(--font,system-ui,sans-serif);}';
80:         document.head.appendChild(st);
81:     }
82: 
83:     function show() {
84:         if (document.getElementById('pageLoadingMask')) return;
85:         var mask = document.createElement('div');
86:         mask.className = 'page-loading-mask';
87:         mask.id = 'pageLoadingMask';
88:         mask.innerHTML = '<div class="page-loading-spinner"></div><div class="page-loading-text">加载中…</div>';
89:         document.body.appendChild(mask);
90:     }
91: 
92:     function hide() {
93:         var m = document.getElementById('pageLoadingMask');
94:         if (!m) return;
95:         m.classList.add('fade-out');
96:         setTimeout(function() { m.remove(); }, 400);
97:     }
98: 
99:     if (document.readyState === 'loading') {
100:         document.addEventListener('DOMContentLoaded', show);
101:     } else {
102:         show();
103:     }
104:     window.addEventListener('load', function() {
105:         // 延迟一点，避免闪一下就消失
106:         setTimeout(hide, 200);
107:     });
108:     // 兜底：最多 8 秒后强制隐藏（防卡死）
109:     setTimeout(hide, 8000);
110:     // 暴露给页面，数据加载完后可主动调用（更精准）
111:     window.hidePageLoading = hide;
112: })();
113: 
114: // ============================================================
115: // SVG 图标库
116: // ============================================================
117: var SVG_ICONS = {
118:     flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
119:     comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
120:     bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
121:     ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
122:     trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
123:     undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
124:     eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
125:     check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
126:     x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
127:     alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
128:     inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
129:     user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
130:     info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
131:     sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
132:     arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
133:     checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
134:     xCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
135:     logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
136:     shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
137:     user2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>'
138: };
139: 
140: function svgIcon(name, size) {
141:     var icon = SVG_ICONS[name];
142:     if (!icon) return '';
143:     if (size) return icon.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ');
144:     return icon;
145: }
146: 
147: // ============================================================
148: // 会话管理
149: // ============================================================
150: // 全局获取客户端 IP 和 城市（多级容错，自动执行，缓存在会话中）
151: window.sqClientGeo = { ip: '0.0.0.0', location: '未知' };
152: async function initGeoIP() {
153:     var cached = sessionStorage.getItem('sq_client_geo');
154:     if (cached) {
155:         try { 
156:             window.sqClientGeo = JSON.parse(cached); 
157:             if (window.sqClientGeo.ip !== '0.0.0.0') return; 
158:         } catch(e){}
159:     }
160: 
161:     // 依次尝试多个接口，任何一个成功就返回
162:     var apis = [
163:         {
164:             // 强制返回中文
165:             url: "https://ipapi.co/json/?lang=zh-CN",
166:             parse: function(d) {
167:                 var city = d.city || '';
168:                 var region = d.region || '';
169:                 var loc = city || region || d.country_name || '未知';
170:                 if (city && region && city !== region) loc = region + ' ' + city;
171:                 return { ip: d.ip, location: loc };
172:             }
173:         },
174:         {
175:             url: "https://ipinfo.io/json",
176:             parse: function(d) {
177:                 return { ip: d.ip, location: d.city || d.region || d.country || '未知' };
178:             }
179:         },
180:         {
181:             url: "https://freeipapi.com/api/json",
182:             parse: function(d) {
183:                 var city = d.cityName || '';
184:                 var region = d.regionName || '';
185:                 var loc = city || region || '未知';
186:                 if (city && region && city !== region) loc = region + ' ' + city;
187:                 return { ip: d.ipAddress, location: loc };
188:             }
189:         }
190:     ];
191: 
192:     for (var i = 0; i < apis.length; i++) {
193:         try {
194:             var controller = new AbortController();
195:             var timeoutId = setTimeout(function(){ controller.abort(); }, 4000);
196:             var res = await fetch(apis[i].url, { signal: controller.signal });
197:             clearTimeout(timeoutId);
198:             var data = await res.json();
199:             var parsed = apis[i].parse(data);
200:             if (parsed.ip && parsed.ip !== '0.0.0.0') {
201:                 window.sqClientGeo = parsed;
202:                 sessionStorage.setItem('sq_client_geo', JSON.stringify(parsed));
203:                 return;
204:             }
205:         } catch (e) {
206:             console.warn('IP接口 ' + apis[i].url + ' 失败，尝试下一个', e);
207:         }
208:     }
209: 
210:     // 全部失败，尝试国内可用的备用接口，或者展示友好提示
211:     try {
212:         var r = await fetch("https://api.ipify.org?format=json");
213:         var d = await r.json();
214:         window.sqClientGeo = { ip: d.ip || '未知', location: '网络异常' };
215:         sessionStorage.setItem('sq_client_geo', JSON.stringify(window.sqClientGeo));
216:     } catch(e) {
217:         // 终极兜底
218:         window.sqClientGeo = { ip: '未知', location: '本地网络' };
219:         sessionStorage.setItem('sq_client_geo', JSON.stringify(window.sqClientGeo));
220:     }
221: }
222: // 页面加载自动识别
223: if (document.readyState === 'loading') {
224:     document.addEventListener('DOMContentLoaded', initGeoIP);
225: } else {
226:     initGeoIP();
227: }
228: window.initGeoIP = initGeoIP;
229: 
230: function getSessionUser() {
231:     var stored = localStorage.getItem('sq_user_session');
232:     if (stored) { try { return JSON.parse(stored); } catch (e) { return null; } }
233:     return null;
234: }
235: function setSessionUser(user) { localStorage.setItem('sq_user_session', JSON.stringify(user)); }
236: async function clearSession() {
237:     localStorage.removeItem('sq_user_session');
238:     try { if (window.sb) await window.sb.auth.signOut(); } catch (e) {}
239: }
240: 
241: // 用 Supabase Auth 的真实会话校验并刷新本地缓存
242: // （防止用户篡改 localStorage 里的 user 冒充他人/管理员）
243: async function syncSessionFromAuth() {
244:     if (!window.sb) return null;
245:     try {
246:         var r = await window.sb.auth.getSession();
247:         var session = r.data && r.data.session;
248:         if (!session || !session.user) {
249:             // Auth 无会话 -> 本地缓存无效，清除
250:             if (localStorage.getItem('sq_user_session')) {
251:                 localStorage.removeItem('sq_user_session');
252:             }
253:             return null;
254:         }
255:         var q = await window.sb.rpc('get_my_profile');
256:         var user = q.data || null;
257:         if (user) {
258:             localStorage.setItem('sq_user_session', JSON.stringify(user));
259:             if (user.phone && !user.custom_uid) {
260:                 checkAndPromptUidChange(user);
261:             }
262:             return user;
263:         }
264:         return null;
265:     } catch (e) {
266:         return null;
267:     }
268: }
269: window.syncSessionFromAuth = syncSessionFromAuth;
270: 
271: // 页面加载时后台校验一次；若会话失效则跳登录（仅在已登录页面）
272: (function bootstrapSession() {
273:     function run() {
274:         syncSessionFromAuth();
275:     }
276:     if (document.readyState === 'loading') {
277:         document.addEventListener('DOMContentLoaded', function() { setTimeout(run, 300); });
278:     } else {
279:         setTimeout(run, 300);
280:     }
281: })();
282: 
283: // ============================================================
284: // 通用工具
285: // ============================================================
286: function showToast(msg) {
287:     var toast = document.getElementById('toast');
288:     if (!toast) return;
289:     toast.textContent = msg;
290:     toast.classList.add('show');
291:     clearTimeout(window.toastTimer);
292:     window.toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
293: }
294: 
295: function escapeHtml(s) {
296:     if (!s) return '';
297:     return String(s).replace(/[&<>"']/g, function (c) {
298:         return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
299:     });
300: }
301: 
302: function getUserAvatar(user) {
303:     if (user && user.avatar_url) return user.avatar_url;
304:     var name = user ? user.nickname : 'U';
305:     var color = '#2e7d32';
306:     var initial = name.charAt(0).toUpperCase();
307:     var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
308:         '<rect width="100" height="100" fill="' + color + '" rx="50"/>' +
309:         '<text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">' + initial + '</text></svg>';
310:     return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
311: }
312: 
313: // ============================================================
314: // 渲染头部
315: // ============================================================
316: function renderHeader(title, activeTab) {
317:     var user = getSessionUser();
318:     var headerContainer = document.getElementById('header-container');
319:     if (!headerContainer) return;
320: 
321:     var userAreaHtml = '';
322:     if (user && user.id) {
323:         var avatar = user.avatar_url || getUserAvatar(user);
324:         var displayName = user.nickname || '用户';
325:         var avatarStyle = '', avatarContent = '';
326:         if (avatar && avatar.startsWith('http')) {
327:             avatarStyle = 'background-image:url(' + avatar + ');background-size:cover;background-position:center;';
328:         } else {
329:             avatarContent = displayName.charAt(0).toUpperCase();
330:         }
331:         var uidBtn = '';
332:         if (user.phone && !user.custom_uid) {
333:             uidBtn = '<a href="./set-uid.html" onclick="event.stopPropagation()" style="margin-left:6px;font-size:11px;padding:4px 9px;background:linear-gradient(135deg,#ff6b6b,#ee5253);color:#fff;border-radius:20px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:3px;box-shadow:0 2px 8px rgba(238,82,83,0.45);animation:sq-uid-pulse 2s infinite;">' +
334:                      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
335:                      '设置UID</a>';
336:         }
337:         userAreaHtml = '<div class="user-area" onclick="window.location.href=\'./user.html\'">' +
338:             '<div class="avatar" style="' + avatarStyle + '">' + avatarContent + '</div>' +
339:             '<span class="user-name">' + escapeHtml(displayName) + '</span>' +
340:             uidBtn +
341:             '<span class="chevron">▾</span>' +
342:             '</div>';
343:     } else {
344:         userAreaHtml = '<div class="user-area" style="background:var(--primary);color:#fff;border-radius:99px;padding:6px 16px;font-weight:700;font-size:0.85em;box-shadow:0 4px 12px rgba(46,125,50,0.25);" onclick="window.location.href=\'./index.html\'">登录 / 注册</div>';
345:     }
346: 
347:     headerContainer.innerHTML = '<div class="app-header">' +
348:         '<div class="brand" onclick="window.location.href=\'./posts.html\'">' +
349:         'Seven<span>戚</span><small>· ' + escapeHtml(title) + '</small>' +
350:         '</div>' + userAreaHtml + '</div>';
351: }
352: 
353: // ============================================================
354: // 底部导航 SVG 图标
355: // ============================================================
356: var FOOTER_ICONS = {
357:     messages: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 33V42C40 43.1046 39.1046 44 38 44H31.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 16V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H16" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 16H30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M23 44L40 23" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M16 24H24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
358:     posts: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M9 42H39" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
359:     chats: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21H25.0025" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M33.001 21H34.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M13.001 21H14.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
360:     profile: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
361: };
362: 
363: (function injectFooterIconStyles() {
364:     if (document.getElementById('footer-svg-icon-styles')) return;
365:     var style = document.createElement('style');
366:     style.id = 'footer-svg-icon-styles';
367:     style.textContent =
368:         '.tab-btn .tab-icon{display:flex;align-items:center;justify-content:center;width:1.7em;height:1.7em;line-height:1;}' +
369:         '.tab-btn .tab-icon svg{width:100%;height:100%;display:block;stroke:currentColor;fill:none;}' +
370:         '.tab-btn .tab-icon svg path,.tab-btn .tab-icon svg circle{stroke:currentColor;}' +
371:         '.header-settings-btn{background:none;border:none;cursor:pointer;padding:6px;color:var(--text,#1e3a2e);display:flex;border-radius:8px;}' +
372:         '.header-settings-btn svg{width:24px;height:24px;stroke:currentColor;fill:none;}' +
373:         '.header-settings-btn:hover{background:rgba(46,125,50,.1);}';
374:     document.head.appendChild(style);
375: })();
376: 
377: function renderFooterBase(activeTab) {
378:     var tabs = [
379:         { id: 'posts', name: '帖子', href: './posts.html' },
380:         { id: 'messages', name: '留言板', href: './messages.html' },
381:         { id: 'chats', name: '消息', href: './chats.html' },
382:         { id: 'profile', name: '个人', href: './user.html' }
383:     ];
384: 
385:     var footerHtml = '<div class="app-tabs">';
386:     tabs.forEach(function (tab) {
387:         var activeClass = (tab.id === activeTab) ? 'active' : '';
388:         var icon = FOOTER_ICONS[tab.id] || '';
389:         footerHtml += '<a href="' + tab.href + '" class="tab-btn ' + activeClass + '" style="position:relative;">' +
390:             '<span class="tab-icon">' + icon + '</span>' + escapeHtml(tab.name) + '</a>';
391:     });
392:     footerHtml += '</div>';
393: 
394:     var footerContainer = document.getElementById('footer-container');
395:     if (footerContainer) footerContainer.innerHTML = footerHtml;
396: }
397: 
398: // ============================================================
399: // 未读消息
400: // ============================================================
401: async function getUnreadChatCount(userId) {
402:     if (!userId || !window.sb) return 0;
403:     try {
404:         var res = await window.sb.from('users').select('last_chat_read_at').eq('id', userId).single();
405:         if (res.error) throw res.error;
406:         var lastRead = (res.data && res.data.last_chat_read_at) || new Date(0).toISOString();
407:         var cnt = await window.sb.from('chats')
408:             .select('*', { count: 'exact', head: true })
409:             .gt('created_at', lastRead)
410:             .neq('user_id', userId);
411:         if (cnt.error) throw cnt.error;
412:         return cnt.count || 0;
413:     } catch (e) { return 0; }
414: }
415: 
416: async function updateChatBadge() {
417:     var user = getSessionUser();
418:     if (!user || !user.id || !window.sb) return;
419:     var unread = 0;
420:     try { unread = await getUnreadChatCount(user.id); } catch (e) { return; }
421:     var footerContainer = document.getElementById('footer-container');
422:     if (!footerContainer) return;
423:     var chatTab = footerContainer.querySelector('a[href="./chats.html"]');
424:     if (!chatTab) return;
425:     var old = chatTab.querySelector('.badge');
426:     if (old) old.remove();
427:     if (unread > 0) {
428:         var badge = document.createElement('span');
429:         badge.className = 'badge';
430:         badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
431:         badge.textContent = unread > 9 ? '9+' : unread;
432:         chatTab.appendChild(badge);
433:     }
434: }
435: 
436: function renderFooter(activeTab) {
437:     renderFooterBase(activeTab);
438:     if (getSessionUser() && window.sb) updateChatBadge();
439: }
440: 
441: async function updateLastChatRead(userId) {
442:     if (!userId || !window.sb) return;
443:     try {
444:         await window.sb.from('users').update({ last_chat_read_at: new Date().toISOString() }).eq('id', userId);
445:     } catch (e) {}
446: }
447: 
448: // ============================================================
449: // 提醒音效
450: // ============================================================
451: function playReminderSound() {
452:     try {
453:         var AudioCtx = window.AudioContext || window.webkitAudioContext;
454:         if (!AudioCtx) return;
455:         var ctx = new AudioCtx();
456:         var osc = ctx.createOscillator();
457:         var gain = ctx.createGain();
458:         osc.connect(gain); gain.connect(ctx.destination);
459:         osc.type = 'sine';
460:         osc.frequency.setValueAtTime(880, ctx.currentTime);
461:         osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
462:         gain.gain.setValueAtTime(0.3, ctx.currentTime);
463:         gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
464:         osc.start(ctx.currentTime);
465:         osc.stop(ctx.currentTime + 0.28);
466:         setTimeout(function () { ctx.close(); }, 400);
467:     } catch (e) {}
468: }
469: 
470: function getSoundEnabled() {
471:     return localStorage.getItem('sq_sound_enabled') !== 'false';
472: }
473: 
474: // ============================================================
475: // 通知横幅
476: // ============================================================
477: var chatNotificationBanner = null;
478: function showChatNotificationBanner() {
479:     if (chatNotificationBanner) {
480:         chatNotificationBanner.remove();
481:         clearTimeout(chatNotificationBanner._timeout);
482:     }
483:     var banner = document.createElement('div');
484:     banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
485:     banner.innerHTML = svgIcon('bell', 18) + '<span>收到一条新消息</span>';
486:     banner.addEventListener('click', function () {
487:         window.location.href = './chats.html';
488:         banner.remove();
489:     });
490:     document.body.appendChild(banner);
491:     chatNotificationBanner = banner;
492:     banner._timeout = setTimeout(function () { banner.remove(); chatNotificationBanner = null; }, 3000);
493: }
494: 
495: // ============================================================
496: // 全局聊天监听
497: // ============================================================
498: var globalChatChannel = null;
499: var globalChatListenerInitialized = false;
500: 
501: async function initializeGlobalChatListener() {
502:     var user = getSessionUser();
503:     if (!user || !user.id) return;
504:     if (globalChatChannel) {
505:         await window.sb.removeChannel(globalChatChannel);
506:         globalChatChannel = null;
507:         globalChatListenerInitialized = false;
508:     }
509:     if (globalChatListenerInitialized) return;
510:     globalChatChannel = window.sb.channel('global-chats-listener-' + user.id)
511:         .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, function (payload) {
512:             var newMsg = payload.new;
513:             if (!newMsg || newMsg.user_id === user.id) return;
514:             updateChatBadge();
515:             if (getSoundEnabled()) playReminderSound();
516:             if (!window.location.href.includes('chats.html')) {
517:                 showChatNotificationBanner();
518:                 var nm = newMsg.content || newMsg.text || '收到一条新消息';
519:                 showSystemNotification('Seven戚 · 新消息', String(nm).substring(0, 50), './chats.html');
520:             }
521:         })
522:         .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats' }, function () {
523:             updateChatBadge();
524:         })
525:         .subscribe();
526:     globalChatListenerInitialized = true;
527: }
528: 
529: if (document.readyState === 'loading') {
530:     document.addEventListener('DOMContentLoaded', initializeGlobalChatListener);
531: } else {
532:     initializeGlobalChatListener();
533: }
534: window.addEventListener('storage', function (e) {
535:     if (e.key === 'sq_user_session') initializeGlobalChatListener();
536: });
537: 
538: // ============================================================
539: // 通知未读红点
540: // ============================================================
541: async function updateNotificationBadge() {
542:     var user = getSessionUser();
543:     if (!user || !user.id || !window.sb) return;
544:     try {
545:         var res = await window.sb.from('notifications')
546:             .select('*', { count: 'exact', head: true })
547:             .eq('user_id', user.id)
548:             .eq('is_read', false);
549:         if (res.error) throw res.error;
550:         var footerContainer = document.getElementById('footer-container');
551:         if (!footerContainer) return;
552:         var profileTab = footerContainer.querySelector('a[href="./user.html"]');
553:         if (!profileTab) return;
554:         var old = profileTab.querySelector('.badge');
555:         if (old) old.remove();
556:         if (res.count > 0) {
557:             var badge = document.createElement('span');
558:             badge.className = 'badge';
559:             badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
560:             badge.textContent = res.count > 9 ? '9+' : res.count;
561:             profileTab.appendChild(badge);
562:         }
563:     } catch (e) {}
564: }
565: 
566: // ============================================================
567: // 顶部横幅
568: // ============================================================
569: var topBannerTimeout = null;
570: function showTopBanner(text) {
571:     var old = document.querySelector('.custom-top-banner');
572:     if (old) { old.remove(); clearTimeout(topBannerTimeout); }
573:     var banner = document.createElement('div');
574:     banner.className = 'custom-top-banner';
575:     banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:#fff;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
576:     banner.innerHTML = svgIcon('bell', 18) + '<span>' + (text || '收到新消息') + '</span>';
577:     banner.addEventListener('click', function () {
578:         window.location.href = './profile.html?view=messages';
579:         banner.remove();
580:         clearTimeout(topBannerTimeout);
581:     });
582:     document.body.appendChild(banner);
583:     topBannerTimeout = setTimeout(function () { banner.remove(); }, 5000);
584: }
585: 
586: // ============================================================
587: // 站内通知推送
588: // ============================================================
589: window.pushNotification = window.pushNotification || async function(userId, payload) {
590:     if (!window.sb || !userId) return;
591:     try {
592:         await window.sb.from('notifications').insert([Object.assign({
593:             user_id: userId,
594:             is_read: false
595:         }, payload)]);
596:         if (typeof updateNotificationBadge === 'function') updateNotificationBadge();
597:     } catch (e) { console.warn('通知发送失败', e); }
598: };
599: 
600: // ============================================================
601: // 举报工具
602: // ============================================================
603: async function submitReport(reporterId, reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
604:     var res = await window.sb.from('reports').insert([{
605:         reporter_id: reporterId,
606:         reported_user_id: reportedUserId,
607:         content_type: contentType,
608:         content_id: contentId,
609:         content_snapshot: contentSnapshot,
610:         reason: reason,
611:         description: description || ''
612:     }]).select();
613:     if (res.error) throw res.error;
614:     var report = res.data[0];
615: 
616:     var adminRes = await window.sb.rpc('get_admin_id');
617:     if (adminRes.data) {
618:         await pushNotification(adminRes.data, {
619:             type: 'report',
620:             notification_type: 'report',
621:             report_id: report.id,
622:             report_reason: reason,
623:             extra_text: contentSnapshot ? contentSnapshot.substring(0, 100) : ''
624:         });
625:     }
626:     return report;
627: }
628: 
629: // ============================================================
630: // 举报弹窗
631: // ============================================================
632: function openReportDialog(reportedUserId, contentType, contentId, contentSnapshot) {
633:     var old = document.getElementById('reportOverlay');
634:     if (old) old.remove();
635: 
636:     var overlay = document.createElement('div');
637:     overlay.className = 'report-overlay';
638:     overlay.id = 'reportOverlay';
639: 
640:     var typeText = { post: '帖子', comment: '评论', message: '留言', chat: '聊天消息' }[contentType] || '内容';
641: 
642:     overlay.innerHTML =
643:         '<div class="report-panel">' +
644:             '<div class="report-header">' +
645:                 '<h3>' + svgIcon('flag', 20) + ' 举报' + typeText + '</h3>' +
646:                 '<button class="report-close" onclick="closeReportDialog()">' + svgIcon('x', 20) + '</button>' +
647:             '</div>' +
648:             '<div class="report-body">' +
649:                 '<div class="report-field">' +
650:                     '<label>举报原因（必选）</label>' +
651:                     '<div class="report-reasons">' +
652:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="色情低俗"> 色情低俗</label>' +
653:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="骚扰辱骂"> 骚扰辱骂</label>' +
654:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="垃圾广告"> 垃圾广告</label>' +
655:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="虚假信息"> 虚假信息</label>' +
656:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="政治敏感"> 政治敏感</label>' +
657:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="其他"> 其他</label>' +
658:                     '</div>' +
659:                 '</div>' +
660:                 '<div class="report-field">' +
661:                     '<label>补充说明（选填）</label>' +
662:                     '<textarea id="reportDescription" placeholder="请描述具体情况..." maxlength="500"></textarea>' +
663:                 '</div>' +
664:                 '<div class="report-field">' +
665:                     '<label>被举报内容预览</label>' +
666:                     '<div class="report-preview">' + (contentSnapshot ? contentSnapshot.replace(/</g, '&lt;') : '(无内容)') + '</div>' +
667:                 '</div>' +
668:             '</div>' +
669:             '<div class="report-footer">' +
670:                 '<button class="report-cancel" onclick="closeReportDialog()">取消</button>' +
671:                 '<button class="report-submit" id="reportSubmitBtn">提交举报</button>' +
672:             '</div>' +
673:         '</div>';
674: 
675:     document.body.appendChild(overlay);
676: 
677:     document.getElementById('reportSubmitBtn').onclick = function() {
678:         var reasonEl = document.querySelector('input[name="reportReason"]:checked');
679:         if (!reasonEl) { showToast('请选择举报原因'); return; }
680:         var descEl = document.getElementById('reportDescription');
681:         var description = descEl ? descEl.value.trim() : '';
682:         doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reasonEl.value, description);
683:     };
684: 
685:     injectReportStyles();
686: }
687: 
688: function closeReportDialog() {
689:     var el = document.getElementById('reportOverlay');
690:     if (el) el.remove();
691: }
692: 
693: async function doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
694:     try {
695:         var cu = getSessionUser();
696:         if (!cu || !cu.id) { showToast('请先登录'); return; }
697:         await submitReport(cu.id, reportedUserId, contentType, contentId, contentSnapshot, reason, description);
698:         closeReportDialog();
699:         showToast('举报已提交，管理员会尽快处理');
700:     } catch (err) {
701:         showToast('举报失败：' + err.message);
702:     }
703: }
704: 
705: function injectReportStyles() {
706:     if (document.getElementById('report-dialog-styles')) return;
707:     var style = document.createElement('style');
708:     style.id = 'report-dialog-styles';
709:     style.textContent =
710:         '.report-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}' +
711:         '.report-panel{background:#fff;border-radius:16px;max-width:460px;width:100%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 16px 48px rgba(0,0,0,0.2);overflow:hidden;}' +
712:         '.report-header{display:flex;justify-content:space-between;align-items:center;padding:18px 20px 12px;border-bottom:1px solid #e8f0e8;}' +
713:         '.report-header h3{font-size:1.05em;margin:0;display:flex;align-items:center;gap:8px;}' +
714:         '.report-header h3 svg{width:20px;height:20px;color:#e57373;}' +
715:         '.report-close{background:none;border:none;cursor:pointer;color:#8aaa9a;padding:4px;display:flex;}' +
716:         '.report-close svg{width:20px;height:20px;}' +
717:         '.report-body{padding:16px 20px;overflow-y:auto;flex:1;}' +
718:         '.report-field{margin-bottom:14px;}' +
719:         '.report-field label{display:block;font-size:0.75em;font-weight:600;color:#5a7a6a;margin-bottom:6px;}' +
720:         '.report-reasons{display:grid;grid-template-columns:1fr 1fr;gap:6px;}' +
721:         '.report-reason-option{display:flex;align-items:center;gap:6px;padding:8px 10px;border:1.5px solid #c8e0c8;border-radius:8px;font-size:0.85em;cursor:pointer;}' +
722:         '.report-reason-option input[type="radio"]{accent-color:#2e7d32;}' +
723:         '.report-field textarea{width:100%;padding:10px 12px;border:2px solid #c8e0c8;border-radius:10px;font-family:inherit;font-size:0.85em;outline:none;resize:vertical;min-height:70px;box-sizing:border-box;}' +
724:         '.report-preview{background:#f5faf5;border:1px solid #e0e0e0;border-radius:8px;padding:10px 12px;font-size:0.8em;color:#5a7a6a;line-height:1.5;max-height:80px;overflow:hidden;}' +
725:         '.report-footer{display:flex;gap:8px;padding:12px 20px 18px;border-top:1px solid #e8f0e8;}' +
726:         '.report-footer button{flex:1;padding:10px;border-radius:10px;border:none;font-family:inherit;font-weight:700;font-size:0.9em;cursor:pointer;}' +
727:         '.report-cancel{background:#eaf3ea;color:#5a7a6a;}' +
728:         '.report-submit{background:#e57373;color:#fff;}';
729:     document.head.appendChild(style);
730: }
731: 
732: window.submitReport = submitReport;
733: window.openReportDialog = openReportDialog;
734: window.closeReportDialog = closeReportDialog;
735: window.doSubmitReport = doSubmitReport;
736: 
737: // ============================================================
738: // 头像提醒弹窗
739: // ============================================================
740: function showAvatarPrompt() {
741:     var old = document.getElementById('avatarPromptOverlay');
742:     if (old) return;
743: 
744:     var overlay = document.createElement('div');
745:     overlay.id = 'avatarPromptOverlay';
746:     overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(30,58,46,0.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:apFadeIn 0.3s ease;';
747: 
748:     overlay.innerHTML =
749:         '<div style="background:#fff;border-radius:16px;max-width:360px;width:100%;padding:2em;text-align:center;box-shadow:0 8px 32px rgba(46,125,50,0.12);border:1px solid #c8e0c8;animation:apPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1);">' +
750:             '<div style="width:72px;height:72px;border-radius:50%;background:#e8f5e9;display:grid;place-items:center;margin:0 auto 0.8em;">' +
751:                 '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
752:                     '<circle cx="12" cy="12" r="10"/>' +
753:                     '<circle cx="12" cy="10" r="3"/>' +
754:                     '<path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>' +
755:                 '</svg>' +
756:             '</div>' +
757:             '<div style="font-size:1.15em;font-weight:700;color:#1e3a2e;margin-bottom:0.5em;line-height:1.4;">你还没有一个属于自己的标志呢！</div>' +
758:             '<div style="font-size:0.9em;color:#5a7a6a;line-height:1.6;margin-bottom:1.4em;">快点为自己设置一个个性头像吧~</div>' +
759:             '<div style="display:flex;gap:8px;">' +
760:                 '<button id="avatarPromptLater" style="flex:1;padding:0.75em;border-radius:10px;border:1.5px solid #c8e0c8;background:transparent;color:#5a7a6a;font-weight:600;font-size:0.9em;cursor:pointer;font-family:inherit;">稍后再说</button>' +
761:                 '<button id="avatarPromptGo" style="flex:1;padding:0.75em;border-radius:10px;border:none;background:#2e7d32;color:#fff;font-weight:700;font-size:0.9em;cursor:pointer;font-family:inherit;">去设置头像</button>' +
762:             '</div>' +
763:         '</div>';
764: 
765:     document.body.appendChild(overlay);
766: 
767:     if (!document.getElementById('avatar-prompt-styles')) {
768:         var style = document.createElement('style');
769:         style.id = 'avatar-prompt-styles';
770:         style.textContent =
771:             '@keyframes apFadeIn{from{opacity:0}to{opacity:1}}' +
772:             '@keyframes apPopIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}';
773:         document.head.appendChild(style);
774:     }
775: 
776:     document.getElementById('avatarPromptLater').onclick = function() {
777:         sessionStorage.setItem('sq_avatar_prompt_shown', '1');
778:         overlay.remove();
779:     };
780:     document.getElementById('avatarPromptGo').onclick = function() {
781:         sessionStorage.setItem('sq_avatar_prompt_shown', '1');
782:         window.location.href = './profile.html?view=avatar';
783:     };
784:     overlay.addEventListener('click', function(e) {
785:         if (e.target === overlay) {
786:             sessionStorage.setItem('sq_avatar_prompt_shown', '1');
787:             overlay.remove();
788:         }
789:     });
790: }
791: window.showAvatarPrompt = showAvatarPrompt;
792: 
793: (function autoAvatarCheck() {
794:     function tryCheck() {
795:         var user = typeof getSessionUser === 'function' ? getSessionUser() : null;
796:         if (!user || !user.id) return;
797:         if (window.location.pathname.indexOf('profile.html') >= 0) return;
798:         if (user.avatar_url && user.avatar_url.indexOf('http') === 0) return;
799:         if (sessionStorage.getItem('sq_avatar_prompt_shown') === '1') return;
800:         // 老用户（有手机号且未设UID）优先弹出 UID 提醒，跳过头像弹窗
801:         if (user.phone && !user.custom_uid) return;
802:         showAvatarPrompt();
803:     }
804:     if (document.readyState === 'loading') {
805:         document.addEventListener('DOMContentLoaded', function() {
806:             setTimeout(tryCheck, 900);
807:         });
808:     } else {
809:         setTimeout(tryCheck, 900);
810:     }
811: })();
812: 
813: // ============================================================
814: // ★ 全局在线状态（Presence）
815: // ============================================================
816: (function initGlobalPresence(){
817:   function startPresence(){
818:     var user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
819:     if (!user || !user.id) return;
820:     if (!window.sb) return;
821: 
822:     if (window.__globalPresenceChannel) {
823:       try { window.sb.removeChannel(window.__globalPresenceChannel); } catch(e){}
824:       window.__globalPresenceChannel = null;
825:     }
826: 
827:     var ch = window.sb.channel('sq-chat-online', {
828:       config: { presence: { key: user.id } }
829:     });
830: 
831:     ch.on('presence', { event: 'sync' }, function(){});
832: 
833:     ch.subscribe(function(status){
834:       if (status === 'SUBSCRIBED') {
835:         ch.track({
836:           user_id: user.id,
837:           nickname: user.nickname || '用户',
838:           avatar_url: user.avatar_url || '',
839:           online_at: new Date().toISOString()
840:         });
841:         console.log('[presence] 已上线:', user.nickname);
842:       } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
843:         setTimeout(startPresence, 3000);
844:       }
845:     });
846: 
847:     window.__globalPresenceChannel = ch;
848:   }
849: 
850:   if (document.readyState === 'loading') {
851:     document.addEventListener('DOMContentLoaded', function(){ setTimeout(startPresence, 300); });
852:   } else {
853:     setTimeout(startPresence, 300);
854:   }
855:   window.addEventListener('storage', function(e){
856:     if (e.key === 'sq_user_session') setTimeout(startPresence, 200);
857:   });
858: })();
859: 
860: // ============================================================
861: // ★★★ 封号实时监听 ★★★
862: // 数据库 users.banned_until 变化 → 本地 session 立即更新
863: // → 触发 sq-ban-changed 事件 → 各页面横幅更新
864: // ============================================================
865: (function initBanWatcher(){
866:   function applyBanUpdate(bannedUntil, bannedReason){
867:     var s = getSessionUser();
868:     if (!s) return;
869:     if ((s.banned_until || null) === (bannedUntil || null) &&
870:         (s.banned_reason || null) === (bannedReason || null)) {
871:       return; // 无变化，不重复触发
872:     }
873:     s.banned_until = bannedUntil;
874:     s.banned_reason = bannedReason;
875:     setSessionUser(s);
876: 
877:     console.log('[ban] 本地封号状态已更新:', bannedUntil);
878: 
879:     window.dispatchEvent(new CustomEvent('sq-ban-changed', {
880:       detail: { banned_until: bannedUntil, banned_reason: bannedReason }
881:     }));
882: 
883:     // 被封禁时弹顶部提示
884:     if (bannedUntil && new Date(bannedUntil) > new Date()) {
885:       if (typeof showTopBanner === 'function') {
886:         showTopBanner('你的账号已被封禁：' + (bannedReason || '违规'));
887:       }
888:     }
889:   }
890: 
891:   function startWatch(){
892:     var user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
893:     if (!user || !user.id) return;
894:     if (!window.sb) return;
895: 
896:     if (window.__banWatchChannel) {
897:       try { window.sb.removeChannel(window.__banWatchChannel); } catch(e){}
898:       window.__banWatchChannel = null;
899:     }
900: 
901:     // 1) Realtime 订阅：秒级生效
902:     var ch = window.sb.channel('sq-ban-watch-' + user.id)
903:       .on('postgres_changes', {
904:         event: 'UPDATE',
905:         schema: 'public',
906:         table: 'users',
907:         filter: 'id=eq.' + user.id
908:       }, function(payload){
909:         var n = payload.new || {};
910:         applyBanUpdate(n.banned_until || null, n.banned_reason || null);
911:       })
912:       .subscribe();
913: 
914:     window.__banWatchChannel = ch;
915: 
916:     // 2) 每 8 秒轮询兜底（Realtime 挂了也能生效）
917:     if (window.__banPollTimer) clearInterval(window.__banPollTimer);
918:     window.__banPollTimer = setInterval(async function(){
919:       var u = getSessionUser();
920:       if (!u || !u.id) return;
921:       try {
922:         var res = await window.sb.from('users')
923:           .select('banned_until, banned_reason')
924:           .eq('id', u.id)
925:           .single();
926:         if (res.error || !res.data) return;
927:         applyBanUpdate(res.data.banned_until || null, res.data.banned_reason || null);
928:       } catch(e){}
929:     }, 8000);
930:   }
931: 
932:   if (document.readyState === 'loading') {
933:     document.addEventListener('DOMContentLoaded', function(){ setTimeout(startWatch, 500); });
934:   } else {
935:     setTimeout(startWatch, 500);
936:   }
937:   window.addEventListener('storage', function(e){
938:     if (e.key === 'sq_user_session') setTimeout(startWatch, 300);
939:   });
940: })();
941: 
942: // ============================================================
943: // ★ 通用封号横幅工具
944: // 页面只要有一个 id="bannedBanner" 的元素，就会自动控制显隐
945: // 更新显示内容的 span id="bannedUntilDisplay"
946: // ============================================================
947: (function initGlobalBanBanner(){
948:   function updateBanner(){
949:     var banner = document.getElementById('bannedBanner');
950:     if (!banner) return;
951:     var user = getSessionUser();
952:     var isBanned = !!(user && user.banned_until && new Date(user.banned_until) > new Date());
953: 
954:     if (isBanned) {
955:       banner.classList.add('active');
956:       banner.style.display = 'block';
957:       var display = document.getElementById('bannedUntilDisplay');
958:       if (display) {
959:         display.textContent = new Date(user.banned_until).toLocaleString('zh-CN', {
960:           year: 'numeric', month: 'long', day: 'numeric',
961:           hour: '2-digit', minute: '2-digit'
962:         });
963:       }
964:       // 禁用发帖按钮
965:       ['newPostBtn','floatingPostBtn'].forEach(function(id){
966:         var el = document.getElementById(id);
967:         if (el) { el.style.opacity = '0.5'; el.style.pointerEvents = 'none'; }
968:       });
969:     } else {
970:       banner.classList.remove('active');
971:       banner.style.display = 'none';

(内容太多被截断，显示到第 971 行；继续读传 offset=972)