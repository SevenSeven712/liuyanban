<path>common.js</path>
<type>file</type>
<content>
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
150: function getSessionUser() {
151:     var stored = localStorage.getItem('sq_user_session');
152:     if (stored) { try { return JSON.parse(stored); } catch (e) { return null; } }
153:     return null;
154: }
155: function setSessionUser(user) { localStorage.setItem('sq_user_session', JSON.stringify(user));
            if (user.phone && !user.custom_uid) {
                checkAndPromptUidChange(user);
            } }
156: async function clearSession() {
157:     localStorage.removeItem('sq_user_session');
158:     try { if (window.sb) await window.sb.auth.signOut(); } catch (e) {}
159: }
160: 
161: // 用 Supabase Auth 的真实会话校验并刷新本地缓存
162: // （防止用户篡改 localStorage 里的 user 冒充他人/管理员）
163: async function syncSessionFromAuth() {
164:     if (!window.sb) return null;
165:     try {
166:         var r = await window.sb.auth.getSession();
167:         var session = r.data && r.data.session;
168:         if (!session || !session.user) {
169:             // Auth 无会话 -> 本地缓存无效，清除
170:             if (localStorage.getItem('sq_user_session')) {
171:                 localStorage.removeItem('sq_user_session');
172:             }
173:             return null;
174:         }
175:         var q = await window.sb.rpc('get_my_profile');
176:         var user = q.data || null;
177:         if (user) {
178:             localStorage.setItem('sq_user_session', JSON.stringify(user));
179:             return user;
180:         }
181:         return null;
182:     } catch (e) {
183:         return null;
184:     }
185: }
186: window.syncSessionFromAuth = syncSessionFromAuth;
187: 
188: // 页面加载时后台校验一次；若会话失效则跳登录（仅在已登录页面）
189: (function bootstrapSession() {
190:     function run() {
191:         syncSessionFromAuth();
192:     }
193:     if (document.readyState === 'loading') {
194:         document.addEventListener('DOMContentLoaded', function() { setTimeout(run, 300); });
195:     } else {
196:         setTimeout(run, 300);
197:     }
198: })();
199: 
200: // ============================================================
201: // 通用工具
202: // ============================================================
203: function showToast(msg) {
204:     var toast = document.getElementById('toast');
205:     if (!toast) return;
206:     toast.textContent = msg;
207:     toast.classList.add('show');
208:     clearTimeout(window.toastTimer);
209:     window.toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
210: }
211: 
212: function escapeHtml(s) {
213:     if (!s) return '';
214:     return String(s).replace(/[&<>"']/g, function (c) {
215:         return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
216:     });
217: }
218: 
219: function getUserAvatar(user) {
220:     if (user && user.avatar_url) return user.avatar_url;
221:     var name = user ? user.nickname : 'U';
222:     var color = '#2e7d32';
223:     var initial = name.charAt(0).toUpperCase();
224:     var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
225:         '<rect width="100" height="100" fill="' + color + '" rx="50"/>' +
226:         '<text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">' + initial + '</text></svg>';
227:     return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
228: }
229: 
230: // ============================================================
231: // 渲染头部
232: // ============================================================
233: function renderHeader(title, activeTab) {
234:     var user = getSessionUser();
235:     var headerContainer = document.getElementById('header-container');
236:     if (!headerContainer) return;
237: 
238:     var userAreaHtml = '';
239:     if (user && user.id) {
240:         var avatar = user.avatar_url || getUserAvatar(user);
241:         var displayName = user.nickname || '用户';
242:         var avatarStyle = '', avatarContent = '';
243:         if (avatar && avatar.startsWith('http')) {
244:             avatarStyle = 'background-image:url(' + avatar + ');background-size:cover;background-position:center;';
245:         } else {
246:             avatarContent = displayName.charAt(0).toUpperCase();
247:         }
248:         var uidBtn = '';
        if (user.phone && !user.custom_uid) {
            uidBtn = '<a href="/liuyanban/set-uid.html" onclick="event.stopPropagation()" style="margin-left:8px;font-size:12px;padding:4px 10px;background:linear-gradient(135deg,#ff6b6b,#ee5253);color:#fff;border-radius:20px;font-weight:bold;text-decoration:none;display:flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(238,82,83,0.4);animation:pulse 2s infinite;">' +
                     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
                     '设置UID</a>';
        }
        userAreaHtml = '<div class="user-area" onclick="window.location.href=\'/liuyanban/user.html\'">' +
            '<div class="avatar" style="' + avatarStyle + '">' + avatarContent + '</div>' +
            '<span class="user-name">' + escapeHtml(displayName) + '</span>' +
            uidBtn +
            '<span class="chevron">▾</span>' +
252:             '</div>';
253:     } else {
254:         userAreaHtml = '<div class="user-area" onclick="window.location.href=\'/liuyanban/index.html\'">登录</div>';
255:     }
256: 
257:     headerContainer.innerHTML = '<div class="app-header">' +
258:         '<div class="brand" onclick="window.location.href=\'/liuyanban/posts.html\'">' +
259:         'Seven<span>戚</span><small>· ' + escapeHtml(title) + '</small>' +
260:         '</div>' + userAreaHtml + '</div>';
261: }
262: 
263: // ============================================================
264: // 底部导航 SVG 图标
265: // ============================================================
266: var FOOTER_ICONS = {
267:     messages: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 33V42C40 43.1046 39.1046 44 38 44H31.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 16V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H16" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 16H30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M23 44L40 23" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M16 24H24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
268:     posts: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M9 42H39" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
269:     chats: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21H25.0025" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M33.001 21H34.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M13.001 21H14.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
270:     profile: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
271: };
272: 
273: (function injectFooterIconStyles() {
274:     if (document.getElementById('footer-svg-icon-styles')) return;
275:     var style = document.createElement('style');
276:     style.id = 'footer-svg-icon-styles';
277:     style.textContent =
278:         '.tab-btn .tab-icon{display:flex;align-items:center;justify-content:center;width:1.7em;height:1.7em;line-height:1;}' +
279:         '.tab-btn .tab-icon svg{width:100%;height:100%;display:block;stroke:currentColor;fill:none;}' +
280:         '.tab-btn .tab-icon svg path,.tab-btn .tab-icon svg circle{stroke:currentColor;}' +
281:         '.header-settings-btn{background:none;border:none;cursor:pointer;padding:6px;color:var(--text,#1e3a2e);display:flex;border-radius:8px;}' +
282:         '.header-settings-btn svg{width:24px;height:24px;stroke:currentColor;fill:none;}' +
283:         '.header-settings-btn:hover{background:rgba(46,125,50,.1);}';
284:     document.head.appendChild(style);
285: })();
286: 
287: function renderFooterBase(activeTab) {
288:     var tabs = [
289:         { id: 'posts', name: '帖子', href: '/liuyanban/posts.html' },
290:         { id: 'messages', name: '留言板', href: '/liuyanban/messages.html' },
291:         { id: 'chats', name: '消息', href: '/liuyanban/chats.html' },
292:         { id: 'profile', name: '个人', href: '/liuyanban/user.html' }
293:     ];
294: 
295:     var footerHtml = '<div class="app-tabs">';
296:     tabs.forEach(function (tab) {
297:         var activeClass = (tab.id === activeTab) ? 'active' : '';
298:         var icon = FOOTER_ICONS[tab.id] || '';
299:         footerHtml += '<a href="' + tab.href + '" class="tab-btn ' + activeClass + '" style="position:relative;">' +
300:             '<span class="tab-icon">' + icon + '</span>' + escapeHtml(tab.name) + '</a>';
301:     });
302:     footerHtml += '</div>';
303: 
304:     var footerContainer = document.getElementById('footer-container');
305:     if (footerContainer) footerContainer.innerHTML = footerHtml;
306: }
307: 
308: // ============================================================
309: // 未读消息
310: // ============================================================
311: async function getUnreadChatCount(userId) {
312:     if (!userId || !window.sb) return 0;
313:     try {
314:         var res = await window.sb.from('users').select('last_chat_read_at').eq('id', userId).single();
315:         if (res.error) throw res.error;
316:         var lastRead = (res.data && res.data.last_chat_read_at) || new Date(0).toISOString();
317:         var cnt = await window.sb.from('chats')
318:             .select('*', { count: 'exact', head: true })
319:             .gt('created_at', lastRead)
320:             .neq('user_id', userId);
321:         if (cnt.error) throw cnt.error;
322:         return cnt.count || 0;
323:     } catch (e) { return 0; }
324: }
325: 
326: async function updateChatBadge() {
327:     var user = getSessionUser();
328:     if (!user || !user.id || !window.sb) return;
329:     var unread = 0;
330:     try { unread = await getUnreadChatCount(user.id); } catch (e) { return; }
331:     var footerContainer = document.getElementById('footer-container');
332:     if (!footerContainer) return;
333:     var chatTab = footerContainer.querySelector('a[href="/liuyanban/chats.html"]');
334:     if (!chatTab) return;
335:     var old = chatTab.querySelector('.badge');
336:     if (old) old.remove();
337:     if (unread > 0) {
338:         var badge = document.createElement('span');
339:         badge.className = 'badge';
340:         badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
341:         badge.textContent = unread > 9 ? '9+' : unread;
342:         chatTab.appendChild(badge);
343:     }
344: }
345: 
346: function renderFooter(activeTab) {
347:     renderFooterBase(activeTab);
348:     if (getSessionUser() && window.sb) updateChatBadge();
349: }
350: 
351: async function updateLastChatRead(userId) {
352:     if (!userId || !window.sb) return;
353:     try {
354:         await window.sb.from('users').update({ last_chat_read_at: new Date().toISOString() }).eq('id', userId);
355:     } catch (e) {}
356: }
357: 
358: // ============================================================
359: // 提醒音效
360: // ============================================================
361: function playReminderSound() {
362:     try {
363:         var AudioCtx = window.AudioContext || window.webkitAudioContext;
364:         if (!AudioCtx) return;
365:         var ctx = new AudioCtx();
366:         var osc = ctx.createOscillator();
367:         var gain = ctx.createGain();
368:         osc.connect(gain); gain.connect(ctx.destination);
369:         osc.type = 'sine';
370:         osc.frequency.setValueAtTime(880, ctx.currentTime);
371:         osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
372:         gain.gain.setValueAtTime(0.3, ctx.currentTime);
373:         gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
374:         osc.start(ctx.currentTime);
375:         osc.stop(ctx.currentTime + 0.28);
376:         setTimeout(function () { ctx.close(); }, 400);
377:     } catch (e) {}
378: }
379: 
380: function getSoundEnabled() {
381:     return localStorage.getItem('sq_sound_enabled') !== 'false';
382: }
383: 
384: // ============================================================
385: // 通知横幅
386: // ============================================================
387: var chatNotificationBanner = null;
388: function showChatNotificationBanner() {
389:     if (chatNotificationBanner) {
390:         chatNotificationBanner.remove();
391:         clearTimeout(chatNotificationBanner._timeout);
392:     }
393:     var banner = document.createElement('div');
394:     banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
395:     banner.innerHTML = svgIcon('bell', 18) + '<span>收到一条新消息</span>';
396:     banner.addEventListener('click', function () {
397:         window.location.href = '/liuyanban/chats.html';
398:         banner.remove();
399:     });
400:     document.body.appendChild(banner);
401:     chatNotificationBanner = banner;
402:     banner._timeout = setTimeout(function () { banner.remove(); chatNotificationBanner = null; }, 3000);
403: }
404: 
405: // ============================================================
406: // 全局聊天监听
407: // ============================================================
408: var globalChatChannel = null;
409: var globalChatListenerInitialized = false;
410: 
411: async function initializeGlobalChatListener() {
412:     var user = getSessionUser();
413:     if (!user || !user.id) return;
414:     if (globalChatChannel) {
415:         await window.sb.removeChannel(globalChatChannel);
416:         globalChatChannel = null;
417:         globalChatListenerInitialized = false;
418:     }
419:     if (globalChatListenerInitialized) return;
420:     globalChatChannel = window.sb.channel('global-chats-listener-' + user.id)
421:         .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, function (payload) {
422:             var newMsg = payload.new;
423:             if (!newMsg || newMsg.user_id === user.id) return;
424:             updateChatBadge();
425:             if (getSoundEnabled()) playReminderSound();
426:             if (!window.location.href.includes('chats.html')) {
427:                 showChatNotificationBanner();
428:                 var nm = newMsg.content || newMsg.text || '收到一条新消息';
429:                 showSystemNotification('Seven戚 · 新消息', String(nm).substring(0, 50), '/liuyanban/chats.html');
430:             }
431:         })
432:         .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats' }, function () {
433:             updateChatBadge();
434:         })
435:         .subscribe();
436:     globalChatListenerInitialized = true;
437: }
438: 
439: if (document.readyState === 'loading') {
440:     document.addEventListener('DOMContentLoaded', initializeGlobalChatListener);
441: } else {
442:     initializeGlobalChatListener();
443: }
444: window.addEventListener('storage', function (e) {
445:     if (e.key === 'sq_user_session') initializeGlobalChatListener();
446: });
447: 
448: // ============================================================
449: // 通知未读红点
450: // ============================================================
451: async function updateNotificationBadge() {
452:     var user = getSessionUser();
453:     if (!user || !user.id || !window.sb) return;
454:     try {
455:         var res = await window.sb.from('notifications')
456:             .select('*', { count: 'exact', head: true })
457:             .eq('user_id', user.id)
458:             .eq('is_read', false);
459:         if (res.error) throw res.error;
460:         var footerContainer = document.getElementById('footer-container');
461:         if (!footerContainer) return;
462:         var profileTab = footerContainer.querySelector('a[href="/liuyanban/profile.html"]');
463:         if (!profileTab) return;
464:         var old = profileTab.querySelector('.badge');
465:         if (old) old.remove();
466:         if (res.count > 0) {
467:             var badge = document.createElement('span');
468:             badge.className = 'badge';
469:             badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
470:             badge.textContent = res.count > 9 ? '9+' : res.count;
471:             profileTab.appendChild(badge);
472:         }
473:     } catch (e) {}
474: }
475: 
476: // ============================================================
477: // 顶部横幅
478: // ============================================================
479: var topBannerTimeout = null;
480: function showTopBanner(text) {
481:     var old = document.querySelector('.custom-top-banner');
482:     if (old) { old.remove(); clearTimeout(topBannerTimeout); }
483:     var banner = document.createElement('div');
484:     banner.className = 'custom-top-banner';
485:     banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:#fff;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
486:     banner.innerHTML = svgIcon('bell', 18) + '<span>' + (text || '收到新消息') + '</span>';
487:     banner.addEventListener('click', function () {
488:         window.location.href = '/liuyanban/profile.html?view=messages';
489:         banner.remove();
490:         clearTimeout(topBannerTimeout);
491:     });
492:     document.body.appendChild(banner);
493:     topBannerTimeout = setTimeout(function () { banner.remove(); }, 5000);
494: }
495: 
496: // ============================================================
497: // 站内通知推送
498: // ============================================================
499: window.pushNotification = window.pushNotification || async function(userId, payload) {
500:     if (!window.sb || !userId) return;
501:     try {
502:         await window.sb.from('notifications').insert([Object.assign({
503:             user_id: userId,
504:             is_read: false
505:         }, payload)]);
506:         if (typeof updateNotificationBadge === 'function') updateNotificationBadge();
507:     } catch (e) { console.warn('通知发送失败', e); }
508: };
509: 
510: // ============================================================
511: // 举报工具
512: // ============================================================
513: async function submitReport(reporterId, reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
514:     var res = await window.sb.from('reports').insert([{
515:         reporter_id: reporterId,
516:         reported_user_id: reportedUserId,
517:         content_type: contentType,
518:         content_id: contentId,
519:         content_snapshot: contentSnapshot,
520:         reason: reason,
521:         description: description || ''
522:     }]).select();
523:     if (res.error) throw res.error;
524:     var report = res.data[0];
525: 
526:     var adminRes = await window.sb.rpc('get_admin_id');
527:     if (adminRes.data) {
528:         await pushNotification(adminRes.data, {
529:             type: 'report',
530:             notification_type: 'report',
531:             report_id: report.id,
532:             report_reason: reason,
533:             extra_text: contentSnapshot ? contentSnapshot.substring(0, 100) : ''
534:         });
535:     }
536:     return report;
537: }
538: 
539: // ============================================================
540: // 举报弹窗
541: // ============================================================
542: function openReportDialog(reportedUserId, contentType, contentId, contentSnapshot) {
543:     var old = document.getElementById('reportOverlay');
544:     if (old) old.remove();
545: 
546:     var overlay = document.createElement('div');
547:     overlay.className = 'report-overlay';
548:     overlay.id = 'reportOverlay';
549: 
550:     var typeText = { post: '帖子', comment: '评论', message: '留言', chat: '聊天消息' }[contentType] || '内容';
551: 
552:     overlay.innerHTML =
553:         '<div class="report-panel">' +
554:             '<div class="report-header">' +
555:                 '<h3>' + svgIcon('flag', 20) + ' 举报' + typeText + '</h3>' +
556:                 '<button class="report-close" onclick="closeReportDialog()">' + svgIcon('x', 20) + '</button>' +
557:             '</div>' +
558:             '<div class="report-body">' +
559:                 '<div class="report-field">' +
560:                     '<label>举报原因（必选）</label>' +
561:                     '<div class="report-reasons">' +
562:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="色情低俗"> 色情低俗</label>' +
563:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="骚扰辱骂"> 骚扰辱骂</label>' +
564:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="垃圾广告"> 垃圾广告</label>' +
565:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="虚假信息"> 虚假信息</label>' +
566:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="政治敏感"> 政治敏感</label>' +
567:                         '<label class="report-reason-option"><input type="radio" name="reportReason" value="其他"> 其他</label>' +
568:                     '</div>' +
569:                 '</div>' +
570:                 '<div class="report-field">' +
571:                     '<label>补充说明（选填）</label>' +
572:                     '<textarea id="reportDescription" placeholder="请描述具体情况..." maxlength="500"></textarea>' +
573:                 '</div>' +
574:                 '<div class="report-field">' +
575:                     '<label>被举报内容预览</label>' +
576:                     '<div class="report-preview">' + (contentSnapshot ? contentSnapshot.replace(/</g, '&lt;') : '(无内容)') + '</div>' +
577:                 '</div>' +
578:             '</div>' +
579:             '<div class="report-footer">' +
580:                 '<button class="report-cancel" onclick="closeReportDialog()">取消</button>' +
581:                 '<button class="report-submit" id="reportSubmitBtn">提交举报</button>' +
582:             '</div>' +
583:         '</div>';
584: 
585:     document.body.appendChild(overlay);
586: 
587:     document.getElementById('reportSubmitBtn').onclick = function() {
588:         var reasonEl = document.querySelector('input[name="reportReason"]:checked');
589:         if (!reasonEl) { showToast('请选择举报原因'); return; }
590:         var descEl = document.getElementById('reportDescription');
591:         var description = descEl ? descEl.value.trim() : '';
592:         doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reasonEl.value, description);
593:     };
594: 
595:     injectReportStyles();
596: }
597: 
598: function closeReportDialog() {
599:     var el = document.getElementById('reportOverlay');
600:     if (el) el.remove();
601: }
602: 
603: async function doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
604:     try {
605:         var cu = getSessionUser();
606:         if (!cu || !cu.id) { showToast('请先登录'); return; }
607:         await submitReport(cu.id, reportedUserId, contentType, contentId, contentSnapshot, reason, description);
608:         closeReportDialog();
609:         showToast('举报已提交，管理员会尽快处理');
610:     } catch (err) {
611:         showToast('举报失败：' + err.message);
612:     }
613: }
614: 
615: function injectReportStyles() {
616:     if (document.getElementById('report-dialog-styles')) return;
617:     var style = document.createElement('style');
618:     style.id = 'report-dialog-styles';
619:     style.textContent =
620:         '.report-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}' +
621:         '.report-panel{background:#fff;border-radius:16px;max-width:460px;width:100%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 16px 48px rgba(0,0,0,0.2);overflow:hidden;}' +
622:         '.report-header{display:flex;justify-content:space-between;align-items:center;padding:18px 20px 12px;border-bottom:1px solid #e8f0e8;}' +
623:         '.report-header h3{font-size:1.05em;margin:0;display:flex;align-items:center;gap:8px;}' +
624:         '.report-header h3 svg{width:20px;height:20px;color:#e57373;}' +
625:         '.report-close{background:none;border:none;cursor:pointer;color:#8aaa9a;padding:4px;display:flex;}' +
626:         '.report-close svg{width:20px;height:20px;}' +
627:         '.report-body{padding:16px 20px;overflow-y:auto;flex:1;}' +
628:         '.report-field{margin-bottom:14px;}' +
629:         '.report-field label{display:block;font-size:0.75em;font-weight:600;color:#5a7a6a;margin-bottom:6px;}' +
630:         '.report-reasons{display:grid;grid-template-columns:1fr 1fr;gap:6px;}' +
631:         '.report-reason-option{display:flex;align-items:center;gap:6px;padding:8px 10px;border:1.5px solid #c8e0c8;border-radius:8px;font-size:0.85em;cursor:pointer;}' +
632:         '.report-reason-option input[type="radio"]{accent-color:#2e7d32;}' +
633:         '.report-field textarea{width:100%;padding:10px 12px;border:2px solid #c8e0c8;border-radius:10px;font-family:inherit;font-size:0.85em;outline:none;resize:vertical;min-height:70px;box-sizing:border-box;}' +
634:         '.report-preview{background:#f5faf5;border:1px solid #e0e0e0;border-radius:8px;padding:10px 12px;font-size:0.8em;color:#5a7a6a;line-height:1.5;max-height:80px;overflow:hidden;}' +
635:         '.report-footer{display:flex;gap:8px;padding:12px 20px 18px;border-top:1px solid #e8f0e8;}' +
636:         '.report-footer button{flex:1;padding:10px;border-radius:10px;border:none;font-family:inherit;font-weight:700;font-size:0.9em;cursor:pointer;}' +
637:         '.report-cancel{background:#eaf3ea;color:#5a7a6a;}' +
638:         '.report-submit{background:#e57373;color:#fff;}';
639:     document.head.appendChild(style);
640: }
641: 
642: window.submitReport = submitReport;
643: window.openReportDialog = openReportDialog;
644: window.closeReportDialog = closeReportDialog;
645: window.doSubmitReport = doSubmitReport;
646: 
647: // ============================================================
648: // 头像提醒弹窗
649: // ============================================================
650: function showAvatarPrompt() {
651:     var old = document.getElementById('avatarPromptOverlay');
652:     if (old) return;
653: 
654:     var overlay = document.createElement('div');
655:     overlay.id = 'avatarPromptOverlay';
656:     overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(30,58,46,0.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:apFadeIn 0.3s ease;';
657: 
658:     overlay.innerHTML =
659:         '<div style="background:#fff;border-radius:16px;max-width:360px;width:100%;padding:2em;text-align:center;box-shadow:0 8px 32px rgba(46,125,50,0.12);border:1px solid #c8e0c8;animation:apPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1);">' +
660:             '<div style="width:72px;height:72px;border-radius:50%;background:#e8f5e9;display:grid;place-items:center;margin:0 auto 0.8em;">' +
661:                 '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
662:                     '<circle cx="12" cy="12" r="10"/>' +
663:                     '<circle cx="12" cy="10" r="3"/>' +
664:                     '<path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>' +
665:                 '</svg>' +
666:             '</div>' +
667:             '<div style="font-size:1.15em;font-weight:700;color:#1e3a2e;margin-bottom:0.5em;line-height:1.4;">你还没有一个属于自己的标志呢！</div>' +
668:             '<div style="font-size:0.9em;color:#5a7a6a;line-height:1.6;margin-bottom:1.4em;">快点为自己设置一个个性头像吧~</div>' +
669:             '<div style="display:flex;gap:8px;">' +
670:                 '<button id="avatarPromptLater" style="flex:1;padding:0.75em;border-radius:10px;border:1.5px solid #c8e0c8;background:transparent;color:#5a7a6a;font-weight:600;font-size:0.9em;cursor:pointer;font-family:inherit;">稍后再说</button>' +
671:                 '<button id="avatarPromptGo" style="flex:1;padding:0.75em;border-radius:10px;border:none;background:#2e7d32;color:#fff;font-weight:700;font-size:0.9em;cursor:pointer;font-family:inherit;">去设置头像</button>' +
672:             '</div>' +
673:         '</div>';
674: 
675:     document.body.appendChild(overlay);
676: 
677:     if (!document.getElementById('avatar-prompt-styles')) {
678:         var style = document.createElement('style');
679:         style.id = 'avatar-prompt-styles';
680:         style.textContent =
681:             '@keyframes apFadeIn{from{opacity:0}to{opacity:1}}' +
682:             '@keyframes apPopIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}';
683:         document.head.appendChild(style);
684:     }
685: 
686:     document.getElementById('avatarPromptLater').onclick = function() {
687:         sessionStorage.setItem('sq_avatar_prompt_shown', '1');
688:         overlay.remove();
689:     };
690:     document.getElementById('avatarPromptGo').onclick = function() {
691:         sessionStorage.setItem('sq_avatar_prompt_shown', '1');
692:         window.location.href = '/liuyanban/profile.html?view=avatar';
693:     };
694:     overlay.addEventListener('click', function(e) {
695:         if (e.target === overlay) {
696:             sessionStorage.setItem('sq_avatar_prompt_shown', '1');
697:             overlay.remove();
698:         }
699:     });
700: }
701: window.showAvatarPrompt = showAvatarPrompt;
702: 
703: (function autoAvatarCheck() {
704:     function tryCheck() {
705:         var user = typeof getSessionUser === 'function' ? getSessionUser() : null;
706:         if (!user || !user.id) return;
707:         if (window.location.pathname.indexOf('profile.html') >= 0) return;
708:         if (user.avatar_url && user.avatar_url.indexOf('http') === 0) return;
709:         if (sessionStorage.getItem('sq_avatar_prompt_shown') === '1') return;
710:         showAvatarPrompt();
711:     }
712:     if (document.readyState === 'loading') {
713:         document.addEventListener('DOMContentLoaded', function() {
714:             setTimeout(tryCheck, 900);
715:         });
716:     } else {
717:         setTimeout(tryCheck, 900);
718:     }
719: })();
720: 
721: // ============================================================
722: // ★ 全局在线状态（Presence）
723: // ============================================================
724: (function initGlobalPresence(){
725:   function startPresence(){
726:     var user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
727:     if (!user || !user.id) return;
728:     if (!window.sb) return;
729: 
730:     if (window.__globalPresenceChannel) {
731:       try { window.sb.removeChannel(window.__globalPresenceChannel); } catch(e){}
732:       window.__globalPresenceChannel = null;
733:     }
734: 
735:     var ch = window.sb.channel('sq-chat-online', {
736:       config: { presence: { key: user.id } }
737:     });
738: 
739:     ch.on('presence', { event: 'sync' }, function(){});
740: 
741:     ch.subscribe(function(status){
742:       if (status === 'SUBSCRIBED') {
743:         ch.track({
744:           user_id: user.id,
745:           nickname: user.nickname || '用户',
746:           avatar_url: user.avatar_url || '',
747:           online_at: new Date().toISOString()
748:         });
749:         console.log('[presence] 已上线:', user.nickname);
750:       } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
751:         setTimeout(startPresence, 3000);
752:       }
753:     });
754: 
755:     window.__globalPresenceChannel = ch;
756:   }
757: 
758:   if (document.readyState === 'loading') {
759:     document.addEventListener('DOMContentLoaded', function(){ setTimeout(startPresence, 300); });
760:   } else {
761:     setTimeout(startPresence, 300);
762:   }
763:   window.addEventListener('storage', function(e){
764:     if (e.key === 'sq_user_session') setTimeout(startPresence, 200);
765:   });
766: })();
767: 
768: // ============================================================
769: // ★★★ 封号实时监听 ★★★
770: // 数据库 users.banned_until 变化 → 本地 session 立即更新
771: // → 触发 sq-ban-changed 事件 → 各页面横幅更新
772: // ============================================================
773: (function initBanWatcher(){
774:   function applyBanUpdate(bannedUntil, bannedReason){
775:     var s = getSessionUser();
776:     if (!s) return;
777:     if ((s.banned_until || null) === (bannedUntil || null) &&
778:         (s.banned_reason || null) === (bannedReason || null)) {
779:       return; // 无变化，不重复触发
780:     }
781:     s.banned_until = bannedUntil;
782:     s.banned_reason = bannedReason;
783:     setSessionUser(s);
784: 
785:     console.log('[ban] 本地封号状态已更新:', bannedUntil);
786: 
787:     window.dispatchEvent(new CustomEvent('sq-ban-changed', {
788:       detail: { banned_until: bannedUntil, banned_reason: bannedReason }
789:     }));
790: 
791:     // 被封禁时弹顶部提示
792:     if (bannedUntil && new Date(bannedUntil) > new Date()) {
793:       if (typeof showTopBanner === 'function') {
794:         showTopBanner('你的账号已被封禁：' + (bannedReason || '违规'));
795:       }
796:     }
797:   }
798: 
799:   function startWatch(){
800:     var user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
801:     if (!user || !user.id) return;
802:     if (!window.sb) return;
803: 
804:     if (window.__banWatchChannel) {
805:       try { window.sb.removeChannel(window.__banWatchChannel); } catch(e){}
806:       window.__banWatchChannel = null;
807:     }
808: 
809:     // 1) Realtime 订阅：秒级生效
810:     var ch = window.sb.channel('sq-ban-watch-' + user.id)
811:       .on('postgres_changes', {
812:         event: 'UPDATE',
813:         schema: 'public',
814:         table: 'users',
815:         filter: 'id=eq.' + user.id
816:       }, function(payload){
817:         var n = payload.new || {};
818:         applyBanUpdate(n.banned_until || null, n.banned_reason || null);
819:       })
820:       .subscribe();
821: 
822:     window.__banWatchChannel = ch;
823: 
824:     // 2) 每 8 秒轮询兜底（Realtime 挂了也能生效）
825:     if (window.__banPollTimer) clearInterval(window.__banPollTimer);
826:     window.__banPollTimer = setInterval(async function(){
827:       var u = getSessionUser();
828:       if (!u || !u.id) return;
829:       try {
830:         var res = await window.sb.from('users')
831:           .select('banned_until, banned_reason')
832:           .eq('id', u.id)
833:           .single();
834:         if (res.error || !res.data) return;
835:         applyBanUpdate(res.data.banned_until || null, res.data.banned_reason || null);

// ============================================================
// ★ 通用封号横幅工具
// 页面只要有一个 id="bannedBanner" 的元素，就会自动控制显隐
// 更新显示内容的 span id="bannedUntilDisplay"
// ============================================================
(function initGlobalBanBanner(){
  function updateBanner(){
    var banner = document.getElementById('bannedBanner');
    if (!banner) return;
    var u = getSessionUser();
    var isBanned = u && u.banned_until && new Date(u.banned_until) > new Date();
    if (isBanned) {
      banner.style.display = 'flex';
      var el = document.getElementById('bannedUntilDisplay');
      if (el) el.textContent = new Date(u.banned_until).toLocaleString();
    } else {
      banner.style.display = 'none';
    }
  }
  window.addEventListener('sq-ban-changed', updateBanner);
  document.addEventListener('DOMContentLoaded', updateBanner);
  setTimeout(updateBanner, 100);
})();

// ============================================================
// ★ PWA 支持
// ============================================================
(function initPWA() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/liuyanban/sw.js', { scope: '/liuyanban/' }).catch(function (e) {
        console.warn('SW register failed:', e);
    });
})();

window.requestNotifyPermission = function() {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
};

window.showSystemNotification = function(title, body, url) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
        new Notification(title, { body: body });
        return;
    }
    navigator.serviceWorker.ready.then(function (reg) {
        reg.showNotification(title, {
            body: body,
            icon: '/liuyanban/icon-192.png',
            data: { url: url || '/liuyanban/' }
        });
    });
};

window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.deferredPrompt = e;
});

