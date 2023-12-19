// Game Logic Functions
function getComputerChoice() {
    const computerChoices = ["rock", "paper", "scissors"];
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return {
            message: "It's a tie! Try again...",
            win: null,
            tie: true
        };
    }
    switch (playerSelection) {
        case "rock":
            return {
                message: computerSelection === "scissors" ? "You win! Rock beats Scissors" : "You lose! Paper beats Rock",
                win: computerSelection === "scissors"
            };
        case "paper":
            return {
                message: computerSelection === "rock" ? "You win! Paper beats Rock" : "You lose! Scissors beats Paper",
                win: computerSelection === "rock"
            };
        case "scissors":
            return {
                message: computerSelection === "paper" ? "You win! Scissors beats Paper" : "You lose! Rock beats Scissors",
                win: computerSelection === "paper"
            };
        default:
            return "Invalid player selection.";
    }
}

// DOM Manipulation Functions
function updateScores(result) {
    if (result.win) {
        playerScore++;
    } else {
        computerScore++;
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
}

function displayResult(resultMessage) {
    message.textContent = resultMessage;
    message.style.textAlign = "center";
    message.style.fontSize = "3rem";
    messageParent.appendChild(message);
}

function endGame() {
    let winner = playerScore === maxScore ? "Player" : "Computer";
    message.textContent = `${winner} wins! Final Score - Player: ${playerScore}, Computer: ${computerScore}. Click here to restart.`;
    message.style.textAlign = "center";
    message.style.fontSize = "3rem";
    messageParent.appendChild(message);
    images.forEach(img => img.style.pointerEvents = 'none');
    messageParent.style.cursor = 'pointer';
    messageParent.addEventListener('click', restartGame);
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    images.forEach(img => img.style.pointerEvents = 'auto');
    messageParent.style.cursor = 'default';
    messageParent.removeEventListener('click', restartGame);
    message.textContent = "Choose your move!";
}

// Event Listeners
const playerScoreElement = document.querySelector('.pScore');
const computerScoreElement = document.querySelector('.cScore');
const messageParent = document.querySelector('div .goal');
const message = document.createElement('div');
const images = document.querySelectorAll('img');

let playerScore = 0;
let computerScore = 0;
const maxScore = 5;

images.forEach(button => {
    button.addEventListener('click', () => {
        const playerSelection = button.id;
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (!result.tie) {
            updateScores(result);
            if (playerScore === maxScore || computerScore === maxScore) {
                endGame();
                return;
            }
        }
        displayResult(result.message);
    });
});
