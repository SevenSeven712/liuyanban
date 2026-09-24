// ============================================================
// 初始化 Supabase 客户端
// ============================================================
if (!window.sb) {
    var SUPABASE_URL = "https://ulvhuqtpdafspbdvkogs.supabase.co";
    var SUPABASE_ANON_KEY = "sb_publishable_Ew8kKf2z05kmYIK2XNu00g_dzAirtIM";
    window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ============================================================
// SVG 图标库
// ============================================================
var SVG_ICONS = {
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    xCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    user2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>'
};

function svgIcon(name, size) {
    var icon = SVG_ICONS[name];
    if (!icon) return '';
    if (size) return icon.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ');
    return icon;
}

// ============================================================
// 会话管理
// ============================================================
function getSessionUser() {
    var stored = localStorage.getItem('sq_user_session');
    if (stored) { try { return JSON.parse(stored); } catch (e) { return null; } }
    return null;
}
function setSessionUser(user) { localStorage.setItem('sq_user_session', JSON.stringify(user)); }
function clearSession() { localStorage.removeItem('sq_user_session'); }

// ============================================================
// 通用工具
// ============================================================
function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function getUserAvatar(user) {
    if (user && user.avatar_url) return user.avatar_url;
    var name = user ? user.nickname : 'U';
    var color = '#2e7d32';
    var initial = name.charAt(0).toUpperCase();
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
        '<rect width="100" height="100" fill="' + color + '" rx="50"/>' +
        '<text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">' + initial + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// ============================================================
// 渲染头部
// ============================================================
function renderHeader(title, activeTab) {
    var user = getSessionUser();
    var headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    var userAreaHtml = '';
    if (user && user.id) {
        var avatar = user.avatar_url || getUserAvatar(user);
        var displayName = user.nickname || '用户';
        var avatarStyle = '', avatarContent = '';
        if (avatar && avatar.startsWith('http')) {
            avatarStyle = 'background-image:url(' + avatar + ');background-size:cover;background-position:center;';
        } else {
            avatarContent = displayName.charAt(0).toUpperCase();
        }
        userAreaHtml = '<div class="user-area" onclick="window.location.href=\'/liuyanban/profile.html\'">' +
            '<div class="avatar" style="' + avatarStyle + '">' + avatarContent + '</div>' +
            '<span class="user-name">' + escapeHtml(displayName) + '</span>' +
            '<span class="chevron">▾</span>' +
            '</div>';
    } else {
        userAreaHtml = '<div class="user-area" onclick="window.location.href=\'/liuyanban/index.html\'">登录</div>';
    }

    headerContainer.innerHTML = '<div class="app-header">' +
        '<div class="brand" onclick="window.location.href=\'/liuyanban/posts.html\'">' +
        'Seven<span>戚</span><small>· ' + escapeHtml(title) + '</small>' +
        '</div>' + userAreaHtml + '</div>';
}

// ============================================================
// 底部导航 SVG 图标
// ============================================================
var FOOTER_ICONS = {
    messages: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 33V42C40 43.1046 39.1046 44 38 44H31.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 16V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H16" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 16H30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M23 44L40 23" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M16 24H24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    posts: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M9 42H39" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    chats: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21H25.0025" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M33.001 21H34.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M13.001 21H14.9999" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    profile: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

(function injectFooterIconStyles() {
    if (document.getElementById('footer-svg-icon-styles')) return;
    var style = document.createElement('style');
    style.id = 'footer-svg-icon-styles';
    style.textContent =
        '.tab-btn .tab-icon{display:flex;align-items:center;justify-content:center;width:1.7em;height:1.7em;line-height:1;}' +
        '.tab-btn .tab-icon svg{width:100%;height:100%;display:block;stroke:currentColor;fill:none;}' +
        '.tab-btn .tab-icon svg path,.tab-btn .tab-icon svg circle{stroke:currentColor;}';
    document.head.appendChild(style);
})();

function renderFooterBase(activeTab) {
    var tabs = [
        { id: 'posts', name: '帖子', href: '/liuyanban/posts.html' },
        { id: 'messages', name: '留言板', href: '/liuyanban/messages.html' },
        { id: 'chats', name: '消息', href: '/liuyanban/chats.html' },
        { id: 'profile', name: '个人', href: '/liuyanban/profile.html' }
    ];

    var footerHtml = '<div class="app-tabs">';
    tabs.forEach(function (tab) {
        var activeClass = (tab.id === activeTab) ? 'active' : '';
        var icon = FOOTER_ICONS[tab.id] || '';
        footerHtml += '<a href="' + tab.href + '" class="tab-btn ' + activeClass + '" style="position:relative;">' +
            '<span class="tab-icon">' + icon + '</span>' + escapeHtml(tab.name) + '</a>';
    });
    footerHtml += '</div>';

    var footerContainer = document.getElementById('footer-container');
    if (footerContainer) footerContainer.innerHTML = footerHtml;
}

// ============================================================
// 未读消息
// ============================================================
async function getUnreadChatCount(userId) {
    if (!userId || !window.sb) return 0;
    try {
        var res = await window.sb.from('users').select('last_chat_read_at').eq('id', userId).single();
        if (res.error) throw res.error;
        var lastRead = (res.data && res.data.last_chat_read_at) || new Date(0).toISOString();
        var cnt = await window.sb.from('chats')
            .select('*', { count: 'exact', head: true })
            .gt('created_at', lastRead)
            .neq('user_id', userId);
        if (cnt.error) throw cnt.error;
        return cnt.count || 0;
    } catch (e) { return 0; }
}

async function updateChatBadge() {
    var user = getSessionUser();
    if (!user || !user.id || !window.sb) return;
    var unread = 0;
    try { unread = await getUnreadChatCount(user.id); } catch (e) { return; }
    var footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    var chatTab = footerContainer.querySelector('a[href="/liuyanban/chats.html"]');
    if (!chatTab) return;
    var old = chatTab.querySelector('.badge');
    if (old) old.remove();
    if (unread > 0) {
        var badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
        badge.textContent = unread > 9 ? '9+' : unread;
        chatTab.appendChild(badge);
    }
}

function renderFooter(activeTab) {
    renderFooterBase(activeTab);
    if (getSessionUser() && window.sb) updateChatBadge();
}

async function updateLastChatRead(userId) {
    if (!userId || !window.sb) return;
    try {
        await window.sb.from('users').update({ last_chat_read_at: new Date().toISOString() }).eq('id', userId);
    } catch (e) {}
}

// ============================================================
// 提醒音效
// ============================================================
function playReminderSound() {
    try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        var ctx = new AudioCtx();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.28);
        setTimeout(function () { ctx.close(); }, 400);
    } catch (e) {}
}

function getSoundEnabled() {
    return localStorage.getItem('sq_sound_enabled') !== 'false';
}

// ============================================================
// 通知横幅
// ============================================================
var chatNotificationBanner = null;
function showChatNotificationBanner() {
    if (chatNotificationBanner) {
        chatNotificationBanner.remove();
        clearTimeout(chatNotificationBanner._timeout);
    }
    var banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
    banner.innerHTML = svgIcon('bell', 18) + '<span>收到一条新消息</span>';
    banner.addEventListener('click', function () {
        window.location.href = '/liuyanban/chats.html';
        banner.remove();
    });
    document.body.appendChild(banner);
    chatNotificationBanner = banner;
    banner._timeout = setTimeout(function () { banner.remove(); chatNotificationBanner = null; }, 3000);
}

// ============================================================
// 全局聊天监听
// ============================================================
var globalChatChannel = null;
var globalChatListenerInitialized = false;

async function initializeGlobalChatListener() {
    var user = getSessionUser();
    if (!user || !user.id) return;
    if (globalChatChannel) {
        await window.sb.removeChannel(globalChatChannel);
        globalChatChannel = null;
        globalChatListenerInitialized = false;
    }
    if (globalChatListenerInitialized) return;
    globalChatChannel = window.sb.channel('global-chats-listener-' + user.id)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, function (payload) {
            var newMsg = payload.new;
            if (!newMsg || newMsg.user_id === user.id) return;
            updateChatBadge();
            if (getSoundEnabled()) playReminderSound();
            if (!window.location.href.includes('chats.html')) showChatNotificationBanner();
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats' }, function () {
            updateChatBadge();
        })
        .subscribe();
    globalChatListenerInitialized = true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGlobalChatListener);
} else {
    initializeGlobalChatListener();
}
window.addEventListener('storage', function (e) {
    if (e.key === 'sq_user_session') initializeGlobalChatListener();
});

