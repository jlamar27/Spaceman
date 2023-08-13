let wordBlanksContainer = document.querySelector('#wordBlanksContainer')
let keyboardLetters = document.querySelectorAll("#keyboard .letter")
//make word equal to an array of objects or an array of words themselves...
// figure out which will work better 
let words = ['Blastoise', 'Snorlax', 'Ninetales', 'Squirtle', 'Dragonite', 'Eevee', 'Bulbasaur', 'Arcanine', 'Charizard', 'Gengar'];
// find out a way to randomly pick a word out of this array
let randomWord = words[Math.floor(Math.random()* words.length)];
let randomLetters = randomWord.split('').map(letter => letter.toUpperCase());

keyboardLetters.forEach(letterElement => {
    letterElement.addEventListener("click", function(){
        let clickedLetter = this.textContent;
        let blanks = document.querySelectorAll(".word-blank");

        if(randomLetters.includes(clickedLetter)) {
            blanks.forEach((blank, index) => {
                if (randomLetters[index] === clickedLetter) {
                    blank.textContent = clickedLetter;
                }
            });
        }else {
            this.style.pointerEvents = "none";
            this.style.opacity = 0;
        }
    });
});

for (let i = 0; i < randomLetters.length; i++) {
    const wordBlank = document.createElement("div")
    wordBlank.className = "word-blank";
    wordBlank.textContent = " "
    wordBlanksContainer.appendChild(wordBlank)
}


// if(randomLetters[i] === " "){
console.log(randomWord)




// the blanks always display one more word than I want them to
// only the first letter is being reavled whether that be
//  if it only appears once or several times
