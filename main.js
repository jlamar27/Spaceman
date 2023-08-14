const wordBlanksContainer = document.querySelector("#wordBlanksContainer");
const keyboardLetters = document.querySelectorAll("#keyboard .letter");
const remainingGuessesEl = document.querySelector("#remaining-guesses");

let words = [
  "Blastoise",
  "Snorlax",
  "Ninetales",
  "Squirtle",
  "Dragonite",
  "Eevee",
  "Bulbasaur",
  "Arcanine",
  "Charizard",
  "Gengar",
];

let randomWord;
let randomLetters;

let remainingGuesses;

// Get the modal element
const modal = document.querySelector("#myModal");
// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".close");
// Get the <h2> element to display the message
const modalMessage = document.querySelector("#modal-message");
// Get the <p> element to display the random word
const modalWord = document.querySelector("#modal-word");
// Get the try again button
const tryAgainButton = document.querySelector("#try-again-button");


// Function for incorrect guesses
function incorrectGuess() {
  remainingGuesses--;
  remainingGuessesEl.textContent = `Guesses Remaining: ${remainingGuesses}`;
  if (remainingGuesses === 0) {
    document.querySelectorAll(".letter").forEach((letter) => {
      letter.removeEventListener("click", handleLetterClick);
    });
    
    remainingGuessesEl.textContent = "Game Over";
    
    showModal("Try Again", randomWord);
  }
}

// Function to check win condition
function checkWin() {
  const guessedLetters = document.querySelectorAll(".word-blank");
  
  for (let i = 0; i < guessedLetters.length; i++) {
    if (guessedLetters[i].textContent === "") {
      return false;
    }
  }
  
  remainingGuessesEl.textContent = "Congratulations! You won!";
  showModal("Congratulations!", randomWord);
  return true;
}


// Function to show the modal with the specified message and word
function showModal(message, word) {
  modalMessage.textContent = message;
  modalWord.textContent = `The word was: ${word}`;
  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
}

// Event listener to handle letter clicks
function handleLetterClick() {
  let clickedLetter = this.textContent;
  let blanks = document.querySelectorAll(".word-blank");
  
  if (randomLetters.includes(clickedLetter)) {
    blanks.forEach((blank, index) => {
      if (randomLetters[index] === clickedLetter) {
        blank.textContent = clickedLetter;
      }
    });
    
    if (checkWin()) {
      document.querySelectorAll(".letter").forEach((letter) => {
        letter.removeEventListener("click", handleLetterClick);
      });
    }
  } else {
    this.style.pointerEvents = "none";
    this.style.opacity = 0;
    incorrectGuess();
  }
}
keyboardLetters.forEach((letter) => {
  letter.addEventListener('click', handleLetterClick);
});

// Function to reset the game
function resetGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomLetters = randomWord.split("").map((letter) => letter.toUpperCase());
  
  remainingGuesses = 6;
  remainingGuessesEl.textContent = `Guesses Remaining: ${remainingGuesses}`;
  
  keyboardLetters.forEach((letterElement) => {
    letterElement.style.pointerEvents = "auto";
    letterElement.style.opacity = 1;
  });
  
  wordBlanksContainer.innerHTML = "";
  
  for (let i = 0; i < randomLetters.length; i++) {
    let blank = document.createElement("span");
    blank.classList.add("word-blank");
    wordBlanksContainer.appendChild(blank);
  }
  
  document.querySelectorAll(".letter").forEach((letter) => {
    letter.addEventListener("click", handleLetterClick);
  });
}

resetGame();

// Event listener for the try again button in the modal
tryAgainButton.addEventListener("click", () => {
  hideModal();
  resetGame();
});

// Event listener for the close button in the modal
closeBtn.addEventListener("click", hideModal);



//try putting a form or input field that will compare the users guess to the random word 
//and then have that be another way to end the game +prob add a function for that in check win function