// ============================================================
// 通知未读红点
// ============================================================
async function updateNotificationBadge() {
    var user = getSessionUser();
    if (!user || !user.id || !window.sb) return;
    try {
        var res = await window.sb.from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false);
        if (res.error) throw res.error;
        var footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;
        var profileTab = footerContainer.querySelector('a[href="/liuyanban/profile.html"]');
        if (!profileTab) return;
        var old = profileTab.querySelector('.badge');
        if (old) old.remove();
        if (res.count > 0) {
            var badge = document.createElement('span');
            badge.className = 'badge';
            badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
            badge.textContent = res.count > 9 ? '9+' : res.count;
            profileTab.appendChild(badge);
        }
    } catch (e) {}
}

// ============================================================
// 顶部横幅
// ============================================================
var topBannerTimeout = null;
function showTopBanner(text) {
    var old = document.querySelector('.custom-top-banner');
    if (old) { old.remove(); clearTimeout(topBannerTimeout); }
    var banner = document.createElement('div');
    banner.className = 'custom-top-banner';
    banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:#fff;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC",sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
    banner.innerHTML = svgIcon('bell', 18) + '<span>' + (text || '收到新消息') + '</span>';
    banner.addEventListener('click', function () {
        window.location.href = '/liuyanban/profile.html?view=messages';
        banner.remove();
        clearTimeout(topBannerTimeout);
    });
    document.body.appendChild(banner);
    topBannerTimeout = setTimeout(function () { banner.remove(); }, 5000);
}

