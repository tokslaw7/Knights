// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}


// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    //if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealth = 0;
            playerTwoHealth.innerHTML = playerTwoHealthNum;
            gameState.gameOver = true;
            // ends the game
            gameOver();
        }
        else {
            playerTwoHealth.innerHTML = playerTwoHealthNum;
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }  
}


// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
    // winning visual cue
    document.body.classList.add("game-over");
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus(currentPlayer) {
        
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");

        if (currentPlayer === 1) {
            playerOneAttackButton.disabled = false;
            playerOneAttackButton.classList.add("active");
            playerOneAttackButton.classList.remove("inactive");
    
            playerTwoAttackButton.disabled = true;
            playerTwoAttackButton.classList.add("inactive");
            playerTwoAttackButton.classList.remove("active");
        } else if (currentPlayer === 2) {
            playerTwoAttackButton.disabled = false;
            playerTwoAttackButton.classList.add("active");
            playerTwoAttackButton.classList.remove("inactive");
    
            playerOneAttackButton.disabled = true;
            playerOneAttackButton.classList.add("inactive");
            playerOneAttackButton.classList.remove("active");
        }
       
    } 

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    // if (gameState.whoseTurn === 1) {
    //     animatePlayer();
    //     changeButtonStatus();
    //     changePlayer();
    // }
    if (gameState.whoseTurn === 1 && !gameState.gameOver) {
        let playerTwoHealthElement = document.getElementById("playerTwoHealth");
        let playerTwoHealthNum = Number(playerTwoHealthElement.innerHTML);
        playerTwoHealthNum -= 10;

        if (playerTwoHealthNum <= 0) {
            playerTwoHealthNum = 0;
            gameState.gameOver = true;
            gameOver();
        }

        playerTwoHealthElement.innerHTML = playerTwoHealthNum;
        animatePlayer();
        changePlayer();
        changeButtonStatus();
    }

        
}

function attackPlayerOne() {
    if (gameState.whoseTurn === 2) {
        let playerOneHealth = document.getElementById("playerOneHealth");
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        playerOneHealthNum -= 10;
        playerOneHealth.innerHTML = playerOneHealthNum;

        if (playerOneHealth <= 0) {
            playerOneHealth = 0;
            
            playerOneHealth.innerHTML = playerOneHealthNum;
            gameState.gameOver = true;
            gameOver();
        } else {
             //changePlayer();
            playerOneHealth.innerHTML = playerOneHealthNum;
            gameState.whoseTurn = 1;
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
        function changeButtonStatus() {
          

            let playerTwoAttackButton = document.getElementById("playerTwoAttack");
            playerTwoAttackButton.disabled = true;
            playerTwoAttackButton.classList.add("inactive");
            playerTwoAttackButton.classList.remove("active");

            let playerOneAttackButton = document.getElementById("playerOneAttack");
            playerOneAttackButton.disabled = false;
            playerOneAttackButton.classList.add("active");
            playerOneAttackButton.classList.remove("inactive");
        }

    function animatePlayer() {
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerTwoSprite");
        playerSprite.src = playerOneFrames[1];
        
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

       
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    if (gameState.whoseTurn === 2 && !gameState.gameOver) {
        let playerOneHealthElement = document.getElementById("playerOneHealth");
        let playerOneHealthNum = Number(playerOneHealthElement.innerHTML);
        playerOneHealthNum -= 10;

        if (playerOneHealthNum <= 0) {
            playerOneHealthNum = 0;
            gameState.gameOver = true;
            gameOver();
        }

        playerOneHealthElement.innerHTML = playerOneHealthNum;
        animatePlayer();
        changePlayer();
        changeButtonStatus();
    }
}
