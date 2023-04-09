//Event listeners: 
//document.querySelector("#startGame").addEventListener("click", startGame);
//document.querySelector("#resetButton").addEventListener("click", resetButton);
// Once you have started the timer, how do you want it to function?
// function operation sets-up how and what the timer must do.
// In this case, you want the timer to start counting down from 15 sec to 0
// At 0, you want the timer to stop and issue an end alert this operation

// These are vars referencing classes already setup in the HTML
var wordBlank = document.querySelector('.wordBlank');
var played = document.querySelector('.played');
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var timerElement = document.querySelector('.timer');
var startButton = document.querySelector('.startButton');
var results = document.querySelector('.results');
var resetButton = document.querySelector(".resetButton");


// These are vars that will be implemented in the script
var chosenWord = "";
var numBlanks = 0;
var playedCounter = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// These arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean", "number"];

// function init is called when page loads and pull stored local wins, losses & games played
function init() {
  getWins();
  getLosses();
  getGamesPlayed();
}

// The startGame function is called when the start button is clicked
function startGame () {
  isWin = false; // Why is this variable added here?
  timerCount = 15; // As a var, it has o=no value added. Why is the value not added to the var?
  startButton.disabled = true; // Prevents start button from being clicked when round is in progress
  renderBlanks();
  startTimer();
}

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "🏆🙌YOU'RE A WINNER!🙌🏆"; // textcontent is what you are now seeing in the wordBlank
  winCounter++; // Adds the win to the winCounter?
  startButton.disabled = false; // Start button is no longer disabled
  setWins(); //adds 1 to the winCounter. How does this relate to winCounter++?
}

// The loseGame function is called when the lose condition is met -- timer reaches 0 and word has not been guessed
function loseGame() {
  wordBlank.textContent = "😾GAME OVER!😾"; // textcontent is what you are now seeing in the wordBlank
  loseCounter++; // Adds the loss to the loseCounter?
  startButton.disabled = false; // Start button is no longer disabled
  setLosses(); //adds 1 to the losses counter
}

// Adds winCounter and loseCounter together
function gamesPlayed () {
  //loseCounter.textContent + winCounter.textContent == playedCounter; -- does not work
  //setLosses + setWins == playedCounter; -- does not work
  //setLosses.textContent + setWins.textContent == playedCounter; -- does not work
  //setLosses.loseCounter + setWins.winCounter == playedCounter; -- does not work
  //played.playedCounter == steWins + setLosses; -- does not work
  //setLosses + setWins == played; -- does not work
}

// The startTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  //sets the timer
  timer = setInterval(function() { // Is this implementation of the 1 sec interval of "1000" at the bottom? This is a 1 sec countdown function within the timer function?
    timerCount--; // What is this?
    timerElement.textContent = timerCount; // You have a class element "timer" with a text content (15). This textContent is now applied to the timerCount var
    if (timerCount >= 0) { // Tests if win condition is met
      if (isWin && timerCount > 0) {
        clearInterval(timer); // Clears interval and stops timer
        winGame(); // the winGame function is now triggered
      }
    }
    if (timerCount === 0) { // Tests if time has run out/lose condition is met
      clearInterval(timer); // Clears interval
      loseGame(); // the loseGame function is ow triggered
    }
  },1000); // this is part of the timer = setInterval function. It is the interval of seconds (1000 ms). Why located here at the very end?
}

// Creates blanks on the screen
function renderBlanks() { 
  // The chosenWord var = the words array var. Will choose a word from this array.
  chosenWord = words[Math.floor(Math.random() * words.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = []
    // Math.floor is a function rounding down words to nearest integer.
    // Math.random is a function that generates a random number...array words have numbers: [0], [1] etc
    // The function randomly picks a word from the array and implements the relevant number of blanks for the length of the word.
   // What is this doing? It refers to the chosenWord var.
   // The number of blanks slected will = the number of letters in the chosen word
   // What is this? I think refers to the letters in the word array as relevant?
    // Uses for loop to push blanks to blanksLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_"); // Each letter of the selected word will have an _ applied
  }
  wordBlank.textContent = blanksLetters.join (" ");// Converts blanksLetters array into a string and renders it on the screen
}

// Updates games played on screen and sets games played to client storage
function setGamesPlayed() {
  //played.textContent = winCounter + loseCounter; -- does not work
  //played.textContent = win.textContent + lose.textContent; -- does not work
  localStorage.setItem("playedCount", playedCounter);
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter; //winCounter is a var
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter; //loseCounter is a var
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  var storedWins = localStorage.getItem("winCount");// Get stored value from client storage, if it exists
  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }
  win.textContent = winCounter; // Renders win to page
}

function getLosses() {
  var storedLosses = localStorage.getItem("loseCount");// Get stored value from client storage, if it exists
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter; // Renders loss to page
}

function getGamesPlayed() {
  var storedPlayed = localStorage.getItem("playedCount");
  if (storedPlayed === null) {
    playedCounter = 0
  } else {
    playedCounter = storedPlayed;
  }
  played.textContent = playedCounter;
  }


function checkWin() { // If the word equals the blanksLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) { // I think this means to remove the spaces between _ when correct letters are guessed?
    isWin = true; // This value is used in the timer function to test if win condition is met
  }
}

function checkLetters (letter) { // Tests if guessed letter is in word and renders it to the screen.
  var letterInWord = false; // Please explain
  for (var i = 0; i < numBlanks; i++) { // Still not sure of this loop
    if (chosenWord[i] === letter) { // What is this?
      letterInWord = true; // if guessed letter is in the chosen word, then letterInWord is true
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event - a response when a key is pressed
document.addEventListener("keydown", function(event) {
  if (timerCount === 0) {
    return; // If the count is zero, exit function
  }
  var key = event.key.toLowerCase(); // Converts all keys to lower case
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwzyz0123456789 ".split("");
  if (alphabetNumericCharacters.includes(key)) { // Test if key pushed is letter
    var letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
//var resetButton = document.querySelector(".resetButton"); - top with vars

// Add reset button
function resetGame() {
  winCounter = 0;// Resets win and loss counts
  loseCounter = 0;
  setWins(); // Renders win and loss counts and sets them into client storage
  setLosses();
}

// Attaches event listener to button
resetButton.addEventListener("click", resetGame);


