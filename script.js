let playerScore = 0;
let computerScore = 0;

let currentComputerSelection = '';
let playerSelection = '';

let currentRandomInt;
let randomInt;

const MAX_SCORE = 5;
const POINT_DELAY = 1000;

let isMuted = false;

const audioStatic01 = new Audio("audio/static_01.m4a");
audioStatic01.volume = 0.1;

const audioDefeat = new Audio("audio/defeat.m4a");
audioDefeat.volume = 0.1;

const audioTie = new Audio("audio/tie.m4a");
audioTie.volume = 0.1;

const audioBigSwitch = new Audio("audio/bigSwitch.aac");
audioBigSwitch.volume = 0.1;

const audioPointOn = new Audio("audio/point_on.m4a");
audioPointOn.volume=0.1;
            
const audioSwitch05 = new Audio("audio/switch_05.m4a");
const audioSwitch06 = new Audio("audio/switch_06.m4a");
const audioSwitch07 = new Audio("audio/switch_07.m4a");
const audioSwitch09 = new Audio("audio/switch_09.m4a");

audioSwitch07.volume = 0.2;
audioSwitch09.volume = 0.2;

const rockLogo = document.querySelector('#logo-rock');
const paperLogo = document.querySelector('#logo-paper');
const scissorsLogo = document.querySelector('#logo-scissors');

const rockButton = document.querySelector('#rock-button-player');
const paperButton = document.querySelector('#paper-button-player');
const scissorsButton = document.querySelector('#scissors-button-player');

const rockButtonComputer = document.querySelector('#rock-button-computer');
const paperButtonComputer = document.querySelector('#paper-button-computer');
const scissorsButtonComputer = document.querySelector('#scissors-button-computer');

const playerPoint01 = document.querySelector('#player-point-01');
const playerPoint02 = document.querySelector('#player-point-02');
const playerPoint03 = document.querySelector('#player-point-03');
const playerPoint04 = document.querySelector('#player-point-04');
const playerPoint05 = document.querySelector('#player-point-05');

const computerPoint01 = document.querySelector('#computer-point-01');
const computerPoint02 = document.querySelector('#computer-point-02');
const computerPoint03 = document.querySelector('#computer-point-03');
const computerPoint04 = document.querySelector('#computer-point-04');
const computerPoint05 = document.querySelector('#computer-point-05');

const muteButton = document.querySelector('#muteButton');
const loadingContainer = document.querySelector('.loadingContainer');
const loadingText = document.querySelector('.loadingText');
const playButton = document.querySelector('.playButton');

playButton.style.display = "none"

let isPlaying = true;

// ------Event listeners------ //

playButton.addEventListener('click', ()=>{
    loadingContainer.style.display = "none";
    setTimeout(startGame,1000);
});

document.addEventListener('click',(event)=> {
    switch (event.target.id) {
        case 'rock-button-player':
            if(!isPlaying) playerSelection = 'rock';
        break;

        case 'paper-button-player':
            if(!isPlaying) playerSelection = 'paper';
        break;

        case 'scissors-button-player':
            if(!isPlaying) playerSelection = 'scissors';
        break;

        default:
            return;
    }
    if(!isPlaying) playRound();
});

muteButton.addEventListener('click', toggleMute);

rockButton.addEventListener('mouseenter',()=> {
    if(!isPlaying) rockButton.classList.toggle('hoverState'); 
});

rockButton.addEventListener('mouseleave',()=> {
    if(rockButton.classList.contains('hoverState'))rockButton.classList.toggle('hoverState');
});

paperButton.addEventListener('mouseenter',()=> {
    if(!isPlaying) paperButton.classList.toggle('hoverState');
});

paperButton.addEventListener('mouseleave',()=> {
    if(paperButton.classList.contains('hoverState')) paperButton.classList.toggle('hoverState');
});

scissorsButton.addEventListener('mouseenter',()=> {
    if(!isPlaying) scissorsButton.classList.toggle('hoverState');
});

