import { pokemonArray } from "./pokemon.js";

const MESSAGES = {
  GAME_OVER: "Game Over",
  CONGRATULATIONS: "Congratulations! You won!",
  YOU_LOST: "You Lost!",
  GUESSES_REMAINING: "Guesses Remaining: ",
  POKEMON_WAS: "The Pokemon was ",
  YOU_CAUGHT: "You Caught ",
  BETTER_LUCK_NEXT_TIME: ", better luck next time!",
};

const GIF_URLS = {
  LOST: "https://media.tenor.com/fKJxAaJdH48AAAAd/pokemon-ash-ketchum.gif",
  WON: "https://media.tenor.com/lAz1WcGbKukAAAAC/pokeball-catch.gif",
};

const elements = {
  wordBlanksContainer: document.querySelector("#wordBlanksContainer"),
  keyboardLetters: document.querySelectorAll("#keyboard .letter"),
  remainingGuessesEl: document.querySelector("#remaining-guesses"),
  guessForm: document.querySelector("#guessForm"),
  guessInput: document.querySelector("#guessInput"),
  modal: document.querySelector("#myModal"),
  closeBtn: document.querySelector(".close"),
  modalMessage: document.querySelector("#modal-message"),
  modalWord: document.querySelector("#modal-word"),
  tryAgainButton: document.querySelector("#try-again-button"),
  difficultySelect: document.querySelector("#difficultySelect"),
  hintTextElement: document.getElementById("hintText"),
};

let randomWord,
  randomLetters,
  remainingGuesses,
  difficulty = 1,
  gameOver;

elements.closeBtn.addEventListener("click", resetAndHideModal);
elements.tryAgainButton.addEventListener("click", resetAndHideModal);
elements.modal.addEventListener(
  "keydown",
  (event) => event.key === "Enter" && resetAndHideModal()
);
elements.guessForm.addEventListener("submit", handleGuessSubmission);
elements.guessInput.addEventListener("keydown", handleEnterKey);
elements.difficultySelect.addEventListener("change", handleDifficultyChange);

newGame();

function resetAndHideModal() {
  hideModal();
  newGame();
}

function handleGuessSubmission(event) {
  event.preventDefault();
  const userGuess = elements.guessInput.value.trim().toUpperCase();
  const isValidInput = /^[A-Za-z]+$/.test(userGuess);

  if (!isValidInput) {
    alert("Please enter only letters.");
    return;
  }

  if (elements.modal.style.display === "block") {
    resetAndHideModal();
    return;
  }

  checkWin(userGuess);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const userGuess = elements.guessInput.value.trim().toUpperCase();
    const isValidInput = /^[A-Za-z]+$/.test(userGuess);

    if (elements.modal.style.display === "block") {
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
  const pokemonNames = pokemonArray.map((obj) => obj.name);
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);
  randomWord = pokemonNames[randomIndex].toUpperCase();
  randomLetters = randomWord.split("");
  setDifficulty();
  elements.remainingGuessesEl.textContent = `${MESSAGES.GUESSES_REMAINING}${remainingGuesses}`;

  elements.keyboardLetters.forEach((letterElement) => {
    letterElement.style.pointerEvents = "auto";
    letterElement.style.opacity = 1;
  });

  elements.wordBlanksContainer.innerHTML = "";
  randomLetters.forEach(() => {
    const blank = document.createElement("span");
    blank.classList.add("word-blank");
    elements.wordBlanksContainer.appendChild(blank);
  });

  elements.keyboardLetters.forEach((letter) => {
    letter.addEventListener("click", letterClick);
  });

  const randomPokemon = pokemonArray[randomIndex];
  elements.hintTextElement.textContent = randomPokemon.hint;

  elements.guessInput.value = "";
}

function letterClick() {
  const clickedLetter = this.textContent;
  const blanks = document.querySelectorAll(".word-blank");
  const matchedIndices = [];

  randomLetters.forEach((letter, i) => {
    if (letter === clickedLetter) {
      blanks[i].textContent = clickedLetter;
      matchedIndices.push(i);
    }
  });

  this.style.pointerEvents = "none";
  this.style.opacity = 0;

  const allLettersGuessed = [...blanks].every(
    (blank) => blank.textContent !== ""
  );
  if (allLettersGuessed) {
    elements.keyboardLetters.forEach((letter) =>
      letter.removeEventListener("click", letterClick)
    );
    checkWin(randomWord);
  } else if (matchedIndices.length === 0) {
    incorrectGuess();
  }
}

function incorrectGuess() {
  remainingGuesses--;
  elements.remainingGuessesEl.textContent = `${MESSAGES.GUESSES_REMAINING}${remainingGuesses}`;

  if (remainingGuesses === 0) {
    elements.keyboardLetters.forEach((letter) =>
      letter.removeEventListener("click", letterClick)
    );
    elements.remainingGuessesEl.textContent = MESSAGES.GAME_OVER;

    if (elements.guessInput.value !== randomWord) {
      showModal(MESSAGES.YOU_LOST, randomWord);
      newGame();
    }
  }
}

function checkWin(userGuess) {
  const guessedLetterIds = Array.from(
    document.querySelectorAll(".word-blank")
  ).map((letter) => letter.textContent);

  const isUserGuessCorrect = userGuess === randomWord;
  const areAllLettersGuessed = randomLetters.every((letter) =>
    guessedLetterIds.includes(letter)
  );

  elements.remainingGuessesEl.textContent =
    isUserGuessCorrect || areAllLettersGuessed
      ? MESSAGES.CONGRATULATIONS
      : MESSAGES.GAME_OVER;

  if (isUserGuessCorrect || areAllLettersGuessed) {
    showModal(
      isUserGuessCorrect ? MESSAGES.CONGRATULATIONS : MESSAGES.YOU_LOST,
      randomWord
    );
    return true;
  } else {
    showModal(MESSAGES.YOU_LOST, randomWord);
    return false;
  }
}

function showModal(message, word) {
  gameOver = true;
  elements.modalMessage.textContent = message;
  elements.modalWord.textContent =
    message === MESSAGES.YOU_LOST
      ? `${MESSAGES.POKEMON_WAS}${word}${MESSAGES.BETTER_LUCK_NEXT_TIME}`
      : `${MESSAGES.CONGRATULATIONS}${MESSAGES.YOU_CAUGHT}${word}`;

  const gameGif = document.getElementById("gameGif");
  gameGif.src = message === MESSAGES.YOU_LOST ? GIF_URLS.LOST : GIF_URLS.WON;

  elements.modal.style.display = "block";
}

function hideModal() {
  elements.modal.style.display = "none";
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

  elements.remainingGuessesEl.textContent = `${MESSAGES.GUESSES_REMAINING}${remainingGuesses}`;
}

function handleDifficultyChange(event) {
  difficulty = parseInt(event.target.value);
}
