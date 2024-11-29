const colorCodeTitle = document.querySelector("#clr-code");
const boxes = document.querySelector("#boxes");
const resultStatus = document.querySelector(".status");
const reloadBtn = document.querySelector("#reload");

const scoreCard = document.querySelector(".score-card");
const livesCard = document.querySelector(".lives-card");
const highScoreCard = document.querySelector(".high-score-card");

let luckyNum;
let colors = new Array(3);
let charSet = "0123456789abcdef";

let score = 0;
let lives = 3;
let gameOver = true;

if(!localStorage.getItem("highScore"))
    localStorage.setItem("highScore", 0);
highScoreCard.innerText = localStorage.getItem("highScore");

newGame();

reloadBtn.addEventListener("click", ()=>{
    gameOver = true;
    newGame();
});

function newGame(){
    for(let j=0; j<3; j++){
        colors[j] = "";
        for(let i=1; i<=6; i++){
            let index = Math.floor(Math.random() * charSet.length);
            colors[j] += charSet.charAt(index);
        }
        colors[j] = "#" + colors[j];
    }

    for(let i=0; i<3; i++){
        boxes.children[i].dataset.color = colors[i];
        boxes.children[i].style.backgroundColor = colors[i];
        boxes.children[i].innerText = "";
        boxes.children[i].style.cursor = "pointer";
        boxes.children[i].style.boxShadow = "none";
    }

    luckyNum = Math.floor(Math.random() * 3);
    colorCodeTitle.innerText = colors[luckyNum];
    
    resultStatus.innerHTML = "Find next color";
    resultStatus.classList.remove("correct");
    resultStatus.classList.remove("wrong");
    boxes.addEventListener("click", checkerFn);

    reloadBtn.innerText = "Restart";

    if(gameOver === true){
        score = 0;
        lives = 3;
        gameOver = false;
        resultStatus.innerHTML = "Find the color with the given hexa code";

        scoreCard.innerText = score;
        livesCard.innerText = "";
        for(let i=1; i<= lives; i++){
            livesCard.innerHTML += `<i class="fa-solid fa-heart"></i> `;
        }
    }

}

function checkerFn(event){
    if(event.target.classList[0] !== "box")
        return;

    if(event.target.dataset.color === colors[luckyNum]){
        resultStatus.innerText = "Correct Answer!";
        resultStatus.classList.remove("wrong");
        resultStatus.classList.add("correct");
        score++;
    }
    else{
        resultStatus.innerText = "Wrong Answer";
        resultStatus.classList.remove("correct");
        resultStatus.classList.add("wrong");
        lives--;
    }

    boxes.removeEventListener("click", checkerFn);

    for(let i=0; i<3; i++){
        boxes.children[i].innerText = colors[i];
        boxes.children[i].style.cursor = "default";
    }

    boxes.children[luckyNum].style.boxShadow = `${colors[luckyNum]} 0px 7px 29px 0px`;

    scoreCard.innerText = score;
    livesCard.innerText = "";
    for(let i=1; i<= lives; i++){
        livesCard.innerHTML += `<i class="fa-solid fa-heart"></i> `;
    }

    if(lives === 0){
        gameOver = true;
        if(score > localStorage.getItem("highScore")){
            localStorage.setItem("highScore", score );
            resultStatus.innerHTML = 
            `Game Over <i class="fa-regular fa-face-smile-beam"></i>
            <span>  New High Score: ${score}</span>`;
            resultStatus.classList.remove("wrong");
            resultStatus.classList.add("correct");
            document.querySelector(".status span").style.color = "black";
        }
        else{
            resultStatus.innerHTML = 
            `Game Over <i class="fa-regular fa-face-frown-open"></i>
            <span>  Your score: ${score}</span>`;
             resultStatus.classList.remove("correct");
             resultStatus.classList.add("wrong");
             document.querySelector(".status span").style.color = "black";
        }       
        highScoreCard.innerText = localStorage.getItem("highScore");
        reloadBtn.innerText = "Play Again";
    }
    else{
        setTimeout(newGame, 1000);
    }
}