function isPWAInstalled() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}

function showInstallModal() {
    if (isPWAInstalled()) return;
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then(function(choiceResult) {
            window.deferredPrompt = null;
        });
    }
}

// ============================================================
// ★ UID 升级提示逻辑（在此安全插入）
// ============================================================
var uidStyleEl = document.createElement('style');
uidStyleEl.innerHTML = '@keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(238,82,83,0.7); } 70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(238,82,83,0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(238,82,83,0); } }';
document.head.appendChild(uidStyleEl);

function checkAndPromptUidChange(user) {
    if (window.location.pathname.indexOf('/set-uid.html') >= 0) return;
    if (sessionStorage.getItem('sq_uid_prompted') === '1') return;
    sessionStorage.setItem('sq_uid_prompted', '1');

    var modal = document.createElement('div');
    modal.className = 'custom-modal active';
    modal.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = '<div style="background:#fff;border-radius:12px;padding:24px;max-width:340px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.2);font-family:sans-serif;">' +
        '<div style="font-size:40px;margin-bottom:12px;">🛡️</div>' +
        '<h3 style="font-size:18px;font-weight:bold;color:#1e3a2e;margin-bottom:8px;">系统升级提醒</h3>' +
        '<p style="font-size:14px;color:#666;line-height:1.5;margin-bottom:20px;">请修改手机号为自定义UID，以免有手机号个人隐私泄露风险。</p>' +
        '<div style="display:flex;gap:10px;">' +
        '<button id="btnCancelUid" style="flex:1;padding:10px;border-radius:8px;border:1px solid #ccc;background:#fff;color:#666;font-size:14px;cursor:pointer;">稍后再说</button>' +
        '<button id="btnGotoUid" style="flex:1;padding:10px;border-radius:8px;border:none;background:#2e7d32;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;">前去修改</button>' +
        '</div></div>';
    document.body.appendChild(modal);
    
    document.getElementById('btnCancelUid').onclick = function() { modal.remove(); };
    document.getElementById('btnGotoUid').onclick = function() { window.location.href = '/liuyanban/set-uid.html'; };
}
