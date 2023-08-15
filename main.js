import { pokemonArray } from "./pokemon.js";
// let game;

const wordBlanksContainer = document.querySelector("#wordBlanksContainer");
const keyboardLetters = document.querySelectorAll("#keyboard .letter");
const remainingGuessesEl = document.querySelector("#remaining-guesses");
const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");

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

let words = pokemonArray;
// [
//   "Blastoise",
//   "Snorlax",
//   "Ninetales",
//   "Squirtle",
//   "Dragonite",
//   "Eevee",
//   "Bulbasaur",
//   "Arcanine",
//   "Charizard",
//   "Gengar",
// ];

let randomWord;
let randomLetters;
let remainingGuesses;
let gameOver;

function newGame() {
  const pokemonNames = pokemonArray.map((obj) => obj.name);
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);
  randomWord = pokemonNames[randomIndex].toUpperCase();
  console.log(randomWord);
  randomLetters = randomWord.split("");
  console.log(randomLetters);

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
  guessForm.guessInput.value = "";
}

function handleLetterClick() {
  let clickedLetter = this.textContent;
  let blanks = document.querySelectorAll(".word-blank");

  let found = false;

  for (let i = 0; i < randomLetters.length; i++) {
    if (randomLetters[i] === clickedLetter) {
      blanks[i].textContent = clickedLetter;
      found = true;
    }
  }

  if (found) {
    this.style.pointerEvents = "none";
    this.style.opacity = 0;

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

// Function for incorrect guesses
function incorrectGuess() {
  remainingGuesses--;
  remainingGuessesEl.textContent = `Guesses Remaining: ${remainingGuesses}`;
  if (remainingGuesses === 0) {
    document.querySelectorAll(".letter").forEach((letter) => {
      letter.removeEventListener("click", handleLetterClick);
    });

    remainingGuessesEl.textContent = "Game Over";

    showModal("Almost had it!", randomWord);
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

// Event listener for the guess form submission
guessForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const userGuess = guessInput.value.toUpperCase();

  if (userGuess === randomWord.toUpperCase()) {
    remainingGuessesEl.textContent = "Congratulations! You won!";
    showModal("Congratulations!", randomWord);
  } else {
    remainingGuessesEl.textContent = "You lost! The word was: " + randomWord;
    showModal("You Lost!", randomWord);
  }
});

// Function to show the modal with the specified message and word
function showModal(message, word) {
  gameOver = true;
  modalMessage.textContent = message;
  if (message === "You Lost!") {
    modalWord.textContent = `The Pokemon was ${word}, Better luck nex time!`;
  } else {
    modalWord.textContent = `The Pokemon was ${word}.`;
  }
  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
}

// Event listener for the try again button in the modal
tryAgainButton.addEventListener("click", () => {
  hideModal();
  newGame();
});

document.addEventListener("keydown", function (event) {
  if (gameOver == true && event.key === "Enter") {
    event.preventDefault();
    hideModal();
    newGame();
    gameOver = false;
  }
});

console.log(randomWord);

// Event listener for the close button in the modal
closeBtn.addEventListener("click", hideModal);

newGame();
// pop up modal look prettier
// change the cursor when hovering over each letter to indicate to the user its clickable
//pokemon whos that pokemon hints, group same type of pokemon by type, ie water or fire...
//try to make a keyboard
//have team rocket popup when they lose
//have the image of shaded pokemon like they did in the tv shows as a hint.
// array of objects; name: "" type :

// replace words array with the array object using the key for the name and the value for the hint
