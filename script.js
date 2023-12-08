const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

const rockButton = document.querySelector('.rock');
const paperButton = document.querySelector('#paper-button');
const scissorsButton = document.querySelector('#scissors-button');

let isPlaying = false;

document.addEventListener('click',(event)=> {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'rock-button':
            playRound('rock');
        break;

        case 'paper-button':
            playRound('paper');
        break;

        case 'scissors-button':
            playRound('scissors');
        break;
    }
});

//Work around for hover state that is not working properly. When clicking a button the image is being translated upwards,
//however the hover property prevented the image from being translated until the user removed the mouse pointer from the image.

rockButton.addEventListener('mouseenter',()=> {
    rockButton.classList.toggle('hoverState');
});

rockButton.addEventListener('mouseleave',()=> {
    rockButton.classList.toggle('hoverState');
});
paperButton.addEventListener('mouseenter',()=> {
    paperButton.classList.toggle('hoverState');
});

paperButton.addEventListener('mouseleave',()=> {
    paperButton.classList.toggle('hoverState');
});
scissorsButton.addEventListener('mouseenter',()=> {
    scissorsButton.classList.toggle('hoverState');
});

scissorsButton.addEventListener('mouseleave',()=> {
    scissorsButton.classList.toggle('hoverState');
});




function getComputerChoice(){
    return choices[getRandomInt(3)];
}

function logResult(){
    
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

function playRound(playerSelection){

    switch (playerSelection){
        case 'rock':
            rockButton.classList.remove('hoverState');
            rockButton.classList.toggle('selected');
            paperButton.classList.toggle('deselected');
            scissorsButton.classList.toggle('deselected');
        break;

        case 'paper':
            paperButton.classList.remove('hoverState');
            paperButton.classList.toggle('selected');
            rockButton.classList.toggle('deselected');
            scissorsButton.classList.toggle('deselected');
        break;

        case 'scissors':
            scissorsButton.classList.remove('hoverState');
            scissorsButton.classList.toggle('selected');
            paperButton.classList.toggle('deselected');
            rockButton.classList.toggle('deselected');
        break;
    }
    
    

    computerSelection = getComputerChoice();

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


