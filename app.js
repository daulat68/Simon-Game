// Game Start

let gameSeq = [];
let userSeq = [];

const sounds = {
    start: new Audio('assets/start.mp3'),
    end: new Audio('assets/end.mp3'),
    click: new Audio('assets/click.mp3'),
    highscore: new Audio('assets/highscore.mp3'),
};

let btns = ["r", "y", "g", "b"];

let started = false;
let level = 0;
let highscore = 0;
let h2 = document.querySelector("h2");
let highscoreDisplay = document.getElementById("highscore");

// Start the game when a key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        sounds.start.play();
        levelUp();
    }
});

// Flashing button for the game sequence
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
        console.log(gameSeq); 
    }, 500);
}

// Flashing button for user input
function userFlash(btn) {
    btn.classList.add("userFlash");
    sounds.click.play(); 
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Level up function to generate a new color in the sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let number = Math.floor(Math.random() * 4); 
    let randomColor = btns[number];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    btnFlash(randomBtn);
}

// Check user's answer against the game sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}!</b> <br> Press any key to start again`;

        if (level > highscore) {
            highscore = level;
            highscoreDisplay.innerText = `High Score: ${highscore}`;
            sounds.highscore.play();
        }

        sounds.end.play();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

// Handle button press by user
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Add event listeners to buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset game function
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}




