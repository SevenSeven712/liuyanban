// ============================================================
// 初始化 Supabase 客户端
// ============================================================
if (!window.sb) {
    var SUPABASE_URL = "https://ulvhuqtpdafspbdvkogs.supabase.co";
    var SUPABASE_ANON_KEY = "sb_publishable_Ew8kKf2z05kmYIK2XNu00g_dzAirtIM";
    window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ============================================================
// 会话管理
// ============================================================
function getSessionUser() {
    var stored = localStorage.getItem('sq_user_session');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { return null; }
    }
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
        '<text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">' + initial + '</text>' +
        '</svg>';
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

        var avatarStyle = '';
        var avatarContent = '';
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
        '</div>' +
        userAreaHtml +
        '</div>';
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

// 注入 SVG 图标统一样式（只注入一次）
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

// ============================================================
// 渲染底部导航
// ============================================================
function renderFooterBase(activeTab) {
    var tabs = [
        { id: 'posts',    name: '帖子', href: '/liuyanban/posts.html' },
        { id: 'messages', name: '留言板', href: '/liuyanban/messages.html' },
        { id: 'chats',    name: '消息',    href: '/liuyanban/chats.html' },
        { id: 'profile',  name: '个人',    href: '/liuyanban/profile.html' }
    ];

    var footerHtml = '<div class="app-tabs">';
    tabs.forEach(function (tab) {
        var activeClass = (tab.id === activeTab) ? 'active' : '';
        var icon = FOOTER_ICONS[tab.id] || '';
        footerHtml += '<a href="' + tab.href + '" class="tab-btn ' + activeClass + '" style="position:relative;">' +
            '<span class="tab-icon">' + icon + '</span>' +
            escapeHtml(tab.name) +
            '</a>';
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

async function updateChatBadge(activeTab) {
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
    if (getSessionUser() && window.sb) updateChatBadge(activeTab);
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
    banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);animation:slideDown 0.3s ease;font-family:"Space Grotesk","PingFang SC","Segoe UI",system-ui,sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
    banner.textContent = '🔔 收到一条新消息';
    banner.addEventListener('click', function () {
        window.location.href = '/liuyanban/chats.html';
        banner.remove();
    });
    document.body.appendChild(banner);
    chatNotificationBanner = banner;
    banner._timeout = setTimeout(function () { banner.remove(); chatNotificationBanner = null; }, 3000);
}

(function injectBannerStyles() {
    if (document.getElementById('banner-animation-styles')) return;
    var style = document.createElement('style');
    style.id = 'banner-animation-styles';
    style.textContent = '@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}';
    document.head.appendChild(style);
})();

// ============================================================
// 全局聊天实时监听
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
    banner.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:#fff;padding:12px 28px;border-radius:50px;z-index:99999;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:"Space Grotesk","PingFang SC","Segoe UI",system-ui,sans-serif;font-weight:600;font-size:0.9em;display:flex;align-items:center;gap:8px;white-space:nowrap;';
    banner.textContent = text || '🔔 收到新消息';
    banner.addEventListener('click', function () {
        window.location.href = '/liuyanban/profile.html?view=messages';
        banner.remove();
        clearTimeout(topBannerTimeout);
    });
    document.body.appendChild(banner);
    topBannerTimeout = setTimeout(function () { banner.remove(); }, 5000);
}