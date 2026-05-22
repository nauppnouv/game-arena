/* ==========================================
   GAME ARENA — Engine + AI + App Controller
   Tic-Tac-Toe | Caro | Battleship
   ========================================== */

import { SHIP_TYPES, BattleshipEngine } from './battleshipEngine.js';
import { BattleshipAI } from './battleshipAI.js';

// ===== TRANSLATIONS DICTIONARY =====
const TRANSLATIONS = {
    vi: {
        "page-title": "Game Arena | Caro, Tic-Tac-Toe & Battleship",
        "subtitle": "Trải nghiệm Game Cờ Cao Cấp",
        "select-mode": "Chọn chế độ chơi",
        "classic-desc": "Tic-Tac-Toe cổ điển<br>3 ô liên tiếp để thắng",
        "classic-badge": "Cơ bản",
        "caro-desc": "Bàn cờ khổng lồ<br>5 ô liên tiếp để thắng",
        "caro-badge": "Sử thi",
        "battleship-desc": "Hải chiến chiến thuật<br>Tìm và đánh chìm hạm đội",
        "battleship-badge": "Chiến thuật",
        "players-count": "Số người chơi",
        "btn-1p": "Chơi với Máy",
        "btn-2p": "2 Người chơi",
        "btn-online": "Chơi Online",
        "ai-difficulty": "Độ khó AI",
        "difficulty-easy": "Dễ",
        "difficulty-medium": "Trung bình",
        "difficulty-hard": "Khó",
        "start-btn": "BẮT ĐẦU CHƠI",
        "back-menu": "Menu",
        "restart-btn": "Chơi lại",
        "score-draw-label": "Hòa",
        "move-counter": "Nước đi",
        "bs-select-ship": "Chọn tàu để đặt",
        "ship-carrier": "Tàu sân bay",
        "ship-battleship": "Thiết giáp hạm",
        "ship-cruiser": "Tuần dương hạm",
        "ship-submarine": "Tàu ngầm",
        "ship-destroyer": "Khu trục hạm",
        "ship-size-5": "5 ô",
        "ship-size-4": "4 ô",
        "ship-size-3": "3 ô",
        "ship-size-2": "2 ô",
        "bs-action-rotate": "Xoay",
        "bs-action-random": "Ngẫu nhiên",
        "bs-action-clear": "Xóa",
        "bs-your-fleet": "Hạm đội của bạn",
        "bs-enemy-fleet": "Vùng biển địch",
        "bs-start-battle": "BẮT ĐẦU TRẬN CHIẾN",
        "play-again": "Chơi lại",
        "menu-btn": "Về menu",
        "switch-ready": "Sẵn sàng",
        "online-lobby": "PHÒNG CHỜ ONLINE",
        "lobby-status-init": "Kết nối mạng hàng hải P2P",
        "create-room-title": "TẠO PHÒNG MỚI",
        "create-room-desc": "Tạo phòng và gửi link cho bạn bè để cùng chơi.",
        "create-room-btn": "Tạo Phòng Chơi",
        "room-id-label": "Mã phòng:",
        "room-link-hint": "Đang đợi đối thủ kết nối...",
        "lobby-or": "HOẶC",
        "join-room-title": "THAM GIA PHÒNG",
        "join-room-desc": "Nhập mã phòng của bạn bè để tham gia.",
        "room-input-placeholder": "Mã phòng (e.g. 123456)",
        "join-room-btn": "Vào Phòng",
        "ai-thinking-text": "AI đang suy nghĩ...",
        // Dynamic labels (for JS)
        "turn-x": "Lượt của X",
        "turn-o": "Lượt của O",
        "turn-you": "Lượt của bạn",
        "turn-ai": "Lượt của AI",
        "turn-p1": "Lượt của Người chơi 1",
        "turn-p2": "Lượt của Người chơi 2",
        "turn-opponent": "Lượt của đối thủ (Online)",
        "win-x": "X Thắng! 🎉",
        "win-o": "O Thắng! 🎉",
        "win-you": "Bạn Thắng! 🎉",
        "win-ai": "AI Thắng! 💀",
        "win-p1": "Người chơi 1 Thắng! 🎉",
        "win-p2": "Người chơi 2 Thắng! 🎉",
        "win-opponent": "Đối thủ Thắng! 💀",
        "draw-msg": "Hòa! 🤝",
        "draw-title": "Hòa!",
        "draw-sub": "Trận đấu kết thúc hòa!",
        "you-win-sub": "Tuyệt vời! Bạn đã chiến thắng!",
        "ai-win-sub": "AI đã thắng! Thử lại nhé!",
        "p-win-sub": "Chúc mừng {name}!",
        "opponent-disconnected": "Đối thủ đã ngắt kết nối! 🔌",
        "rematch-requested": "Đối thủ muốn chơi lại. Chấp nhận?",
        "rematch-sent": "Đã gửi yêu cầu chơi lại. Đang đợi...",
        "bs-place-status": "Đặt tàu của bạn lên bàn cờ",
        "bs-place-status-p1": "Đặt tàu của Người chơi 1",
        "bs-place-status-p2": "Đặt tàu của Người chơi 2",
        "bs-place-ready-p1": "Hạm đội P1 sẵn sàng! P2 chuẩn bị.",
        "bs-place-ready-all": "Tất cả tàu đã sẵn sàng! Bắt đầu chiến!",
        "bs-battle-turn-you": "Lượt của bạn — Chọn ô để bắn!",
        "bs-battle-turn-opp": "Lượt của đối thủ...",
        "bs-battle-turn-p1": "Lượt của Người chơi 1 — Chọn ô để bắn!",
        "bs-battle-turn-p2": "Lượt của Người chơi 2 — Chọn ô để bắn!",
        "bs-sunk-you": "💥 Bạn đã đánh chìm tàu đối phương!",
        "bs-sunk-opp": "💀 AI đã đánh chìm tàu của bạn!",
        "bs-sunk-peer": "💀 Đối thủ đã đánh chìm tàu của bạn!",
        "bs-sunk-p1": "💥 Người chơi 1 đánh chìm tàu đối phương!",
        "bs-sunk-p2": "💥 Người chơi 2 đánh chìm tàu đối phương!",
        "bs-hit-you": "🔥 Bạn bắn trúng đích!",
        "bs-hit-opp": "💥 AI bắn trúng tàu bạn!",
        "bs-hit-peer": "💥 Đối thủ bắn trúng tàu bạn!",
        "bs-hit-p1": "🔥 Người chơi 1 bắn trúng đích!",
        "bs-hit-p2": "🔥 Người chơi 2 bắn trúng đích!",
        "bs-miss-you": "💨 Bạn bắn trượt!",
        "bs-miss-opp": "💨 AI bắn trượt!",
        "bs-miss-peer": "💨 Đối thủ bắn trượt!",
        "bs-miss-p1": "💨 Người chơi 1 bắn trượt!",
        "bs-miss-p2": "💨 Người chơi 2 bắn trượt!",
        "bs-ready-btn-p2": "TIẾP TỤC (ĐẶT TÀU NGƯỜI CHƠI 2)",
        "bs-ready-btn-start": "BẮT ĐẦU TRẬN CHIẾN",
        "bs-battle-start-title": "Trận chiến bắt đầu!",
        "bs-battle-start-desc": "Hãy đưa máy cho Người chơi 1 để bắn lượt đầu.",
        "bs-p2-place-title": "Lượt Người chơi 2 đặt tàu",
        "bs-p2-place-desc": "Hãy đưa máy cho Người chơi 2 để thiết lập hạm đội.",
        "bs-p2-turn-title": "Lượt của Người chơi 2",
        "bs-p2-turn-desc": "Hãy chuyển thiết bị cho Người chơi 2.",
        "bs-p1-turn-title": "Lượt của Người chơi 1",
        "bs-p1-turn-desc": "Hãy chuyển thiết bị cho Người chơi 1.",
        "copied": "Đã copy link! 📋",
        "bs-ready-btn-ready": "SẴN SÀNG",
        "bs-ready-btn-waiting": "ĐÃ SẴN SÀNG",
        "bs-place-status-host-waiting": "Đang đợi đối thủ sẵn sàng...",
        "bs-place-status-guest-waiting": "Đang đợi người tạo phòng bắt đầu...",
        "bs-place-status-both-ready": "Cả hai đã sẵn sàng! Nhấn bắt đầu để chiến đấu.",
        "bs-place-status-opp-ready": "Đối thủ đã sẵn sàng! Hãy đặt hết tàu của bạn.",
        "nickname-title": "TÊN CỦA BẠN",
        "nickname-desc": "Nhập biệt danh hiển thị trong trận đấu (tùy chọn)",
        "nickname-placeholder": "Nhập biệt danh của bạn..."
    },
    en: {
        "page-title": "Game Arena | Caro, Tic-Tac-Toe & Battleship",
        "subtitle": "Premium Board Game Experience",
        "select-mode": "Select Game Mode",
        "classic-desc": "Classic Tic-Tac-Toe<br>3 in a row to win",
        "classic-badge": "Classic",
        "caro-desc": "Giant 100x100 Grid<br>5 in a row to win",
        "caro-badge": "Epic",
        "battleship-desc": "Tactical Naval Battle<br>Find and sink the fleet",
        "battleship-badge": "Tactical",
        "players-count": "Players",
        "btn-1p": "Vs Computer",
        "btn-2p": "2 Players Local",
        "btn-online": "Play Online",
        "ai-difficulty": "AI Difficulty",
        "difficulty-easy": "Easy",
        "difficulty-medium": "Medium",
        "difficulty-hard": "Hard",
        "start-btn": "START GAME",
        "back-menu": "Menu",
        "restart-btn": "Restart",
        "score-draw-label": "Draw",
        "move-counter": "Moves",
        "bs-select-ship": "Select Ship to Place",
        "ship-carrier": "Carrier",
        "ship-battleship": "Battleship",
        "ship-cruiser": "Cruiser",
        "ship-submarine": "Submarine",
        "ship-destroyer": "Destroyer",
        "ship-size-5": "5 cells",
        "ship-size-4": "4 cells",
        "ship-size-3": "3 cells",
        "ship-size-2": "2 cells",
        "bs-action-rotate": "Rotate",
        "bs-action-random": "Random",
        "bs-action-clear": "Clear",
        "bs-your-fleet": "Your Fleet",
        "bs-enemy-fleet": "Enemy Fleet",
        "bs-start-battle": "START BATTLE",
        "play-again": "Play Again",
        "menu-btn": "Back to Menu",
        "switch-ready": "Ready",
        "online-lobby": "ONLINE LOBBY",
        "lobby-status-init": "Connecting via P2P Naval Network",
        "create-room-title": "CREATE ROOM",
        "create-room-desc": "Create a room and send the link to your friend.",
        "create-room-btn": "Create Room",
        "room-id-label": "Room Code:",
        "room-link-hint": "Waiting for opponent to connect...",
        "lobby-or": "OR",
        "join-room-title": "JOIN ROOM",
        "join-room-desc": "Enter your friend's room code to join.",
        "room-input-placeholder": "Room Code (e.g. 123456)",
        "join-room-btn": "Join Room",
        "ai-thinking-text": "AI is thinking...",
        // Dynamic labels
        "turn-x": "X's Turn",
        "turn-o": "O's Turn",
        "turn-you": "Your Turn",
        "turn-ai": "AI's Turn",
        "turn-p1": "Player 1's Turn",
        "turn-p2": "Player 2's Turn",
        "turn-opponent": "Opponent's Turn",
        "win-x": "X Wins! 🎉",
        "win-o": "O Wins! 🎉",
        "win-you": "You Win! 🎉",
        "win-ai": "AI Wins! 💀",
        "win-p1": "Player 1 Wins! 🎉",
        "win-p2": "Player 2 Wins! 🎉",
        "win-opponent": "Opponent Wins! 💀",
        "draw-msg": "It's a Draw! 🤝",
        "draw-title": "Draw!",
        "draw-sub": "Game ended in a draw!",
        "you-win-sub": "Awesome! You have won the battle!",
        "ai-win-sub": "AI has won! Try again!",
        "p-win-sub": "Congratulations {name}!",
        "opponent-disconnected": "Opponent disconnected! 🔌",
        "rematch-requested": "Opponent wants a rematch. Accept?",
        "rematch-sent": "Rematch request sent. Waiting...",
        "bs-place-status": "Place your fleet on the grid",
        "bs-place-status-p1": "Place Player 1's fleet",
        "bs-place-status-p2": "Place Player 2's fleet",
        "bs-place-ready-p1": "P1 Fleet is ready! P2 prepare.",
        "bs-place-ready-all": "All ships ready! Let's battle!",
        "bs-battle-turn-you": "Your turn — Select cell to shoot!",
        "bs-battle-turn-opp": "Opponent's turn...",
        "bs-battle-turn-p1": "Player 1's turn — Select cell to shoot!",
        "bs-battle-turn-p2": "Player 2's turn — Select cell to shoot!",
        "bs-sunk-you": "💥 You sunk an enemy ship!",
        "bs-sunk-opp": "💀 AI sunk your ship!",
        "bs-sunk-peer": "💀 Opponent sunk your ship!",
        "bs-sunk-p1": "💥 Player 1 sunk an enemy ship!",
        "bs-sunk-p2": "💥 Player 2 sunk an enemy ship!",
        "bs-hit-you": "🔥 Direct Hit!",
        "bs-hit-opp": "💥 AI hit your ship!",
        "bs-hit-peer": "💥 Opponent hit your ship!",
        "bs-hit-p1": "🔥 Player 1 hit a ship!",
        "bs-hit-p2": "🔥 Player 2 hit a ship!",
        "bs-miss-you": "💨 You Missed!",
        "bs-miss-opp": "💨 AI Missed!",
        "bs-miss-peer": "💨 Opponent Missed!",
        "bs-miss-p1": "💨 Player 1 Missed!",
        "bs-miss-p2": "💨 Player 2 Missed!",
        "bs-ready-btn-p2": "CONTINUE (PLACE P2 SHIPS)",
        "bs-ready-btn-start": "START BATTLE",
        "bs-battle-start-title": "Battle Begins!",
        "bs-battle-start-desc": "Hand device to Player 1 to make first shot.",
        "bs-p2-place-title": "Player 2 Placement",
        "bs-p2-place-desc": "Hand device to Player 2 to set up their fleet.",
        "bs-p2-turn-title": "Player 2's Turn",
        "bs-p2-turn-desc": "Please hand the device to Player 2.",
        "bs-p1-turn-title": "Player 1's Turn",
        "bs-p1-turn-desc": "Please hand the device to Player 1.",
        "copied": "Link copied! 📋",
        "bs-ready-btn-ready": "READY",
        "bs-ready-btn-waiting": "READY",
        "bs-place-status-host-waiting": "Waiting for opponent to be ready...",
        "bs-place-status-guest-waiting": "Waiting for host to start...",
        "bs-place-status-both-ready": "Both players ready! Press start to battle.",
        "bs-place-status-opp-ready": "Opponent is ready! Place all your ships.",
        "nickname-title": "YOUR NICKNAME",
        "nickname-desc": "Enter a nickname for the match (optional)",
        "nickname-placeholder": "Enter your nickname..."
    }
};

