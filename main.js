import { pokemonArray } from "./pokemon.js";

// Messages
const GAME_OVER_MESSAGE = "Game Over";
const CONGRATULATIONS_MESSAGE = "Congratulations! You won!";
const YOU_LOST_MESSAGE = "You Lost!";
const GUESSES_REMAINING_MESSAGE = "Guesses Remaining: ";
const POKEMON_WAS_MESSAGE = "The Pokemon was ";
const YOU_CAUGHT_MESSAGE = "You Caught ";
const BETTER_LUCK_NEXT_TIME_MESSAGE = ", better luck next time!";

// GIF URLs
const LOST_GIF_URL = "https://media.tenor.com/fKJxAaJdH48AAAAd/pokemon-ash-ketchum.gif";
const WON_GIF_URL = "https://media.tenor.com/lAz1WcGbKukAAAAC/pokeball-catch.gif";

// Elements
const wordBlanksContainer = document.querySelector("#wordBlanksContainer");
const keyboardLetters = document.querySelectorAll("#keyboard .letter");
const remainingGuessesEl = document.querySelector("#remaining-guesses");
const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalMessage = document.querySelector("#modal-message");
const modalWord = document.querySelector("#modal-word");
const tryAgainButton = document.querySelector("#try-again-button");
const difficultySelect = document.querySelector("#difficultySelect"); 
const guessHistoryContainer = document.querySelector("#guessHistory");

// Game state
let randomWord;
let randomLetters;
let remainingGuesses;
let gameOver;
let difficulty = 1; // Default difficulty level (1: Easy, 2: Medium, 3: Hard)

// Event listeners
closeBtn.addEventListener("click", resetAndHideModal);
tryAgainButton.addEventListener("click", resetAndHideModal);
modal.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    resetAndHideModal();
  }
});
guessForm.addEventListener("submit", handleGuessSubmission);
guessInput.addEventListener("keydown", handleEnterKey);
difficultySelect.addEventListener("change", handleDifficultyChange);

// Initialize the game
newGame();

function resetAndHideModal() {
  hideModal();
  newGame();
  guessHistoryContainer.textContent = "";
}

function handleGuessSubmission(event) {
  event.preventDefault();
  const userGuess = guessInput.value.trim().toUpperCase();
  const isValidInput = /^[A-Za-z]+$/.test(userGuess);

  if (!isValidInput) {
    alert("Please enter only letters.");
    return;
  }

  if (modal.style.display === "block") {
    resetAndHideModal();
    return;
  }

  checkWin(userGuess);
  addToGuessHistory(userGuess);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const userGuess = guessInput.value.trim().toUpperCase();
    const isValidInput = /^[A-Za-z]+$/.test(userGuess);

    if (modal.style.display === "block") {
      resetAndHideModal();
      return;
    }

    if (isValidInput) {
      const isGuessCorrect = checkWin(userGuess);
      if (!isGuessCorrect) {
        incorrectGuess();
      }
    }
  }
}

function newGame() {
  const pokemonNames = pokemonArray.map(obj => obj.name);
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);
  randomWord = pokemonNames[randomIndex].toUpperCase();
  randomLetters = randomWord.split("");
  setDifficulty();
  remainingGuessesEl.textContent = `${GUESSES_REMAINING_MESSAGE}${remainingGuesses}`;

  keyboardLetters.forEach(letterElement => {
    letterElement.style.pointerEvents = "auto";
    letterElement.style.opacity = 1;
  });

  wordBlanksContainer.innerHTML = '';

  for (let i = 0; i < randomLetters.length; i++) {
    let blank = document.createElement("span");
    blank.classList.add("word-blank");
    blank.textContent = "";
    wordBlanksContainer.appendChild(blank);
  }

  keyboardLetters.forEach(letter => {
    letter.addEventListener("click", letterClick);
  });

  const randomPokemon = pokemonArray[randomIndex];
  const hint = randomPokemon.hint;
  const hintTextElement = document.getElementById("hintText");
  hintTextElement.textContent = hint;

  guessInput.value = "";
}

function letterClick() {
  const clickedLetter = this.textContent;
  const blanks = document.querySelectorAll(".word-blank");

  let found = false;

  for (let i = 0; i < randomLetters.length; i++) {
    if (randomLetters[i] === clickedLetter) {
      blanks[i].textContent = clickedLetter;
      found = true;
    }
  }

  this.style.pointerEvents = "none";
  this.style.opacity = 0;

  const allLettersGuessed = Array.from(blanks).every(blank => blank.textContent !== "");
  if (allLettersGuessed) {
    keyboardLetters.forEach(letter => {
      letter.removeEventListener("click", letterClick);
    });
    checkWin(randomWord);
  } else if (!found) {
    incorrectGuess();
  }
}

function incorrectGuess() {
  remainingGuesses--;
  remainingGuessesEl.textContent = `${GUESSES_REMAINING_MESSAGE}${remainingGuesses}`;

  if (remainingGuesses === 0) {
    keyboardLetters.forEach(letter => {
      letter.removeEventListener("click", letterClick);
    });

    remainingGuessesEl.textContent = GAME_OVER_MESSAGE;

    if (guessInput.value !== randomWord) {
      showModal(YOU_LOST_MESSAGE, randomWord);
      newGame();
    }

    guessHistoryContainer.textContent = "";
  }
}

function checkWin(userGuess) {
  const guessedLetterIds = Array.from(document.querySelectorAll(".word-blank")).map(letter => letter.textContent);

  const isUserGuessCorrect = userGuess === randomWord;
  const areAllLettersGuessed = randomLetters.every(letter => guessedLetterIds.includes(letter));

  remainingGuessesEl.textContent = isUserGuessCorrect || areAllLettersGuessed ? CONGRATULATIONS_MESSAGE : GAME_OVER_MESSAGE;

  if (isUserGuessCorrect || areAllLettersGuessed) {
    showModal(isUserGuessCorrect ? CONGRATULATIONS_MESSAGE : YOU_LOST_MESSAGE, randomWord);
    return true;
  } else {
    showModal(YOU_LOST_MESSAGE, randomWord);
    return false;
  }
}

function showModal(message, word) {
  gameOver = true;
  modalMessage.textContent = message;
  modalWord.textContent = message === YOU_LOST_MESSAGE
    ? `${POKEMON_WAS_MESSAGE}${word}${BETTER_LUCK_NEXT_TIME_MESSAGE}`
    : `${CONGRATULATIONS_MESSAGE}${YOU_CAUGHT_MESSAGE}${word}`;

  const gameGif = document.getElementById("gameGif");
  gameGif.src = message === YOU_LOST_MESSAGE ? LOST_GIF_URL : WON_GIF_URL;

  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

function setDifficulty() {
  switch (difficulty) {
    case 1:
      remainingGuesses = 10;
      break;
    case 2:
      remainingGuesses = 7;
      break;
    case 3:
    remainingGuesses = 5;
    break;
  default:
    remainingGuesses = 10;
    break;
}

remainingGuessesEl.textContent = `${GUESSES_REMAINING_MESSAGE}${remainingGuesses}`;
}

function handleDifficultyChange(event) {
difficulty = parseInt(event.target.value, 10);
newGame();
}

function addToGuessHistory(letter) {
const guessHistoryItem = document.createElement("span");
guessHistoryItem.textContent = letter + " ";
guessHistoryContainer.appendChild(guessHistoryItem);
}