// ============================================================
// 站内通知推送
// ============================================================
window.pushNotification = window.pushNotification || async function(userId, payload) {
    if (!window.sb || !userId) return;
    try {
        await window.sb.from('notifications').insert([Object.assign({
            user_id: userId,
            is_read: false
        }, payload)]);
        if (typeof updateNotificationBadge === 'function') updateNotificationBadge();
    } catch (e) { console.warn('通知发送失败', e); }
};

// ============================================================
// 举报工具
// ============================================================
async function submitReport(reporterId, reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
    var res = await window.sb.from('reports').insert([{
        reporter_id: reporterId,
        reported_user_id: reportedUserId,
        content_type: contentType,
        content_id: contentId,
        content_snapshot: contentSnapshot,
        reason: reason,
        description: description || ''
    }]).select();
    if (res.error) throw res.error;
    var report = res.data[0];

    var adminRes = await window.sb.from('users').select('id').eq('phone', '17355394710').single();
    if (adminRes.data) {
        await pushNotification(adminRes.data.id, {
            type: 'report',
            notification_type: 'report',
            report_id: report.id,
            report_reason: reason,
            extra_text: contentSnapshot ? contentSnapshot.substring(0, 100) : ''
        });
    }
    return report;
}

// ============================================================
// 举报弹窗
// ============================================================
function openReportDialog(reportedUserId, contentType, contentId, contentSnapshot) {
    var old = document.getElementById('reportOverlay');
    if (old) old.remove();

    var overlay = document.createElement('div');
    overlay.className = 'report-overlay';
    overlay.id = 'reportOverlay';

    var typeText = { post: '帖子', comment: '评论', message: '留言', chat: '聊天消息' }[contentType] || '内容';

    overlay.innerHTML =
        '<div class="report-panel">' +
            '<div class="report-header">' +
                '<h3>' + svgIcon('flag', 20) + ' 举报' + typeText + '</h3>' +
                '<button class="report-close" onclick="closeReportDialog()">' + svgIcon('x', 20) + '</button>' +
            '</div>' +
            '<div class="report-body">' +
                '<div class="report-field">' +
                    '<label>举报原因（必选）</label>' +
                    '<div class="report-reasons">' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="色情低俗"> 色情低俗</label>' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="骚扰辱骂"> 骚扰辱骂</label>' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="垃圾广告"> 垃圾广告</label>' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="虚假信息"> 虚假信息</label>' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="政治敏感"> 政治敏感</label>' +
                        '<label class="report-reason-option"><input type="radio" name="reportReason" value="其他"> 其他</label>' +
                    '</div>' +
                '</div>' +
                '<div class="report-field">' +
                    '<label>补充说明（选填）</label>' +
                    '<textarea id="reportDescription" placeholder="请描述具体情况..." maxlength="500"></textarea>' +
                '</div>' +
                '<div class="report-field">' +
                    '<label>被举报内容预览</label>' +
                    '<div class="report-preview">' + (contentSnapshot ? contentSnapshot.replace(/</g, '&lt;') : '(无内容)') + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="report-footer">' +
                '<button class="report-cancel" onclick="closeReportDialog()">取消</button>' +
                '<button class="report-submit" id="reportSubmitBtn">提交举报</button>' +
            '</div>' +
        '</div>';

    document.body.appendChild(overlay);

    document.getElementById('reportSubmitBtn').onclick = function() {
        var reasonEl = document.querySelector('input[name="reportReason"]:checked');
        if (!reasonEl) { showToast('请选择举报原因'); return; }
        var descEl = document.getElementById('reportDescription');
        var description = descEl ? descEl.value.trim() : '';
        doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reasonEl.value, description);
    };

    injectReportStyles();
}

