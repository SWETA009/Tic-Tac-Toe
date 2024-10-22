let boxes = document.querySelectorAll(".box"); // Select all boxes
let reset = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-cont");
let msg = document.getElementById("msg1");
let newGame = document.getElementById("newgm"); // Make sure this is defined

let turnO = true; // True for O's turn, false for X's turn
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if box is empty
            box.innerText = turnO ? "O" : "X"; // Set text based on turn
            box.disabled = true; // Disable the box after clicking
            checkWinner(); // Check for a winner
            turnO = !turnO; // Toggle turn
        }
    });
});

const disableBox = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBox = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = ""; // Clear text
    });
};

const showWinner = (winner) => {
    msg.innerText = `Game over, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox(); // Disable all boxes
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val && pos2val && pos3val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val); // Show winner
            return; // Exit the function after finding a winner
        }
    }
    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBox();
    }
};

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
