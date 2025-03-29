let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOWins = document.querySelector("#playerO-wins");
let playerXWins = document.querySelector("#playerX-wins");
let turnO = true;
let count = 0;
let wins = { O: 0, X: 0 };
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) gameDraw();
  });
});
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => boxes.forEach(box => box.disabled = true);
const enableBoxes = () => boxes.forEach(box => { box.disabled = false; box.innerText = ""; });
const showWinner = (winner) => {
  wins[winner]++;
  playerOWins.innerText = wins.O;
  playerXWins.innerText = wins.X;
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern.map(i => boxes[i].innerText);
    if (a && a === b && b === c) {
      showWinner(a);
      return true;
    }
  }
};
newGameBtn.addEventListener("click", () => {
  wins.O = wins.X = 0;
  playerOWins.innerText = playerXWins.innerText = 0;
  resetGame();
});
resetBtn.addEventListener("click", resetGame);
