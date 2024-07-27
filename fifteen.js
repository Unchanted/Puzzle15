'use strict';
/*
Puzzle class
- constructor: holds variables this.board (2D array of value for the board)
- slide(i,j): slides a piece by swapping its location with the blank space --> returns true if the slide takes place and false if the slide is unable to take place
- solved(): tests to see that puzzle has been returned to the original configuration --> returns true if solved and false if not
- randomize(): calls the helper function random_slide(), which calls the slide function with random pieces, a 250 times
*/
class Puzzle{
    constructor(){
       this.board = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,' ']];
       this.blanki = 3;
       this.blankj = 3;
    }
    
    slide(i,j){
        if((Math.abs(i-this.blanki)+Math.abs(j-this.blankj))==1){
           [this.board[this.blanki][this.blankj], this.board[i][j]] =  [this.board[i][j], this.board[this.blanki][this.blankj]];
            this.blanki = i;
            this.blankj = j;
            
            return true;
        }
        return false;

    }
    solved(){
        let reduceBoard = [].concat(...this.board);
        let correct = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' '];
        
        return reduceBoard.every((_,i) => reduceBoard[i] == correct[i]);
            
    }
    
    random_slide(){
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        
        this.slide(x,y);
    }
   
    randomize(){
        let i = this.blanki;
        let j = this.blankj;
        
        for(let k = 0; k < 500; k++){
            this.random_slide();
        }
            
        }
    }



//created instance of class Puzzle and a empty array that will hold the html div elements
const fif = new Puzzle();
let divs = [];

/*eventHandler for the slide function, which gets the i,j from the square clicked
- calls the Puzzle class' slide function using that 
- then redraws the board
- tests if the board is solved and if true, it displays a message to congratulate the user
*/
function clickSlide(e){
        let my_id = e.currentTarget.id;
        let id = my_id.split('_');
        let i = parseInt(id[1]);
        let j = parseInt(id[2]);
    
        fif.slide(i,j);
    
        divs.forEach((row,i) => row.forEach((s,j) => s.textContent = (fif.board[i][j])));
    
        if(fif.solved()){
            //setTimeout(() = > alert("You Solved The Puzzle!"),1); 
            alert("You solved the puzzle");
        }
}

/* eventHandler which is applied to the Ranodmize button 
- it calls the Puzzle's randomize method then redraws the board
*/
function clickRand(e){
    fif.randomize();
    divs.forEach((row,i) => row.forEach((s,j) => s.textContent = (fif.board[i][j])));
}

/*this is a loop to fill the array divs with all of the div elements. It is a multidimensional array
- similar to the board array of the puzzle class. This allows for easier manipulation between the board array
- and the divs 
*/
for(let i = 0; i < 4; i++){
        let row = [];
        for(let j = 0; j < 4; j++){
               row.push(document.getElementById('s_'+i+'_'+j));
        }
           divs.push(row);
    }


//adds a clickSlide eventHandler to each element in the divs array which allows each square to be clicked and slid
divs.forEach(row => row.forEach(x=>x.addEventListener("click",clickSlide)));


//adds the clickRand eventHandler to the randomize button
let rando = document.getElementById("rando");
rando.addEventListener("click", clickRand);
