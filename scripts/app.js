import { WORDS } from "../scripts/words.js";

// Initializes the game when the DOM is fully loaded
function init() {
    // Declares a constant variable for the game board element
    const keyboard = document.querySelector('#keyboard');
    const resetButton = document.getElementById('reset-button');

    const guessNumber = 6;
    let guessesRemaining = guessNumber;
    let currentGuess = [];
    let nextLetter = 0;
    let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

    // Log the correct word to the console for debugging/cheating purposes
    console.log([rightGuessString]);

    // Attaches an event listener to the keyboard for click events
    keyboard.addEventListener('click', (e) => {
        if (e.target.matches('.keyboard-button')) {
            const key = e.target.textContent;
            handleInput(key);
        }
    });

    // Attaches an event listener to the document for physical keydown events
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        handleInput(key);
    });

    // Attaches an event listener to the reset button for click events
    resetButton.addEventListener('click', () => {
        resetGame();
    });

    // --- Helper Functions (nested or defined within init's scope for simplicity) ---

    // Handles all user input (virtual keyboard clicks and physical key presses)
    function handleInput(key) {
        if (key === 'Del' || key === 'Backspace') {
            deleteLetter();
        } else if (key === 'Enter') {
            checkGuess();
        } else if (key.length === 1 && key.match(/[a-z]/i)) {
            insertLetter(key.toUpperCase());
        }
    }

    // Inserts a letter into the current guess on the game board
    function insertLetter(pressedKey) {
        if (nextLetter === 5) {
            return; // Max letters reached for current row
        }
        pressedKey = pressedKey.toUpperCase();
        let box = document.querySelectorAll('.wordle > div')[(guessNumber - guessesRemaining) * 5 + nextLetter];
        box.textContent = pressedKey;
        box.classList.add("filled-box");
        currentGuess.push(pressedKey);
        nextLetter++;
    }

    // Deletes the last letter from the current guess on the game board
    function deleteLetter() {
        if (nextLetter === 0) {
            return; // No letters to delete
        }
        let box = document.querySelectorAll('.wordle > div')[(guessNumber - guessesRemaining) * 5 + nextLetter - 1];
        box.textContent = "";
        box.classList.remove("filled-box");
        currentGuess.pop();
        nextLetter--;
    }

    // Checks the current guess against the right word and updates the game state
    function checkGuess() {
        let guessString = currentGuess.join('');

        // Debugging: Log the guess string and a sample of the word list
        

        if (guessString.length !== 5) {
            showNotification("Not enough letters!");
            return;
        }

        if (!WORDS.includes(guessString.toLowerCase())) { // Convert to lowercase for word list check
            showNotification("Word not in list!");
            return;
        }

        // Process the guess and update box colors
        let rightGuess = Array.from(rightGuessString);
        for (let i = 0; i < 5; i++) {
            let letterColor = '';
            let box = document.querySelectorAll('.wordle > div')[(guessNumber - guessesRemaining) * 5 + i];
            let letter = currentGuess[i];

            let letterPosition = rightGuess.indexOf(letter.toLowerCase()); // Convert to lowercase for comparison
            if (letterPosition === -1) {
                letterColor = 'grey'; // Letter not in the word
            } else {
                if (letter.toLowerCase() === rightGuess[i].toLowerCase()) {
                    letterColor = 'green'; // Letter is in the correct spot
                } else {
                    letterColor = 'yellow'; // Letter is in the word but wrong spot
                }
                rightGuess[letterPosition] = "#"; // Mark as used to handle duplicate letters
            }

            // Apply color with a slight delay for animation effect
            let delay = 250 * i;
            setTimeout(() => {
                box.style.backgroundColor = letterColor;
                shadeKeyBoard(letter, letterColor);
            }, delay);
        }

        // Check for win/loss conditions
        if (guessString.toLowerCase() === rightGuessString.toLowerCase()) {
            showNotification("You guessed right!");
            guessesRemaining = 0; // End game
        } else {
            guessesRemaining -= 1;
            currentGuess = [];
            nextLetter = 0;

            if (guessesRemaining === 0) {
                showNotification(`You've run out of guesses! The word was: "${rightGuessString}"`);
            }
        }
    }

    // Shades the virtual keyboard buttons based on letter correctness
    function shadeKeyBoard(letter, color) {
        for (const elem of document.getElementsByClassName("keyboard-button")) {
            if (elem.textContent.toUpperCase() === letter.toUpperCase()) {
                let oldColor = elem.style.backgroundColor;
                // Prioritize green over yellow, and yellow over grey
                if (oldColor === 'green') {
                    return;
                }
                if (oldColor === 'yellow' && color !== 'green') {
                    return;
                }
                elem.style.backgroundColor = color;
                break;
            }
        }
    }

    // Displays a temporary notification message to the user
    function showNotification(message) {
        const notificationContainer = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000); // Notification disappears after 3 seconds
    }

    // Resets the game to its initial state, clearing the board and keyboard colors
    function resetGame() {
        guessesRemaining = guessNumber;
        currentGuess = [];
        nextLetter = 0;
        rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
        console.log([rightGuessString]); // Log new word for debugging

        // Clear game board
        let boxes = document.querySelectorAll('.wordle > div');
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].textContent = "";
            boxes[i].style.backgroundColor = ""; // Clear inline background color
            boxes[i].classList.remove("filled-box");
        }

        // Reset keyboard colors
        let keyboardButtons = document.querySelectorAll('.keyboard-button');
        for (let i = 0; i < keyboardButtons.length; i++) {
            keyboardButtons[i].style.backgroundColor = ""; // Clear inline background color
        }
    }

    // Opens the "How to Play" modal/form
    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    // Closes the "How to Play" modal/form
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    // Make openForm and closeForm globally accessible for HTML onclick attributes
    window.openForm = openForm;
    window.closeForm = closeForm;
}

// Attach the init function to run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