// ===== CONSTANTS =====
const PLAYER_X = 'X';
const PLAYER_O = 'O';

const MODE_CONFIG = {
    classic: { size: 3, winLen: 3, label: 'Classic 3×3' },
    caro:    { size: 100, winLen: 5, label: 'Caro 100×100' },
};

// Battleship ship types and engine/AI live in separate modules

const PATTERN_SCORES = {
    FIVE: 10000000, OPEN_FOUR: 1000000, HALF_FOUR: 100000,
    OPEN_THREE: 10000, HALF_THREE: 1000, OPEN_TWO: 500,
    HALF_TWO: 50, OPEN_ONE: 10,
};

// ===== THEME MANAGER =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('game-theme') || 'dark';
        this.apply();
        this.bindToggle();
    }
    apply() {
        document.documentElement.setAttribute('data-theme', this.theme === 'light' ? 'light' : '');
        if (this.theme !== 'light') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', 'light');
    }
    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('game-theme', this.theme);
        this.apply();
        // Notify canvas renderers to redraw
        window.dispatchEvent(new Event('themechange'));
    }
    bindToggle() {
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.addEventListener('click', () => this.toggle());
    }
    isDark() { return this.theme === 'dark'; }
}

// ===== TIC-TAC-TOE / CARO ENGINE =====
class GameEngine {
    constructor(boardSize, winLength) {
        this.boardSize = boardSize;
        this.winLength = winLength;
        this.board = [];
        this.moveHistory = [];
        this.currentPlayer = PLAYER_X;
        this.gameOver = false;
        this.winner = null;
        this.winCells = [];
        this.reset();
    }
    reset() {
        this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(null));
        this.moveHistory = [];
        this.currentPlayer = PLAYER_X;
        this.gameOver = false;
        this.winner = null;
        this.winCells = [];
    }
    makeMove(row, col) {
        if (this.gameOver || this.board[row][col] !== null) return false;
        this.board[row][col] = this.currentPlayer;
        this.moveHistory.push({ row, col, player: this.currentPlayer });
        const winResult = this.checkWin(row, col);
        if (winResult) { this.gameOver = true; this.winner = this.currentPlayer; this.winCells = winResult; return true; }
        if (this.checkDraw()) { this.gameOver = true; this.winner = null; return true; }
        this.currentPlayer = this.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        return true;
    }
    checkWin(row, col) {
        const player = this.board[row][col];
        if (!player) return null;
        const dirs = [[0,1],[1,0],[1,1],[1,-1]];
        for (const [dr, dc] of dirs) {
            const cells = [{ row, col }];
            for (let i = 1; i < this.winLength; i++) {
                const r = row + dr * i, c = col + dc * i;
                if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === player) cells.push({ row: r, col: c });
                else break;
            }
            for (let i = 1; i < this.winLength; i++) {
                const r = row - dr * i, c = col - dc * i;
                if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === player) cells.push({ row: r, col: c });
                else break;
            }
            if (cells.length >= this.winLength) return cells;
        }
        return null;
    }
    checkDraw() { return this.moveHistory.length >= this.boardSize * this.boardSize; }
}

// ===== TIC-TAC-TOE / CARO AI =====
class AIEngine {
    constructor() { this.nodesEvaluated = 0; }

    getBestMove(engine, aiPlayer, difficulty) {
        this.nodesEvaluated = 0;
        const immediate = this.getImmediateMove(engine, aiPlayer);
        if (immediate) return immediate;
        if (engine.boardSize === 3) return this.minimax3x3(engine, aiPlayer, difficulty);
        return this.heuristicSearch(engine, aiPlayer, difficulty);
    }

    getImmediateMove(engine, aiPlayer) {
        const opp = aiPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        const cands = engine.boardSize > 10 ? this.getCandidateMoves(engine) : this.getAllEmpty(engine);
        for (const m of cands) { engine.board[m.row][m.col] = aiPlayer; if (engine.checkWin(m.row, m.col)) { engine.board[m.row][m.col] = null; return m; } engine.board[m.row][m.col] = null; }
        for (const m of cands) { engine.board[m.row][m.col] = opp; if (engine.checkWin(m.row, m.col)) { engine.board[m.row][m.col] = null; return m; } engine.board[m.row][m.col] = null; }
        return null;
    }

    minimax3x3(engine, aiPlayer, difficulty) {
        if (difficulty === 'easy') return this.randomMove(engine);
        const depth = difficulty === 'medium' ? 4 : 9;
        let best = -Infinity, bestMove = null;
        for (const m of this.getAllEmpty(engine)) {
            engine.board[m.row][m.col] = aiPlayer;
            engine.moveHistory.push({ row: m.row, col: m.col, player: aiPlayer });
            const s = this.mmRec(engine, depth - 1, false, -Infinity, Infinity, aiPlayer);
            engine.moveHistory.pop(); engine.board[m.row][m.col] = null;
            if (s > best) { best = s; bestMove = m; }
        }
        return bestMove;
    }

    mmRec(engine, depth, isMax, alpha, beta, aiPlayer) {
        this.nodesEvaluated++;
        const opp = aiPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        const last = engine.moveHistory[engine.moveHistory.length - 1];
        if (last) { const w = engine.checkWin(last.row, last.col); if (w) return last.player === aiPlayer ? 1000 + depth : -1000 - depth; }
        if (engine.moveHistory.length >= engine.boardSize * engine.boardSize || depth <= 0) return 0;
        const player = isMax ? aiPlayer : opp;
        if (isMax) {
            let mx = -Infinity;
            for (const m of this.getAllEmpty(engine)) {
                engine.board[m.row][m.col] = player; engine.moveHistory.push({ row: m.row, col: m.col, player });
                mx = Math.max(mx, this.mmRec(engine, depth - 1, false, alpha, beta, aiPlayer));
                engine.moveHistory.pop(); engine.board[m.row][m.col] = null;
                alpha = Math.max(alpha, mx); if (beta <= alpha) break;
            }
            return mx;
        } else {
            let mn = Infinity;
            for (const m of this.getAllEmpty(engine)) {
                engine.board[m.row][m.col] = player; engine.moveHistory.push({ row: m.row, col: m.col, player });
                mn = Math.min(mn, this.mmRec(engine, depth - 1, true, alpha, beta, aiPlayer));
                engine.moveHistory.pop(); engine.board[m.row][m.col] = null;
                beta = Math.min(beta, mn); if (beta <= alpha) break;
            }
            return mn;
        }
    }

    heuristicSearch(engine, aiPlayer, difficulty) {
        const cands = this.getCandidateMoves(engine);
        const opp = aiPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        if (cands.length === 0) { const c = Math.floor(engine.boardSize / 2); return { row: c, col: c }; }
        if (difficulty === 'easy') { const good = cands.filter(m => this.moveH(engine, m.row, m.col, aiPlayer) > 500); if (good.length > 0 && Math.random() < 0.5) return good[Math.floor(Math.random() * good.length)]; return cands[Math.floor(Math.random() * cands.length)]; }
        const scored = cands.map(m => ({ ...m, score: this.moveH(engine, m.row, m.col, aiPlayer) + this.moveH(engine, m.row, m.col, opp) * 1.1 }));
        scored.sort((a, b) => b.score - a.score);
        if (difficulty === 'medium') return scored[0];
        // Hard: 2-ply
        const top = scored.slice(0, 10);
        let bestScore = -Infinity, bestMove = top[0];
        for (const mv of top) {
            engine.board[mv.row][mv.col] = aiPlayer;
            engine.moveHistory.push({ row: mv.row, col: mv.col, player: aiPlayer });
            if (engine.checkWin(mv.row, mv.col)) { engine.moveHistory.pop(); engine.board[mv.row][mv.col] = null; return mv; }
            const oc = this.getCandidateMoves(engine);
            const os = oc.map(om => ({ ...om, score: this.moveH(engine, om.row, om.col, opp) + this.moveH(engine, om.row, om.col, aiPlayer) * 1.1 }));
            os.sort((a, b) => b.score - a.score);
            const worst = os.length > 0 ? os[0].score : 0;
            const net = mv.score * 1.5 - worst;
            engine.moveHistory.pop(); engine.board[mv.row][mv.col] = null;
            if (net > bestScore) { bestScore = net; bestMove = mv; }
        }
        return bestMove;
    }

    moveH(engine, row, col, player) {
        const { board, boardSize, winLength } = engine;
        let score = 0;
        for (const [dr, dc] of [[0,1],[1,0],[1,1],[1,-1]]) {
            let count = 1, open = 0;
            let r = row + dr, c = col + dc;
            while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) { count++; r += dr; c += dc; }
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === null) open++;
            r = row - dr; c = col - dc;
            while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) { count++; r -= dr; c -= dc; }
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === null) open++;
            score += this.pScore(count, open, winLength);
        }
        const center = boardSize / 2;
        score += Math.max(0, boardSize - Math.abs(row - center) - Math.abs(col - center)) * 2;
        return score;
    }

    pScore(count, open, wl) {
        if (open === 0 && count < wl) return 0;
        if (count >= wl) return PATTERN_SCORES.FIVE;
        if (count === wl - 1) return open === 2 ? PATTERN_SCORES.OPEN_FOUR : PATTERN_SCORES.HALF_FOUR;
        if (count === wl - 2) return open === 2 ? PATTERN_SCORES.OPEN_THREE : PATTERN_SCORES.HALF_THREE;
        if (count === wl - 3 && wl >= 4) return open === 2 ? PATTERN_SCORES.OPEN_TWO : PATTERN_SCORES.HALF_TWO;
        if (count === 1) return open === 2 ? PATTERN_SCORES.OPEN_ONE : 1;
        return 0;
    }

    getAllEmpty(engine) {
        const moves = [];
        for (let r = 0; r < engine.boardSize; r++) for (let c = 0; c < engine.boardSize; c++) if (engine.board[r][c] === null) moves.push({ row: r, col: c });
        return moves;
    }
    getCandidateMoves(engine, radius = 2) {
        const s = new Set();
        for (let r = 0; r < engine.boardSize; r++) for (let c = 0; c < engine.boardSize; c++) if (engine.board[r][c] !== null) for (let dr = -radius; dr <= radius; dr++) for (let dc = -radius; dc <= radius; dc++) { const nr = r + dr, nc = c + dc; if (nr >= 0 && nr < engine.boardSize && nc >= 0 && nc < engine.boardSize && engine.board[nr][nc] === null) s.add(nr * engine.boardSize + nc); }
        return [...s].map(i => ({ row: Math.floor(i / engine.boardSize), col: i % engine.boardSize }));
    }
    randomMove(engine) { const m = engine.boardSize > 10 ? this.getCandidateMoves(engine) : this.getAllEmpty(engine); return m[Math.floor(Math.random() * m.length)]; }
}

