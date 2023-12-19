function getComputerChoice() {
    computerChoices = ["rock","paper","scissors"]    
    return computerChoices[(Math.floor(Math.random() * computerChoices.length))]
} 
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        console.log("It's a tie! Replaying the round...");
        computerSelection = getComputerChoice();
        return playRound(playerSelection, computerSelection);
    }
    switch (playerSelection) {
    case "rock":
        return {
                message: (computerSelection === "scissors") ? "You win! Rock beats Scissors" : "You lose! Paper beats Rock",
                win: computerSelection === "scissors"
            };
        case "paper":
        return {message: (computerSelection === "rock") ? "You win! Paper beats Rock" : "You lose! Scissors beats Paper",
        win:computerSelection === "rock"
            };
        case "scissors":
            return {message: (computerSelection === "paper") ? "You win! Scissors beats Paper" : "You lose! Rock beats Scissors",
            win:computerSelection === "paper"
        };

    default:
        return "Invalid player selection.";
    }
} 

function game() {
    let playerSelection = prompt("Rock,Paper, or scissors")
    playerSelection.toLocaleLowerCase()
    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection)
    console.log(result.message);
    console.log("Player:"+playerSelection);
    console.log("Computer:"+computerSelection);
    return result.win
}
let wins = 0
for (let index = 0; index < 5; index++) {
    if (game()) {
        wins++;
    }
}
console.log("Total wins: " + wins);

