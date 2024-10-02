const grid = document.querySelector(".grid");
const playAgain = document.querySelector(".playAgain");
const gameOver = document.querySelector("#gameOver");
const scoreDisplay = document.querySelector(".scoreDisplay");

const WIDTH = 10;
const SPEED = 0.8;

let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let intervalTime = 0;
let interval = 0;

function replay() {
    gameOver.close();
    grid.innerHTML = "";
    createBoard();
    startGame();
}

function control(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    switch (e.code) {
        case "KeyS":
        case "ArrowDown":
            direction = +WIDTH;
            break;

        case "KeyW":
        case "ArrowUp":
            direction = -WIDTH;
            break;
        case "KeyA":
        case "ArrowLeft":
            direction = -1;
            break;
        case "KeyD":
        case "ArrowRight":
            direction = 1;
            break;
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * SPEED;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function checkForHits(squares) {
    return (
        (currentSnake[0] + WIDTH >= WIDTH * WIDTH && direction === WIDTH) ||
        (currentSnake[0] % WIDTH === WIDTH - 1 && direction === 1) ||
        (currentSnake[0] % WIDTH === 0 && direction === -1) ||
        (currentSnake[0] - WIDTH <= 0 && direction === -WIDTH) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    );
}

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        gameOver.showModal();
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

function startGame() {
    const squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    //random apple
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function createBoard() {
    for (let i = 0; i < 100; i++) {
        grid.appendChild(document.createElement("div"));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    playAgain.addEventListener("click", replay);
    gameOver.addEventListener("close", replay);

    createBoard();
    startGame();
});
