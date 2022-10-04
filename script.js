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
            let marker = `${currentBoard[square]}`;
            squareDiv.textContent = `${currentBoard[square]}`;
            if (marker) {
                squareDiv.dataset.symbol = marker;
            }
            squareDiv.dataset.id = `${square}`;
        }
    }

    function updateBoard(square, marker) {
        currentBoard[square] = marker;
        renderBoard();
    }

    function emptyBoard() {
        for (square in currentBoard) {
            let squareDiv = document.querySelector(`.${square}`);
            squareDiv.removeAttribute('data-symbol');
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
        document.body.classList.remove(`${currentPlayer}-bg`);
        round++;
        if (round %2 !== 0) {
            currentPlayer = playerOne.marker;
        } else if (round %2 === 0) {
            currentPlayer = playerTwo.marker;
        }
        document.body.classList.add(`${currentPlayer}-bg`);
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
                alert(`${winner} is winner!`);
                Gameplay.startGame();
                Gameplay.updateCurrentPlayer();
            } else if (!winner) {
                updateCurrentPlayer();
            }
        }
    }

    return {
        markSquare,
        startGame,
        updateCurrentPlayer
        }

})();


//  module for dynamic page effects:
const PageEffects = (function() {

    function addHeaderLink() {
        const header = document.querySelector('header');
        header.addEventListener('click', () => {
            window.open('https://www.wikihow.com/Play-Tic-Tac-Toe');
        });
    }

    function addSquareListeners() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('mouseover', (e) => {
                PageEffects.rotateSquare(e);
            });
            square.addEventListener('mouseout', (e) => {
                PageEffects.rotateSquare(e);
            });
        });
    }

    function rotateSquare(e) {
        if (window.innerWidth >= 751) {
            const square = e.target;
            const num = (Math.round(Math.random()) * 2 - 1) * (Math.floor(Math.random() * 180));
            square.style.transform = `rotate(${num}deg)`;
        }
    }

    function addClickableListener() {
        const clickable = document.querySelector('.clickable');
        clickable.addEventListener('click', () => {
            showPlayerForm();
        });
    }

    function showPlayerForm() {
        const playerForm = document.querySelector('.form-window');
        playerForm.classList.remove('hide');
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('hide');
    }

    function hidePlayerForm() {
        const playerForm = document.querySelector('.form-window');
        playerForm.classList.add('hide');
        const overlay = document.querySelector('.overlay');
        overlay.classList.add('hide');
    }

    function hideStartDiv() {
        const startDiv = document.querySelector('.click-to-start');
        startDiv.classList.add('hide');
    }

    function addFormListeners() {
        const playerForm = document.querySelector('#player-form');
        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clickedPlay(e);
        });
        const radioInputs = document.querySelectorAll(`input[type='radio']`);
        radioInputs.forEach(option => {
            option.addEventListener('click', () => {
                const computerOption = document.querySelector('#computer');
                const playerTwoField = document.querySelector('.player-two-field');
                if (computerOption.checked) {
                    playerTwoField.classList.add('hide');
                } else if (!computerOption.checked) {
                    playerTwoField.classList.remove('hide');
                }
            });
        });
        const closeButton = document.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            hidePlayerForm();
        });
    }

    function clickedPlay(e) {
        Gameboard.addClickListeners();
        PageEffects.addSquareListeners();
        PageEffects.hidePlayerForm();
        PageEffects.hideStartDiv();
    }
    
    return {
        addHeaderLink,
        addSquareListeners,
        rotateSquare,
        showPlayerForm,
        hidePlayerForm,
        addClickableListener,
        hideStartDiv,
        addFormListeners
    }
    
})();

Gameplay.startGame();
Gameplay.updateCurrentPlayer();
PageEffects.addHeaderLink();
PageEffects.addClickableListener();
PageEffects.addFormListeners();