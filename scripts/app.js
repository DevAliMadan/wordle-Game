import { WORDS } from "../scripts/words.js";

function init(){



const gameBoard = document.querySelector('.wordle');
const keyboard = document.querySelector('#keyboard');


const guessNumber = 6;
let guessesRemaining = guessNumber;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log([rightGuessString]);



//functions































}
document.addEventListener('DOMContentLoaded',init);