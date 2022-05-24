import React, { useEffect, useState } from "react";
import "./Quartoboard.css";
import { image, images } from "../../constants";
import piecesFunc, { Piece } from "../../constants/data";
import Pieces from "./Pieces";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Quartoboard() {
  const [params, setParams] = useState({
    players: [],
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let algorithm1 = "";
    let algorithm2 = "";
    const level = searchParams.get("level");
    let p1 = searchParams.get("j1");
    let p2 = searchParams.get("j2");
    if (p1 == "") {
      p1 = "IA1";
      algorithm1 = searchParams.get("algorithm1");
    }
    if (p2 == "") {
      p2 = "IA2";
      algorithm2 = searchParams.get("algorithm1");
    }

    const params = {
      level,
      players: [
        { name: p1, algorithme1: algorithm1 },
        { name: p2, algorithme2: algorithm1 },
      ],
      active: p1,
    };
    setParams(params);
  }, [searchParams]);
  const [borderCornersClassName, setborderCornersClassName] =
    useState("borderCorners");
  const [piecesClickable, setpiecesClickable] = useState("piecesShow");
  const [pieces, setPieces] = useState(piecesFunc.piecesFun);
  const [Board, setBoard] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
  const [selectedPiece, setselectedPiece] = useState({});

  // Pieces on line
  function wonPlayer() {
    toast(`${params.active} a gagné`);
    let index = params?.players?.findIndex(
      ({ name }) => name === params?.active
    );
    const aux = Object.assign({}, params);
    aux.blocked = true;
    setParams(aux);
    setpiecesClickable("piecesNone");
  }

  // Voir si l'utilisateur a gagné
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

  function VerifyWin() {
    console.log(Board);
    for (let index = 0; index < 4; index++) {
      let k = Board[index].every((res) => res != null);
      if (k) {
        if (checkRow(Board[index])) {
          wonPlayer();
        }
      }
    }
    if (checkCol(Board)) {
      wonPlayer();
    }
    if (checkDiag(Board)) {
      wonPlayer();
    }
    if (params.level == 2) {
      if (level2(Board)) {
        wonPlayer();
      }
    }
    if (params.level == 3) {
      if (level2(Board)) {
        wonPlayer();
      }
      if (level3(Board)) {
        wonPlayer();
      }
    }
    if (params.level == 4) {
      if (level2(Board)) {
        wonPlayer();
      }
      if (level3(Board)) {
        wonPlayer();
      }
      if (level4(Board)) {
        wonPlayer();
      }
    }
  }

  return (
    <div className="row">
      <div className="Score">
        <p>Pièce Choisi : </p>
        {selectedPiece && <img src={images[selectedPiece?.img]} alt="bing" />}
        <br />
        <br />
        <p>Tour du {params?.active}</p>
      </div>
      <div className="centeredBoard">
        {Board.flatMap((res, index) =>
          res.map((res2, index2) => {
            return (
              <div key={`${index}-${index2}`}>
                {res2 ? (
                  <div className={borderCornersClassName}>
                    <img src={images[res2.getIndex()]} alt="check" />
                  </div>
                ) : (
                  <div
                    className={borderCornersClassName}
                    onClick={() => {
                      //Hna on affecte la piece selectionné a cette index
                      const Board2 = [...Board];
                      setborderCornersClassName("borderCorners");
                      setpiecesClickable("piecesShow");
                      Board2[index][index2] = selectedPiece;
                      setPieces(pieces.filter((e) => e != selectedPiece));
                      setBoard(Board2);
                      VerifyWin();
                    }}
                  ></div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="piecesShowMain">
        {pieces.map((res, indexPiece) => {
          return (
            <div
              className={piecesClickable}
              key={indexPiece}
              onClick={() => {
                setselectedPiece(res);
                setborderCornersClassName("borderCornersClickable");
                setpiecesClickable("piecesNone");
                const player1Active =
                  params?.active === params?.players[0]?.name;
                setParams({
                  ...params,
                  active: params?.players[player1Active ? 1 : 0].name,
                });
              }}
            >
              <img src={images[res.getIndex()]} alt="piece" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
