const wordsToGuess = ["APPLE", "ORANGE", "GRAPES", "BANANA", "AMLA"];
const hintsForWord = [
    "A FRUIT VERY CRUCIAL IN SCIENTIFIC DISCOVERY",
    "A FRUIT THAT IS ALSO A COLOR",
    "A FRUIT WHICH IS USED TO MAKE COMMON WINES",
    "A FRUIT WHEN RIPE IS YELLOW IN COLOR AND WHEN IT IS NOT RIPE IS GREEN IN COLOR",
    "A FRUIT WHICH HAS A NAME OF SOUTH AFRICAN CRICKET PLAYER"
];

let selectedWord, hint, correctspelling;

function tableUpdate() {
    let randomIndex = Math.floor(Math.random() * wordsToGuess.length);
    selectedWord = wordsToGuess[randomIndex];
    hint = hintsForWord[randomIndex];
    correctspelling = selectedWord.split('');

    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    let row = document.createElement('tr');

    for (let i = 0; i < correctspelling.length; i++) {
        let cell = document.createElement('td');
        cell.textContent = '_';
        row.appendChild(cell);
    }

    tableBody.appendChild(row);

    // Display the hint
    document.getElementById('dynamic-paragraph').textContent = hint;

    // Reset the number of guesses left
    document.getElementById('no_of_guesses_left').value = 6;
}

function Inputguess(input) {
    let cells = document.getElementById('table-body').getElementsByTagName('td');
    let wrongGuess = true;

    for (let i = 0; i < correctspelling.length; i++) {
        if (correctspelling[i] === input) {
            cells[i].textContent = input;
            wrongGuess = false;
        }
    }

    if (wrongGuess) {
        let guessesLeft = document.getElementById('no_of_guesses_left');
        guessesLeft.value = parseInt(guessesLeft.value) - 1;

        if (parseInt(guessesLeft.value) === 0) {
            alert("You have lost the game. The word was " + selectedWord);
            tableUpdate(); // Restart the game after losing
        }
    } else {
        let win = true;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '_') {
                win = false;
                break;
            }
        }

        if (win) {
            alert("You have won the game!");
            tableUpdate(); // Restart the game after winning
        }
    }
}
