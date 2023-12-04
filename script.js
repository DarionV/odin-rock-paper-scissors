const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

let player = 'test';
let computer = 'test';

function getComputerChoice(){
    return choices[getRandomInt(3)];
}

function logResult(){
    console.log (`You picked ${player}, the computer picked ${computer}`);
}

function logScore() {
    console.log(`You: ${playerScore} Computer: ${computerScore}`);
}

function roundWin(){
    playerScore ++;
    logResult();
    console.log('You won!');
    logScore();
}

function roundLose() {
    computerScore ++;
    logResult();
    console.log('You lost!');
    logScore();
}

function roundTie(){
    logResult();
    console.log("It's a tie!");
    logScore();
}

function victory(){
    console.log('VICTORY! You won best of 5 games.');
}

function defeat(){
    console.log('DEAFEAT! You lost best of 5 games.');
}

function playRound(playerSelection, computerSelection){

    if (playerSelection == null) return;

    playerSelection = playerSelection.toLowerCase();

    player = playerSelection.toLowerCase();
    computer = computerSelection;

        switch (computerSelection) {
            case 'rock':
                if (playerSelection !== 'rock') 
                    playerSelection == 'paper' ? roundWin() : roundLose();
                else 
                    roundTie()
            break;

            case 'paper':
                if (playerSelection !== 'paper') 
                    playerSelection == 'scissors' ? roundWin() : roundLose();
                else 
                    roundTie()                    
            break;

            case 'scissors':
                if (playerSelection !== 'scissors') 
                    playerSelection == 'rock' ? roundWin() : roundLose();
                else 
                    roundTie()
            break;

            default: 
                console.log('Try again...');
        }

}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function game () {
    while ((playerScore || computerScore) <= 2) {
        playRound((prompt("Rock, paper or scissors...make your choice:")), getComputerChoice());

        if(playerScore > 2) victory();
        if(computerScore > 2) defeat();
    }
}

game();
