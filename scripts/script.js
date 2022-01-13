//***************************************************************************
// UI Constants
const result = document.getElementById('result');   // win/loss
const outcome = document.getElementById('outcome'); // Tie/'x beats y'

// Player/Computer choices this round
const pChoice = document.getElementById('pChoice'); // Player's choice
const cChoice = document.getElementById('cChoice'); // Computer's choice

// Scores to be updated
const pScore = document.getElementById('pScore');   // Player score
const cScore = document.getElementById('cScore');   // Computer Score

// Player selection buttons
const rockBtn = document.getElementById('rockBtn');     
const paperBtn = document.getElementById('paperBtn');   
const scissorsBtn = document.getElementById('scissorsBtn');

// New game overlay
const overlay = document.getElementById('overlay');
const winMsg = document.getElementById('win-msg');
const playAgainBtn = document.getElementById('play-again');

//***************************************************************************
// Game Logic
function startRound(playerSelection) {
    if (checkWinCondition()){
        displayOverlay();
    } else {
        let computerSelection = updateComputerChoice();
        updatePlayerChoice(playerSelection);
        updateRoundOutcome(playerSelection, computerSelection);                
        if (checkWinCondition()){
            displayOverlay();
        }
    }
}

// Updates player choice frame
function updatePlayerChoice(playerSelection) {
    switch (playerSelection) {
        case 'Rock':
            pChoice.innerHTML = '&#9994;';
            break;
        case 'Paper':
            pChoice.innerHTML = '&#9995;';
            break;
        case 'Scissors':
            pChoice.innerHTML = '&#9996';
            break;
    }
}

// Randomizes computer choice and upadtes frame. Returns value
function updateComputerChoice()
{
    let computerSelection = Math.floor(Math.random() * 3);
    switch (computerSelection) {
        case 0:     // Rock
            cChoice.innerHTML = '&#9994';
            computerSelection = 'Rock';
            break;
        case 1:     // Paper
            cChoice.innerHTML = '&#9995';
            computerSelection = 'Paper';
            break;
        case 2:     // Scissors
            cChoice.innerHTML = '&#9996';
            computerSelection = 'Scissors';
            break;
    }

    return computerSelection;
}

// Update UI round outcome, win/loss/tie
function updateRoundOutcome(playerSelection, computerSelection)
{
    let roundOutcome = determineOutcome(playerSelection,computerSelection);
    
    switch (roundOutcome){
        case 'tie':
            result.innerText = `It's a tie!`;
            outcome.innerText = `Better luck next round...`;
            return;
        case 'win':
            result.innerText = `You won!`;
            outcome.innerText = `${playerSelection} beats ${computerSelection}`;
            pScore.innerText++;
            return;
        case 'loss':
            result.innerText = 'You lost...';
            outcome.innerText = `${computerSelection} beats ${playerSelection}`;
            cScore.innerText++;
            return;
    }
    
}

// Determines if player won round
function determineOutcome(playerSelection, computerSelection)
{
    if (playerSelection == computerSelection) {
        return 'tie';
    } else if (             
        (playerSelection == 'Rock' && computerSelection == 'Scissors') ||
        (playerSelection == 'Paper' && computerSelection == 'Rock') ||
        (playerSelection == 'Scissors' && computerSelection == 'Paper') 
    ) {
        return 'win';
    } else {
        return 'loss';
    }
}

//Quick win check
function checkWinCondition(){
    if (pScore.innerText == '5' || cScore.innerText == '5') {
        return true;
    } else {
        return false;
    }
}

// Displays hidden overlay showing winner of match
function displayOverlay() {
    overlay.classList.add('show');
    updateOverlay();
}

// Updates overlay text
function updateOverlay() {
    if (pScore.innerText > cScore.innerText) {
        winMsg.innerText = 'You did it! Great job!';
    } else {
        winMsg.innerText = 'Better luck next time!';
    }
}

// Resets the game from scratch
function resetGame() {
    overlay.classList.remove('show');
    result.innerText = 'Choose your weapon';
    outcome.innerText = 'First to 5 wins';
    pScore.innerText = '0';
    cScore.innerText = '0';
    pChoice.innerHTML = cChoice.innerHTML = '&#x2753';
}

//***************************************************************************
// Event Listeners -- Starts a round of RPS with the player's selection.
rockBtn.addEventListener('click', ()=>startRound('Rock'));
paperBtn.addEventListener('click', ()=>startRound('Paper'));
scissorsBtn.addEventListener('click', ()=>startRound('Scissors'));
playAgainBtn.addEventListener('click', ()=>resetGame());