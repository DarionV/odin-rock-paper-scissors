const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

let currentComputerSelection = '';
let playerSelection;

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
            playerSelection = 'rock';
        break;

        case 'paper-button-player':
            playerSelection = 'paper';
        break;

        case 'scissors-button-player':
            playerSelection = 'scissors';
        break;
    }
    playRound();
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


function generateComputerChoice(){

    let i = 0;
    let fastSpins = 5;
    let spinRate = 100;
    let minimumSpeed = 300;
    let choice = 0;

    function loopSelection(){
        choice = getRandomInt(3);
        renderComputerChoice(choice)
        i++;
        if (spinRate < minimumSpeed) {
            if(i >= fastSpins) spinRate += 10 * 1.6;
            setTimeout(loopSelection,spinRate);
        } else {
            setTimeout(() => {evaluateResult(choice);}, 500);
        }
    }

    loopSelection();
}

function renderComputerChoice(choice) {

    currentRandomInt = choice;

    switch(choice) {
        case 0:
            rockButtonComputer.classList.toggle('off');
            if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off');       
        break;

        case 1:
            paperButtonComputer.classList.toggle('off');
            if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off'); 
            
        break;

        case 2:
             scissorsButtonComputer.classList.toggle('off');
             if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
             if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off'); 
            
        break;

        default:
            console.log('Hmm error....' + choice);

    }
}


function roundWin(){
    console.log('You won!');
}

function roundLose() {
    console.log('You lost!');
}

function roundTie(){
    console.log("It's a tie!");
}

function victory(){
    console.log('VICTORY! You won best of 5 games.');
}

function defeat(){
    console.log('DEAFEAT! You lost best of 5 games.');
}

function playRound(){

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
    
    

    generateComputerChoice();
    //console.log('computer selecrion is ' + computerSelection);
    isPlaying = false;

    //setTimeout(function () {evaluateResult(playerSelection, computerSelection)},5000);

}

function evaluateResult(computerSelection){

    // 0=Rock, 1=Paper, 2=Scissors

     switch (computerSelection) {
            case 0:
                if (playerSelection !== 'rock') 
                    playerSelection == 'paper' ? roundWin() : roundLose();
                else 
                    roundTie()
            break;

            case 1:
                if (playerSelection !== 'paper') 
                    playerSelection == 'scissors' ? roundWin() : roundLose();
                else 
                    roundTie()                    
            break;

            case 2:
                if (playerSelection !== 'scissors') 
                    playerSelection == 'rock' ? roundWin() : roundLose();
                else 
                    roundTie()
            break;

            default: 
                roundTie()
                console.log('Something went wrong');
        }
}

function getRandomInt(max){
    while(randomInt == currentRandomInt) {
     randomInt = Math.floor(Math.random() * max);
    }
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


