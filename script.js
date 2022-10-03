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
            squareDiv.dataset.id = `${square}`;
        }
    }

    function updateBoard(square, marker) {
        currentBoard[square] = marker;
        renderBoard();
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

    function checkForWinner() {
        if ((currentBoard.a1) && (currentBoard.a1 === currentBoard.a2) && (currentBoard.a2 === currentBoard.a3)) {
            return currentBoard.a1;
        } else if ((currentBoard.b1) && (currentBoard.b1 === currentBoard.b2) && (currentBoard.b2 === currentBoard.b3)) {
            return currentBoard.b1;
        } else if ((currentBoard.c1) && (currentBoard.c1 === currentBoard.c2) && (currentBoard.c2 === currentBoard.c3)) {
            return currentBoard.c1;
        } else if ((currentBoard.a1) && (currentBoard.a1 === currentBoard.b1) && (currentBoard.b1 === currentBoard.c1)) {
            return currentBoard.a1;
        } else if ((currentBoard.a2) && (currentBoard.a2 === currentBoard.b2) && (currentBoard.b2 === currentBoard.c2)) {
            return currentBoard.a2;
        } else if ((currentBoard.a3) && (currentBoard.a3 === currentBoard.b3) && (currentBoard.b3 === currentBoard.c3)) {
            return currentBoard.a3;
        } else if ((currentBoard.a1) && (currentBoard.a1 === currentBoard.b2) && (currentBoard.b2 === currentBoard.c3)) {
            return currentBoard.a1;
        } else if ((currentBoard.a3) && (currentBoard.a3 === currentBoard.b2) && (currentBoard.b2 === currentBoard.c1)) {
            return currentBoard.a3;
        } 
    }

    return {
        updateBoard,
        renderBoard,
        emptyBoard,
        addClickListeners,
        checkForWinner
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
    let round;

    function startGame() {

        Gameboard.emptyBoard();

        round = 0;

        //the prompts will be replaced later with a pop-up window asking the user to enter their name and click to choose their marker.
        // playerOne.name = prompt('name?','');
        playerOne.name = 'sean';
        // playerOne.marker = prompt('X or O?','');
        playerOne.marker = 'x';

        // playerTwo.name = prompt('name?','');
        playerTwo.name = 'hannah';
        // playerTwo.marker = prompt('X or O?','');
        playerTwo.marker = 'o';
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
            const squareId = clickedSquare.dataset.id;
            Gameboard.updateBoard(squareId, currentPlayer);
            const winner = Gameboard.checkForWinner();
            if (winner) {
                alert(`winner is ${winner}`);
            }
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

