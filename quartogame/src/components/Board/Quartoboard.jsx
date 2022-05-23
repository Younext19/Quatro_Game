import React, { useState } from "react";
import "./Quartoboard.css";
import { image, images } from "../../constants";
import piecesFunc from "../../constants/data";
import Pieces from "./Pieces";

export default function Quartoboard() {
  const [borderCornersClassName, setborderCornersClassName] =
    useState("borderCorners");
  const [piecesClickable, setpiecesClickable] = useState("piecesShow");
  console.log(piecesFunc.piecesFun);
  const [pieces, setPieces] = useState(piecesFunc.piecesFun);
  const [Board, setBoard] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
  const [selectedPiece, setselectedPiece] = useState({});

  return (
    <div className="row">
      <div className="rowScore">Score</div>
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
                          console.log(selectedPiece);
                          const Board2 = [...Board];
                          Board2[index][index2] = selectedPiece;
                          setPieces(pieces.filter((e) => e != selectedPiece));
                          setBoard(Board2);
                        }}
                      >
                        all
                      </div>
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
          console.log(res.getIndex());
          return (
            <div
              className={piecesClickable}
              key={indexPiece}
              onClick={() => {
                setselectedPiece(res);
                setborderCornersClassName("borderCornersClickable");
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
