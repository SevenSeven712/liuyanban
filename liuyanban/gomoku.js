liuyanban/gomoku.js，总共 274 行，都在这儿：

/* ============================================================
   gomoku.js — 五子棋实时联机模块
   用法：
     window.Gomoku.open({ roomId, sb, user, onClose });
     window.Gomoku.close();
     window.Gomoku.reset();
============================================================ */
(function (global) {
  'use strict';

  var state = {
    game: null,
    channel: null,
    roomId: null,
    sb: null,
    user: null,
    onClose: null
  };

  /* ---------- 工具 ---------- */
  function $(id) { return document.getElementById(id); }

  function emptyBoard() {
    var b = [];
    for (var i = 0; i < 15; i++) {
      var row = [];
      for (var j = 0; j < 15; j++) row.push(null);
      b.push(row);
    }
    return b;
  }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toast(msg) {
    if (typeof global.showToast === 'function') {
      global.showToast(msg);
    } else {
      // 兜底
      var t = document.getElementById('toast');
      if (!t) return;
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(window.__gmkToastTimer);
      window.__gmkToastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
    }
  }

  /* ---------- 渲染 ---------- */
  function renderPlayers() {
    var el = $('gomokuPlayers');
    if (!el) return;
    var g = state.game;
    if (!g) {
      el.innerHTML = '<button class="gmk-start" onclick="window.Gomoku.create()">发起五子棋对局</button>';
      return;
    }
    var bn = g.black_name || '虚位以待';
    var wn = g.white_name || '虚位以待';
    var extra = '';
    if (g.status === 'waiting') {
      var meIn = g.black_id === state.user.id || g.white_id === state.user.id;
      if (!meIn && (!g.black_id || !g.white_id)) {
        extra = '<button class="gmk-start" onclick="window.Gomoku.join()">加入对局</button>';
      }
    } else if (g.status === 'finished') {
      extra = '<button class="gmk-start" onclick="window.Gomoku.reset()">再来一局</button>';
    }
    el.innerHTML =
      '<div class="gmk-player"><span class="gmk-dot black"></span>' + esc(bn) + '</div>' +
      '<div class="gmk-player"><span class="gmk-dot white"></span>' + esc(wn) + '</div>' +
      extra;
  }

  function renderStatus() {
    var el = $('gomokuStatus');
    if (!el) return;
    var g = state.game;
    if (!g) { el.textContent = '还没有对局，点击下方按钮发起一局'; return; }
    if (g.status === 'waiting') { el.textContent = '等待玩家加入…'; return; }
    if (g.status === 'playing') {
      var my = g.black_id === state.user.id ? 'black' : (g.white_id === state.user.id ? 'white' : null);
      if (my) el.textContent = (g.turn === my) ? '轮到你落子' : '等待对方落子…';
      else el.textContent = (g.turn === 'black' ? '黑方' : '白方') + ' 思考中…';
      return;
    }
    if (g.status === 'finished') {
      var w = g.winner === 'black' ? (g.black_name || '黑方') : (g.white_name || '白方');
      el.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f0b429" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px;margin-right:2px;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg><b>' + esc(w) + '</b> 获胜！';
    }
  }

  function renderBoard() {
    var el = $('gomokuBoard');
    if (!el) return;
    var g = state.game;
    if (!g || !g.board) { el.innerHTML = ''; return; }
    var board = g.board, html = '';
    for (var r = 0; r < 15; r++) {
      for (var c = 0; c < 15; c++) {
        var v = (board[r] && board[r][c]) || null;
        var cls = v === 'b' ? 'black' : (v === 'w' ? 'white' : '');
        html += '<div class="gmk-cell" data-r="' + r + '" data-c="' + c + '">' +
          (v ? '<span class="gmk-stone ' + cls + '"></span>' : '') +
          '</div>';
      }
    }
    el.innerHTML = html;
    el.querySelectorAll('.gmk-cell').forEach(function (cell) {
      cell.onclick = function () {
        placeStone(parseInt(this.dataset.r, 10), parseInt(this.dataset.c, 10));
      };
    });
  }

  function render() {
    renderPlayers();
    renderStatus();
    renderBoard();
  }

  /* ---------- 数据 ---------- */
  async function loadGame() {
    if (!state.sb || !state.roomId) { state.game = null; return; }
    try {
      var res = await state.sb.from('gomoku_games')
        .select('*')
        .eq('room_id', state.roomId)
        .order('created_at', { ascending: false })
        .limit(1);
      if (res.error) throw res.error;
      state.game = (res.data && res.data.length) ? res.data[0] : null;
    } catch (e) {
      state.game = null;
    }
  }

  function subscribe() {
    if (!state.sb || !state.roomId) return;
    unsubscribe();
    state.channel = state.sb.channel('sq-gomoku-' + state.roomId + '-' + Date.now())
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'gomoku_games',
        filter: 'room_id=eq.' + state.roomId
      }, function (payload) {
        if (payload.eventType === 'DELETE') state.game = null;
        else state.game = payload.new;
        render();
      })
      .subscribe();
  }

  function unsubscribe() {
    if (state.channel && state.sb) {
      state.sb.removeChannel(state.channel);
      state.channel = null;
    }
  }

  /* ---------- 游戏逻辑 ---------- */
  async function createGame() {
    if (!state.sb || !state.roomId) return;
    try {
      var res = await state.sb.from('gomoku_games').insert([{
        room_id: state.roomId,
        board: emptyBoard(),
        black_id: null, black_name: null,
        white_id: null, white_name: null,
        turn: 'black', status: 'waiting', winner: null
      }]).select().single();
      if (res.error) throw res.error;
      state.game = res.data;
      render();
    } catch (e) { toast('创建失败：' + e.message); }
  }

  async function joinGame() {
    var g = state.game;
    if (!g) return;
    var patch = {};
    if (!g.black_id) {
      patch.black_id = state.user.id;
      patch.black_name = state.user.nickname;
    } else if (!g.white_id && g.black_id !== state.user.id) {
      patch.white_id = state.user.id;
      patch.white_name = state.user.nickname;
    } else {
      toast('对局已满员'); return;
    }
    var hasB = patch.black_id || g.black_id;
    var hasW = patch.white_id || g.white_id;
    if (hasB && hasW) patch.status = 'playing';
    try {
      var res = await state.sb.from('gomoku_games').update(patch).eq('id', g.id).select().single();
      if (res.error) throw res.error;
      state.game = res.data;
      render();
    } catch (e) { toast('加入失败：' + e.message); }
  }

  async function resetGame() {
    if (state.game && state.sb) {
      try { await state.sb.from('gomoku_games').delete().eq('id', state.game.id); } catch (e) {}
    }
    state.game = null;
    await createGame();
  }

  function checkWin(board, r, c, color) {
    var dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (var d = 0; d < dirs.length; d++) {
      var dr = dirs[d][0], dc = dirs[d][1], cnt = 1;
      for (var s = -1; s <= 1; s += 2) {
        var rr = r + dr * s, cc = c + dc * s;
        while (rr >= 0 && rr < 15 && cc >= 0 && cc < 15 && board[rr][cc] === color) {
          cnt++; rr += dr * s; cc += dc * s;
        }
      }
      if (cnt >= 5) return true;
    }
    return false;
  }

  async function placeStone(r, c) {
    var g = state.game;
    if (!g || !state.sb) return;
    if (g.status !== 'playing') { toast('对局尚未开始'); return; }
    var my = g.black_id === state.user.id ? 'black' : (g.white_id === state.user.id ? 'white' : null);
    if (!my) { toast('你不是本局玩家'); return; }
    if (g.turn !== my) { toast('还没轮到你'); return; }
    if (g.board[r][c]) return;

    var board = g.board.map(function (row) { return row.slice(); });
    var stone = my === 'black' ? 'b' : 'w';
    board[r][c] = stone;
    var won = checkWin(board, r, c, stone);
    var patch = { board: board, turn: my === 'black' ? 'white' : 'black' };
    if (won) { patch.status = 'finished'; patch.winner = my; }

    try {
      var res = await state.sb.from('gomoku_games').update(patch).eq('id', g.id).select().single();
      if (res.error) throw res.error;
      state.game = res.data;
      render();
    } catch (e) { toast('落子失败：' + e.message); }
  }

  /* ---------- 对外 API ---------- */
  global.Gomoku = {
    async open(opts) {
      state.roomId = opts.roomId;
      state.sb = opts.sb;
      state.user = opts.user;
      state.onClose = opts.onClose || null;
      await loadGame();
      render();
      subscribe();
    },
    close() {
      unsubscribe();
      state.roomId = null;
      state.game = null;
      if (typeof state.onClose === 'function') state.onClose();
    },
    reset() { resetGame(); },
    create() { createGame(); },
    join() { joinGame(); }
  };
})(window);

(全文 274 行都在这儿了)