scissorsButton.addEventListener('mouseleave',()=> {
    if(scissorsButton.classList.contains('hoverState')) scissorsButton.classList.toggle('hoverState');
});

function toggleMute(){
    muteButton.classList.toggle('soundOn');
    muteButton.classList.toggle('soundOff');
    if(isMuted) {
        isMuted = false;
    } else {
        isMuted = true;
        audioStatic01.pause();
    }
}

//---- Functions ----//

function flash() {
    let nrOfFlashes = 2;
    let i = 0;

    function loop () {
        if (i < nrOfFlashes * 2) {
            i ++;
            const audioBuzz01 = new Audio("audio/buzz_01.m4a");
            audioBuzz01.volume = 0.05;
            audioBuzz01.play();

            switch(playerSelection){
                case 'rock':
                    rockButton.classList.toggle('off');
                    rockButtonComputer.classList.toggle('off');
                break;
                case 'paper':
                    paperButton.classList.toggle('off');
                    paperButtonComputer.classList.toggle('off');
                break;
                case 'scissors':
                    scissorsButton.classList.toggle('off');
                    scissorsButtonComputer.classList.toggle('off');
                break;
                default:
                    return;
            }
            setTimeout(loop,200);
        }
    }
    loop();
}

function awardPoint(winner){

    if(!isMuted)audioPointOn.play();
    
    if(winner == 'player') {
        playerScore ++;
        if(playerScore <= MAX_SCORE) {
            switch(playerScore) {
                case 1:
                    playerPoint01.classList.toggle('activePoint');
                break;
                case 2:
                    playerPoint02.classList.toggle('activePoint');
                break;
                case 3:
                    playerPoint03.classList.toggle('activePoint');
                break;
                case 4:
                    playerPoint04.classList.toggle('activePoint');
                break;
                case 5:
                    playerPoint05.classList.toggle('activePoint');
                    victory();
                break;
            }
        }
    } else {
        computerScore ++;
        if(computerScore <= MAX_SCORE) {
            switch(computerScore) {
                case 1:
                    computerPoint01.classList.toggle('activePoint');
                break;
                case 2:
                    computerPoint02.classList.toggle('activePoint');
                break;
                case 3:
                    computerPoint03.classList.toggle('activePoint');
                break;
                case 4:
                    computerPoint04.classList.toggle('activePoint');
                break;
                case 5:
                    computerPoint05.classList.toggle('activePoint');
                    defeat();
                break;
            }
        } 
    }
}

function turnOffLogo() {
   if(!rockLogo.classList.contains('off')) rockLogo.classList.toggle('off');
   if(!paperLogo.classList.contains('off')) paperLogo.classList.toggle('off');
   if(!scissorsLogo.classList.contains('off')) scissorsLogo.classList.toggle('off');
}

