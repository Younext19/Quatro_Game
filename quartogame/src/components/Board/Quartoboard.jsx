import React, { useState } from "react";
import Pieces from "./Pieces";
import "./Quartoboard.css";
import { images, data } from "../../constants";

const verticalAxes = ["1", "2", "3", "4"];

const horizontalAxes = ["a", "b", "c", "d"];

const joueurs = ["J1", "Computer"];
const imgs = ["a", "b", "c", "d"];
let one = 0;
let two = 0;
let three = 0;
let four = 0;
export default function Quartoboard() {
  /**
   * v : {
   *  h
   * }
   */
  const [dataPieces, setDataPieces] = useState({
    unused: [
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
    ],
  });
  const [selectedPiece, setselectedPiece] = useState(null);
  const [BoardStyleID, setBoardStyleID] = useState("chessboard");
  const [TileStyleClassName, setTileStyleClassName] = useState("tile");
  const [PiecesStyleClassName, setPiecesStyleClassName] = useState("pice");

  function wonPlayer(winner) {
    alert(winner);
  }
  return (
    <div className="row">
      <div className="Score">
        <p>Tour du {joueurs[0]}</p>
        <p>
          {joueurs[0]} 0 - 1 {joueurs[1]}{" "}
        </p>
      </div>
      <div id={BoardStyleID}>
        {verticalAxes.map((axe, index) => {
          return horizontalAxes.map((hAxe, hIndex) => {
            const line = dataPieces[index] ?? {};
            const column = line[hIndex] ?? {};
            return (
              <div
                className={TileStyleClassName}
                onClick={(e) => {
                  let unused = dataPieces?.unused?.filter(
                    (elm) => elm.name !== selectedPiece?.name
                  );
                  let sameLine = dataPieces[index];

                  const obj = Object.assign({}, { ...dataPieces, unused });
                  if (Object.keys(column).length) {
                    alert("Already exists, change location");
                    return;
                  }
                  sameLine = {
                    ...sameLine,
                    [`${hIndex}`]: selectedPiece,
                  };
                  obj[index] = {
                    ...sameLine,
                  };
                  setDataPieces(obj);
                  setBoardStyleID("chessboard");
                  setselectedPiece(null);

                  /**
                   * Steps
                   * If the index is 00, 11, 22 or 33, verify diagonal axis
                   * Verify both the x and y axis
                   *
                   */

                  // filter to see if they all start or end with the same chars as in the current piece, then check if length is equal to 4
                  const colStarts = Object.values(sameLine).filter(
                    (el) =>
                      el.name.substring(0, 2) ===
                      selectedPiece.name.substring(0, 2)
                  );

                  if (colStarts?.length === 4) {
                    alert("won");
                    return;
                  }

                  const colEnd = Object.values(sameLine).filter(
                    (el) =>
                      el.name.substring(2, 4) ===
                      selectedPiece.name.substring(2, 4)
                  );

                  if (colEnd?.length === 4) {
                    alert("won");
                    return;
                  }

                  // same logic applies to the newly created object of same line
                  const sameCol = Object.keys(obj)
                    .map((el) => {
                      if (el != "unused" && obj[el][hIndex]) {
                        return obj[el][hIndex];
                      }
                    })
                    .filter((el) => el);

                  const lineStarts = Object.values(sameCol).filter(
                    (el) =>
                      el.name.substring(0, 2) ===
                      selectedPiece.name.substring(0, 2)
                  );

                  if (lineStarts?.length === 4) {
                    alert("won");
                    return;
                  }

                  const lineEnd = Object.values(sameCol).filter(
                    (el) =>
                      el.name.substring(2, 4) ===
                      selectedPiece.name.substring(2, 4)
                  );

                  if (lineEnd?.length === 4) {
                    alert("won");
                    return;
                  }

                  // now we apply the logic on the diagnoal axis, it's pretty straight forward, we check if the object exists then compare them
                  if (index === hIndex) {
                    // it's on the axis
                    const diagonal = [0, 1, 2, 3]
                      .map((el) => {
                        const line = obj[el] ?? {};
                        return line[el] ?? {};
                      })
                      .filter((el) => Object.keys(el).length);
                    if (diagonal.length != 4) {
                      return;
                    }
                    const diagonalStart = Object.values(diagonal).filter(
                      (el) =>
                        el.name.substring(0, 2) ===
                        selectedPiece.name.substring(0, 2)
                    );

                    if (diagonalStart?.length === 4) {
                      alert("won");
                      return;
                    }

                    const diagonalEnd = Object.values(diagonal).filter(
                      (el) =>
                        el.name.substring(2, 4) ===
                        selectedPiece.name.substring(2, 4)
                    );

                    if (diagonalEnd?.length === 4) {
                      alert("won");
                      return;
                    }
                  }
                }}
              >
                <img src={column?.img} />
              </div>
            );
          });
        })}
      </div>

      {/* TOFIX !! */}
      <div id="pieces" className="Pieces">
        {dataPieces.unused.map((res, index) => {
          return (
            <img
              src={res.img}
              alt="piece"
              className="pice"
              onClick={(target) => {
                setselectedPiece({
                  ...res,
                });
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
