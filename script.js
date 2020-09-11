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

function populateWord(event){
    let clickedButton = event.target.innerText;
    if(clickedButton === "Noisy Words"){
        inputWord = (noisyWords[Math.floor(Math.random()*noisyWords.length)]).toUpperCase();
        console.log(inputWord);
    }
    for(let i =0; i<inputWord.length; i++){
        newLetter = document.createElement('div');
        newLetter.classList.add("letter");
        newLetter.classList.add((inputWord[i]));
        newLetter.innerText = inputWord[i];
        word.appendChild(newLetter);
    }
}

function checkLetter(event){
    let match = false;
    let clickedLetter = event.target.innerText;
    inputWord.split("").forEach(letter => {
        if(clickedLetter === letter){
            match = true;
            const revealLetters = word.querySelectorAll(`.${letter}`);
            revealLetters.forEach(div => {
                div.style.color = "black";
            })
        }
    })
    if(match === false){ buildRobot();}
}

function buildRobot(){
    console.log("Robot");
}

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