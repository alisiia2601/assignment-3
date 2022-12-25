function greeting(turnCount, answerArray) {
    document.getElementById("displayStatus").innerHTML = "\"Hangman\" –  word guessing game. In our version " +
    "The computer will choose the word, and you guess it. <br> You will have " + turnCount + " attempts.<br>" +
    "Choosen word:<br>" + answerArray.join(" ") + "<br> Click Next to get started.";  // describe all rulles 
}

function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function setupAnswerArray(word) {
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
}

function openLettersAndNotify(guess, word, answerArray, remainingLetters) {
    var correctLetter = false;
    alreadyUsedLetters.push(guess);
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] == "_") {
            answerArray[j] = guess;
            remainingLetters--;
            correctLetter = true;
        }
    }
    if (remainingLetters == 0) {
        showAnswerAndRatePlayer(turnCount, word);
    } else if (remainingLetters > 0) {
        if (turnCount == 1) {
            if (correctLetter == true) {
                    showAnswerAndRatePlayer(turnCount, word);
            } else {
                turnCount--;
                showAnswerAndRatePlayer(turnCount, word);
            }
        } else {
            if (correctLetter == false) {
                turnCount--;
                document.getElementById("displayStatus").innerHTML = "Unfortunately, this letter is not in the word:<br>"+answerArray.join(" ")
                 + "<br>You have attempts left: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Used letters:<br>' + alreadyUsedLetters.join(', ');;
            } else {
                document.getElementById("displayStatus").innerHTML = "The letter you entered is correct:<br>" + answerArray.join(" ")
                 +  "<br>You have attempts left: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Used letters :<br>' + alreadyUsedLetters.join(', ');;
        }
        }
    }
    return newGameState = {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    };

}

function showAnswerAndRatePlayer(turnCount, word) {
    if (turnCount == 0) {
        document.getElementById("displayStatus").innerHTML = "Unfortunately, the attempts are over! The word was guessed: \""
         + word + "\".";
    } else {
        document.getElementById("displayStatus").innerHTML = "Victory! The word was guessed: \"" + word + "\".";
    }
    document.getElementById("guessOfPlayer").style.display = 'none';
    document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
}

function confirmActions(word, answerArray) {
    if (counterOfConfirmActions % 2 == 0) {
        document.getElementById("displayStatus").innerHTML = "Enter the letter you think is in the word: ";
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Used letters :<br>' + alreadyUsedLetters.join(', ');
        counterOfConfirmActions += 1;
    } else {
        var guess = document.getElementById("guessOfPlayer").value.toLowerCase();
        if (guess == "" || guess == " " ) {
            document.getElementById("displayStatus").innerHTML = "Put only <b>one letter</b>: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Used letters :<br>' + alreadyUsedLetters.join(', ');
        } else if (alreadyUsedLetters.includes(guess)) {
            document.getElementById("displayStatus").innerHTML = "You <b>already used</b> this letter. Choose new one: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Used letters:<br>' + alreadyUsedLetters.join(', ');
        } else {
            openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
            counterOfConfirmActions += 1;
        }
    }
}

var turnCount = 11;
var counterOfConfirmActions = 0;
var words = ["flower", "mystery", "counting", "atmosphere", "word", "laptop", "cheese", "school", "friends", "mobilephone", "chair", "pen", "secret"];
var alreadyUsedLetters = [];
var word = pickWord(words);
var remainingLetters = word.length;
var answerArray = setupAnswerArray(word);

function startGame(turnCount, answerArray) {
    greeting(turnCount, answerArray);
}

function exitGame(word) {
    document.getElementById("displayStatus").innerHTML = "It's offensively that you completed the game. The word was guessed: " + word + ".";
    document.getElementById("guessOfPlayer").style.display = 'none';
    document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
}