import images from "./images";
import Piece from "../strategy/Piece";
import {MinMaxStrategy} from "../strategy/Strategy";

export const awards = [
  {
    imgUrl: images.award01,
    title: "Joueur",
    subtitle: "Le premier joueur est tiré au sort",
  },
  {
    imgUrl: images.award02,

    title: "Gameplay",
    subtitle:
      "choisit une des 16 pièces et la donne à son adversaire et il place sur case libre",
  },
  {
    imgUrl: images.award03,
    title: "Gameplay",
    subtitle:
      "Celui-ci doit la placer sur une des cases du plateau et choisir ensuite on revient à 2.",
  },
  {
    imgUrl: images.award04,
    title: "Gain de la partie",
    subtitle: "Il crée une ligne de 4 pièces de mêmes caractéristique.",
  },
];
export function checkFactory(level) {
  function check(p1, p2, p3, p4) {
    return (
        (p1.trou === p2.trou && p3.trou === p4.trou && p1.trou === p3.trou) ||
        (p1.black === p2.black &&
            p3.black === p4.black &&
            p1.black === p3.black) ||
        (p1.circular === p2.circular &&
            p3.circular === p4.circular &&
            p1.circular === p3.circular) ||
        (p1.bordered === p2.bordered &&
            p3.bordered === p4.bordered &&
            p1.bordered === p3.bordered)
    );
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
    var cols = boardParam.map((x) => x[0]);
    var cols1 = boardParam.map((x) => x[1]);
    var cols2 = boardParam.map((x) => x[2]);
    var cols3 = boardParam.map((x) => x[3]);
    let k = cols.every((res) => res != null);
    if (k) {
      return checkRow(cols);
    }
    let k1 = cols1.every((res) => res != null);
    if (k1) {
      return checkRow(cols1);
    }
    let k2 = cols2.every((res) => res != null);
    if (k2) {
      return checkRow(cols2);
    }
    let k3 = cols3.every((res) => res != null);
    if (k3) {
      return checkRow(cols3);
    }
  }
  function checkDiag(boardParam) {
    let diagonal = boardParam.map(
        (row, index, self) => row[self.length - 1 - index]
    );
    let k1 = diagonal.every((res) => res != null);
    if (k1) {
      return checkRow(diagonal);
    }
    let diagonal2 = [];
    for (let j = 0; j < 4; j++) {
      diagonal2.push(boardParam[j][j]);
    }
    let k2 = diagonal2.every((res) => res != null);
    if (k2) {
      return checkRow(diagonal2);
    }
  }

  return (board) =>{
    for (let index = 0; index < 4; index++) {
      let k = board[index].every((res) => res != null);
      if (k) {
        if (checkRow(board[index])) {
          return true
        }
        if (checkCol(board)) {
          return true
        }
        if (checkDiag(board)) {
          return true
        }
        return false
      }
    }

  }
}
export const piecesFun = [
  new Piece(false, false, false, false),
  new Piece(false, false, false, true),
  new Piece(false, false, true, false),
  new Piece(false, false, true, true),
  new Piece(false, true, false, false),
  new Piece(false, true, false, true),
  new Piece(false, true, true, false),
  new Piece(false, true, true, true),
  new Piece(true, false, false, false),
  new Piece(true, false, false, true),
  new Piece(true, false, true, false),
  new Piece(true, false, true, true),
  new Piece(true, true, false, false),
  new Piece(true, true, false, true),
  new Piece(true, true, true, false),
  new Piece(true, true, true, true),
];

/**
 *
 * @param algo {string}
 * @return {MinMaxStrategy}
 */
export function getAlgorithmInstance(algo){
  if (algo==="minimax")
    return new MinMaxStrategy()
  throw new Error("not implemented")
}
