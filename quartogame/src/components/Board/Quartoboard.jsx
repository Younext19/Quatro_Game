import React, { useState } from "react";
import Pieces from "./Pieces";
import "./Quartoboard.css";
import { images, data } from "../../constants";

const verticalAxes = ["1", "2", "3", "4"];

const horizontalAxes = ["a", "b", "c", "d"];

const joueurs = ["J1", "Computer"];
const imgs = ["a", "b", "c", "d"];

export default function Quartoboard() {
  const [DataPieces, setDataPieces] = useState([
    {
      name: "bcen",
      img: images.bcen,
    },
    { name: "bcer", img: images.bcer },
    { name: "bcfn", img: images.bcfn },
    { name: "bcfr", img: images.bcfr },
    { name: "bsen", img: images.bsen },
    { name: "bser", img: images.bser },
    { name: "bsfn", img: images.bsfn },
    { name: "bsfr", img: images.bsfr },
    { name: "wcen", img: images.wcen },
    { name: "wcer", img: images.wcer },
    { name: "wcfn", img: images.wcfn },
    { name: "wcfr", img: images.wcfr },
    { name: "wsen", img: images.wsen },
    { name: "wser", img: images.wser },
    { name: "wsfn", img: images.wsfn },
    { name: "wsfr", img: images.wsfr },
  ]);
  const [selectedPiece, setselectedPiece] = useState("");
  const [selectedPieceImage, setselectedPieceImage] = useState("");
  const [BoardStyleID, setBoardStyleID] = useState("chessboard");
  const [TileStyleClassName, setTileStyleClassName] = useState("tile");
  const [PiecesStyleClassName, setPiecesStyleClassName] = useState("pice");

  let board = [];

  for (let j = verticalAxes.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxes.length; i++) {
      board.push(
        <div
          className={TileStyleClassName}
          onClick={(e) => {
            //DELETE TAKEN ONE
            let newData = DataPieces.filter(
              (elm) => elm.name !== selectedPiece
            );
            setDataPieces(newData);
            console.log("_____________________");
            console.log(selectedPiece);
            console.log(e);
            setBoardStyleID("chessboard");
          }}
        >
          <span>
            [{horizontalAxes[i]}
            {verticalAxes[j]}]
          </span>
          <img src={selectedPieceImage} />
        </div>
      );
    }
  }
  function pieceOnClick(e) {
    console.log(e);
  }

  return (
    <div className="row">
      <div className="Score">
        <p>Tour du {joueurs[0]}</p>
        <p>
          {joueurs[0]} 0 - 1 {joueurs[1]}{" "}
        </p>
      </div>
      <div id={BoardStyleID}>{board}</div>

      {/* TOFIX !! */}
      <div id="pieces" className="Pieces">
        {DataPieces.map((res, index) => {
          console.log(index);

          return (
            <img
              src={res.img}
              alt="piece"
              className="pice"
              onClick={(target) => {
                setselectedPiece(res.name);
                setselectedPieceImage(res.img);

                pieceOnClick(target);
                console.log(res.img);
                setBoardStyleID("chessboardClick");
                setPiecesStyleClassName("");
              }}
            />
          );
        })}{" "}
      </div>
    </div>
  );
}

// <div>
//           { index+1%4==0 ? <br/> : null}
//           </div>
