console.log("Works");
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
const iframe = document.querySelector('iframe');
const h2 = document.querySelector('h2');

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

function populateWord(event){
    clearInterval(loser);
    h2.style.display = "none";
    lettersGuessed = 0;
    incorrectLetters = 0;
    while(word.firstChild){
        word.removeChild(word.firstChild);
    }
    let clickedButton = event.target.innerText;
    if(clickedButton === "Noisy"){
        inputWord = (noisyWords[Math.floor(Math.random()*noisyWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Colors"){
        inputWord = (colorWords[Math.floor(Math.random()*colorWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Computers"){
        inputWord = (computerWords[Math.floor(Math.random()*computerWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Robots"){
        inputWord = (robotWords[Math.floor(Math.random()*robotWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "GO!"){
        inputWord = (input.value).toUpperCase();
        console.log(inputWord);
        input.value ='';
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
    inputWord.split("").forEach(letter => {
        if(clickedLetter === letter){
            lettersGuessed++;
            match = true;
            const revealLetters = word.querySelectorAll(`.${letter}`);
            revealLetters.forEach(div => {
                div.style.color = "limegreen";
            })
            checkForWinner();
        }
    })
    if(match === false){ 
        incorrectLetters++;
        buildRobot();
    }
}

function checkForWinner(){
    if(lettersGuessed >= wordLength){
        console.log("You won!");
        iframe.style.display = "initial";
    }
}

function buildRobot(){
    if(incorrectLetters === 1){
        head.style.display = "initial";
    }
    else if(incorrectLetters === 2){
        torso.style.display = "initial";
    }
    else if(incorrectLetters === 3){
        leftArm.style.display = "initial";
    }
    else if(incorrectLetters === 4){
        rightArm.style.display = "initial";
    }
    else if(incorrectLetters === 5){
        leftLeg.style.display = "initial";
    }
    else if(incorrectLetters === 6){
        rightLeg.style.display = "initial";
            loser = setInterval(function(){
                if(h2.style.display === "none"){
                h2.style.display = "initial";
                }
                else {
                    h2.style.display = "none";
                }}, 500);
        console.log("You Lose");
    }
    console.log("Robot");
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
    ]

    const colorWords = [
        'grey',
        'blue',
        'purple',
        'crimson',
        'white'
    ]