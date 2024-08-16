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
        let reduceBoard = [].concat(...this.board);
        let correct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];

        return reduceBoard.every((_, i) => reduceBoard[i] == correct[i]);
    }

    randomize() {
        for (let k = 0; k < 500; k++) {
            this.random_slide();
        }
    }

    random_slide() {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);

        this.slide(x, y);
    }

    showHint() {
        alert("Alphabetical order");
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
        alert("You solved the puzzle");
    }
}

function clickRand(e) {
    fif.randomize();
    divs.forEach((row, i) => row.forEach((s, j) => s.textContent = (fif.board[i][j])));
}

for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
        row.push(document.getElementById('s_' + i + '_' + j));
    }
    divs.push(row);
}

divs.forEach(row => row.forEach(x => x.addEventListener("click", clickSlide)));

let rando = document.getElementById("rando");
rando.addEventListener("click", clickRand);

let hintButton = document.getElementById("hint");
hintButton.addEventListener("click", () => fif.showHint());

let aboutButton = document.getElementById("about");
aboutButton.addEventListener("click", () => {
    window.location.href = "https://github.com/Unchanted/Puzzle15";
});
