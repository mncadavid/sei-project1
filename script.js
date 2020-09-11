console.log("Works");
const word = document.querySelector(".word");
const keys = document.querySelectorAll(".key");
const buttons = document.querySelectorAll(".button");

keys.forEach(key => {
    key.addEventListener("click", checkLetter);
})

buttons.forEach(button => {
    button.addEventListener("click", populateWord);
})


let inputWord = "TEST";

let lettersGuessed = 0;
let wordLength = 0;

function populateWord(event){
    lettersGuessed = 0;
    while(word.firstChild){
        word.removeChild(word.firstChild);
    }
    let clickedButton = event.target.innerText;
    if(clickedButton === "Noisy Words"){
        inputWord = (noisyWords[Math.floor(Math.random()*noisyWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Color Words"){
        inputWord = (colorWords[Math.floor(Math.random()*colorWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Computer Words"){
        inputWord = (computerWords[Math.floor(Math.random()*computerWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    else if(clickedButton === "Robot Words"){
        inputWord = (robotWords[Math.floor(Math.random()*robotWords.length)]).toUpperCase();
        console.log(inputWord);
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
                div.style.color = "black";
            })
            checkForWinner();
        }
    })
    if(match === false){ buildRobot();}
}

function checkForWinner(){
    if(lettersGuessed >= wordLength){
        console.log("You won!");
    }
}

function buildRobot(){
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