import React from "react";
import Pieces from "./Pieces";
import "./Quartoboard.css";
import { images, data } from "../../constants";

const verticalAxes = ["1", "2", "3", "4"];

const horizontalAxes = ["a", "b", "c", "d"];

const imgs = ["a", "b", "c", "d"];

export default function Quartoboard() {
  let board = [];
  for (let j = verticalAxes.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxes.length; i++) {
      board.push(
        <span className="tile">
          [{horizontalAxes[i]}
          {verticalAxes[j]}]
        </span>
      );
    }
  }

  return (
    <div className="row">
      <div className="Score">Score et tour</div>
      <div id="chessboard">{board}</div>

      {/* TOFIX !! */}
      <div id="pieces">
        {data.pieces.map((res, index) => {
          console.log(index);
          return <img src={res.img} alt="piece" className="pice" />;
        })}{" "}
      </div>
    </div>
  );
}

// <div>
//           { index+1%4==0 ? <br/> : null}
//           </div>
