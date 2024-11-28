const colorCodeTitle = document.querySelector("#clr-code");
const boxes = document.querySelector("#boxes");
const resultStatus = document.querySelector(".status");
const reloadBtn = document.querySelector("#reload");

let luckyNum;
let colors = new Array(3);
let charSet = "0123456789abcdef";

newGame();

reloadBtn.addEventListener("click", newGame);

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
    
    resultStatus.innerText = "Find the color with the given hexa code";
    resultStatus.classList.remove("correct");
    resultStatus.classList.remove("wrong");
    boxes.addEventListener("click", checkerFn);

    reloadBtn.innerText = "Reload";
}

function checkerFn(event){
    if(event.target.classList[0] !== "box")
        return;

    if(event.target.dataset.color === colors[luckyNum]){
        resultStatus.innerText = "Correct Answer!";
        resultStatus.classList.add("correct");
    }
    else{
        resultStatus.innerText = "Wrong Answer";
        resultStatus.classList.add("wrong");
    }

    boxes.removeEventListener("click", checkerFn);
    reloadBtn.innerText = "Play Again";

    for(let i=0; i<3; i++){
        boxes.children[i].innerText = colors[i];
        boxes.children[i].style.cursor = "default";
    }

    boxes.children[luckyNum].style.boxShadow = `${colors[luckyNum]} 0px 7px 29px 0px`;
}