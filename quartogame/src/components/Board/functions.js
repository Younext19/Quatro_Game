export function checkWinFact(level) {
    return (board) => {
        if (level1(board)) {
            return true;
        }
        if (level === 2) {
            if (level2(board)) {
                return true;
            }
        }
        if (level === 3) {
            if (level3(board)) {
                return true;
            }
        }
        if (level === 4) {
            if (level4(board)) {
                return true;
            }
        }
        return false;
    };
}

// Voir si l'utilisateur a gagné
function check(p1, p2, p3, p4) {
    return (
        (p1.trou === p2.trou && p3.trou === p4.trou && p1.trou === p3.trou && p2.trou === p4.trou) ||
        (p1.black === p2.black && p3.black === p4.black && p1.black === p3.black && p2.black === p4.black) ||
        (p1.circular === p2.circular && p3.circular === p4.circular && p1.circular === p3.circular && p2.circular === p4.circular) ||
        (p1.bordered === p2.bordered && p3.bordered === p4.bordered && p1.bordered === p3.bordered && p2.bordered === p4.bordered));
}

function checkRow(boardPiecesParam) {
    return check(
        boardPiecesParam[0],
        boardPiecesParam[1],
        boardPiecesParam[2],
        boardPiecesParam[3]
    );
}

function checkCol(boardParam) {
    const cols = boardParam.map((x) => x[0]);
    const cols1 = boardParam.map((x) => x[1]);
    const cols2 = boardParam.map((x) => x[2]);
    const cols3 = boardParam.map((x) => x[3]);
    let k = cols.every((res) => res !== null);
    if (k) {
        return checkRow(cols);
    }
    let k1 = cols1.every((res) => res !== null);
    if (k1) {
        return checkRow(cols1);
    }
    let k2 = cols2.every((res) => res !== null);
    if (k2) {
        return checkRow(cols2);
    }
    let k3 = cols3.every((res) => res !== null);
    if (k3) {
        return checkRow(cols3);
    }
}

function checkDiag(boardParam) {
    let diagonal = boardParam.map(
        (row, index, self) => row[self.length - 1 - index]
    );
    let k1 = diagonal.every((res) => res !== null);
    if (k1) {
        return checkRow(diagonal);
    }
    let diagonal2 = [];
    for (let j = 0; j < 4; j++) {
        diagonal2.push(boardParam[j][j]);
    }
    let k2 = diagonal2.every((res) => res !== null);
    if (k2) {
        return checkRow(diagonal2);
    }
}

function level1(Board) {
    for (let index = 0; index < 4; index++) {
        const k = Board[index].every(res => res !== null);
        if (k) {
            if (checkRow(Board[index])) {
                return true;
            }
        }
    }
    if (checkCol(Board)) {
        return true;
    }
    if (checkDiag(Board)) {
        return true;
    }
}

function level2(allBoard) {
    for (let i = 0; i < 3; i++) {
        const twoFirstCols = [
            allBoard[0][i],
            allBoard[0][i + 1],
            allBoard[1][i],
            allBoard[1][i + 1],
        ];
        const middleCols = [
            allBoard[1][i],
            allBoard[1][i + 1],
            allBoard[2][i],
            allBoard[2][i + 1],
        ];
        const lastCols = [
            allBoard[2][i],
            allBoard[2][i + 1],
            allBoard[3][i],
            allBoard[3][i + 1],
        ];
        let k1 = twoFirstCols.every((res) => res != null);
        if (k1) {
            return checkRow(twoFirstCols);
        }
        let k2 = middleCols.every((res) => res != null);
        if (k2) {
            return checkRow(middleCols);
        }
        let k3 = lastCols.every((res) => res != null);
        if (k3) {
            return checkRow(lastCols);
        }
    }
}

function level3(allBoard) {
    for (let i = 0; i < 2; i++) {
        const FirstThirdCols = [
            allBoard[0][i],
            allBoard[0][i + 2],
            allBoard[2][i],
            allBoard[2][i + 2],
        ];
        const SecondFourthCols = [
            allBoard[1][i],
            allBoard[1][i + 2],
            allBoard[3][i],
            allBoard[3][i + 2],
        ];

        let k1 = FirstThirdCols.every((res) => res != null);
        if (k1) {
            return checkRow(FirstThirdCols);
        }
        let k2 = SecondFourthCols.every((res) => res != null);
        if (k2) {
            return checkRow(SecondFourthCols);
        }
    }
}

function level4(allBoard) {
    const FirstCols = [
        allBoard[0][1],
        allBoard[1][0],
        allBoard[1][2],
        allBoard[2][1],
    ];
    const SecondCols = [
        allBoard[0][2],
        allBoard[1][1],
        allBoard[1][3],
        allBoard[3][3],
    ];
    const ThirdCols = [
        allBoard[1][1],
        allBoard[2][0],
        allBoard[2][2],
        allBoard[3][1],
    ];
    const FourthCols = [
        allBoard[1][2],
        allBoard[2][1],
        allBoard[2][3],
        allBoard[3][2],
    ];
    let k1 = FirstCols.every((res) => res != null);
    if (k1) {
        return checkRow(FirstCols);
    }
    let k2 = SecondCols.every((res) => res != null);
    if (k2) {
        return checkRow(SecondCols);
    }
    let k3 = ThirdCols.every((res) => res != null);
    if (k3) {
        return checkRow(ThirdCols);
    }
    let k4 = FourthCols.every((res) => res != null);
    if (k4) {
        return checkRow(FourthCols);
    }
}
