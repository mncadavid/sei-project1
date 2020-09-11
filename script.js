console.log("Works");
const word = document.querySelector(".word");
const keys = document.querySelectorAll(".key");

keys.forEach(key => {
    key.addEventListener("click", checkLetter);
})


let inputWord = "TEST";

function populateWord(){
    for(let i =0; i<inputWord.length; i++){
        newLetter = document.createElement('div');
        newLetter.classList.add("letter");
        newLetter.classList.add((inputWord[i]));
        newLetter.innerText = inputWord[i];
        word.appendChild(newLetter);
    }
}

function checkLetter(event){
    let clickedLetter = event.target.innerText;
    inputWord.split("").forEach(letter => {
        if(clickedLetter === letter){
            const revealLetters = word.querySelectorAll(`.${letter}`);
            console.log(revealLetters);
            revealLetters.forEach(div => {
                div.style.color = "black";
            })
        }
    })
}

populateWord();
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