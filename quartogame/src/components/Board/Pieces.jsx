import React from "react";
import { images, data } from "../../constants";

export default function Pieces() {
  const images = [""];
  console.log(data.pieces);
  return (
    <div className="Pieces">
      {data.pieces.map((res) => {
        console.log(res);
        return (
          <div className="OnePiece">
            <img src={res.img} alt="piece" className="PieceImage" />
          </div>
        );
      })}
    </div>
  );
}
