import React, {useEffect, useState} from "react";
import "./Quartoboard.css";
import {images} from "../../constants";
import {piecesFun} from "../../constants";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import Node from "../../strategy/Node";
import {checkFactory} from "../../constants/data";

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
  const checkWin = checkFactory(params.level)
  const [borderCornersClassName, setborderCornersClassName] =
    useState("borderCorners");

  const [piecesClickable, setpiecesClickable] = useState("piecesShow");
  const [pieces, setPieces] = useState(piecesFun);
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


  function VerifyWin() {
    console.log("test : "+checkWin(Board))
    if(checkWin(Board))
    {
      wonPlayer()
    }


    const node = new Node(false,null,[
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],pieces,true,checkWin)
    console.log(node.nextChildren())
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
                          setPieces(pieces.filter((e) => e !== selectedPiece));
                          setBoard(Board2);
                          VerifyWin(Board);
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
