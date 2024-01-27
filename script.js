console.log("Welcome!")
let ting = new Audio("./Assets/ting.mp3")
let gameover = new Audio("./Assets/gameover.mp3")
let turn = "X";
let isGameover = false;
let clickCount = 0;

// function to check turn
const changeTurn = () => {
    turn = turn === "X" ? "O" : "X";
}

// function to check for a win
const checkWin = () => {

    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let boxtext = document.getElementsByClassName('boxText');
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
            isGameover = true;
            document.querySelector(".turnFor").innerText = `${boxtext[e[0]].innerText} has Won!`;
            document.querySelector("#excited").style.width = "25vw";
            gameover.play();
        }
    });
    console.log(clickCount);
}

//game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (isGameover) return;
        if (boxtext.innerText === "") {
            clickCount++;
            boxtext.innerText = turn;
            ting.play();
            changeTurn();
            if (clickCount == 9) {
                document.querySelector(".turnFor").innerText = `Match is a Draw!`;
                document.querySelector("#excited").style.width = "25vw";
                gameover.play();
                return;
            }
            checkWin();
            if (!isGameover) {
                document.querySelector(".turnFor").innerText = `Turn for ${turn}`;
            }
        }
    })
});


// reset game
const resetGame = () => {
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxText');
        boxtext.innerText = "";
    });
    turn = "X";
    isGameover = false;
    clickCount = 0;
    document.querySelector(".turnFor").innerText = "";
    document.querySelector("#excited").style.width = "0";
}