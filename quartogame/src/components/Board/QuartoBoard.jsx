import React, {useEffect, useState} from "react";
import "./Quartoboard.css";
import {images} from "../../constants";
import {piecesFun} from "../../constants";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {checkWinFact} from "./functions";
import Node from "../../strategy/Node";
import {getAlgorithmInstance} from "../../constants/data";

export default function QuartoBoard() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({
    players: [],
  });
  const [activePlayer,setActivePlayer] = useState(null)
  let activeP= null;
  const [borderCornersClassName, setBorderCornersClassName] =
      useState("borderCorners");
  const [piecesClickable, setPiecesClickable] = useState("piecesShow");
  const [pieces, setPieces] = useState(piecesFun);
  const [board, setBoard] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const checkWin = checkWinFact(params.level);


  useEffect(() => {
    const level = parseInt(searchParams.get("level"));
    const p1 = searchParams.get("j1");
    const p2 = searchParams.get("j2");
    /**
     *
     * @type {[{name: string, algorithm: Strategy | null}]}
     */
    const players = [
        p1.length===0 ?
        {name:"IA1",algorithm:getAlgorithmInstance(searchParams.get("algorithm1"))}:
        {name: p1,algorithm:null},
      p2.length===0 ?
        {name:"IA2",algorithm:getAlgorithmInstance(searchParams.get("algorithm2"))}:
        {name: p2,algorithm:null},
    ]
    setParams({level,players});
    setActivePlayer(players[0])
  }, [searchParams]);
  // Pieces in line
  function changePlayer(){

  }
  function wonPlayer() {
    toast(`${activePlayer.name} a gagné`);
  /*  let index = params?.players?.findIndex(
        ({ name }) => name === params?.active
    );*/
    const aux = Object.assign({}, params);
    aux.blocked = true;
    setParams(aux);
    setPiecesClickable("piecesNone");
  }
  useEffect(()=>{
    console.log("board changed")

    if (checkWin(board)) {

      console.log("player win")
      wonPlayer();
    }
  },[board])
  useEffect(()=>{
    if(activePlayer){
      if (activePlayer.name.startsWith("IA")){
        console.log(`IA Turn`)
        const node2 = new Node(false,null,board,pieces,false,null,checkWin)
        const source = activePlayer.algorithm.resolve(node2,3).getSource()
        //setBorderCornersClassName("borderCorners");
        //setPiecesClickable("piecesNone");
        handleSelect(source.addedPiece)
      }
      else {
        console.log(`${activePlayer.name} Turn`)
        setBorderCornersClassName("borderCorners");
        setPiecesClickable("piecesShow");
        //setBorderCornersClassName("borderCornersClickable");
      }
    }

  },[board,activePlayer,selectedPiece])

  useEffect(()=>{
    if(selectedPiece){
      const player = activePlayer

      if(player.name.startsWith("IA")){
        const node = new Node(false,null,board,pieces,false,null,checkWin)
        const nodeList = node.next(selectedPiece)
        const result = nodeList.map(e => player.algorithm.resolve(e,3)).reduce(
            (acc,e) => acc.h >= e.h ? acc:e
        ).getSource()
        setBorderCornersClassName("borderCorners");
        //setPiecesClickable("piecesNone");
        setBoard(result.data)
      }
      else{
       setBorderCornersClassName("borderCornersClickable");
        setPiecesClickable("piecesShow");
      }
    }
  },[selectedPiece,board])


  function handleSelect(piece) {
    console.log("test")
    console.log(activePlayer)
    const player1Active=
        activePlayer.name === params?.players[0]?.name;
    activeP = params?.players[player1Active ? 1 : 0];
    setPieces(pieces => pieces.filter(e=>e!==piece))
    setActivePlayer({name:params?.players[player1Active ? 1 : 0].name, algorithm:params?.players[player1Active ? 1 : 0].algorithm})
    setSelectedPiece(piece);
  }



  return (
      <div className="row">
        <div className="Score">
          <p>Pièce Choisi : </p>
          {
            selectedPiece ?
             (<img src={images[selectedPiece?.getIndex()]} alt="Pièce" />):""
          }
          <br />
          <br />
          <p>Tour du {activePlayer?.name}</p>

        </div>
        <div className="centeredBoard">
          {
            board.flatMap((res, index) =>
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
                                // on affecte la piece selectionné a cet index
                                const Board2 = [...board];
                                setBorderCornersClassName("borderCorners");
                                setPiecesClickable("piecesShow");
                                Board2[index][index2] = selectedPiece;
                                setBoard(Board2);
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
                    onClick={()=>{
                      setPiecesClickable("piecesNone");
                      setBorderCornersClassName("borderCornersClickable");
                      handleSelect(res)
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
