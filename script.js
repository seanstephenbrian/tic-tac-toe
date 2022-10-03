const Gameboard = (function () {

    let currentBoard = {
        a1: 'x',
        a2: 'x',
        a3: 'x',
        b1: 'o',
        b2: 'o',
        b3: 'o',
        c1: 'x',
        c2: 'x',
        c3: 'x'
    };

    function renderBoard() {
        for (square in currentBoard) {
            let squareDiv = document.querySelector(`.${square}`);
            squareDiv.textContent = `${currentBoard[square]}`;
        }
    }

    return {
        currentBoard,
        renderBoard
    };

})();



const Player = (name, marker) => {
    return { name, marker };
};

// const player1 = Player('Sean', 'x');
// const player2 = Player('Hannah', 'o');

Gameboard.renderBoard();
