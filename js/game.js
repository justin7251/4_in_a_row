/**
 * 
 * 
 */
let board = [
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', ''],
    ['', '', '','', '', '','', '']
  ];


let w; // = width / 8;
let h; // = height / 8;
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let start = false;

$( document ).ready(function() {
    $('#btn1').click(function() {
        $('.start').addClass('hideme');
        let sketch = function(p) {
            p.setup = function() {
                let cnv = createCanvas(500, 500);
                cnv.id('canvas');
                w = width / 8;
                h = height / 8;
                start = true;
            }
        };
        new p5(sketch, window.document.getElementById('load'));
    });
});

function draw() {
    if (start) {
        background(255);
        strokeWeight(3);
        line(w, 0, w, height);
        line(w * 2, 0, w * 2, height);
        line(w * 3, 0, w * 3, height);
        line(w * 5, 0, w * 5, height);
        line(w * 4, 0, w * 4, height);
        line(w * 6, 0, w * 6, height);
        line(w * 7, 0, w * 7, height);

        line(0, h, width, h);
        line(0, h * 2, width, h * 2);
        line(0, h * 3, width, h * 3);
        line(0, h * 4, width, h * 4);
        line(0, h * 5, width, h * 5);
        line(0, h * 6, width, h * 6);
        line(0, h * 7, width, h * 7);
        
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let x = w * i + w / 2;
                let y = h * j + h / 2;
                let spot = board[i][j];
                textSize(25);
                let r = w / 8;
                if (spot == human) {
                    noFill();
                    ellipse(x, y, r * 2);
                } else if (spot == ai) {
                    line(x - r, y - r, x + r, y + r);
                    line(x + r, y - r, x - r, y + r);
                }
            }
        }
    }
}

function mousePressed() {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (!isNaN(i) && !isNaN(j) && i < 9 && j < 9) {
        if (board[i][j] == '') {
            let plot = currentPlayer;
            if (plot == human) {
                board[i][j] = human;
                currentPlayer = ai;
            } else {
                board[i][j] = ai;
                currentPlayer = human;
            }
            let result = checkwinner(plot, i, j);
            if (result != null) {
                noLoop();
                if (confirm(plot + ' wins ! \n Want to play again?')) {
                    location.reload();
                }
            }
        }
    }
  }

// find out if it is win 
function checkwinner(chess, x, y)  {
    let winner = null;
    var count1  = 0 ; // top down 
    var count2  = 0 ; // left right 
    var count3  = 0 ; // top left right bottom 
    var count4  = 0 ;//  right top left bottom 

    // check top (y ++ )
    for (var i = y + 1; i < 8 ; i++) {
        if (board[x][i] != chess) {break;}
        count1++;
    }
    // check down ( y -- ) 
    for (var i  = y ; i >= 0; i--) {
        if (board[x][i] != chess) {break;}
        count1++;
    }

    //check left  
    for (var i  = x ; i >= 0; i--) {
        if (board[i][y] != chess) {break;}
        count2++;
    }
    //check right 
    for (var i = x + 1; i < 8 ; i++) {
        if (board[i][y] != chess)  {break;}
        count2++;
    }
    
    // top left
    for (var i  = x , j  = y ; i >= 0, j < 8 ; i--, j++) {
        if (board[i][j] != chess) {break;}
        count3++;
    }
    // right bottom 
    for (var i  = x  + 1, j  = y  - 1; i < 8, j >= 0; i++, j--) {
        if (board[i][j] != chess) {break;}
        count3++;
    }

    //left bottom
    for (var i  = x , j  = y ; i >= 0, j >= 0; i--, j--) {
        if (board[i][j] != chess) {break;}
        count4++;
    }
    //right top
    for (var i = x + 1, j = y + 1; i < 8 , j < 8; i++, j++)  {
        if (board[i][j] != chess){break;}
        count4++;
    }
    if (count1 >= 4 || count2 >= 4 || count3 >= 4 || count4 >= 4)  {
        // check out if there is more then 4 in a line 
        return chess;
    } else {
        return winner;
    }
}