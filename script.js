let myStorage = window.sessionStorage;
const word = document.querySelector(".word");
const keys = document.querySelectorAll(".key");
const buttons = document.querySelectorAll(".button");
const head = document.querySelector(".head");
const leftArm = document.querySelector(".leftarm");
const rightArm = document.querySelector(".rightarm");
const leftLeg = document.querySelector(".leftleg");
const rightLeg = document.querySelector(".rightleg");
const torso = document.querySelector(".torso");
const go = document.querySelector(".go");
const input = document.querySelector("input");
const iframe = document.querySelector('.iframe');
const h3 = document.querySelector('h3');
const body = document.querySelector('body');
const jump = document.querySelector('.jump');
const timer = document.querySelector('.timer');

keys.forEach(key => {
    key.addEventListener("click", checkLetter);
})

buttons.forEach(button => {
    button.addEventListener("click", populateWord);
})

go.addEventListener("click", populateWord);

let inputWord = "";
let lettersGuessed = 0;
let wordLength = 0;
let incorrectLetters = 0;
let loser = 0;
let lettersGuessedArr = [];
let gameStatus = 'not started';
let time = 0;

function populateWord(event){
    time = 45;
    gameStatus = '';
    input.style.border = "initial";
    let clickedButton = event.target.innerText;
    switch (clickedButton){
    case "Noisy":
        inputWord = (noisyWords[Math.floor(Math.random()*noisyWords.length)]).toUpperCase();
        break;
    
    case "Colors":
        inputWord = (colorWords[Math.floor(Math.random()*colorWords.length)]).toUpperCase();
        break;
    
    case "Computers":
        inputWord = (computerWords[Math.floor(Math.random()*computerWords.length)]).toUpperCase();
        break;
    
    case "Robots":
        inputWord = (robotWords[Math.floor(Math.random()*robotWords.length)]).toUpperCase();
        break;
    
    case "GO!":
        if(input.value !== ''){
            inputWord = (input.value).toUpperCase();
            input.value ='';
        }
        else{
            input.style.border = "solid red";
            return;
        }
        break;
    }
    if(word.firstChild !== null){
        clearInterval(timerOn);
    }
    timerFunction(time);
    jump.pause();
    clearInterval(loser);
    h3.style.display = "none";
    lettersGuessed = 0;
    incorrectLetters = 0;
    lettersGuessedArr = [];
    head.style.display = "none";
    torso.style.display = "none";
    rightArm.style.display = "none";
    leftArm.style.display = "none";
    rightLeg.style.display = "none";
    leftLeg.style.display = "none";
    iframe.style.display = "none";
    gameStatus = '';
    while(word.firstChild){
        word.removeChild(word.firstChild);
    }
    for(let i =0; i<inputWord.length; i++){
        newLetter = document.createElement('div');
        newLetter.classList.add("letter");
        newLetter.classList.add((inputWord[i]));
        newLetter.innerText = inputWord[i];
        word.appendChild(newLetter);
    }
    wordLength = inputWord.length;
}

function checkLetter(event){
    if(gameStatus === ''){
        let match = false;
        let clickedLetter = event.target.innerText;
        if(!lettersGuessedArr.includes(clickedLetter)){
            lettersGuessedArr.push(clickedLetter);
            inputWord.split("").forEach(letter => {
                if(clickedLetter === letter){
                    lettersGuessed++;
                    match = true;
                    const revealLetters = word.querySelectorAll(`.${letter}`);
                    revealLetters.forEach(div => {
                        div.style.color = "rgb(100,205,50)";
                    })
                    checkForWinner();
                }
            })
            if(match === false){ 
                incorrectLetters++;
                buildRobot();
            }
        }
    }
}

function checkForWinner(){
    if(lettersGuessed >= wordLength){
         iframe.style.display = "initial";
         gameStatus = 'won';
         clearInterval(timerOn);
         while(word.firstChild){
            word.removeChild(word.firstChild);
        }
         jump.play();
    }
}

function buildRobot(){
    switch (incorrectLetters){
        case 1:
            head.style.display = "initial";
            break;
        case 2:
            torso.style.display = "initial";
            break;
        case 3:
            leftArm.style.display = "initial";
            break;
        case 4:
            rightArm.style.display = "initial";
            break;
        case 5:
            leftLeg.style.display = "initial";
            break;
        case 6:
            rightLeg.style.display = "initial";
            gameOver();
    }
}

function timerFunction(time){
    timer.innerText = `${time}`;
    if(gameStatus === ''){
    timerOn = setInterval(() => {
        time--;
        timer.innerText = Math.max(time, 0);
        if(time <= 0){
            gameOver();
        }
    }, 1000);
}
else if(gameStatus === 'lost'){
    gameOver();
}
}


function gameOver(){
    gameStatus = 'lost';
    clearInterval(timerOn);
    loser = setInterval(function(){
        if(h3.style.display === "none"){
        h3.style.display = "initial";
        }
        else {
            h3.style.display = "none";
        }}, 500);
}

window.addEventListener("beforeunload", storeInfo);

function storeInfo(){
    myStorage.headStyle = head.style.display;
    myStorage.torsoStyle = torso.style.display;
    myStorage.rightArmStyle = rightArm.style.display;
    myStorage.rightLegStyle = rightLeg.style.display;
    myStorage.leftArmStyle = leftArm.style.display;
    myStorage.leftLegStyle = leftLeg.style.display;
    myStorage.h3 = h3.style.display;
    myStorage.iframe = iframe.style.display;
    myStorage.time = time;
    myStorage.timerText = timer.innerText;
    myStorage.inputWord = inputWord;
    myStorage.lettersGuessed = lettersGuessed;
    myStorage.incorrectLetters = incorrectLetters;
    myStorage.loser = loser;
    myStorage.lettersGuessedArr = lettersGuessedArr;
    myStorage.gameStatus = gameStatus;
    myStorage.timerOn = timerOn;
}

