const perfectSound = new Audio("sound/perfect.mp3");
const goodSound = new Audio("sound/good.mp3");
const missSound = new Audio("sound/miss.mp3");
const timeoutSound = new Audio("sound/timeout.mp3");



function playPerfect(){
    perfectSound.currentTime = 0;
    perfectSound.play();
}

function playGood(){
    goodSound.currentTime = 0;
    goodSound.play();
}

function playMiss(){
    missSound.currentTime = 0;
    missSound.play();
}

function playTimeout(){
    timeoutSound.currentTime = 0;
    timeoutSound.play();
}