function turnOffPlayerWeapons() {
    if(!rockButton.classList.contains('off')) rockButton.classList.toggle('off');
    if(!paperButton.classList.contains('off')) paperButton.classList.toggle('off');
    if(!scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');
 }

function resetPoints(){
    playerScore = 0;
    computerScore = 0;

    playerPoint01.classList.remove('activePoint');
    playerPoint02.classList.remove('activePoint');
    playerPoint03.classList.remove('activePoint');
    playerPoint04.classList.remove('activePoint');
    playerPoint05.classList.remove('activePoint');

    computerPoint01.classList.remove('activePoint');
    computerPoint02.classList.remove('activePoint');
    computerPoint03.classList.remove('activePoint');
    computerPoint04.classList.remove('activePoint');
    computerPoint05.classList.remove('activePoint');
}

function resetGame() {
    setTimeout(()=>{
        resetComputerWeapons();
        resetLogo();
        resetPoints();
        startGame();
    },3000);

}

function resetBoard(){
    resetPlayerWeapons();
    resetComputerWeapons();
    resetLogo();
}

function resetLogo(){
    rockLogo.classList.remove('slowTransition');
    paperLogo.classList.remove('slowTransition');
    scissorsLogo.classList.remove('slowTransition');
}

function resetComputerWeapons() {
    if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');
    if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
    if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off');
}

function resetPlayerWeapons(){
    if(rockButton.classList.contains('off')) rockButton.classList.toggle('off');
    if(paperButton.classList.contains('off')) paperButton.classList.toggle('off');
    if(scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');

    if(rockButton.classList.contains('selected')) rockButton.classList.toggle('selected');
    if(paperButton.classList.contains('selected')) paperButton.classList.toggle('selected');
    if(scissorsButton.classList.contains('selected')) scissorsButton.classList.toggle('selected');

    if(rockButton.classList.contains('deselected')) rockButton.classList.toggle('deselected');
    if(paperButton.classList.contains('deselected')) paperButton.classList.toggle('deselected');
    if(scissorsButton.classList.contains('deselected')) scissorsButton.classList.toggle('deselected');

    if(rockButton.classList.contains('hoverState')) rockButton.classList.toggle('hoverState');
    if(paperButton.classList.contains('hoverState')) paperButton.classList.toggle('hoverState');
    if(scissorsButton.classList.contains('hoverState')) scissorsButton.classList.toggle('hoverState');
}


function generateComputerChoice(){
    let i = 0;
    let fastSpins = 2;
    let spinRate = 100;
    let minimumSpeed = 300;
    let choice = 0;

    function loopSelection(){
        choice = getRandomInt(3);
        renderComputerChoice(choice)
        i++;
        if (spinRate < minimumSpeed) {
            if(i >= fastSpins) spinRate += 10 * 3;
            setTimeout(loopSelection,spinRate);
        } else {
            setTimeout(() => {evaluateResult(choice);}, 1000);
            setTimeout(resetBoard, 2000);
        }
    }
    loopSelection();
}

function renderComputerChoice(choice) {

    currentRandomInt = choice;
    
    if(!isMuted)audioStatic01.play();
    
    switch(choice) {
        case 0:
            const audioSwitch04 = new Audio("audio/switch_04.m4a");
            audioSwitch04.volume = 0.05;
            if(!isMuted)audioSwitch04.play();
            rockButtonComputer.classList.toggle('off');
            if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off');       
        break;

        case 1:
            const audioSwitch05 = new Audio("audio/switch_05.m4a");
            audioSwitch05.volume = 0.05;
            if(!isMuted)audioSwitch05.play();
            paperButtonComputer.classList.toggle('off');
            if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');
            if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off'); 
        break;

        case 2:
            const audioSwitch06 = new Audio("audio/switch_06.m4a");
            audioSwitch06.volume = 0.05;
            if(!isMuted)audioSwitch06.play();
             scissorsButtonComputer.classList.toggle('off');
             if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
             if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');     
        break;

        default:
            console.log('Error....' + choice);

    }
}

//Used for winning animation
function renderPlayerChoice(choice) {

    currentRandomInt = choice;
    
    switch(choice) {
        case 0:
            const audioSwitch04 = new Audio("audio/switch_04.m4a");
            audioSwitch04.volume = 0.05;
            if(!isMuted)audioSwitch04.play();
            rockButton.classList.toggle('off');
            if(!paperButton.classList.contains('off')) paperButton.classList.toggle('off');
            if(!scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');       
        break;

        case 1:
            const audioSwitch05 = new Audio("audio/switch_05.m4a");
            audioSwitch05.volume = 0.05;
            if(!isMuted)audioSwitch05.play();
            paperButton.classList.toggle('off');
            if(!rockButton.classList.contains('off')) rockButton.classList.toggle('off');
            if(!scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');      
        break;

        case 2:
            const audioSwitch06 = new Audio("audio/switch_06.m4a");
            audioSwitch06.volume = 0.05;
            if(!isMuted)audioSwitch06.play();
             scissorsButton.classList.toggle('off');
             if(!paperButton.classList.contains('off')) paperButton.classList.toggle('off');
             if(!rockButton.classList.contains('off')) rockButton.classList.toggle('off');     
        break;

        default:
            console.log('Error....' + choice);
    }
}


function roundWin(){
    if(!isMuted)audioBigSwitch.play();
    setTimeout(() => {awardPoint('player')}, POINT_DELAY);
    if(!rockButtonComputer.classList.contains('off')) rockButtonComputer.classList.toggle('off');
    if(!paperButtonComputer.classList.contains('off')) paperButtonComputer.classList.toggle('off');
    if(!scissorsButtonComputer.classList.contains('off')) scissorsButtonComputer.classList.toggle('off');
    isPlaying = false;
}

function roundLose() {
    if(!isMuted)audioBigSwitch.play();
    setTimeout(() => {awardPoint('computer')}, POINT_DELAY);
    if(!rockButton.classList.contains('off')) rockButton.classList.toggle('off');
    if(!paperButton.classList.contains('off')) paperButton.classList.toggle('off');
    if(!scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');
    isPlaying = false;
}

function roundTie(){
    flash();
    isPlaying = false;
}

function victory(){
    let nrOfFlashes = 8;
    let i = 0;

    function loop () {
        if (i < nrOfFlashes * 2) {
            i ++;
            playerPoint01.classList.toggle('activePoint');
            playerPoint02.classList.toggle('activePoint');
            playerPoint03.classList.toggle('activePoint');
            playerPoint04.classList.toggle('activePoint');
            playerPoint05.classList.toggle('activePoint');

            rockLogo.classList.toggle('off');
            paperLogo.classList.toggle('off');
            scissorsLogo.classList.toggle('off');

            renderComputerChoice(getRandomInt(3))
            renderPlayerChoice(getRandomInt(3))

            setTimeout(loop,140);
        } else {
            resetComputerWeapons();
            turnOffPlayerWeapons();
            turnOffLogo();
        }
    }
    loop();
    
    resetGame();
}

function defeat(){
    if(!isMuted)audioDefeat.play();

    let nrOfFlashes = 6;
    let i = 0;

    function loop () {
        if (i < nrOfFlashes * 2) {
            i ++;
            computerPoint01.classList.toggle('activePoint');
            computerPoint02.classList.toggle('activePoint');
            computerPoint03.classList.toggle('activePoint');
            computerPoint04.classList.toggle('activePoint');
            computerPoint05.classList.toggle('activePoint');
            setTimeout(loop,200);
        }
    }
    loop();
    powerDown();
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
        }
}

function getRandomInt(max){
    while(randomInt == currentRandomInt) {
     randomInt = Math.floor(Math.random() * max);
    }
    currentRandomInt = randomInt;
    return randomInt; 
}

function startGame(){

    if(!isMuted)audioBigSwitch.play();

    rockLogo.classList.toggle('off');
    paperLogo.classList.toggle('off');
    scissorsLogo.classList.toggle('off');

    setTimeout(()=> {
        isPlaying = false;
        const audioBigSwitch2 = new Audio('audio/bigSwitch.aac');
        audioBigSwitch2.volume = 0.4;
        if(!isMuted)audioBigSwitch2.play();
        const audioBuzz01 = new Audio("audio/buzz_01.m4a");
        audioBuzz01.volume = 0.1;
        if(!isMuted)audioBuzz01.play();
        if(rockButton.classList.contains('off')) rockButton.classList.toggle('off');
        if(paperButton.classList.contains('off')) paperButton.classList.toggle('off');
        if(scissorsButton.classList.contains('off')) scissorsButton.classList.toggle('off');
    },1000);
}

function powerDown() {
    isPlaying = true;
    
    rockLogo.classList.toggle('slowTransition');
    paperLogo.classList.toggle('slowTransition');
    scissorsLogo.classList.toggle('slowTransition');

    rockLogo.classList.toggle('off');
    paperLogo.classList.toggle('off');
    scissorsLogo.classList.toggle('off');

    rockButton.classList.toggle('off');
    paperButton.classList.toggle('off');
    scissorsButton.classList.toggle('off');

    setTimeout(resetGame(), 2000);
}

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        loadingText.textContent = ""
        playButton.style.display = "inline"
    }
};