function closeReportDialog() {
    var el = document.getElementById('reportOverlay');
    if (el) el.remove();
}

async function doSubmitReport(reportedUserId, contentType, contentId, contentSnapshot, reason, description) {
    try {
        var cu = getSessionUser();
        if (!cu || !cu.id) { showToast('请先登录'); return; }
        await submitReport(cu.id, reportedUserId, contentType, contentId, contentSnapshot, reason, description);
        closeReportDialog();
        showToast('✅ 举报已提交，管理员会尽快处理');
    } catch (err) {
        showToast('举报失败：' + err.message);
    }
}

function injectReportStyles() {
    if (document.getElementById('report-dialog-styles')) return;
    var style = document.createElement('style');
    style.id = 'report-dialog-styles';
    style.textContent =
        '.report-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}' +
        '.report-panel{background:#fff;border-radius:16px;max-width:460px;width:100%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 16px 48px rgba(0,0,0,0.2);overflow:hidden;}' +
        '.report-header{display:flex;justify-content:space-between;align-items:center;padding:18px 20px 12px;border-bottom:1px solid #e8f0e8;}' +
        '.report-header h3{font-size:1.05em;margin:0;display:flex;align-items:center;gap:8px;}' +
        '.report-header h3 svg{width:20px;height:20px;color:#e57373;}' +
        '.report-close{background:none;border:none;cursor:pointer;color:#8aaa9a;padding:4px;display:flex;}' +
        '.report-close svg{width:20px;height:20px;}' +
        '.report-body{padding:16px 20px;overflow-y:auto;flex:1;}' +
        '.report-field{margin-bottom:14px;}' +
        '.report-field label{display:block;font-size:0.75em;font-weight:600;color:#5a7a6a;margin-bottom:6px;}' +
        '.report-reasons{display:grid;grid-template-columns:1fr 1fr;gap:6px;}' +
        '.report-reason-option{display:flex;align-items:center;gap:6px;padding:8px 10px;border:1.5px solid #c8e0c8;border-radius:8px;font-size:0.85em;cursor:pointer;}' +
        '.report-reason-option input[type="radio"]{accent-color:#2e7d32;}' +
        '.report-field textarea{width:100%;padding:10px 12px;border:2px solid #c8e0c8;border-radius:10px;font-family:inherit;font-size:0.85em;outline:none;resize:vertical;min-height:70px;box-sizing:border-box;}' +
        '.report-preview{background:#f5faf5;border:1px solid #e0e0e0;border-radius:8px;padding:10px 12px;font-size:0.8em;color:#5a7a6a;line-height:1.5;max-height:80px;overflow:hidden;}' +
        '.report-footer{display:flex;gap:8px;padding:12px 20px 18px;border-top:1px solid #e8f0e8;}' +
        '.report-footer button{flex:1;padding:10px;border-radius:10px;border:none;font-family:inherit;font-weight:700;font-size:0.9em;cursor:pointer;}' +
        '.report-cancel{background:#eaf3ea;color:#5a7a6a;}' +
        '.report-submit{background:#e57373;color:#fff;}';
    document.head.appendChild(style);
}