window.addEventListener('load', getInfo);

function getInfo(){
    if (myStorage.length != 0){
    head.style.display = myStorage.getItem('headStyle');
    torso.style.display = myStorage.getItem('torsoStyle');
    rightArm.style.display = myStorage.getItem('rightArmStyle');
    rightLeg.style.display = myStorage.getItem('rightLegStyle');
    leftArm.style.display = myStorage.getItem('leftArmStyle');
    leftLeg.style.display = myStorage.getItem('leftLegStyle');
    h3.style.display = myStorage.getItem('h3');
    iframe.style.display = myStorage.getItem('iframe');
    timer.innerText = myStorage.getItem('timerText');
    time = parseInt(timer.innerText);
    inputWord = myStorage.getItem('inputWord');
    lettersGuessed = parseInt(myStorage.getItem('lettersGuessed'));
    wordLength = inputWord.length;
    incorrectLetters = parseInt(myStorage.getItem('incorrectLetters'));
    loser = myStorage.getItem('loser');
    lettersGuessedArr = (myStorage.getItem('lettersGuessedArr')).split(',');
    gameStatus = myStorage.getItem('gameStatus');
    timerOn = myStorage.getItem('timerOn');
    if (gameStatus != 'won'){
        for(let i =0; i<inputWord.length; i++){
            newLetter = document.createElement('div');
            newLetter.classList.add("letter");
            newLetter.classList.add((inputWord[i]));
            newLetter.innerText = inputWord[i];
            word.appendChild(newLetter);
        }
        for(let j=0; j<lettersGuessedArr.length; j++){
            inputWord.split("").forEach(letter => {
                if(lettersGuessedArr[j] === letter){
                    const revealLetters = word.querySelectorAll(`.${letter}`);
                    revealLetters.forEach(div => {
                        div.style.color = "rgb(100,205,50)";
                    })
                }
            })
        }
    }
    timerFunction(time);
    }
}




//https://jimpix.co.uk/words/word-generator.asp#results
const noisyWords = ["chuckle",
    "slurp",
    "whoosh",
    "itch",
    'croak',
    'purr',
    'ribbit',
    'squawk',
    'hum',
    'glug',
    'whip',
    'whirr',
    'roar',
    'zing',
    'howl',
    'plink',
    'trickle',
    'whimper',
    'mutter',
    'pitter',
    'groan',
    'neigh',
    'creak',
    'snarl',
    'bong',
    'clunk',
    'plonk',
    'murmur',
    'wham',
    'boo',
    'thwack',
    'thud',
    'gurgle',
    'ugh',
    'moan',
    'squeak',
    'whisper',
    'boing',
    'chomp',
    'rip',
    'sniff',
    'patter',
    'yelp',
    'whack',
    'splash',
    'tinkle',
    'snuffle',
    'baa',
    'kerching',
    'cluck'];

    const robotWords = [
        'robot',
        'gear',
        'cyborg',
        'automation',
        'android',
        'machine',
        'electromechanics',
        'cyber',
        'gadget',
        'bionic',
        'actuator',
        'arduino',
        'automation',
        'drive',
        'haptic',
        'hydraulics',
        'kinematics',
        'manipulator',
        'terminator',
        'pneumatic',
        'prosthetic',
        'servo',
        'motor',
        'optimus',
        'ultron',
        'walle',
        'assembly',
        'base',
        'cartesian',
        'loop',
        'command',
        'control',
        'coordinate',
        'processor',
        'encoder',
        'feedback',
        'force',
        'gripper',
        'home',
        'sensor',
        'intelligence',
        'instruction',
        'joint',
        'laser',
        'path',
        'pinch',
        'pitch',
        'remote',
        'vision',
        'wrist'
    ];

    const computerWords = [
        'monitor',
        'mouse',
        'processor',
        'memory',
        'keyboard',
        'RAM',
        'ROM',
        'webcam',
        'screen',
        'bandwidth',
        'algorithm',
        'captcha',
        'cookie',
        'broadband',
        'cybercrime',
        'database',
        'domain',
        'encryption',
        'firmware',
        'firewall',
        'gigabyte',
        'hyperlink',
        'interface',
        'kernel',
        'login',
        'malware',
        'node',
        'offline',
        'printer',
        'phish',
        'program',
        'protocol',
        'queue',
        'reboot',
        'resolution',
        'root',
        'shell',
        'security',
        'spam',
        'scroll',
        'server',
        'software',
        'storage',
        'terminal',
        'terabyte',
        'version',
        'window',
        'upload',
        'zipped',
        'widget'
    ];

    const colorWords = [
        'grey',
        'blue',
        'purple',
        'crimson',
        'white',
        'green',
        'coral',
        'teal',
        'turquoise',
        'magenta',
        'salmon',
        'ivory',
        'lavender',
        'orchid',
        'silver',
        'indigo',
        'fuchsia',
        'goldenrod',
        'violet',
        'amethyst',
        'plum',
        'orange',
        'yellow',
        'black',
        'gold',
        'aquamarine',
        'maroon',
        'beige',
        'blush',
        'chartreuse',
        'khaki',
        'cyan',
        'rose',
        'honeydew',
        'brown',
        'sienna',
        'olive'
    ];