/*
    Author: Jessmer John Palanca
    Section: CSC337 Web Programming SPRING2019, Homework 5
    Filename: fifteen.js
    Description: The javascript file for the fifteen.html
*/

'use strict';

(function(){
    /** - initializing the global variables
      * - emptyCol is the left position of the empty tile
      * - emptyRow is the top position of the empty tile
      * - ROW_SIZE is the number of row of the tile in the grid
      * - COL_SIZE is the number of columns of the tile in the grid
      * - TILE_SIZE is the width/height size of each tile
    */
    let emptyCol;
    let emptyRow;
    const ROW_SIZE = 4;
    const COL_SIZE = 4;
    const TILE_SIZE = 100;

    // when the page is fully loaded, do this function
    window.onload = function(){
        // creating the puzzle grid
        fifteenPuzzle();
        // creating events
        puzzleEvent();
        // onclick variabLe for the shuffle button
        let shuffle = document.getElementById("shufflebutton");
        shuffle.onclick = shuffleIt;
        // initializing the position of the empty tile, which is initially at
        // the bottom-right corner of the grid (left=-300px, top=-300px)
        emptyCol = 3 * TILE_SIZE;
        emptyRow = 3 * TILE_SIZE;
    };

    /** This function tracks the events of the puzzle.
      * When a tile is clicked, 'selectTile' function will be called.
      * Whenever the mouse is hovered over a tile, 'isMovable' function
      * will be called.
    */
    function puzzleEvent(){
        let grid = document.querySelectorAll(".tile");
        for(let i = 0; i < grid.length; i++){
            grid[i].addEventListener("click", selectTile);
            grid[i].addEventListener("mouseover", isMovable);
        }
    }

    /** This function creates the fifteen tiles of the puzzle.
      * The puzzle consists of 4 rows and 4 columns of tiles.
    */
    function fifteenPuzzle(){
        let tilePos = 1;
        let puzzlearea = document.getElementById("puzzlearea");
        for(let row = 0; row < ROW_SIZE; row++){
            for(let col = 0; col < COL_SIZE; col++){
                if(tilePos < 16){
                    // adding a div in every iteration
                    let tile = document.createElement("div");
                    // setting the same class name for every div
                    tile.classList.add("tile");
                    // adding the position number of the tile
                    tile.innerHTML = tilePos;
                    // setting the left- and top-coordinates of the tile
                    tile.style.left = col * TILE_SIZE + "px";
                    tile.style.top = row * TILE_SIZE + "px";
                    // setting the frame position of the background image that corresponds
                    // to the tile's position
                    tile.style.backgroundPosition = -col*TILE_SIZE+"px "+ -row*TILE_SIZE+"px";
                    // setting an id of the div
                    tile.id = "tile_" + row + "_" + col;
                    // adding the tile into the puzzlearea
                    puzzlearea.appendChild(tile);
                    tilePos++;
                }
            }
        }
    }

    /** This function checks if the current tile that is being selected/hovered is adjacent to the
      * empty tile.
    */
    function adjacentToBlank(tile){
        // fetching the left- and top-coordinates of the current tile
        let curLeft = parseInt(window.getComputedStyle(tile).left);
        let curTop = parseInt(window.getComputedStyle(tile).top);
        // if the difference of the left- and top-coordinates of the current and empty
        // tiles is 100 (or -100) and if the two tiles are aligned horizontally or
        // vertically (but not diagonally), then the two tiles must be adjacent.
        // The function returns true if the two tiles are adjacent. Otherwise, returns false.
        let diffLeft = emptyCol - curLeft;
        let diffTop = emptyRow - curTop;
        if ((((diffLeft === TILE_SIZE) || (diffLeft === -TILE_SIZE)) && emptyRow === curTop) ||
            (((diffTop === TILE_SIZE) || (diffTop === -TILE_SIZE)) && emptyCol === curLeft)){
            return true;
        }
        else{
            return false;
        }
    }

    /** Calls the 'moveTile' whenever a tile is selected.
    */
    function selectTile(){
        moveTile(this);
    }

    /** This function makes the tile that is being selected be swapped with
      * the empty tile's position.
    */
    function moveTile(tile){
        // fetching the left- and top-coordinates of the current tile
        let curLeft = parseInt(window.getComputedStyle(tile).left);
        let curTop = parseInt(window.getComputedStyle(tile).top);
        // if the current tile is adjacent to the empty tile
        if(adjacentToBlank(tile)){
            // swapping the left- and top-coordinates and properties of the two tiles
            tile.style.left = emptyCol + "px";
            tile.style.top = emptyRow + "px";
            emptyCol = curLeft;
            emptyRow = curTop;
        }

    }

    /** This function shuffles the tiles of the puzzle.
    */
    function shuffleIt(){
        let grid = document.querySelectorAll(".tile");
        for(let i = 0; i < 1000; i++){
            let neighbors = [];
            for(let j = 0; j < grid.length; j++){
                // if the tile is adjacent to the empty tile
                if(adjacentToBlank(grid[j])){
                    // add the tile into the list
                    neighbors.push(grid[j]);
                }
            }
            //generate random number for indexing
            let randNum = parseInt(Math.floor(Math.random() * (neighbors.length)));
            moveTile(neighbors[randNum]);
        }
    }

    /** This function calls a css function that changes the tile's appearance if a
      * tile is adjacent to the empty tile.
    */
    function isMovable(){
        if(adjacentToBlank(this)){
            this.classList.add("isMovable");
        }else{
            this.classList.remove("isMovable");
        }
    }
})();
