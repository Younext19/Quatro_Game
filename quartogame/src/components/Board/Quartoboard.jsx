import React, { useEffect, useState } from "react";
import "./Quartoboard.css";
import { image, images } from "../../constants";
import piecesFunc, { Piece } from "../../constants/data";
import Pieces from "./Pieces";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { checkWinFact } from "./functions";

export default function Quartoboard() {
  const [params, setParams] = useState({
    players: [],
  });

  const checkWin = checkWinFact(params.level);
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
  const [selectedPiece, setselectedPiece] = useState({
    getIndex: function () {
      return "";
    },
  });

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

  function VerifyWin() {
    if (checkWin(Board)) {
      wonPlayer();
    }
  }

  return (
    <div className="row">
      <div className="Score">
        <p>Pièce Choisi : </p>
        {selectedPiece && (
          <img src={images[selectedPiece?.getIndex()]} alt="Image Pièce" />
        )}
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
