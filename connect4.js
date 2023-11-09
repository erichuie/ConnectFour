"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let row = [];
  for(let i = 0; i < HEIGHT; i++){
    for(let j = 0; j < WIDTH; j++){
      row.push(null);
    }
    board.push(row);
    row = [];
  }
  // debugger;
  // console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // Create a table row to represent the top of the game board
  // and set its id appropriaetly.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // For the column-top row, make WIDTH cells, and set their ids
  // to top-0 ... top-[WIDTH-1]. Then, make it responsive to clicks.
  // Finally, the cells are appended to the row itself and the row
  // is appended to the board.
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      // Create a table row element and assign to a "row" variable.
      const cell = document.createElement('td');

      // Add an id, c-y-x, to the above table cell element
      // (for example, for the cell at y=2, x=3, the ID should be "c-2-3")
      cell.setAttribute("id", `c-${y}-${x}`);

      // Append the table cell to the table row
      row.append(cell);

    }
    // Append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

function findSpotForCol(x) {
  //write the real version of this, rather than always returning 5
  if(board[0][x] !== null){
    return null;
  }
  for(let i = 0; i < HEIGHT; i++){
    if (board[i][x] !== null){
      return i - 1;
    }
  }
  return HEIGHT - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Make a div and insert into correct table cell.
  const newDiv = document.createElement('div');
  newDiv.classList.add('piece', `p${currPlayer}`);
  document.getElementById(`c-${y}-${x}`).append(newDiv);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // Check four cells to see if they're all legal & all color of current
    // player
    for(let i = 0; i < cells.length; i++){

      // debugger;

      if(cells[i][0] >= HEIGHT || cells[i][0] < 0){
        return false;
      }
      if(cells[i][1] >= WIDTH || cells[i][0] < 0){
        return false;
      }
      let currTableCell = document.getElementById(`c-${cells[i][0]}-${cells[i][1]}`);
      if(currTableCell.firstElementChild !== null){
        if(currTableCell.firstElementChild.classList.contains(`p${currPlayer}`) !== true){
          return false;
        }
      }
    }
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      console.log(_win(horiz));
      console.log(_win(vert));
      console.log(_win(diagDR));
      console.log(_win(diagDL));
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update global `board` variable with new piece
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();