// 让举报函数全局可用（跨页面调用）
window.submitReport = submitReport;
window.openReportDialog = openReportDialog;
window.closeReportDialog = closeReportDialog;
window.doSubmitReport = doSubmitReport;

// ============================================================
// 头像提醒弹窗（未设置头像的用户自动弹）
// ============================================================
function showAvatarPrompt() {
    var old = document.getElementById('avatarPromptOverlay');
    if (old) return;

    var overlay = document.createElement('div');
    overlay.id = 'avatarPromptOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(30,58,46,0.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:apFadeIn 0.3s ease;';

    overlay.innerHTML =
        '<div style="background:#fff;border-radius:16px;max-width:360px;width:100%;padding:2em;text-align:center;box-shadow:0 8px 32px rgba(46,125,50,0.12);border:1px solid #c8e0c8;animation:apPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1);">' +
            '<div style="width:72px;height:72px;border-radius:50%;background:#e8f5e9;display:grid;place-items:center;margin:0 auto 0.8em;">' +
                '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<circle cx="12" cy="12" r="10"/>' +
                    '<circle cx="12" cy="10" r="3"/>' +
                    '<path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>' +
                '</svg>' +
            '</div>' +
            '<div style="font-size:1.15em;font-weight:700;color:#1e3a2e;margin-bottom:0.5em;line-height:1.4;">你还没有一个属于自己的标志呢！</div>' +
            '<div style="font-size:0.9em;color:#5a7a6a;line-height:1.6;margin-bottom:1.4em;">快点为自己设置一个个性头像吧~</div>' +
            '<div style="display:flex;gap:8px;">' +
                '<button id="avatarPromptLater" style="flex:1;padding:0.75em;border-radius:10px;border:1.5px solid #c8e0c8;background:transparent;color:#5a7a6a;font-weight:600;font-size:0.9em;cursor:pointer;font-family:inherit;">稍后再说</button>' +
                '<button id="avatarPromptGo" style="flex:1;padding:0.75em;border-radius:10px;border:none;background:#2e7d32;color:#fff;font-weight:700;font-size:0.9em;cursor:pointer;font-family:inherit;">去设置头像</button>' +
            '</div>' +
        '</div>';

    document.body.appendChild(overlay);

    if (!document.getElementById('avatar-prompt-styles')) {
        var style = document.createElement('style');
        style.id = 'avatar-prompt-styles';
        style.textContent =
            '@keyframes apFadeIn{from{opacity:0}to{opacity:1}}' +
            '@keyframes apPopIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}' +
            '#avatarPromptLater:hover{background:#eaf3ea;border-color:#8aaa9a;}' +
            '#avatarPromptGo:hover{background:#4caf50;box-shadow:0 0 20px rgba(46,125,50,0.3);}';
        document.head.appendChild(style);
    }

    document.getElementById('avatarPromptLater').onclick = function() {
        sessionStorage.setItem('sq_avatar_prompt_shown', '1');
        overlay.remove();
    };
    document.getElementById('avatarPromptGo').onclick = function() {
        sessionStorage.setItem('sq_avatar_prompt_shown', '1');
        window.location.href = '/liuyanban/profile.html?view=avatar';
    };
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            sessionStorage.setItem('sq_avatar_prompt_shown', '1');
            overlay.remove();
        }
    });
}
window.showAvatarPrompt = showAvatarPrompt;

// 自动检查：每个浏览器会话只弹一次
(function autoAvatarCheck() {
    function tryCheck() {
        // 未登录 → 不弹
        var user = typeof getSessionUser === 'function' ? getSessionUser() : null;
        if (!user || !user.id) return;

        // 已经在 profile 页 → 不弹（用户本来就在设置）
        if (window.location.pathname.indexOf('profile.html') >= 0) return;

        // 已有自定义头像（http 开头）→ 不弹
        if (user.avatar_url && user.avatar_url.indexOf('http') === 0) return;

        // 本次会话已弹过 → 不弹
        if (sessionStorage.getItem('sq_avatar_prompt_shown') === '1') return;

        showAvatarPrompt();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(tryCheck, 900);
        });
    } else {
        setTimeout(tryCheck, 900);
    }
})();