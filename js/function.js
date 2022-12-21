/*
GitHub: ChrisAurelio
Name: Chris Aurelio
Email: christopher_aurelio@student.uml.edu
*/

/* Sources for Help:
https://bobbyhadz.com/blog/javascript-import-json-file#:~:text=To%20import%20a%20JSON%20file%20in%20JavaScript%3A%201,example%2C%20import%20myJson%20from%20%27.%2Fexample.json%27%20assert%20%7Btype%3A%20%27json%27%7D.
https://stackoverflow.com/questions/1254665/jquery-draggable-droppable-how-to-snap-dropped-element-to-dropped-on-element
https://stackoverflow.com/questions/2424191/how-do-i-make-an-element-draggable-in-jquery
https://stackoverflow.com/questions/19589598/how-to-get-random-values-in-json
https://jqueryui.com/droppable/
*/


let tiles = []; // metadata for the Scrabble tiles. Specifies the letter, value of each letter, amount of each letter, and the associated image file
tiles[0] =  {"letter":"A",  "value":1,   "amount":9,	"tile":"url(graphics_data/tiles/Scrabble_Tile_A.jpg)"},
tiles[1] =  {"letter":"B",  "value":3,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_B.jpg)"},
tiles[2] =  {"letter":"C",  "value":3,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_C.jpg)"},
tiles[3] =  {"letter":"D",  "value":2,   "amount":4,	"tile":"url(graphics_data/tiles/Scrabble_Tile_D.jpg)"},
tiles[4] =  {"letter":"E",  "value":1,   "amount":12,   "tile":"url(graphics_data/tiles/Scrabble_Tile_E.jpg)"},
tiles[5] =  {"letter":"F",  "value":4,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_F.jpg)"},
tiles[6] =  {"letter":"G",  "value":2,   "amount":3,	"tile":"url(graphics_data/tiles/Scrabble_Tile_G.jpg)"},
tiles[7] =  {"letter":"H",  "value":4,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_H.jpg)"},
tiles[8] =  {"letter":"I",  "value":1,   "amount":9,	"tile":"url(graphics_data/tiles/Scrabble_Tile_I.jpg)"},
tiles[9] =  {"letter":"J",  "value":8,   "amount":1,	"tile":"url(graphics_data/tiles/Scrabble_Tile_J.jpg)"},
tiles[10] = {"letter":"K",  "value":5,   "amount":1,	"tile":"url(graphics_data/tiles/Scrabble_Tile_K.jpg)"},
tiles[11] = {"letter":"L",  "value":1,   "amount":4,	"tile":"url(graphics_data/tiles/Scrabble_Tile_L.jpg)"},
tiles[12] = {"letter":"M",  "value":3,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_M.jpg)"},
tiles[13] = {"letter":"N",  "value":1,   "amount":6,	"tile":"url(graphics_data/tiles/Scrabble_Tile_N.jpg)"},
tiles[14] = {"letter":"O",  "value":1,   "amount":8,	"tile":"url(graphics_data/tiles/Scrabble_Tile_O.jpg)"},
tiles[15] = {"letter":"P",  "value":3,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_P.jpg)"},
tiles[16] = {"letter":"Q",  "value":10,  "amount":1,	"tile":"url(graphics_data/tiles/Scrabble_Tile_Q.jpg)"},
tiles[17] = {"letter":"R",  "value":1,   "amount":6,	"tile":"url(graphics_data/tiles/Scrabble_Tile_R.jpg)"},
tiles[18] = {"letter":"S",  "value":1,   "amount":4,	"tile":"url(graphics_data/tiles/Scrabble_Tile_S.jpg)"},
tiles[19] = {"letter":"T",  "value":1,   "amount":6,	"tile":"url(graphics_data/tiles/Scrabble_Tile_T.jpg)"},
tiles[20] = {"letter":"U",  "value":1,   "amount":4,	"tile":"url(graphics_data/tiles/Scrabble_Tile_U.jpg)"},
tiles[21] = {"letter":"V",  "value":4,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_V.jpg)"},
tiles[22] = {"letter":"W",  "value":4,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_W.jpg)"},
tiles[23] = {"letter":"X",  "value":8,   "amount":1,	"tile":"url(graphics_data/tiles/Scrabble_Tile_X.jpg)"},
tiles[24] = {"letter":"Y",  "value":4,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_Y.jpg)"},
tiles[25] = {"letter":"Z",  "value":10,  "amount":1,	"tile":"url(graphics_data/tiles/Scrabble_Tile_Z.jpg)"},
tiles[26] = {"letter":"_",  "value":0,   "amount":2,	"tile":"url(graphics_data/tiles/Scrabble_Tile_Blank.jpg)"}

