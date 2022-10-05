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

    function startGame(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) {

        Gameboard.emptyBoard();

        round = 1;

        playerOne.name = playerOneName;
        playerOne.marker = playerOneMarker;
        
        playerTwo.name = playerTwoName;
        playerTwo.marker = playerTwoMarker;

        currentPlayer = playerOne.marker;
        const currentPlayerName = playerOne.name;

        if (currentPlayer) {
            document.body.classList.remove(`init-bg`);
            document.body.classList.add(`${currentPlayer}-bg`);
        }

        if (currentPlayerName) {
            const header = document.querySelector('header');
            header.innerText = `${currentPlayerName}'s turn`;
        }

    }

    function updateCurrentPlayer() {
        if (playerOne.marker === undefined || playerTwo.marker === undefined) {
            document.body.classList.remove(`x-bg`);
            document.body.classList.remove(`o-bg`);
            document.body.classList.add(`init-bg`);
        } else if (playerOne.marker || playerTwo.marker) {
            document.body.classList.remove(`x-bg`);
            document.body.classList.remove(`o-bg`);
            round++;
            let currentPlayerName;
            if (round %2 !== 0) {
                currentPlayer = playerOne.marker;
                currentPlayerName = playerOne.name;
            } else if (round %2 === 0) {
                currentPlayer = playerTwo.marker;
                currentPlayerName = playerTwo.name;
            }
            document.body.classList.add(`${currentPlayer}-bg`);
            const header = document.querySelector('header');
            header.innerText = `${currentPlayerName}'s turn`;
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
                    const playerTwoInput = document.querySelector('.player-two-input');
                    playerTwoInput.required = false;
                    const playerTwoMarkerInput = document.querySelector('#player-two-marker');
                    playerTwoMarkerInput.required = false;
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

        const playerOne = document.querySelector('#player-one').value;
        const playerOneMarkerInput = document.querySelector('#player-one-marker').value;
        let playerOneMarker;
        if (playerOneMarkerInput === 'X' || playerOneMarkerInput === 'x') {
            playerOneMarker = 'x';
        } else if (playerOneMarkerInput === 'O' || playerOneMarkerInput === 'o') {
            playerOneMarker = 'o';
        }
        const computerOption = document.querySelector('#computer');
        if (computerOption.checked) {
            const playerTwo = 'computer';
            let playerTwoMarker;
            if (playerOneMarker === 'x') {
                playerTwoMarker = 'o';
            } else if (playerOneMarker === 'o') {
                playerTwoMarker = 'x';
            }
            Gameplay.startGame(playerOne, playerOneMarker, playerTwo, playerTwoMarker);
        } else if (!computerOption.checked) {
            const playerTwo = document.querySelector('#player-two').value;
            const playerTwoMarkerInput = document.querySelector('#player-two-marker').value;
            let playerTwoMarker;
            if (playerTwoMarkerInput === 'X' || playerTwoMarkerInput === 'x') {
                playerTwoMarker = 'x';
            } else if (playerTwoMarkerInput === 'O' || playerTwoMarkerInput === 'o') {
                playerTwoMarker = 'o';
            }
            Gameplay.startGame(playerOne, playerOneMarker, playerTwo, playerTwoMarker);
        }

    }

    function setBodyHeight() {
        const windowHeight = window.innerHeight + "px";
        document.body.style.minHeight = windowHeight;
        document.body.style.maxHeight = windowHeight;
      }
    
    function addWindowResizeListener() {
        addEventListener('resize', () => {
            if (window.innerHeight < 751) {
                setBodyHeight();
            } else if (window.innerHeight >= 751) {
                document.body.style.minHeight = '100vh';
                document.body.style.maxHeight = null;
            }
          });
    }
      
    
    return {
        addHeaderLink,
        addSquareListeners,
        rotateSquare,
        showPlayerForm,
        hidePlayerForm,
        addClickableListener,
        hideStartDiv,
        addFormListeners,
        setBodyHeight,
        addWindowResizeListener
    }
    
})();

PageEffects.setBodyHeight();
PageEffects.addWindowResizeListener();
Gameplay.startGame();
Gameplay.updateCurrentPlayer();
PageEffects.addHeaderLink();
PageEffects.addClickableListener();
PageEffects.addFormListeners();