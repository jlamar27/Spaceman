import { pokemonArray } from "./pokemon.js";

//wordblanks & letters & guess features & remaining guesses
const wordBlanksContainer = document.querySelector("#wordBlanksContainer");
const keyboardLetters = document.querySelectorAll("#keyboard .letter");
const remainingGuessesEl = document.querySelector("#remaining-guesses");
const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");

// modal & images
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalMessage = document.querySelector("#modal-message");
const modalWord = document.querySelector("#modal-word");
const tryAgainButton = document.querySelector("#try-again-button");

let words = pokemonArray;

let randomWord;
let randomLetters;
let remainingGuesses;
let gameOver;

// Event listener for the close button in the modal
closeBtn.addEventListener("click", hideModal);


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

// Event listener for the guess form submission
guessForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const userGuess = guessInput.value.toUpperCase();

  const isValidInput = /^[A-Za-z]+$/.test(userGuess);

  if (!isValidInput) {
    // If the input is not valid, display an error message to the user
    alert("Please enter only letters from A to Z");
    return; // Exit 
  }

  if (userGuess === randomWord.toUpperCase()) {
    remainingGuessesEl.textContent = "Congratulations! You won!";
    showModal("Congratulations!", randomWord);
  } else {
    remainingGuessesEl.textContent = "You lost! The word was: " + randomWord;
    showModal("You Lost!", randomWord);
  }
});

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
    letter.addEventListener("click", letterClick);
  });

  const randomPokemon = pokemonArray[randomIndex];
  const hint = randomPokemon.hint;
  const hintTextElement = document.getElementById("hintText");
  hintTextElement.textContent = hint;

  document.querySelectorAll(".letter").forEach((letter) => {
    letter.addEventListener("click", letterClick);
  });
  guessForm.guessInput.value = "";


  guessForm.guessInput.value = "";
}


function letterClick() {
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
        letter.removeEventListener("click", letterClick);
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
      letter.removeEventListener("click", letterClick);
    });

    remainingGuessesEl.textContent = "Game Over";

    showModal();
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
  gameOver = true;
  modalMessage.textContent = message;

  const gameGif = document.getElementById("gameGif");
  if (message === "You Lost!") {
    modalWord.textContent = `The Pokemon was ${word}, Better luck next time!`;
    gameGif.src =
      "https://media.tenor.com/fKJxAaJdH48AAAAd/pokemon-ash-ketchum.gif";
  } else {
    modalWord.textContent = `The Pokemon was ${word}.`;
    gameGif.src = "https://media.tenor.com/lAz1WcGbKukAAAAC/pokeball-catch.gif";
  }
  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  closeBtn.addEventListener("click", function(){
    modal.style.display = "none";

  })

}



newGame();

// pop up modal look prettier
// change the cursor when hovering over each letter to indicate to the user its clickable
//pokemon whos that pokemon hints, group same type of pokemon by type, ie water or fire...
//try to make a keyboard
//have team rocket popup when they lose
//have the image of shaded pokemon like they did in the tv shows as a hint.

// replace words array with the array object using the key for the name and the value for the hint

//game does not reset when pressing "x" in the popup modal/ the guesses remaining still displays " you lost!, the word was:"
// match the typed word 