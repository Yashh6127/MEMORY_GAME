let symbols = ["🍎","🍌","🍇","🍒","🍎","🍌","🍇","🍒"];
let shuffled = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;

function shuffle() {
    shuffled = symbols.sort(() => 0.5 - Math.random());
}

function createBoard() {
    let board = document.getElementById("board");
    board.innerHTML = "";

    shuffled.forEach((symbol, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.innerText = "?";

        card.addEventListener("click", flipCard);

        board.appendChild(card);
    });
}

function flipCard() {
    if (lock) return;

    if (this === firstCard) return;

    this.innerText = this.dataset.symbol;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById("moves").innerText = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetTurn();
    } else {
        lock = true;

        setTimeout(() => {
            firstCard.innerText = "?";
            secondCard.innerText = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

function startGame() {
    moves = 0;
    document.getElementById("moves").innerText = moves;
    shuffle();
    createBoard();
}

// auto start
startGame();