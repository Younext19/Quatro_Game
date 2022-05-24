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
    const op = searchParams.get("op");
    const level = searchParams.get("level");
    const params = {
      level,
      players: [
        { name: "J1", score: 0 },
        { name: op, score: 0 },
      ],
      active: "J1",
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
    toast(`${params.active} won`);
    let index = params?.players?.findIndex(
      ({ name }) => name === params?.active
    );
    const aux = Object.assign({}, params);
    aux.players[index].score += 1;
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

  function VerifyWin() {
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
        {Board.map((res, index) => {
          return (
            <div key={index}>
              {res.map((res2, index2) => {
                return (
                  <div key={index2}>
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
              })}
            </div>
          );
        })}
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
