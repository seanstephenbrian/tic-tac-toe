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

    function addClickListeners() {
        let squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', (e) => {
                Gameplay.markSquare(e);
            });
        });
    }

    return {
        currentBoard,
        renderBoard,
        emptyBoard,
        addClickListeners
    };

})();


// factory function to create new Player objects:
const Player = (name, marker) => {
    return { name, marker };
};

// Gameplay module:
const Gameplay = (function () {

    let playerOne = Player('','');
    let playerTwo = Player('','');
    let currentPlayer = '';
    let round = 1;

    function startGame() {

        Gameboard.emptyBoard();

        round = 0;

        //the prompts will be replaced later with a pop-up window asking the user to enter their name and click to choose their marker.
        playerOne.name = prompt('name?','');
        playerOne.marker = prompt('X or O?','');

        playerTwo.name = prompt('name?','');
        playerTwo.marker = prompt('X or O?','');
    }

    function updateCurrentPlayer() {
        round++;
        if (round %2 !== 0) {
            currentPlayer = playerOne.marker;
            console.log(`current player: ${currentPlayer}`);
        } else if (round %2 === 0) {
            currentPlayer = playerTwo.marker;
            console.log(`current player: ${currentPlayer}`);
        }
    }

    function markSquare(e) {
        const clickedSquare = e.target;
        checkSquare: if (clickedSquare.innerText) {
            break checkSquare;
        } else if (!clickedSquare.innerText) {
            clickedSquare.innerText = 'worked';
            updateCurrentPlayer();
        }
    }

    return {
        markSquare,
        startGame,
        updateCurrentPlayer
    }

})();


// Gameplay.checkCurrentPlayer();








Gameboard.addClickListeners();

Gameplay.startGame();

Gameplay.updateCurrentPlayer();