// ===== CANVAS RENDERER (100×100) =====
class CanvasRenderer {
    constructor(canvas, container, boardSize) {
        this.canvas = canvas; this.container = container;
        this.ctx = canvas.getContext('2d'); this.boardSize = boardSize;
        this.cellSize = 30; this.padding = 1;
        const total = this.cellSize * boardSize + this.padding * 2;
        canvas.width = total; canvas.height = total;
        this.hoverCell = null; this.lastMoveCell = null; this.winCells = [];
        this.board = null; this.currentPlayer = PLAYER_X; this.disabled = false;
        this._onClick = null;
        this._setup();
        window.addEventListener('themechange', () => this.draw());
    }
    _getColors() {
        const s = getComputedStyle(document.documentElement);
        return {
            bg: s.getPropertyValue('--canvas-bg').trim() || '#111128',
            grid: s.getPropertyValue('--canvas-grid').trim() || 'rgba(255,255,255,0.06)',
            dot: s.getPropertyValue('--text-muted').trim() || 'rgba(255,255,255,0.15)',
            lastMove: s.getPropertyValue('--text-secondary').trim() || 'rgba(255,255,255,0.35)',
        };
    }
    _setup() {
        const getCell = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const sx = this.canvas.width / rect.width, sy = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * sx - this.padding, y = (e.clientY - rect.top) * sy - this.padding;
            return { row: Math.floor(y / this.cellSize), col: Math.floor(x / this.cellSize) };
        };
        this.canvas.addEventListener('mousemove', e => {
            if (this.disabled) return;
            const { row, col } = getCell(e);
            if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize) {
                if (!this.hoverCell || this.hoverCell.row !== row || this.hoverCell.col !== col) { this.hoverCell = { row, col }; this.draw(); }
            } else if (this.hoverCell) { this.hoverCell = null; this.draw(); }
        });
        this.canvas.addEventListener('mouseleave', () => { this.hoverCell = null; this.draw(); });
        this.canvas.addEventListener('click', e => {
            if (this.disabled) return;
            const { row, col } = getCell(e);
            if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize && this._onClick) this._onClick(row, col);
        });
    }
    onClick(cb) { this._onClick = cb; }
    scrollToCell(row, col) {
        const x = col * this.cellSize - this.container.clientWidth / 2 + this.cellSize / 2;
        const y = row * this.cellSize - this.container.clientHeight / 2 + this.cellSize / 2;
        this.container.scrollTo({ left: x, top: y, behavior: 'smooth' });
    }
    draw() {
        const ctx = this.ctx, cs = this.cellSize, pad = this.padding, bs = this.boardSize;
        const colors = this._getColors();
        ctx.fillStyle = colors.bg; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.strokeStyle = colors.grid; ctx.lineWidth = 0.5;
        for (let i = 0; i <= bs; i++) { ctx.beginPath(); ctx.moveTo(pad + i * cs, pad); ctx.lineTo(pad + i * cs, pad + bs * cs); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pad, pad + i * cs); ctx.lineTo(pad + bs * cs, pad + i * cs); ctx.stroke(); }
        const center = Math.floor(bs / 2);
        ctx.fillStyle = colors.dot; ctx.beginPath(); ctx.arc(pad + center * cs + cs / 2, pad + center * cs + cs / 2, 3, 0, Math.PI * 2); ctx.fill();
        if (!this.board) return;
        for (let r = 0; r < bs; r++) for (let c = 0; c < bs; c++) if (this.board[r][c]) this._piece(r, c, this.board[r][c]);
        if (this.lastMoveCell) { const { row, col } = this.lastMoveCell; ctx.strokeStyle = colors.lastMove; ctx.lineWidth = 2; ctx.strokeRect(pad + col * cs + 1, pad + row * cs + 1, cs - 2, cs - 2); }
        for (const cell of this.winCells) {
            const isX = this.board[cell.row][cell.col] === PLAYER_X;
            ctx.fillStyle = isX ? 'rgba(244,63,94,0.25)' : 'rgba(59,130,246,0.25)';
            ctx.fillRect(pad + cell.col * cs, pad + cell.row * cs, cs, cs);
            ctx.strokeStyle = isX ? 'rgba(244,63,94,0.6)' : 'rgba(59,130,246,0.6)';
            ctx.lineWidth = 2; ctx.strokeRect(pad + cell.col * cs + 1, pad + cell.row * cs + 1, cs - 2, cs - 2);
        }
        if (this.hoverCell && this.board[this.hoverCell.row][this.hoverCell.col] === null) this._ghost(this.hoverCell.row, this.hoverCell.col, this.currentPlayer);
    }
    _piece(row, col, player) {
        const ctx = this.ctx, cs = this.cellSize, pad = this.padding;
        const cx = pad + col * cs + cs / 2, cy = pad + row * cs + cs / 2, m = cs * 0.22;
        if (player === PLAYER_X) {
            ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(cx - cs/2 + m, cy - cs/2 + m); ctx.lineTo(cx + cs/2 - m, cy + cs/2 - m); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + cs/2 - m, cy - cs/2 + m); ctx.lineTo(cx - cs/2 + m, cy + cs/2 - m); ctx.stroke();
        } else {
            ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(cx, cy, cs/2 - m, 0, Math.PI * 2); ctx.stroke();
        }
    }
    _ghost(row, col, player) {
        const ctx = this.ctx, cs = this.cellSize, pad = this.padding;
        const cx = pad + col * cs + cs / 2, cy = pad + row * cs + cs / 2, m = cs * 0.22;
        ctx.globalAlpha = 0.2;
        if (player === PLAYER_X) {
            ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(cx - cs/2 + m, cy - cs/2 + m); ctx.lineTo(cx + cs/2 - m, cy + cs/2 - m); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + cs/2 - m, cy - cs/2 + m); ctx.lineTo(cx - cs/2 + m, cy + cs/2 - m); ctx.stroke();
        } else {
            ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, cy, cs/2 - m, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
}

// Battleship engine & AI moved to separate modules: battleshipEngine.js and battleshipAI.js

// ===== CONFETTI =====
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.animationFrame = null;
    }
    start() {
        if (this.running) return;
        this.running = true;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        const colors = ['#f43f5e', '#3b82f6', '#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ec4899'];
        this.particles = [];
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * -this.canvas.height - 20,
                w: 6 + Math.random() * 8,
                h: 6 + Math.random() * 8,
                vx: (Math.random() - 0.5) * 6,
                vy: 2 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
        this.loop();
    }
    stop() {
        this.running = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    loop() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let active = false;
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.x += Math.sin(p.y / 30) * 0.5;
            if (p.y < this.canvas.height + 20) {
                active = true;
            }
            this.ctx.save();
            this.ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            this.ctx.restore();
        }
        if (active) {
            this.animationFrame = requestAnimationFrame(() => this.loop());
        } else {
            this.running = false;
        }
    }
}

