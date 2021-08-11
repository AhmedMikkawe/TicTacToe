const gameBoard = (function(){
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    let winningPositions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    let circleTurn;
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const winningMessageElement = document.getElementById('winner-message');
    const winningMessageTextElement = document.querySelector('[data-message]');

    restartButton.addEventListener('click',startGame);
    function startGame() {
        circleTurn = false;
        cells.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
            winningMessageElement.classList.add('hide');
        })
    }
    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }


    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }
    function checkWin(currentClass) {
        return winningPositions.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            })
        })
    }
    function swapTurns() {
        circleTurn = !circleTurn;
    }
    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        })
    }
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageElement.classList.remove('hide');
    }
    return {startGame};
})();
gameBoard.startGame();