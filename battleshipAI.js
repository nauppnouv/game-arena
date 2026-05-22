// Battleship AI module (extracted from game.js)
export class BattleshipAI {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.huntStack = [];
        this.hitCells = [];
        this.triedCells = new Set();
    }
    reset() { this.huntStack = []; this.hitCells = []; this.triedCells = new Set(); }

    getAttack(size, playerShots = null) {
        if (this.difficulty === 'easy') return this._randomAttack(size, playerShots);

        // Try cells from hunt stack (target mode)
        while (this.huntStack.length > 0) {
            const cell = this.huntStack.pop();
            const key = `${cell.row},${cell.col}`;
            const excluded = playerShots && playerShots[cell.row] && playerShots[cell.row][cell.col] !== null;
            if (!this.triedCells.has(key) && !excluded && cell.row >= 0 && cell.row < size && cell.col >= 0 && cell.col < size) {
                return cell;
            }
        }

        // Hunt mode
        if (this.difficulty === 'hard') return this._adaptiveCheckerboardAttack(size, playerShots);
        return this._randomAttack(size, playerShots);
    }

    reportResult(row, col, result) {
        this.triedCells.add(`${row},${col}`);
        if (result === 'hit') {
            this.hitCells.push({ row, col });
            // Add adjacent cells to hunt stack (prioritized)
            const adj = [{ row: row - 1, col }, { row: row + 1, col }, { row, col: col - 1 }, { row, col: col + 1 }];

            // If we have multiple hits, try to continue in line
            if (this.hitCells.length >= 2) {
                const prev = this.hitCells[this.hitCells.length - 2];
                const dr = row - prev.row, dc = col - prev.col;
                if (Math.abs(dr) + Math.abs(dc) === 1) {
                    // Continue in same direction (priority)
                    this.huntStack.push({ row: row + dr, col: col + dc });
                    // Also try opposite end
                    this.huntStack.push({ row: prev.row - dr, col: prev.col - dc });
                }
            }

            for (const a of adj) this.huntStack.push(a);
        }
        if (result === 'sunk') {
            // Remove sunk ship hits from tracking
            this.hitCells = [];
            this.huntStack = [];
        }
    }

    _randomAttack(size, playerShots) {
        const available = [];
        for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
            if (this.triedCells.has(`${r},${c}`)) continue;
            if (playerShots && playerShots[r][c] !== null) continue;
            available.push({ row: r, col: c });
        }
        if (available.length === 0) {
            // Fallback: ignore playerShots exclusions
            for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
                if (!this.triedCells.has(`${r},${c}`)) available.push({ row: r, col: c });
            }
        }
        return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
    }

    _adaptiveCheckerboardAttack(size, playerShots) {
        let heatmap = null;
        try {
            const data = localStorage.getItem('bs-player-placement-heatmap');
            if (data) heatmap = JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
        
        if (!heatmap || !Array.isArray(heatmap) || heatmap.length !== size) {
            heatmap = Array.from({ length: size }, () => Array(size).fill(1.0));
        }
        
        // Build list of candidate cells
        let candidates = [];
        let fallbackCandidates = []; // non-checkerboard cells
        
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const key = `${r},${c}`;
                if (this.triedCells.has(key)) continue;
                
                // Exclude player shot coordinates if possible
                const isExcluded = playerShots && playerShots[r][c] !== null;
                if (isExcluded) continue;
                
                const score = (heatmap[r][c] || 1.0) + Math.random() * 0.1;
                
                if ((r + c) % 2 === 0) {
                    candidates.push({ row: r, col: c, score });
                } else {
                    fallbackCandidates.push({ row: r, col: c, score });
                }
            }
        }
        
        // If no non-excluded cells on checkerboard, try all non-excluded cells
        if (candidates.length === 0) {
            candidates = fallbackCandidates;
        }
        
        // If still empty (e.g. ALL cells are excluded by playerShots), ignore exclusions
        if (candidates.length === 0) {
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const key = `${r},${c}`;
                    if (this.triedCells.has(key)) continue;
                    
                    const score = (heatmap[r][c] || 1.0) + Math.random() * 0.1;
                    if ((r + c) % 2 === 0) {
                        candidates.push({ row: r, col: c, score });
                    } else {
                        fallbackCandidates.push({ row: r, col: c, score });
                    }
                }
            }
            if (candidates.length === 0) {
                candidates = fallbackCandidates;
            }
        }
        
        if (candidates.length === 0) return null;
        
        // Sort by score descending and return the best one
        candidates.sort((a, b) => b.score - a.score);
        return candidates[0];
    }
}
