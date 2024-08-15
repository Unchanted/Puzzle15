'use strict';

class Puzzle {
    constructor() {
        this.board = [
            ['🐜', '🦬', '🐈', '🐕'], 
            ['🐘', '🐟', '🐐', '🐓'], 
            ['🦎', '🦊', '🦘', '🦁'], 
            ['🐁', 'n', '🦦', ' ']
        ];
        this.blanki = 3;
        this.blankj = 3;
    }

    slide(i, j) {
        if ((Math.abs(i - this.blanki) + Math.abs(j - this.blankj)) == 1) {
            [this.board[this.blanki][this.blankj], this.board[i][j]] = [this.board[i][j], this.board[this.blanki][this.blankj]];
            this.blanki = i;
            this.blankj = j;
            return true;
        }
        return false;
    }

    solved() {
        const winningOrder = ['🐜', '🦬', '🐈', '🐕', '🐘', '🐟', '🐐', '🐓', '🦎', '🦊', '🦘', '🦁', '🐁', 'n', '🦦', ' '];
        let reduceBoard = [].concat(...this.board);
        return reduceBoard.every((_, i) => reduceBoard[i] === winningOrder[i]);
    }

    random_slide() {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        this.slide(x, y);
    }

    randomize() {
        for (let k = 0; k < 500; k++) {
            this.random_slide();
        }
    }
}

const fif = new Puzzle();
let divs = [];

function clickSlide(e) {
    let my_id = e.currentTarget.id;
    let id = my_id.split('_');
    let i = parseInt(id[1]);
    let j = parseInt(id[2]);

    fif.slide(i, j);
    divs.forEach((row, i) => row.forEach((s, j) => s.textContent = (fif.board[i][j])));

    if (fif.solved()) {
        alert("You solved the puzzle!");
        document.getElementById("about").classList.remove("hidden");
    }
}

function clickRand() {
    fif.randomize();
    divs.forEach((row, i) => row.forEach((s, j) => s.textContent = (fif.board[i][j])));
}

function clickHint() {
    alert("chronological order");
}

for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
        row.push(document.getElementById('s_' + i + '_' + j));
    }
    divs.push(row);
}

divs.forEach(row => row.forEach(x => x.addEventListener("click", clickSlide)));
document.getElementById("rando").addEventListener("click", clickRand);
document.getElementById("hint").addEventListener("click", clickHint);
document.getElementById("about").addEventListener("click", () => window.location.href = "https://github.com/Unchanted/Puzzle15");
