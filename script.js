let angle = 0;
let playing = false;
let score = 0;
let highScore = 0;
let speed = 2;
const maxSpeed = 4.5;
let goodStart = 210;
let lastGoodStart = goodStart;

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const resultText = document.getElementById("result");
const startBtn =
document.getElementById("startBtn");
const pointer = document.getElementById("pointer");
const goodArc = document.getElementById("goodArc");
const greatArc = document.getElementById("greatArc");
const goodBorder =
document.getElementById("goodBorder");

const greatBorder =
document.getElementById("greatBorder");

function polarToCartesian(cx, cy, radius, angle) {
    
    const rad = (angle - 90) * Math.PI / 180;

    return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad)
    };

}

function describeArc(cx, cy, radius, startAngle, endAngle){
    
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);

    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArc, 0, end.x, end.y
    ].join(" ");

}

const CENTER = 125;
const RADIUS = 100;

const goodSize = 50;
const greatSize = 12;

function animate(){

    if(playing){

    angle += speed;

}
     if(angle >= 360){

        angle = 0;

  }

    pointer.setAttribute(
    "transform",
    `rotate(${angle} 125 125)`
);

    requestAnimationFrame(animate);

}

function checkHit(){

    const goodEnd = goodStart + goodSize;

    const greatStart = goodStart;
    const greatEnd = goodStart + greatSize;

    let currentAngle = angle;

    if(currentAngle < 0){
        currentAngle += 360;
    }

    if(currentAngle >= greatStart && currentAngle <= greatEnd){

        return "PERFECT";

    }

    if(currentAngle >= goodStart && currentAngle <= goodEnd){

        return "GOOD";

    }

    return "MISS";

}
function updateSkillCheck(){

    const goodEnd = goodStart + goodSize;

    const greatStart = goodStart;

    const greatEnd = goodStart + greatSize;

    goodBorder.setAttribute(
    "d",
    describeArc(
        CENTER,
        CENTER,
        RADIUS,
        goodStart,
        goodEnd
    )
);

greatBorder.setAttribute(
    "d",
    describeArc(
        CENTER,
        CENTER,
        RADIUS,
        greatStart,
        greatEnd
    )
);

    goodArc.setAttribute(
        "d",
        describeArc(
            CENTER,
            CENTER,
            RADIUS,
            goodStart,
            goodEnd
        )
    );

    greatArc.setAttribute(
        "d",
        describeArc(
            CENTER,
            CENTER,
            RADIUS,
            greatStart,
            greatEnd
        )
    );

}

function randomSkillCheck(){

    let newAngle;
    let diff;

    do{

        newAngle = Math.floor(Math.random() * 360);

        diff = Math.abs(newAngle - lastGoodStart);

        diff = Math.min(diff, 360 - diff);

    }while(diff < 140);

    lastGoodStart = newAngle;
    goodStart = newAngle;

}

function updateScore(){

    scoreText.innerText = "Score : " + score;

    highScoreText.innerText = "High Score : " + highScore;

}

document.addEventListener("click",()=>{
    if(!playing){
    return;
} 
    const result = checkHit();

    resultText.innerText = result;

    if(result == "PERFECT"){

    playPerfect();

    score++;

    speed = Math.min(speed + 0.5, maxSpeed);

}
else if(result == "GOOD"){

    playGood();

    score++;

    speed = Math.min(speed + 0.5, maxSpeed);

}
else{

    playMiss();

    if(score > highScore){

        highScore = score;

    }

    score = 0;

    speed = 2;

}
    
    updateScore();
    randomSkillCheck();
    updateSkillCheck();

});

startBtn.addEventListener("click",(event)=>{

    event.stopPropagation();

    if(!playing){

    startBtn.disabled = true;

    resultText.innerText = "3";

    setTimeout(()=>{

        resultText.innerText = "2";

    },1000);

    setTimeout(()=>{

        resultText.innerText = "1";
      
    },2000);

    setTimeout(()=>{

        resultText.innerText = "";

        playing = true;

        startBtn.innerText = "STOP";

        startBtn.disabled = false;

    },3000);

   }
    else{

        playing = false;

        startBtn.innerText = "START";

        score = 0;

        speed = 2;

        updateScore();

    }

});

updateSkillCheck();
updateScore();
animate();