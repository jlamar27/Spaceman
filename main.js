import { pokemonArray } from "./pokemon.js";

const GAME_OVER_MESSAGE = "Game Over";
const CONGRATULATIONS_MESSAGE = "Congratulations! You won!";
const YOU_LOST_MESSAGE = "You Lost!";
const GUESSES_REMAINING_MESSAGE = "Guesses Remaining: ";
const POKEMON_WAS_MESSAGE = "The Pokemon was ";
const YOU_CAUGHT_MESSAGE = "You Caught ";
const BETTER_LUCK_NEXT_TIME_MESSAGE = ", better luck next time!";
const LOST_GIF_URL =
  "https://media.tenor.com/fKJxAaJdH48AAAAd/pokemon-ash-ketchum.gif";
const WON_GIF_URL =
  "https://media.tenor.com/lAz1WcGbKukAAAAC/pokeball-catch.gif";

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
closeBtn.addEventListener("click", () => {
  hideModal();
  newGame();
});

// Event listener for the try again button in the modal
tryAgainButton.addEventListener("click", () => {
  hideModal();
  newGame();
});

modal.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    hideModal();
    newGame();
  }
});


// Event listener for the guess form submission
guessForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const userGuess = guessInput.value.trim().toUpperCase();
  const isValidInput = /^[A-Za-z]+$/.test(userGuess);
  
  if (isValidInput) {
    checkWin(userGuess);
  } else {
    // Handle invalid input
  }
});


// Event listener for the Enter key press
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    const userGuess = guessInput.value.trim().toUpperCase();
    const isValidInput = /^[A-Za-z]+$/.test(userGuess);

  if (modal.style.display === "block") {
    hideModal();
    newGame();
    return;
  }

    if (isValidInput) {
      const isGuessCorrect = checkWin(userGuess);
      if (isGuessCorrect) {
        // Handle win
        return; 
      } else {
        incorrectGuess()
      }
    } else {
      // Handle invalid input
    }
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
  remainingGuessesEl.textContent = `${GUESSES_REMAINING_MESSAGE}${remainingGuesses}`;

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

    const allLettersGuessed = Array.from(blanks).every(blank => blank.textContent !== "");
    if (allLettersGuessed) {
      document.querySelectorAll(".letter").forEach((letter) => {
        letter.removeEventListener("click", letterClick);
      });
      checkWin(randomWord);
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
  remainingGuessesEl.textContent = `${GUESSES_REMAINING_MESSAGE}${remainingGuesses}`;

  if (remainingGuesses === 0) {
    document.querySelectorAll(".letter").forEach((letter) => {
      letter.removeEventListener("click", letterClick);
    });

    remainingGuessesEl.textContent = GAME_OVER_MESSAGE;

    if (guessInput !== randomWord) {
      showModal(YOU_LOST_MESSAGE, randomWord);
      newGame()
    }
  }
}

// Function to check win condition
function checkWin(userGuess) {
  const guessedLetters = document.querySelectorAll(".word-blank");
  const guessedLetterIds = [...guessedLetters].map(letter => letter.textContent);

  const isUserGuessCorrect = userGuess === randomWord;
  const areAllLettersGuessed = randomLetters.every(letter => guessedLetterIds.includes(letter));

  if (isUserGuessCorrect) {
    remainingGuessesEl.textContent = CONGRATULATIONS_MESSAGE;
    showModal(CONGRATULATIONS_MESSAGE, randomWord);
    return true;  // Return true to indicate a win
  } else if (areAllLettersGuessed) {
    remainingGuessesEl.textContent = CONGRATULATIONS_MESSAGE;
    showModal(CONGRATULATIONS_MESSAGE, randomWord);
    return true;  // Return true to indicate a win
  } else {
    remainingGuessesEl.textContent = GAME_OVER_MESSAGE;
    showModal(YOU_LOST_MESSAGE, randomWord);
    return false; // Return false to indicate a loss
  }
}




function showModal(message, word) {
  gameOver = true;
  modalMessage.textContent = message;

  const gameGif = document.getElementById("gameGif");

  if (message === YOU_LOST_MESSAGE) {
    modalWord.textContent = `${POKEMON_WAS_MESSAGE}${word}${BETTER_LUCK_NEXT_TIME_MESSAGE}`;
    gameGif.src = LOST_GIF_URL;
  } else {
    modalWord.textContent = `${CONGRATULATIONS_MESSAGE}${YOU_CAUGHT_MESSAGE}${word}`;
    gameGif.src = WON_GIF_URL;
  }

  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
  
}

newGame();

//try to make a keyboard
//have the image of shaded pokemon like they did in the tv shows as a hint.


