const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayer = "O";
let gameActive = true;

// Function to show winner message
function showWinner(winner) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.remove('hide');
    gameActive = false;
}

// Function to check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return true;
        }
    }
    return false;
}

// Function to handle tile clicks
function handleTileClick(event) {
    const tile = event.target;
    if (tile.innerText !== "" || !gameActive) return;

    // Set tile's text and background color
    tile.innerText = currentPlayer;
    tile.classList.add(currentPlayer === "O" ? "red-background" : "green-background");

    // Check if this move wins the game
    if (checkWinner()) return;

    // Switch players
    currentPlayer = currentPlayer === "O" ? "X" : "O";
}

// Reset game function
function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("red-background", "green-background");
    });
    currentPlayer = "O";
    gameActive = true;
    msgContainer.classList.add('hide');
}

// Event listeners
boxes.forEach(box => box.addEventListener("click", handleTileClick));
resetBtn.addEventListener("click", resetGame);