let deckTiles = []; // initializes empty array for tiles in the deck
let tile = "";
let deckCount = 7; // specifies maximum number of tiles in the deck

let score = 0; // initial score for the game
let highScore = 0; // initial high score for the game
let tilesLeft = 93; // 100 tiles - 7 in the rack

$(document).ready(function() { // when the page loads, run the start function
    start();
});

function start() {

    $("#score").html(score); // sets score on the page equal to initial value
    $("#highScore").html(highScore); // sets high score on the page equal to initial value
    $("#tilesLeft").html(tilesLeft); // sets tiles left on the page equal to initial value

    newTiles(); // calls the newTiles function
    draggable(); // calls the draggable function
    droppable(); // calls the droppable function

    for (let i = 1; i < 16; i++) { // for loop to remove the dropped class from all 15 game squares that may be remaining from a previous round
        let square = document.getElementById("square" + i);
        square.classList.remove("dropped");
    }
};

function restart() { // when the Restart button is clicked, the page resets
    location.reload();
}

function newTiles() {
    tile = "";

    for (let i = 1; i < 8; i++) { // for loop to initialize 7 random game tiles and push them to the deckTiles array. Then displays them on the page
        let randomTile = Math.floor(Math.random() * 27);
        deckTiles.push(randomTile);

        tile += "<img id='tile-" + i + "' class='tile" + "' src='" + "js/graphics_data/tiles/Scrabble_Tile_" + tiles[randomTile].letter + ".jpg" + "'></img>";
    }

    $('#tiles').html(tile);
}

function draggable() {
    for (let i = 1; i < 8; i++) {  // for loop to set the draggable features for each of the 7 game tiles
        $("#tile-" + i).draggable({
            drag : function(event, ui) {
                $(this).addClass("moved"); // adds moved class to dragged elements. Was supposed to be used to know which tiles to replace when Next Word was clicked
                deckCount--; // decrements the number of tiles in the deck after tile is moved from the deck
            },
            revert : function(event, ui) { // tile reverts to the deck if it does not get moved to the game board
                $(this).data("uiDraggable").originalPosition = {
                    top : 0,
                    left : 0
                };

                return !event;
            },
        });
    }
}

function droppable() {
    for (let i = 1; i < 16; i++) {  // for loop to set the droppable features for each of the 15 game board squares
        $("#square" + i).droppable({
            drop: function(event, ui) {
                $(this).droppable('option', 'accept', ui.draggable);
                $(this).addClass("dropped");

                // var dropped = ui.draggable;
                // var droppedOn = $(this);
                // $(dropped).detach().css({top: 3, left: -1}).appendTo(droppedOn);
            },
            out: function(event, ui) {
                $(this).removeClass('dropped');
                ui.draggable.removeClass('dropped');
            }   
        });
    }
}

function nextWord() {
    $("#gameBoard > div").html(""); // resrts the game board when Next Word is clicked

    $("#score").html(score); // updates the score counter on the page
    $("#highScore").html(highScore); // updates the high score counter on the page
    $("#tilesLeft").html(tilesLeft); // updates the tiles left counter on the page

    $('#tiles').html(tile); // updates the tiles in the deck on the page

    draggable(); // calls draggable function to make new tiles draggable
}