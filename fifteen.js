'use strict';

class Puzzle {
    constructor() {
        this.board = [
            ['🐜', '🐃', '🐈', '🐕'],
            ['🐘', '🐟', '🐐', '🐓'],
            ['🦎', '🦊', '🦘', '🦁'],
            ['🐁', 'n', '🦦', ' ']
        ];
        this.blanki = 3;
        this.blankj = 3;
    }

    slide(i, j) {
        if (Math.abs(i - this.blanki) + Math.abs(j - this.blankj) === 1) {
            [this.board[this.blanki][this.blankj], this.board[i][j]] =
            [this.board[i][j], this.board[this.blanki][this.blankj]];
            this.blanki = i;
            this.blankj = j;
            return true;
        }
        return false;
    }

    solved() {
        const correct = [
            '🐜', '🐃', '🐈', '🐕',
            '🐘', '🐟', '🐐', '🐓',
            '🦎', '🦊', '🦘', '🦁',
            '🐁', 'n', '🦦', ' '
        ];
        const flatBoard = this.board.flat();
        return flatBoard.every((item, index) => item === correct[index]);
    }

    random_slide() {
        const x = Math.floor(Math.random() * 4);
        const y = Math.floor(Math.random() * 4);
        this.slide(x, y);
    }

    randomize() {
        for (let k = 0; k < 500; k++) {
            this.random_slide();
        }
    }
}

const puzzle = new Puzzle();
const divs = [];

function clickSlide(e) {
    const [_, i, j] = e.currentTarget.id.split('_');
    puzzle.slide(parseInt(i), parseInt(j));
    updateBoard();

    if (puzzle.solved()) {
        alert("You solved the puzzle!");
        const aboutButton = document.createElement("button");
        aboutButton.textContent = "About";
        aboutButton.className = "button";
        aboutButton.onclick = () => window.location.href = "https://github.com/Unchanted/Puzzle15";
        document.body.appendChild(aboutButton);
    }
}

function clickRand() {
    puzzle.randomize();
    updateBoard();
}

function showHint() {
    alert("chronological order");
}

function updateBoard() {
    divs.forEach((row, i) => row.forEach((div, j) => {
        div.textContent = puzzle.board[i][j];
    }));
}

for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
        const squareDiv = document.getElementById(`s_${i}_${j}`);
        row.push(squareDiv);
    }
    divs.push(row);
}

divs.forEach(row => row.forEach(div => div.addEventListener("click", clickSlide)));

document.getElementById("rando").addEventListener("click", clickRand);
document.getElementById("hint").addEventListener("click", showHint);

updateBoard();
