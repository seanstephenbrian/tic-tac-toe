// Gameboard module:
const Gameboard = (function () {

    let currentBoard = {
        a1: '',
        a2: '',
        a3: '',
        b1: '',
        b2: '',
        b3: '',
        c1: '',
        c2: '',
        c3: ''
    };

    function renderBoard() {
        for (square in currentBoard) {
            let squareDiv = document.querySelector(`.${square}`);
            squareDiv.textContent = `${currentBoard[square]}`;
        }
    }

    function emptyBoard() {
        for (square in currentBoard) {
            currentBoard[square] = '';
        }
        renderBoard();
    }

    return {
        currentBoard,
        renderBoard,
        emptyBoard
    };

})();


// factory function to create new Player objects:
const Player = (name, marker) => {
    return { name, marker };
};

// Gameplay module:
const Gameplay = (function () {

    let i = 1;

    let playerOne;
    let playerTwo;

    function startGame() {

        Gameboard.emptyBoard();

        //the prompts will be replaced later with a pop-up window asking the user to enter their name and click to choose their marker.
        const playerOneName = prompt('name?','');
        const playerOneMarker = prompt('X or O?');
        playerOne = Player(playerOneName, playerOneMarker);

        const playerTwoName = prompt('name?','');
        const playerTwoMarker = prompt('X or O?');
        playerTwo = Player(playerTwoName, playerTwoMarker);

        return {
            playerOne,
            playerTwo
        };
    }

    function checkCurrentPlayer() {
        if (i % 2 !== 0) {
            let currentPlayer = playerOne.marker;
            return currentPlayer;
        } if (i % 2 === 0) {
            let currentPlayer = playerTwo.marker;
            return currentPlayer;
        }
        console.log(currentPlayer);
    }

    return {
        startGame,
        checkCurrentPlayer
    }

})();


Gameplay.checkCurrentPlayer();










Gameplay.startGame();