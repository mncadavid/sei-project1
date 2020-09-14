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

function populateWord(event){
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
    while(word.firstChild){
        word.removeChild(word.firstChild);
    }
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
    
    case"GO!":
        inputWord = (input.value).toUpperCase();
        input.value ='';
        break;
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

function checkForWinner(){
    if(lettersGuessed >= wordLength){
        console.log("You won!");
         iframe.style.display = "initial";
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
            loser = setInterval(function(){
                if(h3.style.display === "none"){
                h3.style.display = "initial";
                }
                else {
                    h3.style.display = "none";
                }}, 500);
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
        'bionic'
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
        'screen'
    ];

    const colorWords = [
        'grey',
        'blue',
        'purple',
        'crimson',
        'white'
    ];