import React, {useEffect, useState} from "react";
import "./Quartoboard.css";
import {images} from "../../constants";
import {piecesFun} from "../../constants";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {checkWinFact} from "./functions";
import Node from "../../strategy/Node";
import {getAlgorithmInstance} from "../../constants/data";

export default function Quartoboard() {
  const [params, setParams] = useState({
    players: [],
  });

  const checkWin = checkWinFact(params.level);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    /**
     *
     * @type {Strategy | null}
     */
    let algorithm1 = null;
    let algorithm2 = null;
    const level = searchParams.get("level");
    let p1 = searchParams.get("j1");
    let p2 = searchParams.get("j2");
    if (p1 === "") {
      p1 = "IA1";
      algorithm1 = getAlgorithmInstance(searchParams.get("algorithm1"));
    }
    if (p2 === "") {
      p2 = "IA2";
      algorithm2 = getAlgorithmInstance(searchParams.get("algorithm2"));
    }

    const params = {
      level,
      players: [
        { name: p1, algorithm: algorithm1 },
        { name: p2, algorithm: algorithm2 },
      ],
      /**
       * @type {{name:string,algorithm:Strategy}}
       */
      active: { name: p1, algorithm: algorithm1 },
    };
    setParams(params);
  }, [searchParams]);
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
  const [selectedPiece, setselectedPiece] = useState({
    getIndex: function () {
      return "";
    },
  });

  // Pieces on line
  function wonPlayer() {
    toast(`${params.active.name} a gagné`);
    /*let index = params?.players?.findIndex(
        ({ name }) => name === params?.active
    );*/
    const aux = Object.assign({}, params);
    aux.blocked = true;
    setParams(aux);
    setpiecesClickable("piecesNone");
  }

  /**
   *
   * @param player {{name:string,algorithm:Strategy | null}}
   */
  function checkPlayer(player,piece){
    const freePieces = pieces.filter((e) => e !== piece)
    setPieces(freePieces);
    console.log("checkPlayer: "+player.name)
    if(player.name.startsWith("IA")){
      console.log("tour IA")
      const node = new Node(false,null,Board,freePieces,false,null,checkWin)
      const nodeList = node.next(piece)
      const result = nodeList.map(e => player.algorithm.resolve(e,2)).reduce(
          (acc,e) => acc.h >= e.h ? acc:e
      ).getSource()

      setPieces(result.freePieces)
      setBoard(result.data)
      const node2 = new Node(false,null,Board,result.freePieces,false,null,checkWin)
      const source = player.algorithm.resolve(node2,2).getSource()
      setselectedPiece(source.addedPiece)
      setborderCornersClassName("borderCornersClickable");
    }
    else{
      setborderCornersClassName("borderCornersClickable");
    }
  }
  function VerifyWin() {
    if (checkWin(Board)) {
      wonPlayer();
    }
   /* const node = new Node(false,null,Board,pieces,false,null,checkWin)
    const strategy = new MinMaxStrategy()
    const source = strategy.resolve(node,4).getSource();
    setPieces(source.freePieces)
    console.log(source.addedPiece)
    setselectedPiece(source.addedPiece)
    setborderCornersClassName("borderCornersClickable");
    setpiecesClickable("piecesNone");*/

  }

  return (
      <div className="row">
        <div className="Score">
          <p>Pièce Choisi : </p>
          {selectedPiece && (
              <img src={images[selectedPiece?.getIndex()]} alt="Pièce" />
          )}
          <br />
          <br />
          <p>Tour du {params?.active?.name}</p>

        </div>
        <div className="centeredBoard">
          {
            Board.flatMap((res, index) =>
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
                                setBoard(Board2);
                                VerifyWin();
                              }}
                          ></div>
                      )}
                    </div>
                );
              })
          )
          }
        </div>
        <div className="piecesShowMain">
          {pieces.map((res, indexPiece) => {
            return (
                <div
                    className={piecesClickable}
                    key={indexPiece}
                    onClick={() => {
                      setselectedPiece(res);
                      setpiecesClickable("piecesNone");
                      const player1Active=
                          params?.active.name === params?.players[0]?.name;
                      setParams({
                        ...params,
                        active: params?.players[player1Active ? 1 : 0],
                      });
                      checkPlayer(params?.players[player1Active ? 1 : 0],res)
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