class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.engine = null; this.bsEngine = null;
        this.ai = new AIEngine(); this.bsAI = null;
        this.canvasRenderer = null; this.confetti = null;
        this.mode = 'classic'; this.playerMode = 1; this.difficulty = 'medium';
        this.humanPlayer = PLAYER_X; this.aiPlayer = PLAYER_O;
        this.scores = { X: 0, O: 0, draw: 0 };
        this.bsScores = { player: 0, opponent: 0 };
        this.aiThinking = false; this.lastLoser = null; this.isFirstGame = true;
        
        // Battleship placement state
        this.bsCurrentShipIdx = 0; this.bsHorizontal = true;

        // P2P Online Multiplayer State
        this.lang = localStorage.getItem('game-lang') || 'vi';
        this.peer = null;
        this.conn = null;
        this.isHost = false;
        this.onlineGameStarted = false;
        this.mySymbol = null;
        this.opponentBsReady = false;
        this.meBsReady = false;
        this.myCustomName = '';
        this.opponentCustomName = '';
        this.opponentBsBoard = null;
        this.opponentBsShips = null;
        this.rematchRequested = false;
        this.rematchMe = false;

        this._cacheDOM(); 
        this._bindEvents();
        this.translateUI();
        this.checkUrlForRoom();
    }

    _cacheDOM() {
        this.menuScreen = document.getElementById('menu-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.bsScreen = document.getElementById('battleship-screen');
        this.modeCards = document.querySelectorAll('.mode-card');
        this.playerToggleBtns = document.querySelectorAll('#player-toggle .toggle-btn');
        this.difficultySection = document.getElementById('difficulty-section');
        this.difficultyBtns = document.querySelectorAll('#difficulty-toggle .toggle-btn');
        this.startBtn = document.getElementById('start-btn');
        
        // Game screen
        this.boardEl = document.getElementById('board');
        this.boardContainer = document.getElementById('board-container');
        this.canvasContainer = document.getElementById('canvas-container');
        this.canvasEl = document.getElementById('canvas-board');
        this.gameStatus = document.getElementById('game-status');
        this.gameModeLabel = document.getElementById('game-mode-label');
        this.backBtn = document.getElementById('back-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.scoreXEl = document.getElementById('score-x');
        this.scoreOEl = document.getElementById('score-o');
        this.scoreDrawEl = document.getElementById('score-draw');
        this.moveCountEl = document.getElementById('move-count');
        this.playerXCard = document.getElementById('player-x-card');
        this.playerOCard = document.getElementById('player-o-card');
        this.playerXName = document.getElementById('player-x-name');
        this.playerOName = document.getElementById('player-o-name');
        
        // Overlay
        this.gameOverOverlay = document.getElementById('game-over-overlay');
        this.resultIcon = document.getElementById('result-icon');
        this.resultText = document.getElementById('result-text');
        this.resultSub = document.getElementById('result-sub');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.menuBtn = document.getElementById('menu-btn');
        this.confetti = new Confetti(document.getElementById('confetti-canvas'));
        this.aiThinkingEl = document.getElementById('ai-thinking');
        
        // Battleship
        this.bsGameStatus = document.getElementById('bs-status');
        this.bsBackBtn = document.getElementById('bs-back-btn');
        this.bsRestartBtn = document.getElementById('bs-restart-btn');
        this.bsPlacementPhase = document.getElementById('bs-placement-phase');
        this.bsBattlePhase = document.getElementById('bs-battle-phase');
        this.bsShipList = document.getElementById('bs-ship-list');
        this.bsPlaceBoard = document.getElementById('bs-placement-board');
        this.bsRotateBtn = document.getElementById('bs-rotate-btn');
        this.bsRandomBtn = document.getElementById('bs-random-btn');
        this.bsClearBtn = document.getElementById('bs-clear-btn');
        this.bsStartBattle = document.getElementById('bs-start-battle-btn');
        this.bsMyBoard = document.getElementById('bs-own-board');
        this.bsTargetBoard = document.getElementById('bs-enemy-board');
        this.bsMyFleet = document.getElementById('bs-own-fleet-status');
        this.bsEnemyFleet = document.getElementById('bs-enemy-fleet-status');
        this.bsScorePlayer = document.getElementById('bs-score-p1');
        this.bsScoreOpponent = document.getElementById('bs-score-p2');
        this.bsPlayerName = document.getElementById('bs-player1-name');
        this.bsOpponentName = document.getElementById('bs-player2-name');
        this.bsPlayerCard = document.getElementById('bs-player1-card');
        this.bsOpponentCard = document.getElementById('bs-player2-card');
        this.bsP1ReadyBadge = document.getElementById('bs-p1-ready-badge');
        this.bsP2ReadyBadge = document.getElementById('bs-p2-ready-badge');
        
        // Switch overlay
        this.switchOverlay = document.getElementById('switch-player-overlay');
        this.switchText = document.getElementById('switch-title');
        this.switchReadyBtn = document.getElementById('switch-ready-btn');

        // Online Lobby Screen
        this.onlineLobbyScreen = document.getElementById('online-lobby-screen');
        this.lobbyStatus = document.getElementById('lobby-status');
        this.btnCreateRoom = document.getElementById('btn-create-room');
        this.roomInfoArea = document.getElementById('room-info-area');
        this.displayRoomId = document.getElementById('display-room-id');
        this.btnCopyRoom = document.getElementById('btn-copy-room');
        this.lobbyLinkHint = document.getElementById('lobby-link-hint');
        this.inputRoomId = document.getElementById('input-room-id');
        this.inputNickname = document.getElementById('input-nickname');
        this.btnJoinRoom = document.getElementById('btn-join-room');
        this.lobbyErrorMsg = document.getElementById('lobby-error-msg');
        this.lobbyBackBtn = document.getElementById('lobby-back-btn');
        this.langToggleBtn = document.getElementById('lang-toggle');

        // Online Lobby Cards & Ready area
        this.lobbySetupCard = document.getElementById('lobby-setup-card');
        this.lobbyReadyCard = document.getElementById('lobby-ready-card');
        this.btnToggleReady = document.getElementById('btn-toggle-ready');
        this.readyBadgeMe = document.getElementById('ready-badge-me');
        this.readyBadgeOpponent = document.getElementById('ready-badge-opponent');
        this.btnReadyText = document.getElementById('btn-ready-text');
        this.onlineCountdownOverlay = document.getElementById('online-countdown-overlay');
        this.countdownNumber = document.getElementById('countdown-number');

        this.meReady = false;
        this.opponentReady = false;
    }

    _bindEvents() {
        this.modeCards.forEach(card => card.addEventListener('click', () => { 
            this.modeCards.forEach(c => c.classList.remove('selected')); 
            card.classList.add('selected'); 
            this.mode = card.dataset.mode; 
        }));
        
        this.playerToggleBtns.forEach(btn => btn.addEventListener('click', () => { 
            this.playerToggleBtns.forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            this.playerMode = parseInt(btn.dataset.players); 
            this.difficultySection.style.display = this.playerMode === 1 ? 'block' : 'none'; 
        }));
        
        this.difficultyBtns.forEach(btn => btn.addEventListener('click', () => { 
            this.difficultyBtns.forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            this.difficulty = btn.dataset.difficulty; 
        }));
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.backBtn.addEventListener('click', () => {
            if (this.playerMode === 3) {
                this.onlineDisconnectAndReturn();
            } else {
                this.showMenu();
            }
        });
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.playAgainBtn.addEventListener('click', () => { this.hideGameOver(); this.restartGame(); });
        this.menuBtn.addEventListener('click', () => { 
            this.hideGameOver(); 
            if (this.playerMode === 3) {
                this.onlineDisconnectAndReturn();
            } else {
                this.showMenu();
            }
        });
        
        // Battleship
        if (this.bsBackBtn) {
            this.bsBackBtn.addEventListener('click', () => {
                if (this.playerMode === 3) {
                    this.onlineDisconnectAndReturn();
                } else {
                    this.showMenu();
                }
            });
        }
        if (this.bsRestartBtn) this.bsRestartBtn.addEventListener('click', () => this.startBattleship());
        if (this.bsRotateBtn) this.bsRotateBtn.addEventListener('click', () => { 
            this.bsHorizontal = !this.bsHorizontal; 
            this.bsRotateBtn.textContent = this.bsHorizontal 
                ? (this.lang === 'vi' ? '🔄 Ngang' : '🔄 Horiz') 
                : (this.lang === 'vi' ? '🔄 Dọc' : '🔄 Vert'); 
        });
        if (this.bsRandomBtn) this.bsRandomBtn.addEventListener('click', () => this._bsRandomPlace());
        if (this.bsClearBtn) this.bsClearBtn.addEventListener('click', () => this._bsClearPlace());
        if (this.bsStartBattle) this.bsStartBattle.addEventListener('click', () => this._bsStartBattle());
        
        // Keyboard shortcut for rotate
        document.addEventListener('keydown', e => { 
            if (e.key === 'r' || e.key === 'R') { 
                if (this.bsEngine && this.bsEngine.phase === 'placement') { 
                    this.bsHorizontal = !this.bsHorizontal; 
                    if (this.bsRotateBtn) {
                        this.bsRotateBtn.textContent = this.bsHorizontal 
                            ? (this.lang === 'vi' ? '🔄 Ngang' : '🔄 Horiz') 
                            : (this.lang === 'vi' ? '🔄 Dọc' : '🔄 Vert'); 
                    }
                } 
            } 
        });

        // Online Lobby Buttons
        if (this.btnCreateRoom) this.btnCreateRoom.addEventListener('click', () => this.onlineCreateRoom());
        if (this.btnCopyRoom) this.btnCopyRoom.addEventListener('click', () => this.onlineCopyRoomLink());
        if (this.btnJoinRoom) this.btnJoinRoom.addEventListener('click', () => this.onlineJoinRoom());
        if (this.lobbyBackBtn) this.lobbyBackBtn.addEventListener('click', () => this.onlineDisconnectAndReturn());
        if (this.langToggleBtn) this.langToggleBtn.addEventListener('click', () => this.toggleLang());
        if (this.btnToggleReady) this.btnToggleReady.addEventListener('click', () => this.onlineToggleReady());
    }

    // ===== TRANSLATIONS & LOCALIZATION =====
    _getT(key) {
        if (TRANSLATIONS[this.lang] && TRANSLATIONS[this.lang][key]) {
            return TRANSLATIONS[this.lang][key];
        }
        return key;
    }

    translateUI() {
        if (this.langToggleBtn) {
            this.langToggleBtn.textContent = this.lang === 'vi' ? 'ENG' : 'VIE';
        }
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[this.lang] && TRANSLATIONS[this.lang][key]) {
                const text = TRANSLATIONS[this.lang][key];
                if (text.includes('<br>') || text.includes('<span>')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (TRANSLATIONS[this.lang] && TRANSLATIONS[this.lang][key]) {
                el.setAttribute('placeholder', TRANSLATIONS[this.lang][key]);
            }
        });
        
        if (this.engine) {
            this._updateStatus();
            this._updatePlayerNames();
        }
        if (this.bsEngine) {
            this._bsUpdateFleetStatus();
            if (this.bsEngine.phase === 'placement') {
                this._bsUpdatePlacementStatusAndButtons();
            } else if (this.bsEngine.phase === 'battle') {
                if (this.playerMode === 3) {
                    const oppDisplayName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
                    this.bsGameStatus.textContent = this.bsEngine.currentTurn === 'player' 
                        ? this._getT('bs-battle-turn-you') 
                        : (this.lang === 'vi' ? `Lượt của ${oppDisplayName}...` : `${oppDisplayName}'s turn...`);
                } else if (this.playerMode === 2) {
                    this.bsGameStatus.textContent = this.bsEngine.currentTurn === 'player' ? this._getT('bs-battle-turn-p1') : this._getT('bs-battle-turn-p2');
                } else {
                    this.bsGameStatus.textContent = this.bsEngine.currentTurn === 'player' ? this._getT('bs-battle-turn-you') : this._getT('bs-battle-turn-opp');
                }
            }
        }
    }

    toggleLang() {
        this.lang = this.lang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('game-lang', this.lang);
        this.translateUI();
    }

    // ===== GENERAL SCREEN MANAGEMENT =====
    showMenu() {
        this._hideAllScreens();
        this.menuScreen.classList.add('active');
    }

    _hideAllScreens() {
        this.menuScreen.classList.remove('active');
        this.gameScreen.classList.remove('active');
        if (this.bsScreen) this.bsScreen.classList.remove('active');
        if (this.onlineLobbyScreen) this.onlineLobbyScreen.classList.remove('active');
    }

    // ===== GENERAL GAME START =====
    startGame() {
        if (this.playerMode === 3) {
            this.showOnlineLobby();
            return;
        }
        
        if (this.mode === 'battleship') { 
            this.startBattleship(); 
            return; 
        }
        
        const config = MODE_CONFIG[this.mode];
        this.engine = new GameEngine(config.size, config.winLen);
        this.scores = { X: 0, O: 0, draw: 0 };
        this.lastLoser = null; this.isFirstGame = true;
        this._assignFirstPlayer(null);
        
        this._hideAllScreens();
        this.gameScreen.classList.add('active');
        this.gameModeLabel.textContent = config.label;
        this._updatePlayerNames();
        this._updateScores();
        this._setupBoard();
        this._updateStatus();
        
        if (this.playerMode === 1 && this.engine.currentPlayer === this.aiPlayer) {
            this._aiTurn();
        }
    }

    _assignFirstPlayer(loser) {
        if (this.playerMode === 1) {
            if (loser === null || loser === 'draw') {
                if (Math.random() < 0.5) { this.humanPlayer = PLAYER_X; this.aiPlayer = PLAYER_O; }
                else { this.humanPlayer = PLAYER_O; this.aiPlayer = PLAYER_X; }
            } else if (loser === 'human') { this.humanPlayer = PLAYER_X; this.aiPlayer = PLAYER_O; }
            else if (loser === 'ai') { this.humanPlayer = PLAYER_O; this.aiPlayer = PLAYER_X; }
        }
    }

    _updatePlayerNames() {
        if (this.playerMode === 1) {
            const d = this.difficulty === 'easy' ? this._getT('difficulty-easy') : (this.difficulty === 'hard' ? this._getT('difficulty-hard') : this._getT('difficulty-medium'));
            if (this.humanPlayer === PLAYER_X) {
                this.playerXName.textContent = this.lang === 'vi' ? 'Bạn' : 'You';
                this.playerOName.textContent = 'AI (' + d + ')';
            } else {
                this.playerXName.textContent = 'AI (' + d + ')';
                this.playerOName.textContent = this.lang === 'vi' ? 'Bạn' : 'You';
            }
        } else if (this.playerMode === 2) {
            this.playerXName.textContent = this.lang === 'vi' ? 'Người chơi 1' : 'Player 1';
            this.playerOName.textContent = this.lang === 'vi' ? 'Người chơi 2' : 'Player 2';
        } else {
            const myName = this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You');
            const oppName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
            if (this.mySymbol === PLAYER_X) {
                this.playerXName.textContent = myName;
                this.playerOName.textContent = oppName;
            } else {
                this.playerXName.textContent = oppName;
                this.playerOName.textContent = myName;
            }
        }
    }

    restartGame() {
        if (this.playerMode === 3) {
            this.rematchMe = true;
            this.conn.send({ type: 'rematch-request' });
            
            if (this.rematchRequested) {
                this.onlineRestartGameActual();
            } else {
                this.resultSub.textContent = this._getT('rematch-sent');
            }
            return;
        }

        if (this.mode === 'battleship') { this.startBattleship(); return; }
        if (!this.engine) return;
        this.engine.reset(); this.aiThinking = false; this.aiThinkingEl.style.display = 'none';
        
        if (!this.isFirstGame) this._assignFirstPlayer(this.lastLoser);
        this.isFirstGame = false;
        
        this._updatePlayerNames(); this._setupBoard(); this._updateStatus();
        if (this.playerMode === 1 && this.engine.currentPlayer === this.aiPlayer) this._aiTurn();
    }

    _setupBoard() {
        const { boardSize } = this.engine;
        if (boardSize <= 10) {
            this.boardContainer.style.display = 'flex'; this.canvasContainer.style.display = 'none';
            this._buildDOMBoard();
        } else {
            this.boardContainer.style.display = 'none'; this.canvasContainer.style.display = 'block';
            this._buildCanvasBoard();
        }
    }

    _buildDOMBoard() {
        const { boardSize } = this.engine;
        this.boardEl.innerHTML = ''; this.boardEl.className = `board board-${boardSize}`;
        const cellSize = 100, cellFont = '2.5rem';
        for (let r = 0; r < boardSize; r++) for (let c = 0; c < boardSize; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell'; cell.style.setProperty('--cell-size', cellSize + 'px'); cell.style.setProperty('--cell-font', cellFont);
            cell.dataset.hover = this.engine.currentPlayer === PLAYER_X ? '✕' : '○';
            cell.addEventListener('click', () => this._handleCellClick(r, c));
            this.boardEl.appendChild(cell);
        }
    }

    _buildCanvasBoard() {
        this.canvasRenderer = new CanvasRenderer(this.canvasEl, this.canvasContainer, this.engine.boardSize);
        this.canvasRenderer.board = this.engine.board;
        this.canvasRenderer.currentPlayer = this.engine.currentPlayer;
        this.canvasRenderer.onClick((row, col) => this._handleCellClick(row, col));
        this.canvasRenderer.draw();
        const center = Math.floor(this.engine.boardSize / 2);
        setTimeout(() => this.canvasRenderer.scrollToCell(center, center), 100);
    }

    _handleCellClick(row, col) {
        if (this.engine.gameOver || this.aiThinking) return;
        if (this.engine.board[row][col] !== null) return;
        
        if (this.playerMode === 3) {
            if (this.engine.currentPlayer !== this.mySymbol) return;
            this.conn.send({
                type: 'move',
                row: row,
                col: col
            });
        } else if (this.playerMode === 1 && this.engine.currentPlayer !== this.humanPlayer) {
            return;
        }
        
        if (!this.engine.makeMove(row, col)) return;
        this._renderMove(row, col); this._updateStatus();
        if (this.engine.gameOver) { this._handleGameOver(); return; }
        
        if (this.playerMode === 1 && this.engine.currentPlayer === this.aiPlayer) {
            this._aiTurn();
        }
    }

    _aiTurn() {
        this.aiThinking = true; this.aiThinkingEl.style.display = 'flex'; this._setInteraction(false);
        setTimeout(() => {
            const move = this.ai.getBestMove(this.engine, this.aiPlayer, this.difficulty);
            if (!move) { this.aiThinking = false; this.aiThinkingEl.style.display = 'none'; return; }
            this.engine.makeMove(move.row, move.col);
            this._renderMove(move.row, move.col); this._updateStatus();
            this.aiThinking = false; this.aiThinkingEl.style.display = 'none'; this._setInteraction(true);
            if (this.engine.gameOver) this._handleGameOver();
            if (this.canvasRenderer) this.canvasRenderer.scrollToCell(move.row, move.col);
        }, this.engine.boardSize >= 100 ? 150 : 100);
    }

    _renderMove(row, col) {
        const { boardSize } = this.engine;
        const player = this.engine.board[row][col];
        if (boardSize <= 10) {
            const cells = this.boardEl.querySelectorAll('.cell');
            const cell = cells[row * boardSize + col];
            cell.textContent = player === PLAYER_X ? '✕' : '○';
            cell.classList.add('taken', player === PLAYER_X ? 'x-cell' : 'o-cell');
            this.boardEl.querySelectorAll('.last-move').forEach(c => c.classList.remove('last-move'));
            cell.classList.add('last-move');
            this.boardEl.querySelectorAll('.cell:not(.taken)').forEach(c => { 
                c.dataset.hover = this.engine.currentPlayer === PLAYER_X ? '✕' : '○'; 
            });
            if (this.engine.gameOver && this.engine.winCells.length > 0) {
                for (const wc of this.engine.winCells) {
                    cells[wc.row * boardSize + wc.col].classList.add('win-cell');
                }
            }
        } else if (this.canvasRenderer) {
            this.canvasRenderer.board = this.engine.board;
            this.canvasRenderer.currentPlayer = this.engine.currentPlayer;
            this.canvasRenderer.lastMoveCell = { row, col };
            if (this.engine.gameOver && this.engine.winCells.length > 0) this.canvasRenderer.winCells = this.engine.winCells;
            this.canvasRenderer.draw();
        }
        this.moveCountEl.textContent = this.engine.moveHistory.length;
    }

    _updateStatus() {
        if (this.engine.gameOver) {
            const name = this.engine.winner ? this._getName(this.engine.winner) : '';
            this.gameStatus.textContent = this.engine.winner 
                ? (this.playerMode === 3 
                    ? `${name} ${this.lang === 'vi' ? 'Thắng!' : 'Won!'} ${this.engine.winner === this.mySymbol ? '🎉' : '💀'}`
                    : `${name} Thắng! 🎉`) 
                : this._getT('draw-msg');
            this.gameStatus.className = 'game-status' + (this.engine.winner === PLAYER_X ? ' x-turn' : this.engine.winner === PLAYER_O ? ' o-turn' : '');
        } else {
            let turnText = '';
            if (this.playerMode === 3) {
                const name = this._getName(this.engine.currentPlayer);
                turnText = this.lang === 'vi' ? `Lượt của ${name}` : `${name}'s Turn`;
            } else if (this.playerMode === 1) {
                turnText = this.engine.currentPlayer === this.humanPlayer ? this._getT('turn-you') : this._getT('turn-ai');
            } else {
                turnText = this.engine.currentPlayer === PLAYER_X ? this._getT('turn-p1') : this._getT('turn-p2');
            }
            this.gameStatus.textContent = turnText;
            this.gameStatus.className = 'game-status ' + (this.engine.currentPlayer === PLAYER_X ? 'x-turn' : 'o-turn');
        }
        this.playerXCard.classList.toggle('active', this.engine.currentPlayer === PLAYER_X && !this.engine.gameOver);
        this.playerOCard.classList.toggle('active', this.engine.currentPlayer === PLAYER_O && !this.engine.gameOver);
        this.playerXCard.classList.toggle('x-active', this.engine.currentPlayer === PLAYER_X && !this.engine.gameOver);
        this.playerOCard.classList.toggle('o-active', this.engine.currentPlayer === PLAYER_O && !this.engine.gameOver);
    }

    _getName(player) {
        if (this.playerMode === 1) return player === this.humanPlayer ? (this.lang === 'vi' ? 'Bạn' : 'You') : 'AI';
        if (this.playerMode === 2) return player === PLAYER_X ? (this.lang === 'vi' ? 'Người chơi 1' : 'Player 1') : (this.lang === 'vi' ? 'Người chơi 2' : 'Player 2');
        const myName = this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You');
        const oppName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
        return player === this.mySymbol ? myName : oppName;
    }

    _handleGameOver() {
        if (this.engine.winner) {
            this.scores[this.engine.winner]++;
            if (this.playerMode === 3) {
                this.lastLoser = this.engine.winner === this.mySymbol ? 'opponent' : 'me';
            } else {
                this.lastLoser = this.playerMode === 1 ? (this.engine.winner === this.humanPlayer ? 'ai' : 'human') : (this.engine.winner === PLAYER_X ? PLAYER_O : PLAYER_X);
            }
        } else { 
            this.scores.draw++; 
            this.lastLoser = 'draw'; 
        }
        this._updateScores(); this._setInteraction(false);
        setTimeout(() => this._showGameOver(), 800);
    }

    _showGameOver() {
        this.gameOverOverlay.style.display = 'flex';
        
        if (this.playerMode === 3) {
            if (this.engine && this.engine.winner) {
                const iWon = this.engine.winner === this.mySymbol;
                this.resultIcon.textContent = iWon ? '🏆' : '💀';
                this.resultText.textContent = iWon ? (this.lang === 'vi' ? 'Bạn Thắng!' : 'You Win!') : (this.lang === 'vi' ? 'Đối thủ Thắng!' : 'Opponent Wins!');
                this.resultText.className = 'result-text ' + (iWon ? 'x-win' : 'o-win');
                
                if (this.rematchRequested) {
                    this.resultSub.textContent = this._getT('rematch-requested');
                } else {
                    this.resultSub.textContent = iWon ? this._getT('you-win-sub') : this._getT('ai-win-sub');
                }
                if (iWon) this.confetti.start();
            } else if (this.engine) {
                this.resultIcon.textContent = '🤝'; 
                this.resultText.textContent = this._getT('draw-title');
                this.resultText.className = 'result-text draw-result';
                
                if (this.rematchRequested) {
                    this.resultSub.textContent = this._getT('rematch-requested');
                } else {
                    this.resultSub.textContent = this._getT('draw-sub');
                }
            }
            return;
        }

        if (this.engine && this.engine.winner) {
            const isHumanWin = this.playerMode === 1 && this.engine.winner === this.humanPlayer;
            this.resultIcon.textContent = '🏆';
            this.resultText.textContent = `${this._getName(this.engine.winner)} ${this.lang === 'vi' ? 'Thắng!' : 'Wins!'}`;
            this.resultText.className = 'result-text ' + (this.engine.winner === PLAYER_X ? 'x-win' : 'o-win');
            this.resultSub.textContent = this.playerMode === 1 ? (isHumanWin ? this._getT('you-win-sub') : this._getT('ai-win-sub')) : this._getT('p-win-sub').replace('{name}', this._getName(this.engine.winner));
            this.confetti.start();
        } else if (this.engine) {
            this.resultIcon.textContent = '🤝'; 
            this.resultText.textContent = this._getT('draw-title');
            this.resultText.className = 'result-text draw-result';
            this.resultSub.textContent = this._getT('draw-sub');
        }
    }

    _showBSGameOver(playerWon) {
        this.gameOverOverlay.style.display = 'flex';
        this.resultIcon.textContent = playerWon ? '🏆' : '💀';
        
        if (this.playerMode === 3) {
            const myName = this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You');
            const oppName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
            this.resultText.textContent = playerWon 
                ? (this.lang === 'vi' ? `${myName} Thắng!` : `${myName} Wins!`) 
                : (this.lang === 'vi' ? `${oppName} Thắng!` : `${oppName} Wins!`);
            this.resultText.className = 'result-text ' + (playerWon ? 'x-win' : 'o-win');
            
            if (this.rematchRequested) {
                this.resultSub.textContent = this._getT('rematch-requested');
            } else {
                this.resultSub.textContent = playerWon 
                    ? (this.lang === 'vi' ? 'Tuyệt vời! Hạm đội địch đã bị tiêu diệt!' : 'Awesome! Enemy fleet destroyed!') 
                    : (this.lang === 'vi' ? 'Hạm đội của bạn đã bị tiêu diệt!' : 'Your fleet was destroyed!');
            }
        } else {
            this.resultText.textContent = playerWon ? (this.lang === 'vi' ? 'Bạn Thắng!' : 'You Win!') : (this.lang === 'vi' ? 'AI Thắng!' : 'AI Wins!');
            this.resultText.className = 'result-text ' + (playerWon ? 'x-win' : 'o-win');
            this.resultSub.textContent = playerWon ? this._getT('you-win-sub') : this._getT('ai-win-sub');
        }
        if (playerWon) this.confetti.start();
    }

    _bsUpdateHeatmap() {
        if (this.playerMode !== 1) return; 
        
        let heatmap = null;
        try {
            const data = localStorage.getItem('bs-player-placement-heatmap');
            if (data) heatmap = JSON.parse(data);
        } catch (e) {
            console.error('Error loading heatmap', e);
        }
        
        if (!heatmap || !Array.isArray(heatmap) || heatmap.length !== 10) {
            heatmap = Array.from({ length: 10 }, () => Array(10).fill(1.0));
        }
        
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                heatmap[r][c] = heatmap[r][c] * 0.95;
                if (this.bsEngine.playerBoard[r][c] !== null) {
                    heatmap[r][c] += 2.0;
                }
            }
        }
        
        try {
            localStorage.setItem('bs-player-placement-heatmap', JSON.stringify(heatmap));
        } catch (e) {
            console.error('Error saving heatmap', e);
        }
    }

    hideGameOver() { this.gameOverOverlay.style.display = 'none'; this.confetti.stop(); }

    _updateScores() {
        this.scoreXEl.textContent = this.scores.X;
        this.scoreOEl.textContent = this.scores.O;
        this.scoreDrawEl.textContent = this.scores.draw;
    }

    _setInteraction(enabled) {
        if (this.engine && this.engine.boardSize <= 10) {
            this.boardEl.querySelectorAll('.cell:not(.taken)').forEach(c => { 
                if (enabled) c.classList.remove('disabled'); else c.classList.add('disabled'); 
            });
        } else if (this.canvasRenderer) this.canvasRenderer.disabled = !enabled;
    }

    // ===== BATTLESHIP =====
    startBattleship() {
        if (this.bsCountdownInterval) {
            clearInterval(this.bsCountdownInterval);
            this.bsCountdownInterval = null;
        }
        this.bsEngine = new BattleshipEngine();
        this.bsAI = new BattleshipAI(this.difficulty);
        this.bsAI.reset();
        this.bsCurrentShipIdx = 0; this.bsHorizontal = true;
        
        if (this.bsRotateBtn) {
            this.bsRotateBtn.textContent = this.bsHorizontal 
                ? (this.lang === 'vi' ? '🔄 Ngang' : '🔄 Horiz') 
                : (this.lang === 'vi' ? '🔄 Dọc' : '🔄 Vert'); 
        }

        this._hideAllScreens();
        this.bsScreen.classList.add('active');

        // Names setup
        if (this.playerMode === 1) {
            const d = this.difficulty === 'easy' ? this._getT('difficulty-easy') : (this.difficulty === 'hard' ? this._getT('difficulty-hard') : this._getT('difficulty-medium'));
            this.bsPlayerName.textContent = this.lang === 'vi' ? 'Bạn' : 'You';
            this.bsOpponentName.textContent = 'AI (' + d + ')';
        } else if (this.playerMode === 2) {
            this.bsPlayerName.textContent = this.lang === 'vi' ? 'Người chơi 1' : 'Player 1';
            this.bsOpponentName.textContent = this.lang === 'vi' ? 'Người chơi 2' : 'Player 2';
        } else {
            const myName = this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You');
            const oppName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
            this.bsPlayerName.textContent = myName;
            this.bsOpponentName.textContent = oppName;
        }
        
        this.bsScorePlayer.textContent = this.bsScores.player;
        this.bsScoreOpponent.textContent = this.bsScores.opponent;

        // Reset and setup ready badges
        if (this.playerMode === 3) {
            this.bsP1ReadyBadge.style.display = 'block';
            this.bsP2ReadyBadge.style.display = 'block';
        } else {
            if (this.bsP1ReadyBadge) this.bsP1ReadyBadge.style.display = 'none';
            if (this.bsP2ReadyBadge) this.bsP2ReadyBadge.style.display = 'none';
        }

        this.bsPlacementPhase.style.display = 'block';
        this.bsBattlePhase.style.display = 'none';
        
        this.bsPlacingPlayer = 1;
        this.opponentBsReady = false;
        this.meBsReady = false;
        this.opponentBsBoard = null;
        this.opponentBsShips = null;
        
        if (this.playerMode === 3) {
            this._updateReadyBadgesOnline();
        }
        
        this.bsGameStatus.className = 'game-status';

        this._bsBuildShipList();
        this._bsBuildPlacementBoard();
        this._bsUpdatePlacementStatusAndButtons();
    }

    _bsBuildShipList() {
        const activeShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        const items = this.bsShipList.querySelectorAll('.bs-ship-item');
        items.forEach((item, idx) => {
            item.classList.remove('placed');
            if (activeShips.find(s => s.id === SHIP_TYPES[idx].id)) {
                item.classList.add('placed');
            }
            if (idx === this.bsCurrentShipIdx) item.classList.add('selected');
            else item.classList.remove('selected');
            
            item.replaceWith(item.cloneNode(true));
        });
        
        const newItems = this.bsShipList.querySelectorAll('.bs-ship-item');
        newItems.forEach((item, idx) => {
            item.addEventListener('click', () => {
                const currentActiveShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
                if (currentActiveShips.find(s => s.id === SHIP_TYPES[idx].id)) return;
                this.bsCurrentShipIdx = idx;
                newItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            });
        });
    }

    _bsBuildPlacementBoard() {
        this.bsPlaceBoard.innerHTML = '';
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = document.createElement('div');
            cell.className = 'bs-cell';
            cell.dataset.row = r; cell.dataset.col = c;
            cell.addEventListener('click', () => this._bsPlaceShipAt(r, c));
            cell.addEventListener('mouseenter', () => this._bsShowPreview(r, c));
            cell.addEventListener('mouseleave', () => this._bsClearPreview());
            cell.addEventListener('contextmenu', (e) => { 
                e.preventDefault(); 
                this.bsHorizontal = !this.bsHorizontal; 
                if (this.bsRotateBtn) {
                    this.bsRotateBtn.textContent = this.bsHorizontal 
                        ? (this.lang === 'vi' ? '🔄 Ngang' : '🔄 Horiz') 
                        : (this.lang === 'vi' ? '🔄 Dọc' : '🔄 Vert'); 
                }
                this._bsShowPreview(r, c); 
            });
            this.bsPlaceBoard.appendChild(cell);
        }
    }

    _bsShowPreview(row, col) {
        this._bsClearPreview();
        const ship = SHIP_TYPES[this.bsCurrentShipIdx];
        const activeBoard = this.bsPlacingPlayer === 1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        const activeShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        if (!ship || activeShips.find(s => s.id === ship.id)) return;
        
        const valid = this.bsEngine.canPlaceShip(activeBoard, row, col, ship.size, this.bsHorizontal);
        for (let i = 0; i < ship.size; i++) {
            const r = this.bsHorizontal ? row : row + i;
            const c = this.bsHorizontal ? col + i : col;
            if (r >= 0 && r < 10 && c >= 0 && c < 10) {
                const cell = this.bsPlaceBoard.children[r * 10 + c];
                cell.classList.add(valid ? 'preview-valid' : 'preview-invalid');
            }
        }
    }

    _bsClearPreview() {
        this.bsPlaceBoard.querySelectorAll('.preview-valid, .preview-invalid').forEach(c => { 
            c.classList.remove('preview-valid', 'preview-invalid'); 
        });
    }

    _bsPlaceShipAt(row, col) {
        if (this.playerMode === 3 && this.meBsReady) return;
        const ship = SHIP_TYPES[this.bsCurrentShipIdx];
        const activeBoard = this.bsPlacingPlayer === 1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        const activeShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        if (!ship || activeShips.find(s => s.id === ship.id)) return;
        if (!this.bsEngine.placeShip(activeBoard, activeShips, ship, row, col, this.bsHorizontal)) return;

        this._bsRefreshPlacementBoard();

        const items = this.bsShipList.querySelectorAll('.bs-ship-item');
        items[this.bsCurrentShipIdx].classList.add('placed');
        items[this.bsCurrentShipIdx].classList.remove('selected');

        const nextIdx = SHIP_TYPES.findIndex((s, i) => i > this.bsCurrentShipIdx && !activeShips.find(ps => ps.id === s.id));
        if (nextIdx !== -1) {
            this.bsCurrentShipIdx = nextIdx;
            items[nextIdx].classList.add('selected');
        } else {
            const firstUnplaced = SHIP_TYPES.findIndex(s => !activeShips.find(ps => ps.id === s.id));
            if (firstUnplaced !== -1) { 
                this.bsCurrentShipIdx = firstUnplaced; 
                items[firstUnplaced].classList.add('selected'); 
            }
        }

        this._bsUpdatePlacementStatusAndButtons();
    }

    _bsRefreshPlacementBoard() {
        const activeBoard = this.bsPlacingPlayer === 1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = this.bsPlaceBoard.children[r * 10 + c];
            cell.className = 'bs-cell';
            if (activeBoard[r][c] !== null) cell.classList.add('ship');
        }
    }

    _bsRandomPlace() {
        if (this.playerMode === 3 && this.meBsReady) return;
        const activeBoard = this.bsPlacingPlayer === 1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        const activeShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        
        this.bsEngine.randomPlacement(activeBoard, activeShips);
        this._bsRefreshPlacementBoard();
        
        this.bsShipList.querySelectorAll('.bs-ship-item').forEach(i => { 
            i.classList.add('placed'); 
            i.classList.remove('selected'); 
        });
        
        this._bsUpdatePlacementStatusAndButtons();
    }

    _bsClearPlace() {
        if (this.playerMode === 3 && this.meBsReady) return;
        const activeBoard = this.bsPlacingPlayer === 1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        const activeShips = this.bsPlacingPlayer === 1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        
        this.bsEngine.clearBoard(activeBoard, activeShips);
        this._bsRefreshPlacementBoard();
        
        this.bsShipList.querySelectorAll('.bs-ship-item').forEach((i, idx) => { 
            i.classList.remove('placed'); 
            if (idx === 0) i.classList.add('selected'); 
            else i.classList.remove('selected'); 
        });
        this.bsCurrentShipIdx = 0;
        this._bsUpdatePlacementStatusAndButtons();
    }

    _showSwitchOverlay(title, message, onReady) {
        this.switchText.textContent = title;
        this.switchOverlay.querySelector('#switch-message').textContent = message;
        this.switchOverlay.style.display = 'flex';
        
        this.switchReadyBtn.replaceWith(this.switchReadyBtn.cloneNode(true));
        this.switchReadyBtn = document.getElementById('switch-ready-btn');
        this.switchReadyBtn.addEventListener('click', () => {
            this.switchOverlay.style.display = 'none';
            if (onReady) onReady();
        });
    }

    _bsStartBattle() {
        if (this.playerMode === 3) {
            if (this.isHost) {
                this.meBsReady = true;
                this.conn.send({
                    type: 'bs-countdown-start',
                    board: this.bsEngine.playerBoard,
                    ships: this.bsEngine.playerShips
                });
                this._bsStartOnlineCountdown();
            } else {
                this.meBsReady = true;
                this.conn.send({
                    type: 'bs-ready',
                    board: this.bsEngine.playerBoard,
                    ships: this.bsEngine.playerShips
                });
                this._bsUpdatePlacementStatusAndButtons();
            }
        } else if (this.playerMode === 2 && this.bsPlacingPlayer === 1) {
            this._showSwitchOverlay(this._getT('bs-p2-place-title'), this._getT('bs-p2-place-desc'), () => {
                this.bsPlacingPlayer = 2;
                this.bsCurrentShipIdx = 0;
                this._bsBuildShipList();
                this._bsBuildPlacementBoard();
                this._bsRefreshPlacementBoard();
                this.bsStartBattle.disabled = true;
                this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-start');
                this.bsGameStatus.textContent = this._getT('bs-place-status-p2');
            });
        } else {
            if (this.playerMode === 2) {
                this._showSwitchOverlay(this._getT('bs-battle-start-title'), this._getT('bs-battle-start-desc'), () => {
                    this._bsStartBattleActual();
                });
            } else {
                this.bsEngine.randomPlacement(this.bsEngine.opponentBoard, this.bsEngine.opponentShips);
                this._bsStartBattleActual();
            }
        }
    }

    _bsUpdatePlacementStatusAndButtons() {
        if (!this.bsEngine || this.bsEngine.phase !== 'placement') return;

        const activeShips = (this.playerMode === 2 && this.bsPlacingPlayer === 2) 
            ? this.bsEngine.opponentShips 
            : this.bsEngine.playerShips;
        const isFullyPlaced = activeShips.length === SHIP_TYPES.length;

        if (this.playerMode === 3) {
            const oppDisplayName = this.opponentCustomName || (this.lang === 'vi' ? 'đối thủ' : 'opponent');
            const oppDisplayNameCapitalized = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');

            if (this.isHost) {
                this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-start');
                const readyToStart = isFullyPlaced && this.opponentBsReady;
                this.bsStartBattle.disabled = !readyToStart;

                if (isFullyPlaced) {
                    if (this.opponentBsReady) {
                        this.bsGameStatus.textContent = this._getT('bs-place-status-both-ready');
                    } else {
                        this.bsGameStatus.textContent = this.lang === 'vi' 
                            ? `Đang đợi ${oppDisplayName} sẵn sàng...` 
                            : `Waiting for ${oppDisplayName} to be ready...`;
                    }
                } else {
                    if (this.opponentBsReady) {
                        this.bsGameStatus.textContent = this.lang === 'vi'
                            ? `${oppDisplayNameCapitalized} đã sẵn sàng! Hãy đặt hết tàu của bạn.`
                            : `${oppDisplayNameCapitalized} is ready! Place all your ships.`;
                    } else {
                        this.bsGameStatus.textContent = this._getT('bs-place-status');
                    }
                }
            } else {
                if (this.meBsReady) {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-waiting');
                    this.bsStartBattle.disabled = true;
                    this.bsGameStatus.textContent = this.lang === 'vi'
                        ? `Đang đợi ${oppDisplayName} bắt đầu...`
                        : `Waiting for ${oppDisplayName} to start...`;
                } else {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-ready');
                    this.bsStartBattle.disabled = !isFullyPlaced;
                    
                    if (isFullyPlaced) {
                        this.bsGameStatus.textContent = this.lang === 'vi' ? 'Đã xếp xong! Nhấn Sẵn Sàng.' : 'Placement done! Click Ready.';
                    } else {
                        this.bsGameStatus.textContent = this._getT('bs-place-status');
                    }
                }
            }
        } else {
            this.bsStartBattle.disabled = !isFullyPlaced;
            if (isFullyPlaced) {
                if (this.playerMode === 2 && this.bsPlacingPlayer === 1) {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-p2');
                    this.bsGameStatus.textContent = this._getT('bs-place-ready-p1');
                } else {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-start');
                    this.bsGameStatus.textContent = this._getT('bs-place-ready-all');
                }
            } else {
                if (this.playerMode === 2 && this.bsPlacingPlayer === 1) {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-p2');
                    this.bsGameStatus.textContent = this._getT('bs-place-status-p1');
                } else if (this.playerMode === 2 && this.bsPlacingPlayer === 2) {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-start');
                    this.bsGameStatus.textContent = this._getT('bs-place-status-p2');
                } else {
                    this.bsStartBattle.querySelector('.start-btn-text').textContent = this._getT('bs-ready-btn-start');
                }
            }
        }
        if (this.playerMode === 3) {
            this._updateReadyBadgesOnline();
        }
    }

    _updateReadyBadgesOnline() {
        if (!this.bsP1ReadyBadge || !this.bsP2ReadyBadge) return;

        const isFullyPlaced = this.bsEngine && this.bsEngine.playerShips && this.bsEngine.playerShips.length === SHIP_TYPES.length;

        if (this.isHost) {
            // P1 is Host (Self)
            if (isFullyPlaced) {
                this.bsP1ReadyBadge.textContent = this.lang === 'vi' ? 'Đã xếp xong' : 'Placed';
                this.bsP1ReadyBadge.className = 'ready-badge ready';
            } else {
                this.bsP1ReadyBadge.textContent = this.lang === 'vi' ? 'Đang xếp...' : 'Placing...';
                this.bsP1ReadyBadge.className = 'ready-badge preparing';
            }

            // P2 is Guest (Opponent)
            if (this.opponentBsReady) {
                this.bsP2ReadyBadge.textContent = this.lang === 'vi' ? 'Sẵn sàng' : 'Ready';
                this.bsP2ReadyBadge.className = 'ready-badge ready';
            } else {
                this.bsP2ReadyBadge.textContent = this.lang === 'vi' ? 'Đang xếp...' : 'Placing...';
                this.bsP2ReadyBadge.className = 'ready-badge preparing';
            }
        } else {
            // P1 is Guest (Self)
            if (this.meBsReady) {
                this.bsP1ReadyBadge.textContent = this.lang === 'vi' ? 'Sẵn sàng' : 'Ready';
                this.bsP1ReadyBadge.className = 'ready-badge ready';
            } else if (isFullyPlaced) {
                this.bsP1ReadyBadge.textContent = this.lang === 'vi' ? 'Đã xếp xong' : 'Placed';
                this.bsP1ReadyBadge.className = 'ready-badge preparing';
            } else {
                this.bsP1ReadyBadge.textContent = this.lang === 'vi' ? 'Đang xếp...' : 'Placing...';
                this.bsP1ReadyBadge.className = 'ready-badge preparing';
            }

            // P2 is Host (Opponent)
            if (this.opponentBsReady) {
                this.bsP2ReadyBadge.textContent = this.lang === 'vi' ? 'Sẵn sàng' : 'Ready';
                this.bsP2ReadyBadge.className = 'ready-badge ready';
            } else {
                this.bsP2ReadyBadge.textContent = this.lang === 'vi' ? 'Đang xếp...' : 'Placing...';
                this.bsP2ReadyBadge.className = 'ready-badge preparing';
            }
        }
    }

    _bsStartBattleActual() {
        this.bsEngine.phase = 'battle';
        this.bsEngine.currentTurn = 'player';

        if (this.bsP1ReadyBadge) this.bsP1ReadyBadge.style.display = 'none';
        if (this.bsP2ReadyBadge) this.bsP2ReadyBadge.style.display = 'none';

        this.bsPlacementPhase.style.display = 'none';
        this.bsBattlePhase.style.display = 'block';
        
        this.bsGameStatus.textContent = this.playerMode === 2 
            ? this._getT('bs-battle-turn-p1') 
            : this._getT('bs-battle-turn-you');
        this.bsGameStatus.className = 'game-status x-turn';

        this.bsPlayerCard.classList.add('active');
        this.bsOpponentCard.classList.remove('active');

        this._bsBuildBattleBoards();
        this._bsUpdateFleetStatus();
    }

    _bsStartOnlineBattle() {
        this.bsEngine.phase = 'battle';
        const myTurn = this.isHost;
        this.bsEngine.currentTurn = myTurn ? 'player' : 'opponent';

        if (this.bsP1ReadyBadge) this.bsP1ReadyBadge.style.display = 'none';
        if (this.bsP2ReadyBadge) this.bsP2ReadyBadge.style.display = 'none';
        
        this.bsPlacementPhase.style.display = 'none';
        this.bsBattlePhase.style.display = 'block';
        
        this.bsPlayerCard.classList.toggle('active', myTurn);
        this.bsOpponentCard.classList.toggle('active', !myTurn);
        
        if (myTurn) {
            this.bsGameStatus.textContent = this._getT('bs-battle-turn-you');
            this.bsGameStatus.className = 'game-status x-turn';
        } else {
            const oppDisplayName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
            this.bsGameStatus.textContent = this.lang === 'vi' ? `Lượt của ${oppDisplayName}...` : `${oppDisplayName}'s turn...`;
            this.bsGameStatus.className = 'game-status o-turn';
        }
        
        this.bsEngine.opponentBoard = this.opponentBsBoard;
        this.bsEngine.opponentShips = this.opponentBsShips;
        
        this._bsBuildBattleBoards();
        this._bsUpdateFleetStatus();
    }

    _bsStartOnlineCountdown() {
        if (this.playerMode === 3) {
            this._updateReadyBadgesOnline();
        }
        if (this.onlineCountdownOverlay) {
            this.onlineCountdownOverlay.style.display = 'flex';
        }
        
        let count = 3;
        if (this.countdownNumber) {
            this.countdownNumber.textContent = count;
        }
        
        if (this.bsCountdownInterval) {
            clearInterval(this.bsCountdownInterval);
        }
        
        this.bsCountdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                if (this.countdownNumber) {
                    this.countdownNumber.textContent = count;
                }
            } else if (count === 0) {
                if (this.countdownNumber) {
                    this.countdownNumber.textContent = this.lang === 'vi' ? 'CHIẾN!' : 'FIGHT!';
                }
                if (!this.isHost) {
                    // Guest timer can stop at "CHIẾN!" / "FIGHT!" and wait for the host's sync trigger
                    clearInterval(this.bsCountdownInterval);
                    this.bsCountdownInterval = null;
                }
            } else {
                // Only Host executes this branch to sync start the battle
                clearInterval(this.bsCountdownInterval);
                this.bsCountdownInterval = null;
                
                if (this.onlineCountdownOverlay) {
                    this.onlineCountdownOverlay.style.display = 'none';
                }
                
                if (this.isHost) {
                    this.conn.send({
                        type: 'bs-init-battle'
                    });
                    this._bsStartOnlineBattle();
                }
            }
        }, 1000);
    }

    _bsBuildBattleBoards() {
        this.bsMyBoard.innerHTML = '';
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = document.createElement('div');
            cell.className = 'bs-cell';
            this.bsMyBoard.appendChild(cell);
        }

        this.bsTargetBoard.innerHTML = '';
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = document.createElement('div');
            cell.className = 'bs-cell';
            cell.addEventListener('click', () => this._bsHandleBattleClick(r, c));
            this.bsTargetBoard.appendChild(cell);
        }

        this._bsRefreshMyBoard();
        this._bsRefreshTargetBoard();
    }

    _bsHandleBattleClick(row, col) {
        if (this.bsEngine.phase !== 'battle') return;
        
        if (this.playerMode === 3) {
            if (this.bsEngine.currentTurn !== 'player') return;
            if (this.bsEngine.playerShots[row][col] !== null) return;
            
            const result = this.bsEngine.attack(this.bsEngine.opponentBoard, this.bsEngine.opponentShips, this.bsEngine.playerShots, row, col);
            if (result === null) return;
            
            this._bsRefreshTargetBoard();
            this._bsUpdateFleetStatus();
            
            const myName = this.lang === 'vi' ? 'Bạn' : 'You';
            this._showShotResultText(result, myName);
            
            this.conn.send({
                type: 'bs-shot',
                row: row,
                col: col
            });
            
            if (this.bsEngine.allShipsSunk(this.bsEngine.opponentShips)) {
                this.bsEngine.phase = 'gameover';
                this.bsScores.player++;
                this.bsScorePlayer.textContent = this.bsScores.player;
                this.bsGameStatus.textContent = this.lang === 'vi' ? '🎉 Bạn đã thắng!' : '🎉 You Win!';
                this._bsUpdateHeatmap();
                setTimeout(() => this._showBSGameOver(true), 800);
                return;
            }
            
            if (result === 'hit' || result === 'sunk') return;
            
            // Miss - swap turns
            this.bsEngine.currentTurn = 'opponent';
            this.bsPlayerCard.classList.remove('active');
            this.bsOpponentCard.classList.add('active');
            const oppDisplayName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
            this.bsGameStatus.textContent = this.lang === 'vi' ? `Lượt của ${oppDisplayName}...` : `${oppDisplayName}'s turn...`;
            this.bsGameStatus.className = 'game-status o-turn';
            
        } else if (this.playerMode === 1) {
            if (this.bsEngine.currentTurn !== 'player') return;
            if (this.bsEngine.playerShots[row][col] !== null) return;
            
            const result = this.bsEngine.attack(this.bsEngine.opponentBoard, this.bsEngine.opponentShips, this.bsEngine.playerShots, row, col);
            if (result === null) return;
            
            this._bsRefreshTargetBoard();
            this._bsUpdateFleetStatus();
            
            const myName = this.lang === 'vi' ? 'Bạn' : 'You';
            this._showShotResultText(result, myName);
            
            if (this.bsEngine.allShipsSunk(this.bsEngine.opponentShips)) {
                this.bsEngine.phase = 'gameover';
                this.bsScores.player++;
                this.bsScorePlayer.textContent = this.bsScores.player;
                this.bsGameStatus.textContent = this.lang === 'vi' ? '🎉 Bạn đã thắng!' : '🎉 You Win!';
                this._bsUpdateHeatmap();
                setTimeout(() => this._showBSGameOver(true), 800);
                return;
            }
            
            if (result === 'hit' || result === 'sunk') return; 
            
            this.bsEngine.currentTurn = 'opponent';
            this.bsPlayerCard.classList.remove('active');
            this.bsOpponentCard.classList.add('active');
            this.bsGameStatus.className = 'game-status o-turn';
            this.bsGameStatus.textContent = this._getT('bs-battle-turn-opp');
            setTimeout(() => this._bsAITurn(), 600);
            
        } else {
            // Local 2 Players Pass-and-Play
            if (this.bsEngine.currentTurn === 'player') {
                if (this.bsEngine.playerShots[row][col] !== null) return;
                
                const result = this.bsEngine.attack(this.bsEngine.opponentBoard, this.bsEngine.opponentShips, this.bsEngine.playerShots, row, col);
                if (result === null) return;
                
                this._bsRefreshTargetBoard();
                this._bsUpdateFleetStatus();
                this._showShotResultText(result, 'Người chơi 1');
                
                if (this.bsEngine.allShipsSunk(this.bsEngine.opponentShips)) {
                    this.bsEngine.phase = 'gameover';
                    this.bsScores.player++;
                    this.bsScorePlayer.textContent = this.bsScores.player;
                    this.bsGameStatus.textContent = this.lang === 'vi' ? '🎉 Người chơi 1 thắng!' : '🎉 Player 1 Wins!';
                    setTimeout(() => this._showBSGameOver(true), 800);
                    return;
                }
                
                if (result === 'hit' || result === 'sunk') return;
                
                this.bsEngine.currentTurn = 'opponent';
                setTimeout(() => {
                    this._showSwitchOverlay(this._getT('bs-p2-turn-title'), this._getT('bs-p2-turn-desc'), () => {
                        this.bsPlayerCard.classList.remove('active');
                        this.bsOpponentCard.classList.add('active');
                        this.bsGameStatus.textContent = this._getT('bs-battle-turn-p2');
                        this.bsGameStatus.className = 'game-status o-turn';
                        this._bsRefreshMyBoard();
                        this._bsRefreshTargetBoard();
                        this._bsUpdateFleetStatus();
                    });
                }, 1200);
                
            } else {
                if (this.bsEngine.opponentShots[row][col] !== null) return;
                
                const result = this.bsEngine.attack(this.bsEngine.playerBoard, this.bsEngine.playerShips, this.bsEngine.opponentShots, row, col);
                if (result === null) return;
                
                this._bsRefreshTargetBoard();
                this._bsUpdateFleetStatus();
                this._showShotResultText(result, 'Người chơi 2');
                
                if (this.bsEngine.allShipsSunk(this.bsEngine.playerShips)) {
                    this.bsEngine.phase = 'gameover';
                    this.bsScores.opponent++;
                    this.bsScoreOpponent.textContent = this.bsScores.opponent;
                    this.bsGameStatus.textContent = this.lang === 'vi' ? '🎉 Người chơi 2 thắng!' : '🎉 Player 2 Wins!';
                    setTimeout(() => this._showBSGameOver(false), 800);
                    return;
                }
                
                if (result === 'hit' || result === 'sunk') return;
                
                this.bsEngine.currentTurn = 'player';
                setTimeout(() => {
                    this._showSwitchOverlay(this._getT('bs-p1-turn-title'), this._getT('bs-p1-turn-desc'), () => {
                        this.bsPlayerCard.classList.add('active');
                        this.bsOpponentCard.classList.remove('active');
                        this.bsGameStatus.textContent = this._getT('bs-battle-turn-p1');
                        this.bsGameStatus.className = 'game-status x-turn';
                        this._bsRefreshMyBoard();
                        this._bsRefreshTargetBoard();
                        this._bsUpdateFleetStatus();
                    });
                }, 1200);
            }
        }
    }

    _showShotResultText(result, name) {
        if (this.playerMode === 3) {
            const isMe = name === 'Bạn' || name === 'You';
            const displayName = isMe 
                ? (this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You'))
                : (this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent'));
            
            if (result === 'sunk') {
                this.bsGameStatus.textContent = isMe 
                    ? (this.lang === 'vi' ? '💥 Bạn đã đánh chìm tàu đối phương!' : '💥 You sunk an enemy ship!')
                    : (this.lang === 'vi' ? `💀 ${displayName} đã đánh chìm tàu của bạn!` : `💀 ${displayName} sunk your ship!`);
            } else if (result === 'hit') {
                this.bsGameStatus.textContent = isMe 
                    ? this._getT('bs-hit-you') 
                    : (this.lang === 'vi' ? `💥 ${displayName} bắn trúng tàu bạn!` : `💥 ${displayName} hit your ship!`);
            } else {
                this.bsGameStatus.textContent = isMe 
                    ? this._getT('bs-miss-you') 
                    : (this.lang === 'vi' ? `💨 ${displayName} bắn trượt!` : `💨 ${displayName} Missed!`);
            }
        } else {
            if (result === 'sunk') {
                this.bsGameStatus.textContent = this.playerMode === 2 
                    ? (name === 'Người chơi 1' ? this._getT('bs-sunk-p1') : this._getT('bs-sunk-p2'))
                    : (name === 'Bạn' ? this._getT('bs-sunk-you') : this._getT('bs-sunk-opp'));
            } else if (result === 'hit') {
                this.bsGameStatus.textContent = this.playerMode === 2
                    ? (name === 'Người chơi 1' ? this._getT('bs-hit-p1') : this._getT('bs-hit-p2'))
                    : (name === 'Bạn' ? this._getT('bs-hit-you') : this._getT('bs-hit-opp'));
            } else {
                this.bsGameStatus.textContent = this.playerMode === 2
                    ? (name === 'Người chơi 1' ? this._getT('bs-miss-p1') : this._getT('bs-miss-p2'))
                    : (name === 'Bạn' ? this._getT('bs-miss-you') : this._getT('bs-miss-opp'));
            }
        }
    }

    _bsAITurn() {
        if (this.bsEngine.phase !== 'battle' || this.bsEngine.currentTurn !== 'opponent') return;
        this.aiThinkingEl.style.display = 'flex';

        setTimeout(() => {
            const target = this.bsAI.getAttack(this.bsEngine.size, this.bsEngine.playerShots);
            if (!target) { this.aiThinkingEl.style.display = 'none'; return; }

            const result = this.bsEngine.attack(this.bsEngine.playerBoard, this.bsEngine.playerShips, this.bsEngine.opponentShots, target.row, target.col);
            this.bsAI.reportResult(target.row, target.col, result);
            this._bsRefreshMyBoard();
            this._bsUpdateFleetStatus();

            this.aiThinkingEl.style.display = 'none';

            if (result === 'sunk') this.bsGameStatus.textContent = this._getT('bs-sunk-opp');
            else if (result === 'hit') this.bsGameStatus.textContent = this._getT('bs-hit-opp');
            else this.bsGameStatus.textContent = this._getT('bs-miss-opp');

            if (this.bsEngine.allShipsSunk(this.bsEngine.playerShips)) {
                this.bsEngine.phase = 'gameover';
                this.bsScores.opponent++;
                this.bsScoreOpponent.textContent = this.bsScores.opponent;
                this.bsGameStatus.textContent = this.lang === 'vi' ? '💀 AI đã thắng!' : '💀 AI Wins!';
                this._bsUpdateHeatmap();
                setTimeout(() => this._showBSGameOver(false), 800);
                return;
            }

            if (result === 'hit' || result === 'sunk') {
                setTimeout(() => this._bsAITurn(), 600);
                return;
            }

            this.bsEngine.currentTurn = 'player';
            this.bsPlayerCard.classList.add('active');
            this.bsOpponentCard.classList.remove('active');
            this.bsGameStatus.textContent = this._getT('bs-battle-turn-you');
            this.bsGameStatus.className = 'game-status x-turn';
        }, 500 + Math.random() * 500);
    }

    _bsRefreshTargetBoard() {
        const isP1 = (this.playerMode !== 2) ? true : (this.bsEngine.currentTurn === 'player');
        const shots = isP1 ? this.bsEngine.playerShots : this.bsEngine.opponentShots;
        
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = this.bsTargetBoard.children[r * 10 + c];
            cell.className = 'bs-cell';
            const shot = shots[r][c];
            if (shot === 'hit') cell.classList.add('hit');
            else if (shot === 'miss') cell.classList.add('miss');
            else if (shot === 'sunk') cell.classList.add('sunk');
        }
    }

    _bsRefreshMyBoard() {
        const isP1 = (this.playerMode !== 2) ? true : (this.bsEngine.currentTurn === 'player');
        const board = isP1 ? this.bsEngine.playerBoard : this.bsEngine.opponentBoard;
        const shots = isP1 ? this.bsEngine.opponentShots : this.bsEngine.playerShots;
        
        for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const cell = this.bsMyBoard.children[r * 10 + c];
            cell.className = 'bs-cell';
            const shot = shots[r][c];
            if (shot === 'sunk') cell.classList.add('sunk');
            else if (shot === 'hit') cell.classList.add('hit');
            else if (shot === 'miss') cell.classList.add('miss');
            else if (board[r][c] !== null && this.playerMode !== 2) cell.classList.add('ship');
        }
    }

    _bsUpdateFleetStatus() {
        const isP1 = (this.playerMode !== 2) ? true : (this.bsEngine.currentTurn === 'player');
        
        const myShips = isP1 ? this.bsEngine.playerShips : this.bsEngine.opponentShips;
        SHIP_TYPES.forEach(st => {
            const ship = myShips.find(s => s.id === st.id);
            const shipEl = this.bsMyFleet.querySelector(`[data-ship="${st.id}"]`);
            if (shipEl) {
                const isSunk = ship && ship.sunk;
                shipEl.classList.toggle('sunk', isSunk);
                const dots = shipEl.querySelectorAll('.bs-hp-dot');
                
                const hits = ship ? ship.hits : 0;
                
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('hit', idx < hits);
                });
            }
        });

        const enemyShips = isP1 ? this.bsEngine.opponentShips : this.bsEngine.playerShips;
        SHIP_TYPES.forEach(st => {
            const ship = enemyShips.find(s => s.id === st.id);
            const sunk = ship && ship.sunk;
            const shipEl = this.bsEnemyFleet.querySelector(`[data-ship="${st.id}"]`);
            if (shipEl) {
                shipEl.classList.toggle('sunk', sunk);
                const dots = shipEl.querySelectorAll('.bs-hp-dot');
                dots.forEach(dot => {
                    dot.classList.toggle('hit', sunk);
                });
            }
        });
    }

    // ===== PEERJS ONLINE MULTIPLAYER CONTROLLER =====
    showOnlineLobby() {
        this.onlineDisconnectAndReturn(false);
        this._hideAllScreens();
        this.onlineLobbyScreen.classList.add('active');
    }

    checkUrlForRoom() {
        const urlParams = new URLSearchParams(window.location.search);
        const room = urlParams.get('room');
        if (room) {
            this.playerMode = 3;
            this.playerToggleBtns.forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.players) === 3);
            });
            this.difficultySection.style.display = 'none';
            this.showOnlineLobby();
            
            this.inputRoomId.value = room;
            setTimeout(() => this.onlineJoinRoom(room), 600);
        }
    }

    onlineCreateRoom() {
        if (this.peer) return;
        
        if (this.inputNickname && this.inputNickname.value.trim()) {
            this.myCustomName = this.inputNickname.value.trim();
        } else {
            this.myCustomName = '';
        }
        
        this.btnCreateRoom.disabled = true;
        this.btnJoinRoom.disabled = true;
        this.lobbyStatus.textContent = this.lang === 'vi' ? 'Đang khởi tạo phòng chờ...' : 'Initializing lobby...';
        
        const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();
        let code = generateCode();
        
        const initPeer = (codeAttempt) => {
            this.peer = new Peer('ga-' + codeAttempt, {
                debug: 1
            });
            
            this.peer.on('open', (id) => {
                this.isHost = true;
                this.mySymbol = PLAYER_X;
                this.displayRoomId.textContent = codeAttempt;
                this.roomInfoArea.style.display = 'block';
                this.lobbyStatus.textContent = this.lang === 'vi' ? 'Phòng chơi đã sẵn sàng! Đang chờ bạn bè kết nối...' : 'Room ready! Waiting for guest to connect...';
                this.btnCreateRoom.style.display = 'none';
                this.lobbyErrorMsg.style.display = 'none';
            });
            
            this.peer.on('connection', (conn) => {
                this.conn = conn;
                this.onlineSetupConnection();
            });
            
            this.peer.on('error', (err) => {
                console.error('Peer error:', err);
                if (err.type === 'unavailable-id') {
                    code = generateCode();
                    initPeer(code);
                } else {
                    this.lobbyErrorMsg.textContent = this.lang === 'vi' ? 'Lỗi PeerJS: ' + err.type : 'PeerJS Error: ' + err.type;
                    this.lobbyErrorMsg.style.display = 'block';
                    this.onlineResetLobbyState();
                }
            });
        };
        
        initPeer(code);
    }

    onlineJoinRoom(autoCode = null) {
        if (this.peer) return;
        
        if (this.inputNickname && this.inputNickname.value.trim()) {
            this.myCustomName = this.inputNickname.value.trim();
        } else {
            this.myCustomName = '';
        }
        
        const codeInputVal = autoCode || this.inputRoomId.value.trim();
        if (!codeInputVal) {
            this.lobbyErrorMsg.textContent = this.lang === 'vi' ? 'Vui lòng nhập mã phòng!' : 'Please enter room code!';
            this.lobbyErrorMsg.style.display = 'block';
            return;
        }
        
        this.btnCreateRoom.disabled = true;
        this.btnJoinRoom.disabled = true;
        this.lobbyStatus.textContent = this.lang === 'vi' ? 'Đang kết nối tới đối thủ...' : 'Connecting to opponent...';
        this.lobbyErrorMsg.style.display = 'none';
        
        const guestId = 'ga-guest-' + Math.floor(Math.random() * 1000000);
        this.peer = new Peer(guestId, {
            debug: 1
        });
        
        this.peer.on('open', (id) => {
            this.isHost = false;
            this.mySymbol = PLAYER_O;
            
            const targetPeerId = 'ga-' + codeInputVal;
            const conn = this.peer.connect(targetPeerId);
            this.conn = conn;
            
            this.onlineSetupConnection();
        });
        
        this.peer.on('error', (err) => {
            console.error('Peer error:', err);
            this.lobbyErrorMsg.textContent = this.lang === 'vi' ? 'Không thể tìm thấy phòng này!' : 'Could not find this room!';
            this.lobbyErrorMsg.style.display = 'block';
            this.onlineResetLobbyState();
        });
    }

    onlineCopyRoomLink() {
        const code = this.displayRoomId.textContent;
        if (!code || code === '------') return;
        
        navigator.clipboard.writeText(code).then(() => {
            const originalText = this.btnCopyRoom.textContent;
            this.btnCopyRoom.textContent = '✔️';
            setTimeout(() => { this.btnCopyRoom.textContent = originalText; }, 1500);
            alert(this.lang === 'vi' ? 'Đã sao chép mã phòng!' : 'Room code copied!');
        }).catch(err => {
            console.error('Failed to copy code', err);
        });
    }

    onlineSetupConnection() {
        if (!this.conn) return;
        
        const handleOpenConnection = () => {
            this.onlineGameStarted = true;
            this.meReady = false;
            this.opponentReady = false;
            
            this.conn.send({
                type: 'name-handshake',
                name: this.myCustomName
            });

            if (this.mode === 'battleship') {
                this.onlineStartGameActual();
            } else {
                if (this.lobbySetupCard) this.lobbySetupCard.style.display = 'none';
                if (this.lobbyReadyCard) this.lobbyReadyCard.style.display = 'block';
                this.lobbyStatus.textContent = this.lang === 'vi' ? 'Cả hai người chơi cần Sẵn Sàng...' : 'Both players must get Ready...';
                
                this._updateReadyUI();
            }
        };

        if (this.conn.open) {
            handleOpenConnection();
        } else {
            this.conn.on('open', handleOpenConnection);
        }
        
        this.conn.on('data', (data) => {
            this.onlineHandleMessage(data);
        });
        
        this.conn.on('close', () => {
            this.onlineHandleDisconnect();
        });
        
        this.conn.on('error', (err) => {
            console.error('Connection error:', err);
            this.onlineHandleDisconnect();
        });
    }

    onlineHandleDisconnect() {
        if (!this.onlineGameStarted && !this.peer) return;
        alert(this._getT('opponent-disconnected'));
        this.onlineDisconnectAndReturn();
    }

    onlineDisconnectAndReturn(goToMenu = true) {
        this.onlineGameStarted = false;
        this.isHost = false;
        this.opponentBsReady = false;
        this.meBsReady = false;
        this.myCustomName = '';
        this.opponentCustomName = '';
        if (this.inputNickname) this.inputNickname.value = '';
        this.opponentBsBoard = null;
        this.opponentBsShips = null;
        this.rematchRequested = false;
        this.rematchMe = false;
        
        this.meReady = false;
        this.opponentReady = false;
        
        if (this.btnToggleReady) this.btnToggleReady.disabled = false;
        if (this.lobbyBackBtn) this.lobbyBackBtn.disabled = false;
        if (this.onlineCountdownOverlay) this.onlineCountdownOverlay.style.display = 'none';
        
        if (this.conn) {
            try { this.conn.close(); } catch(e){}
            this.conn = null;
        }
        if (this.peer) {
            try { this.peer.destroy(); } catch(e){}
            this.peer = null;
        }
        
        this.onlineResetLobbyState();
        
        if (goToMenu) {
            this.hideGameOver();
            this.showMenu();
        }
    }

    onlineResetLobbyState() {
        this.btnCreateRoom.disabled = false;
        this.btnCreateRoom.style.display = 'inline-flex';
        this.btnJoinRoom.disabled = false;
        this.roomInfoArea.style.display = 'none';
        this.displayRoomId.textContent = '------';
        this.inputRoomId.value = '';
        this.lobbyStatus.textContent = this.lang === 'vi' ? 'Kết nối mạng hàng hải P2P' : 'Connecting via P2P Naval Network';
        
        if (this.lobbySetupCard) this.lobbySetupCard.style.display = 'flex';
        if (this.lobbyReadyCard) this.lobbyReadyCard.style.display = 'none';
    }

    onlineStartGameActual() {
        this.onlineLobbyScreen.classList.remove('active');
        
        if (this.mode === 'battleship') {
            this.startBattleship();
        } else {
            const config = MODE_CONFIG[this.mode];
            this.engine = new GameEngine(config.size, config.winLen);
            this.scores = { X: 0, O: 0, draw: 0 };
            this.lastLoser = null;
            
            // In Game 1: P1 (Host) is X, P2 (Guest) is O. X always starts
            this.engine.currentPlayer = PLAYER_X;
            
            this._hideAllScreens();
            this.gameScreen.classList.add('active');
            this.gameModeLabel.textContent = config.label;
            this._updatePlayerNames();
            this._updateScores();
            this._setupBoard();
            this._updateStatus();
        }
    }

    onlineRestartGameActual() {
        if (!this.isHost) return; // Only Host coordinates first turn selection

        let firstPlayer = 'host';
        if (this.lastLoser === 'opponent') {
            firstPlayer = 'guest';
        } else if (this.lastLoser === 'me') {
            firstPlayer = 'host';
        } else {
            firstPlayer = Math.random() < 0.5 ? 'host' : 'guest';
        }
        
        this.conn.send({
            type: 'sync-restart',
            firstPlayer: firstPlayer
        });
        
        this.onlineRestartGameForSymbol(firstPlayer);
    }

    onlineRestartGameForSymbol(firstPlayer) {
        this.rematchRequested = false;
        this.rematchMe = false;
        this.opponentBsReady = false;
        this.meBsReady = false;
        this.opponentBsBoard = null;
        this.opponentBsShips = null;
        
        const isMyTurn = (firstPlayer === 'host' && this.isHost) || (firstPlayer === 'guest' && !this.isHost);
        this.hideGameOver();
        
        if (this.mode === 'battleship') {
            this.startBattleship();
        } else {
            this.engine.reset();
            this.engine.currentPlayer = isMyTurn ? this.mySymbol : (this.mySymbol === PLAYER_X ? PLAYER_O : PLAYER_X);
            this._updatePlayerNames();
            this._setupBoard();
            this._updateStatus();
        }
    }

    onlineHandleMessage(data) {
        if (!data || !data.type) return;
        
        switch (data.type) {
            case 'name-handshake':
                this.opponentCustomName = data.name;
                this._updatePlayerNames();
                if (this.mode === 'battleship' && this.bsEngine) {
                    const myName = this.myCustomName || (this.lang === 'vi' ? 'Bạn' : 'You');
                    const oppName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
                    this.bsPlayerName.textContent = myName;
                    this.bsOpponentName.textContent = oppName;
                }
                break;
            case 'init-game':
                this.mode = data.mode;
                this.difficulty = data.difficulty;
                this.modeCards.forEach(card => {
                    card.classList.toggle('selected', card.dataset.mode === this.mode);
                });
                if (this.onlineCountdownOverlay) {
                    this.onlineCountdownOverlay.style.display = 'none';
                }
                this.onlineStartGameActual();
                break;
                
            case 'ready-state':
                this.opponentReady = data.ready;
                this._updateReadyUI();
                this._checkBothReady();
                break;
                
            case 'move':
                if (this.engine && !this.engine.gameOver) {
                    this.engine.makeMove(data.row, data.col);
                    this._renderMove(data.row, data.col);
                    this._updateStatus();
                    if (this.engine.gameOver) {
                        this._handleGameOver();
                    }
                }
                break;
                
            case 'bs-ready':
                this.opponentBsReady = true;
                this.opponentBsBoard = data.board;
                this.opponentBsShips = data.ships;
                this._bsUpdatePlacementStatusAndButtons();
                break;

            case 'bs-countdown-start':
                this.opponentBsReady = true;
                this.opponentBsBoard = data.board;
                this.opponentBsShips = data.ships;
                this._bsStartOnlineCountdown();
                break;
                
            case 'bs-init-battle':
                if (this.bsCountdownInterval) {
                    clearInterval(this.bsCountdownInterval);
                    this.bsCountdownInterval = null;
                }
                if (this.onlineCountdownOverlay) {
                    this.onlineCountdownOverlay.style.display = 'none';
                }
                this._bsStartOnlineBattle();
                break;
                
            case 'bs-shot':
                if (this.bsEngine && this.bsEngine.phase === 'battle') {
                    const result = this.bsEngine.attack(this.bsEngine.playerBoard, this.bsEngine.playerShips, this.bsEngine.opponentShots, data.row, data.col);
                    this._bsRefreshMyBoard();
                    this._bsUpdateFleetStatus();
                    
                    const oppName = this.lang === 'vi' ? 'Đối thủ' : 'Opponent';
                    this._showShotResultText(result, oppName);
                    
                    if (this.bsEngine.allShipsSunk(this.bsEngine.playerShips)) {
                        this.bsEngine.phase = 'gameover';
                        this.bsScores.opponent++;
                        this.bsScoreOpponent.textContent = this.bsScores.opponent;
                        const oppDisplayName = this.opponentCustomName || (this.lang === 'vi' ? 'Đối thủ' : 'Opponent');
                        this.bsGameStatus.textContent = this.lang === 'vi' ? `💀 ${oppDisplayName} đã thắng!` : `💀 ${oppDisplayName} Wins!`;
                        setTimeout(() => this._showBSGameOver(false), 800);
                        return;
                    }
                    
                    if (result === 'hit' || result === 'sunk') {
                        this.bsEngine.currentTurn = 'opponent';
                        this.bsPlayerCard.classList.remove('active');
                        this.bsOpponentCard.classList.add('active');
                        this.bsGameStatus.className = 'game-status o-turn';
                    } else {
                        this.bsEngine.currentTurn = 'player';
                        this.bsPlayerCard.classList.add('active');
                        this.bsOpponentCard.classList.remove('active');
                        this.bsGameStatus.textContent = this.lang === 'vi' ? 'Lượt của bạn — Chọn ô để bắn!' : 'Your turn — Select cell to shoot!';
                        this.bsGameStatus.className = 'game-status x-turn';
                    }
                }
                break;
                
            case 'rematch-request':
                this.rematchRequested = true;
                if (this.rematchMe) {
                    this.onlineRestartGameActual();
                } else {
                    this.resultSub.textContent = this._getT('rematch-requested');
                }
                break;
                
            case 'sync-restart':
                this.onlineRestartGameForSymbol(data.firstPlayer);
                break;
        }
    }

    onlineToggleReady() {
        if (!this.conn || !this.onlineGameStarted) return;
        
        this.meReady = !this.meReady;
        this._updateReadyUI();
        
        this.conn.send({
            type: 'ready-state',
            ready: this.meReady
        });
        
        this._checkBothReady();
    }

    _updateReadyUI() {
        if (this.readyBadgeMe) {
            this.readyBadgeMe.className = this.meReady ? 'ready-badge ready' : 'ready-badge not-ready';
            this.readyBadgeMe.textContent = this.meReady 
                ? (this.lang === 'vi' ? 'Đã sẵn sàng' : 'Ready') 
                : (this.lang === 'vi' ? 'Chưa sẵn sàng' : 'Not ready');
        }
        
        if (this.readyBadgeOpponent) {
            this.readyBadgeOpponent.className = this.opponentReady ? 'ready-badge ready' : 'ready-badge not-ready';
            this.readyBadgeOpponent.textContent = this.opponentReady 
                ? (this.lang === 'vi' ? 'Đã sẵn sàng' : 'Ready') 
                : (this.lang === 'vi' ? 'Chưa sẵn sàng' : 'Not ready');
        }
        
        if (this.btnReadyText) {
            this.btnReadyText.textContent = this.meReady 
                ? (this.lang === 'vi' ? 'Hủy Sẵn Sàng' : 'Cancel Ready') 
                : (this.lang === 'vi' ? 'Sẵn Sàng' : 'Ready');
        }
    }

    _checkBothReady() {
        if (this.meReady && this.opponentReady) {
            this._startOnlineCountdown();
        }
    }

    _startOnlineCountdown() {
        if (this.btnToggleReady) this.btnToggleReady.disabled = true;
        if (this.lobbyBackBtn) this.lobbyBackBtn.disabled = true;
        
        if (this.onlineCountdownOverlay) {
            this.onlineCountdownOverlay.style.display = 'flex';
        }
        
        let count = 3;
        if (this.countdownNumber) {
            this.countdownNumber.textContent = count;
        }
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                if (this.countdownNumber) {
                    this.countdownNumber.textContent = count;
                }
            } else if (count === 0) {
                if (this.countdownNumber) {
                    this.countdownNumber.textContent = this.lang === 'vi' ? 'CHIẾN!' : 'FIGHT!';
                }
            } else {
                clearInterval(interval);
                
                if (this.onlineCountdownOverlay) {
                    this.onlineCountdownOverlay.style.display = 'none';
                }
                
                if (this.btnToggleReady) this.btnToggleReady.disabled = false;
                if (this.lobbyBackBtn) this.lobbyBackBtn.disabled = false;
                
                this.onlineLobbyScreen.classList.remove('active');
                
                if (this.isHost) {
                    this.conn.send({
                        type: 'init-game',
                        mode: this.mode,
                        difficulty: this.difficulty
                    });
                    this.onlineStartGameActual();
                }
            }
        }, 1000);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => { new App(); });
