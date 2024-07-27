
'use strict';

class Puzzle {
    constructor() {
        this.board = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, ' ']];
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
        const reduceBoard = [].concat(...this.board);
        const correct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
        return reduceBoard.every((value, index) => value === correct[index]);
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
let divs = [];

function clickSlide(e) {
    const my_id = e.currentTarget.id;
    const [i, j] = my_id.split('_').slice(1).map(Number);
    puzzle.slide(i, j);
    updateBoard();

    if (puzzle.solved()) {
        alert("You Solved The Puzzle!");
    }
}

function clickRand() {
    puzzle.randomize();
    updateBoard();
}

function updateBoard() {
    divs.forEach((row, i) => row.forEach((cell, j) => cell.textContent = puzzle.board[i][j]));
}
