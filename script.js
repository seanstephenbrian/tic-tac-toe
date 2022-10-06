(function() {

    // Gameboard module:
    const Gameboard = (function () {

        // initialize empty gameboard object:
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

        // render the gameboard using the current contents of the currentBoard object:
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

        // update the currentBoard object by changing the value of a specific square/symbol pairing, then re-render the board:
        function updateBoard(square, marker) {
            currentBoard[square] = marker;
            renderBoard();
        }

        // empty the gameboard by making the value of each item in the object empty then re-rendering the board:
        function emptyBoard() {
            for (square in currentBoard) {
                let squareDiv = document.querySelector(`.${square}`);
                squareDiv.removeAttribute('data-symbol');
                currentBoard[square] = '';
            }
            renderBoard();
        }

        // add listeners for clicks on the game squares; a click on any square will trigger the markSquare function:
        (function() {
            let squares = document.querySelectorAll('.square');
            squares.forEach(square => {
                square.addEventListener('click', (e) => {
                    Gameplay.markSquare(e);
                });
            });
        })();

        // check for winner by looking for three-in-a-row sequences of the same symbol on the gameboard; if there is one, return the winning symbol:
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

            // if there isn't a winner, proceed to check if all nine squares are filled; if they are, declare a tie:
            let squares = document.querySelectorAll('.square');
            let i = 0;
            squares.forEach(square => {
                if (square.innerText) {
                    i++;
                }
            });
            if (i === 9) {
                PageEffects.showTieAlert();
            }
        }

        // return currentBoard object for use in the AI function:
        function returnCurrentBoard() {
            return currentBoard;
        }

        return {
            updateBoard,
            renderBoard,
            emptyBoard,
            checkForWinner,
            returnCurrentBoard
        };
    })();

    // function to create new Player objects:
    const Player = (name, marker) => {
        return { name, marker };
    };

    // Gameplay module:
    const Gameplay = (function () {

        // initialize empty objects/variables that need to be accessed by the methods in this module:
        let playerOne = Player('','');
        let playerTwo = Player('','');
        let currentPlayer = '';
        let currentPlayerName = '';
        let round;
        let difficulty = 'easy';

        // start the game by emptying the board & setting the round number to 1:
        function startGame(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) {
            Gameboard.emptyBoard();

            round = 1;

            // use passed values from the player form to set the playerOne and playerTwo object properties:
            playerOne.name = playerOneName;
            playerOne.marker = playerOneMarker;
            
            playerTwo.name = playerTwoName;
            playerTwo.marker = playerTwoMarker;

            // make playerOne the currentPlayer:
            currentPlayer = playerOne.marker;
            currentPlayerName = playerOne.name;

            // double-check that there is a currentPlayer, and if so change the background image to that player's symbol:
            if (currentPlayer) {
                document.body.classList.remove(`init-bg`);
                document.body.classList.add(`${currentPlayer}-bg`);
            }

            // set the header text to the current player's name:
            if (currentPlayerName) {
                const header = document.querySelector('header');
                header.innerText = `${currentPlayerName}'s turn`;
            }
        };

        startGame();

        // this function fires instead of startGame() when the user clicks the play again button:
        function playAgain() {

            let winningPlayer = currentPlayer;

            PageEffects.hideWinner();

            Gameboard.emptyBoard();

            round = 1;

            // check if the previous round's playerOne (who had the first turn in the previous round) was the winner;
            // if they were, switch playerOne and playerTwo so that the previous round's losing player now gets the first turn in the new round:
            if (winningPlayer === playerOne.marker) {

                let playerOneName = playerOne.name;
                let playerOneMarker = playerOne.marker;
                let playerTwoName = playerTwo.name;
                let playerTwoMarker = playerTwo.marker;

                playerOne.name = playerTwoName;
                playerOne.marker = playerTwoMarker;
                playerTwo.name = playerOneName;
                playerTwo.marker = playerOneMarker;

            }

            // make sure currentPlayer is set to playerOne:
            currentPlayer = playerOne.marker;
            currentPlayerName = playerOne.name;

            // update the background image with the current player's symbol:
            document.body.classList.remove(`x-bg`);
            document.body.classList.remove(`o-bg`);
            document.body.classList.add(`${currentPlayer}-bg`);

            // update header with current player's name:
            const header = document.querySelector('header');
            header.innerText = `${currentPlayerName}'s turn`;

            if (currentPlayerName === 'computer') {
                PageEffects.enableClickBarrier();
                setTimeout(PageEffects.disableClickBarrier, 500);
                setTimeout(makeComputerMove, 500);
            }

        }

        function updateCurrentPlayer() {

            // if the players haven't yet chosen symbols, set the background to a default initial background (an X):
            if (playerOne.marker === undefined || playerTwo.marker === undefined) {
                document.body.classList.remove(`x-bg`);
                document.body.classList.remove(`o-bg`);
                document.body.classList.add(`init-bg`);

            // if the game has started, increment the round,  
            // change the currentPlayer (knowing that playerOne is the currentPlayer for odd rounds and playerTwo is the currentPlayer for even rounds),
            // and update the background & header with the currentPlayer's symbol & name:
            } else if (playerOne.marker || playerTwo.marker) {
                document.body.classList.remove(`x-bg`);
                document.body.classList.remove(`o-bg`);
                round++;
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

            if (currentPlayerName === 'computer') {
                PageEffects.enableClickBarrier();
                setTimeout(PageEffects.disableClickBarrier, 500);
                setTimeout(makeComputerMove, 500);
            }

        }

        updateCurrentPlayer();

        function markSquare(e) {

            const clickedSquare = e.target;

            // if the square is already filled, exit the function:
            checkSquare: if (clickedSquare.innerText) {
                break checkSquare;

            // if the square is empty, update the currentBoard object by setting the clicked square's value to the currentPlayer's symbol,
            // then check for a winner; if there is a winner, display the winner message; if there isn't, proceed with gameplay by updating the current player:
            } else if (!clickedSquare.innerText) {
                const squareId = clickedSquare.dataset.id;
                Gameboard.updateBoard(squareId, currentPlayer);
                const winner = Gameboard.checkForWinner();
                if (winner) {
                    PageEffects.showWinner(currentPlayerName);
                } else if (!winner) {
                    updateCurrentPlayer();
                }
            }
        }

        // determine the computer's move for easy / hard difficulty settings:
        function makeComputerMove() {

            let choice;

            let emptySquares = [];

            let currentBoard = Gameboard.returnCurrentBoard();

            for (square in currentBoard) {
                if (!currentBoard[square]) {
                    emptySquares.push(square);
                }
            }

            // if the difficulty is 'easy', have the computer make a random move:
            if (difficulty === 'easy') {
                const randomIndex = Math.floor(Math.random() * emptySquares.length);
                choice = emptySquares[randomIndex];
            }

            // update board with the computer's choice and check for winner; if there's no winner, update the current player:
            Gameboard.updateBoard(choice, currentPlayer);
            const winner = Gameboard.checkForWinner();
            if (winner) {
                PageEffects.showWinner(currentPlayerName);
            } else if (!winner) {
                updateCurrentPlayer();
            }

            // clear currentBoard object before computer's next turn:
            currentBoard = {};
        }

        return {
            markSquare,
            startGame,
            updateCurrentPlayer,
            playAgain,
            makeComputerMove
        };
    })();

    //  module for dynamic page effects:
    const PageEffects = (function() {

        // header takes you to tic-tac-toe page on wikihow when clicked:
        (function() {
            const header = document.querySelector('header');
            header.addEventListener('click', () => {
                window.open('https://www.wikihow.com/Play-Tic-Tac-Toe');
            });
        })();

        // add mouseover/mouseout listeners for grid squares to apply rotation effects:
        (function() {
            const squares = document.querySelectorAll('.square');
            squares.forEach(square => {
                square.addEventListener('mouseover', (e) => {
                    PageEffects.rotateSquare(e);
                });
                square.addEventListener('mouseout', (e) => {
                    PageEffects.rotateSquare(e);
                });
            });
        })();

        // if it's not a mobile viewport, rotate the square a random number of degrees when mouse over:
        function rotateSquare(e) {
            if (window.innerWidth >= 751) {
                const square = e.target;
                const num = (Math.round(Math.random()) * 2 - 1) * (Math.floor(Math.random() * 180));
                square.style.transform = `rotate(${num}deg)`;
            }
        }

        // the new player form is revealed when the user clicks the 'click to start a game' button:
        (function() {
            const clickToStart = document.querySelector('.click-to-start-text');
            clickToStart.addEventListener('click', () => {
                showPlayerForm();
            });
        })();

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

        function showAlert() {
            const alert = document.querySelector('.alert');
            alert.classList.remove('hide');
            const alertOverlay = document.querySelector('.alert-overlay');
            alertOverlay.classList.remove('hide');
        }

        function hideAlert() {
            const alert = document.querySelector('.alert');
            alert.classList.add('hide');
            const alertOverlay = document.querySelector('.alert-overlay');
            alertOverlay.classList.add('hide');
        }

        function showTieAlert() {
            const tieAlert = document.querySelector('.tie');
            tieAlert.classList.remove('hide');
            const winnerOverlay = document.querySelector('.winner-overlay');
            winnerOverlay.classList.remove('hide');
        }

        function hideTieAlert() {
            const tieAlert = document.querySelector('.tie');
            tieAlert.classList.add('hide');
            const winnerOverlay = document.querySelector('.winner-overlay');
            winnerOverlay.classList.remove('hide');
        }

        function showWinner(winnerName) {
            const winnerWindow = document.querySelector('.winner');
            winnerWindow.classList.remove('hide');
            const winnerOverlay = document.querySelector('.winner-overlay');
            winnerOverlay.classList.remove('hide');
            const winningPlayer = document.querySelector('.winning-player');
            winningPlayer.innerText = winnerName;
        }

        function hideWinner() {
            const winnerWindow = document.querySelector('.winner');
            winnerWindow.classList.add('hide');
            const winnerOverlay = document.querySelector('.winner-overlay');
            winnerOverlay.classList.add('hide');
        }

        function hideStartDiv() {
            const startDiv = document.querySelector('.click-to-start');
            startDiv.classList.add('hide');
        }

        function enableClickBarrier() {
            const clickBarrier = document.querySelector('.click-barrier');
            clickBarrier.classList.remove('hide');
        }

        function disableClickBarrier() {
            const clickBarrier = document.querySelector('.click-barrier');
            clickBarrier.classList.add('hide');
        }

        // this function adds all the events listeners to the player form:
        (function() {
            const playerForm = document.querySelector('#player-form');
            // when the user submits a valid form, set the marker symbols for both players,
            // checking for possible variation in capitalization and the use of '0' for 'o'
            playerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let playerOneMarkerInput = document.querySelector('#player-one-marker').value;
                let playerOneMarker;
                if (playerOneMarkerInput === 'X' || playerOneMarkerInput === 'x') {
                    playerOneMarker = 'x';
                } else if (playerOneMarkerInput === 'O' || playerOneMarkerInput === 'o' || playerOneMarkerInput === '0') {
                    playerOneMarker = 'o';
                }
                let playerTwoMarkerInput = document.querySelector('#player-two-marker').value;
                let playerTwoMarker;
                if (playerTwoMarkerInput === 'X' || playerTwoMarkerInput === 'x') {
                    playerTwoMarker = 'x';
                } else if (playerTwoMarkerInput === 'O' || playerTwoMarkerInput === 'o' || playerTwoMarkerInput === '0') {
                    playerTwoMarker = 'o';
                }
                const computerOption = document.querySelector('#computer');

                // if the players have selected the same symbol, display an alert
                if (!computerOption.checked && (playerOneMarker === playerTwoMarker)) {
                    showAlert();
                    const alertText = document.querySelector('.alert-text');
                    alertText.innerText = 'players must choose different symbols!';
                }

                // if the players have selected different symbols, or if player one has selected a symbol and checked the computer opponent option, start the game:
                if ((playerOneMarker !== playerTwoMarker) || (playerOneMarker && computerOption.checked)) {
                    clickedPlay(e);
                }
            });
            const playerMarkerInputs = document.querySelectorAll('.player-marker-input');

            // adapt the submitted form validation code to dynamically validate the form as the user focuses into and focuses out of specific form elements:
            playerMarkerInputs.forEach(input => {
                input.addEventListener('focusout', () => {

                    let playerOneMarkerInput = document.querySelector('#player-one-marker').value;
                    let playerOneMarker;
                    if (playerOneMarkerInput === 'X' || playerOneMarkerInput === 'x') {
                        playerOneMarker = 'x';
                    } else if (playerOneMarkerInput === 'O' || playerOneMarkerInput === 'o' || playerOneMarkerInput === '0') {
                        playerOneMarker = 'o';
                    }
                    let playerTwoMarkerInput = document.querySelector('#player-two-marker').value;
                    let playerTwoMarker;
                    if (playerTwoMarkerInput === 'X' || playerTwoMarkerInput === 'x') {
                        playerTwoMarker = 'x';
                    } else if (playerTwoMarkerInput === 'O' || playerTwoMarkerInput === 'o' || playerTwoMarkerInput === '0') {
                        playerTwoMarker = 'o';
                    }
                    const computerOption = document.querySelector('#computer');
                    if (!computerOption.checked  && (playerOneMarker !== undefined) && (playerTwoMarker !== undefined) && (playerOneMarker === playerTwoMarker)) {
                        showAlert();
                        const alertText = document.querySelector('.alert-text');
                        alertText.innerText = 'players must choose different symbols!';
                        input.value = null;
                        return;
                    }

                    if (!(input.value === '' || input.value === 'x' || input.value === 'X' || input.value === 'o' || input.value === 'O' || input.value === '0')) {
                        showAlert();
                        const alertText = document.querySelector('.alert-text');
                        alertText.innerText = 'please choose X or O!';
                        input.value = null;
                    }
                })
            });

            // make the player two section disappear from the form if the user checks the computer opponent option:
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
        })();

        // this function adds event listeners for the clickable elements on various alert/pop-up windows:
        (function() {

            // click listeners for the close button and play again buttons on the winner alert pop-up window:
            const winnerCloseButton = document.querySelector('.winner-close-button');
            winnerCloseButton.addEventListener('click', () => {
                window.location.href = 'https://www.wikihow.com/Play-Human-Tic-Tac-Toe';
            });
            const winnerPlayAgainButton = document.querySelector('.winner-play-again-button');
            winnerPlayAgainButton.addEventListener('click', () => {
                Gameplay.playAgain();
            });

            // click listeners for the close button on a standard alert pop-up:
            const closeAlert = document.querySelector('.alert-close-button');
            closeAlert.addEventListener('click', () => {
                hideAlert();
            });

            // click listeners for the close button and play again buttons on the tie alert pop-up window:
            const tieCloseButton = document.querySelector('.tie-close-button');
            tieCloseButton.addEventListener('click', () => {
                window.location.href = 'https://www.wikihow.com/Win-at-Everything';
            });
            const tiePlayAgainButton = document.querySelector('.tie-play-again-button');
            tiePlayAgainButton.addEventListener('click', () => {
                hideTieAlert();
                Gameplay.playAgain();
            });
        })();

        // when the user clicks the play button, fire the startGame function using the relevant values from the submitted form:
        function clickedPlay(e) {

            PageEffects.hidePlayerForm();
            PageEffects.hideStartDiv();
            
            const playerOne = document.querySelector('#player-one').value;
            const playerOneMarkerInput = document.querySelector('#player-one-marker').value;
            let playerOneMarker;
            if (playerOneMarkerInput === 'X' || playerOneMarkerInput === 'x') {
                playerOneMarker = 'x';
            } else if (playerOneMarkerInput === 'O' || playerOneMarkerInput === 'o' || playerOneMarkerInput === '0') {
                playerOneMarker = 'o';
            }

            // if the computer option is checked, automatically set the computer (playerTwo) symbol to the one that the user did not select:
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
                } else if (playerTwoMarkerInput === 'O' || playerTwoMarkerInput === 'o' || playerTwoMarkerInput === '0') {
                    playerTwoMarker = 'o';
                }
                Gameplay.startGame(playerOne, playerOneMarker, playerTwo, playerTwoMarker);
            }
        }
        
        // check height of screen; if it's a mobile screen (height < 751px), 
        // check for the window height and set body min-height & max-height to that exact value;
        // otherwise set the min-height to 100vh:
        (function() {
            function setBodyHeight() {
                if (window.innerHeight < 751) {
                    const windowHeight = window.innerHeight + "px";
                    document.body.style.minHeight = windowHeight;
                    document.body.style.maxHeight = windowHeight;
                } else if (window.innerHeight >= 751) {
                    document.body.style.minHeight = '100vh';
                    document.body.style.maxHeight = null;
                }
            }

            setBodyHeight();
            
            addEventListener('resize', () => {
                setBodyHeight();
            });
        })();
        
        return {
            rotateSquare,
            showPlayerForm,
            hidePlayerForm,
            hideStartDiv,
            showAlert,
            hideAlert,
            showWinner,
            hideWinner,
            showTieAlert,
            hideTieAlert,
            enableClickBarrier,
            disableClickBarrier
        };
    })();
})();