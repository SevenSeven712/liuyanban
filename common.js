// ============================================================
// 初始化 Supabase 客户端（确保全局可用）
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
    const stored = localStorage.getItem('sq_user_session');
    if (stored) {
        try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
}

function setSessionUser(user) {
    localStorage.setItem('sq_user_session', JSON.stringify(user));
}

function clearSession() {
    localStorage.removeItem('sq_user_session');
}

// ============================================================
// 通用工具函数
// ============================================================
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } [c];
    });
}

function getUserAvatar(user) {
    if (user && user.avatar_url) return user.avatar_url;
    const name = user ? user.nickname : 'U';
    const color = '#2e7d32';
    const initial = name.charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" fill="${color}" rx="50"/>
        <text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">${initial}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// ============================================================
// 渲染头部（同步）
// ============================================================
function renderHeader(title, activeTab) {
    const user = getSessionUser();
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    let userAreaHtml = '';
    if (user && user.id) {
        const avatar = user.avatar_url || getUserAvatar(user);
        const displayName = user.nickname || '用户';
        userAreaHtml = `
            <div class="user-area" onclick="window.location.href='profile.html'">
                <div class="avatar" style="${avatar && avatar.startsWith('http') ? `background-image:url(${avatar});background-size:cover;background-position:center;` : ''}">${avatar && !avatar.startsWith('http') ? displayName.charAt(0).toUpperCase() : ''}</div>
                <span class="user-name">${escapeHtml(displayName)}</span>
                <span class="chevron">▾</span>
            </div>
        `;
    } else {
        userAreaHtml = `<div class="user-area" onclick="window.location.href='index.html'">登录</div>`;
    }

    headerContainer.innerHTML = `
        <div class="app-header">
            <div class="brand" onclick="window.location.href='posts.html'">
                Seven<span>戚</span><small>· ${escapeHtml(title)}</small>
            </div>
            ${userAreaHtml}
        </div>
    `;
}

// ============================================================
// 渲染底部导航（基础版，立即执行，不带红点）
// ============================================================
function renderFooterBase(activeTab) {
    const tabs = [
        { id: 'posts', label: '📰 帖子', href: '/liuyanban/posts.html' },
        { id: 'messages', label: '💌 留言板', href: '/liuyanban/messages.html' },
        { id: 'chats', label: '💬 聊天群', href: '/liuyanban/chats.html' },
        { id: 'profile', label: '👤 个人', href: '/liuyanban/profile.html' }
    ];

    let footerHtml = `<div class="app-tabs">`;
    tabs.forEach(tab => {
        const activeClass = (tab.id === activeTab) ? 'active' : '';
        footerHtml += `<a href="${tab.href}" class="tab-btn ${activeClass}" style="position:relative;">
            <span class="tab-icon">${tab.label.split(' ')[0]}</span>
            ${tab.label.split(' ').slice(1).join(' ')}
        </a>`;
    });
    footerHtml += `</div>`;

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    }
}

// ============================================================
// 获取聊天未读消息数量
// ============================================================
async function getUnreadChatCount(userId) {
    if (!userId || !window.sb) return 0;
    try {
        const { data: userData, error: userError } = await window.sb
            .from('users')
            .select('last_chat_read_at')
            .eq('id', userId)
            .single();
        if (userError) throw userError;

        const lastRead = userData?.last_chat_read_at || new Date(0).toISOString();

        const { count, error } = await window.sb
            .from('chats')
            .select('*', { count: 'exact', head: true })
            .gt('created_at', lastRead)
            .neq('user_id', userId);
        if (error) throw error;
        return count || 0;
    } catch (e) {
        console.error('获取未读聊天数失败:', e);
        return 0;
    }
}

// ============================================================
// 更新底部聊天红点
// ============================================================
async function updateChatBadge(activeTab) {
    const user = getSessionUser();
    if (!user || !user.id || !window.sb) return;

    if (!activeTab) {
        activeTab = document.querySelector('.tab-btn.active')?.getAttribute('href')?.replace('.html', '') || 'chats';
    }

    let unreadChatCount = 0;
    try {
        unreadChatCount = await getUnreadChatCount(user.id);
    } catch (e) {
        console.error('更新红点失败:', e);
        return;
    }

    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    const chatTab = footerContainer.querySelector('a[href="chats.html"]');
    if (!chatTab) return;

    if (unreadChatCount > 0) {
        const oldBadge = chatTab.querySelector('.badge');
        if (oldBadge) oldBadge.remove();
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.cssText = 'position:absolute;top:-2px;right:15%;background:#e57373;color:#fff;font-size:0.5em;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center;transform:translateY(-2px);';
        badge.textContent = unreadChatCount > 9 ? '9+' : unreadChatCount;
        chatTab.appendChild(badge);
    } else {
        const oldBadge = chatTab.querySelector('.badge');
        if (oldBadge) oldBadge.remove();
    }
}

