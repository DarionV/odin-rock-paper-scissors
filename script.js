const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

let currentComputerSelection = '';

let currentRandomInt;
let randomInt;

const rockButton = document.querySelector('#rock-button-player');
const paperButton = document.querySelector('#paper-button-player');
const scissorsButton = document.querySelector('#scissors-button-player');

const rockButtonComputer = document.querySelector('#rock-button-computer');
const paperButtonComputer = document.querySelector('#paper-button-computer');
const scissorsButtonComputer = document.querySelector('#scissors-button-computer');

let isPlaying = false;

document.addEventListener('click',(event)=> {
    switch (event.target.id) {
        case 'rock-button-player':
            playRound('rock');
            
        break;

        case 'paper-button-player':
            playRound('paper');
        break;

        case 'scissors-button-player':
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

    let i = 0;
    let fastSpins = 5;
    let spinRate = 100;
    let minimumSpeed = 300;

    function loopSelection(){
        renderComputerChoice(getRandomInt(3))
        i++;
        if (spinRate < minimumSpeed) {
            if(i >= fastSpins) spinRate += 10 * 1.6;
            setTimeout(loopSelection,spinRate);
        }
    }

    loopSelection();

}

function renderComputerChoice(choice) {

    currentRandomInt = choice;

    switch(choice) {
        case 0:
            console.log('ROCK');
            rockButtonComputer.classList.toggle('off');
            if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off');       
        break;

        case 1:
            console.log('PAPER');
            paperButtonComputer.classList.toggle('off');
            if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off'); 
            
        break;

        case 2:
            console.log('SCISSORS');
             scissorsButtonComputer.classList.toggle('off');
             if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
             if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off'); 
            
        break;

        default:
            console.log('Hmm error....' + choice);

    }
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

    isPlaying = true;

    switch (playerSelection){
        case 'rock':
            rockButton.classList.remove('hoverState');
            rockButton.classList.toggle('selected');
            paperButton.classList.toggle('deselected');
            scissorsButton.classList.toggle('deselected');
            paperButton.classList.toggle('off');
            scissorsButton.classList.toggle('off');
        break;

        case 'paper':
            paperButton.classList.remove('hoverState');
            paperButton.classList.toggle('selected');
            rockButton.classList.toggle('deselected');
            scissorsButton.classList.toggle('deselected');
            rockButton.classList.toggle('off');
            scissorsButton.classList.toggle('off');
        break;

        case 'scissors':
            scissorsButton.classList.remove('hoverState');
            scissorsButton.classList.toggle('selected');
            paperButton.classList.toggle('deselected');
            rockButton.classList.toggle('deselected');
            paperButton.classList.toggle('off');
            rockButton.classList.toggle('off');
        break;
    }
    
    

    computerSelection = getComputerChoice();
    isPlaying = false;

        // switch (computerSelection) {
        //     case 'rock':
        //         if (playerSelection !== 'rock') 
        //             playerSelection == 'paper' ? roundWin() : roundLose();
        //         else 
        //             roundTie()
        //     break;

        //     case 'paper':
        //         if (playerSelection !== 'paper') 
        //             playerSelection == 'scissors' ? roundWin() : roundLose();
        //         else 
        //             roundTie()                    
        //     break;

        //     case 'scissors':
        //         if (playerSelection !== 'scissors') 
        //             playerSelection == 'rock' ? roundWin() : roundLose();
        //         else 
        //             roundTie()
        //     break;

        //     default: 
        //         console.log('Try again...');
        // }

}

function getRandomInt(max){

    while(randomInt == currentRandomInt) {
     randomInt = Math.floor(Math.random() * max);
    }

    console.log(randomInt);
    currentRandomInt = randomInt;
    return randomInt;
   
    
}

function game () {
    while ((playerScore || computerScore) <= 2) {
        playRound((prompt("Rock, paper or scissors...make your choice:")), getComputerChoice());

        if(playerScore > 2) victory();
        if(computerScore > 2) defeat();
    }
}


