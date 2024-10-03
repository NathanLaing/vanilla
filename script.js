const BOARD_SIZE = 10;
const GAME_SPEED = 200; // ms
const MIDDLE = Math.floor(BOARD_SIZE / 2);

class Node {
    val;
    next;

    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

const snake = [new Node({ x: MIDDLE, y: MIDDLE })];
const food = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
};

/*
 * Use linked list for snake
 * Value at linked list is {x: int, y: int}
 *
 * During draw phase we iterate snake and color divs based on x,y
 *
 * Food also needs an x,y
 *
 * */

/*
 * Directions
 * [0,1] --> Right
 * [0, -1] --> Left
 * [1,0] --> Down
 * [-1, 0] --> Up
 * */

let board = document.querySelector(".board");
let score = document.querySelector(".score");
let direction = "Right";

setInterval(gameLoop, GAME_SPEED);
document.addEventListener("keydown", handleInput);

function gameLoop() {
    // move head
    // move tail
    // check for collisions
    // if wall OR tail
    // reset game
    // if food
    // score + 1
    // generate new food
    // draw
}

function handleInput(event) {
    const key = event.key;
    switch (key) {
        case "ArrowUp":
            direction = "Up";
            break;
        case "ArrowRight":
            direction = "Right";
            break;
        case "ArrowDown":
            direction = "Down";
            break;
        case "ArrowLeft":
            direction = "Left";
            break;
    }
}

function reset() {
    score.innerText = 0;
}

function createBoard(size, gameBoard) {
    const frag = document.createDocumentFragment();

    for (let i = 0; i < divs.length; i++) {
        docFrag.appendChild(divs[i]); // Note that this does NOT go to the DOM
    }
    document.body.appendChild(docFrag); // Appends all divs at once
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.className = `grid ${i + j}`;
            gameBoard.append(square);
        }
    }
}