// ============================================================
// 渲染底部导航（先显示基础，再异步更新红点）
// ============================================================
function renderFooter(activeTab) {
    renderFooterBase(activeTab);
    if (getSessionUser() && window.sb) {
        updateChatBadge(activeTab);
    }
}

// ============================================================
// 更新最后查看聊天的时间
// ============================================================
async function updateLastChatRead(userId) {
    if (!userId || !window.sb) return;
    try {
        await window.sb
            .from('users')
            .update({ last_chat_read_at: new Date().toISOString() })
            .eq('id', userId);
    } catch (e) {
        console.error('更新最后查看时间失败:', e);
    }
}

// ============================================================
// 提醒音效播放（使用 Web Audio API，短促提示音）
// ============================================================
function playReminderSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.28);
        setTimeout(() => ctx.close(), 400);
    } catch (e) {
        console.log('音效播放失败:', e);
    }
}

// 获取音效开关状态
function getSoundEnabled() {
    return localStorage.getItem('sq_sound_enabled') !== 'false';
}

// ============================================================
// 顶部消息提醒横幅
// ============================================================
let chatNotificationBanner = null;

function showChatNotificationBanner() {
    // 移除已有横幅
    if (chatNotificationBanner) {
        chatNotificationBanner.remove();
        clearTimeout(chatNotificationBanner._timeout);
        chatNotificationBanner = null;
    }

    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #2e7d32;
        color: white;
        padding: 12px 28px;
        border-radius: 50px;
        z-index: 99999;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
        font-family: "Space Grotesk", "PingFang SC", "Segoe UI", system-ui, sans-serif;
        font-weight: 600;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
    `;
    banner.textContent = '🔔 收到一条新消息';
    banner.addEventListener('click', () => {
        window.location.href = 'chats.html';
        banner.remove();
        clearTimeout(banner._timeout);
        chatNotificationBanner = null;
    });

    document.body.appendChild(banner);
    chatNotificationBanner = banner;

    // 3秒后自动关闭
    banner._timeout = setTimeout(() => {
        banner.remove();
        if (chatNotificationBanner === banner) chatNotificationBanner = null;
    }, 3000);
}

// 添加横幅动画样式（仅一次）
(function injectBannerStyles() {
    if (document.getElementById('banner-animation-styles')) return;
    const style = document.createElement('style');
    style.id = 'banner-animation-styles';
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();

// ============================================================
// 全局聊天实时监听（支持用户变化重新订阅）
// ============================================================
let globalChatChannel = null;
let globalChatListenerInitialized = false;

async function initializeGlobalChatListener() {
    const user = getSessionUser();
    if (!user || !user.id) return; // 未登录不监听

    // 如果已经存在订阅，先移除旧订阅
    if (globalChatChannel) {
        await window.sb.removeChannel(globalChatChannel);
        globalChatChannel = null;
        globalChatListenerInitialized = false;
    }

    if (globalChatListenerInitialized) return;

    globalChatChannel = window.sb.channel('global-chats-listener-' + user.id)
        .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'chats' }, 
            (payload) => {
                const newMsg = payload.new;
                if (!newMsg) return;

                // 忽略自己发送的消息
                if (newMsg.user_id === user.id) return;

                // 立即更新红点
                updateChatBadge();

                // 播放音效（如果开启）
                if (getSoundEnabled()) {
                    playReminderSound();
                }

                // 判断当前是否在聊天页面
                const isChatPage = window.location.href.includes('chats.html');
                if (!isChatPage) {
                    showChatNotificationBanner();
                }
            }
        )
        .on('postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'chats' },
            (payload) => {
                // 更新红点（例如撤回消息后未读数可能变化）
                updateChatBadge();
            }
        )
        .subscribe();

    globalChatListenerInitialized = true;
}

// 在页面加载时初始化监听
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGlobalChatListener);
} else {
    initializeGlobalChatListener();
}

// 监听用户切换（例如一键登录或退出登录后重新订阅）
window.addEventListener('storage', function(e) {
    if (e.key === 'sq_user_session') {
        initializeGlobalChatListener();
    }
});