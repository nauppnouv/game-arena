// Battleship Engine module (extracted from game.js)
export const SHIP_TYPES = [
    { id: 'carrier',    name: 'Tàu sân bay',  size: 5, icon: '🚢' },
    { id: 'battleship', name: 'Thiết giáp hạm', size: 4, icon: '⛴️' },
    { id: 'cruiser',    name: 'Tuần dương hạm', size: 3, icon: '🛥️' },
    { id: 'submarine',  name: 'Tàu ngầm',     size: 3, icon: '🐟' },
    { id: 'destroyer',  name: 'Khu trục hạm',  size: 2, icon: '🚤' },
];

export class BattleshipEngine {
    constructor() {
        this.size = 10;
        this.phase = 'placement'; // placement | battle | gameover
        this.currentTurn = 'player'; // player | opponent
        this.playerBoard = this._emptyBoard();
        this.opponentBoard = this._emptyBoard();
        this.playerShots = this._emptyBoard();
        this.opponentShots = this._emptyBoard();
        this.playerShips = [];
        this.opponentShips = [];
    }
    _emptyBoard() { return Array.from({ length: this.size }, () => Array(this.size).fill(null)); }
    reset() {
        this.phase = 'placement'; this.currentTurn = 'player';
        this.playerBoard = this._emptyBoard(); this.opponentBoard = this._emptyBoard();
        this.playerShots = this._emptyBoard(); this.opponentShots = this._emptyBoard();
        this.playerShips = []; this.opponentShips = [];
    }

    canPlaceShip(board, row, col, size, horizontal) {
        for (let i = 0; i < size; i++) {
            const r = horizontal ? row : row + i;
            const c = horizontal ? col + i : col;
            if (r < 0 || r >= this.size || c < 0 || c >= this.size) return false;
            if (board[r][c] !== null) return false;
            // Check adjacent cells (ships can't touch)
            for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < this.size && nc >= 0 && nc < this.size && board[nr][nc] !== null) return false;
            }
        }
        return true;
    }

    placeShip(board, ships, shipType, row, col, horizontal) {
        if (!this.canPlaceShip(board, row, col, shipType.size, horizontal)) return false;
        const cells = [];
        for (let i = 0; i < shipType.size; i++) {
            const r = horizontal ? row : row + i;
            const c = horizontal ? col + i : col;
            board[r][c] = shipType.id;
            cells.push({ row: r, col: c });
        }
        ships.push({ ...shipType, cells, hits: 0, sunk: false, horizontal });
        return true;
    }

    removeShip(board, ships, shipId) {
        const idx = ships.findIndex(s => s.id === shipId);
        if (idx === -1) return;
        const ship = ships[idx];
        for (const cell of ship.cells) board[cell.row][cell.col] = null;
        ships.splice(idx, 1);
    }

    clearBoard(board, ships) {
        for (let r = 0; r < this.size; r++) for (let c = 0; c < this.size; c++) board[r][c] = null;
        ships.length = 0;
    }

    attack(targetBoard, targetShips, shots, row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return null;
        if (shots[row][col] !== null) return null; // Already shot
        if (targetBoard[row][col] !== null) {
            shots[row][col] = 'hit';
            const shipId = targetBoard[row][col];
            const ship = targetShips.find(s => s.id === shipId);
            if (ship) {
                ship.hits++;
                if (ship.hits >= ship.size) {
                    ship.sunk = true;
                    // Mark all cells as sunk
                    for (const cell of ship.cells) shots[cell.row][cell.col] = 'sunk';
                    return 'sunk';
                }
            }
            return 'hit';
        } else {
            shots[row][col] = 'miss';
            return 'miss';
        }
    }

    allShipsSunk(ships) { return ships.length > 0 && ships.every(s => s.sunk); }

    randomPlacement(board, ships) {
        this.clearBoard(board, ships);
        for (const shipType of SHIP_TYPES) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 1000) {
                const horizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * this.size);
                const col = Math.floor(Math.random() * this.size);
                placed = this.placeShip(board, ships, shipType, row, col, horizontal);
                attempts++;
            }
        }
    }
}
