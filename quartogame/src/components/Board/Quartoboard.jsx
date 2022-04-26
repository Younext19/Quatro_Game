import React, { useEffect, useState } from "react";
import "./Quartoboard.css";
import { images, data } from "../../constants";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const verticalAxes = ["1", "2", "3", "4"];

const horizontalAxes = ["a", "b", "c", "d"];

const pieces = [
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
];
export default function Quartoboard() {
  const [dataPieces, setDataPieces] = useState({
    unused: pieces,
  });
  const [selectedPiece, setselectedPiece] = useState(null);
  const [BoardStyleID, setBoardStyleID] = useState("chessboard");
  const [TileStyleClassName, setTileStyleClassName] = useState("tile");
  const [PiecesStyleClassName, setPiecesStyleClassName] = useState("pice");

  function wonPlayer() {
    toast(`${params.active} won`);
    let index = params?.players?.findIndex(
      ({ name }) => name === params?.active
    );
    const aux = Object.assign({}, params);
    aux.players[index].score += 1;
    aux.blocked = true;
    setParams(aux);
    //   unused: pieces,
    // });
  }

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

  const level1Verif = (sameLine, obj, index, hIndex, selectedPiece) => {
    const colStarts = Object.values(sameLine).filter(
      (el) => el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
    );

    if (colStarts?.length === 4) {
      wonPlayer();
      return;
    }

    const colEnd = Object.values(sameLine).filter(
      (el) => el.name.substring(2, 4) === selectedPiece.name.substring(2, 4)
    );

    if (colEnd?.length === 4) {
      wonPlayer();
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
      (el) => el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
    );

    if (lineStarts?.length === 4) {
      wonPlayer();
      return;
    }

    const lineEnd = Object.values(sameCol).filter(
      (el) => el.name.substring(2, 4) === selectedPiece.name.substring(2, 4)
    );

    if (lineEnd?.length === 4) {
      wonPlayer();
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
        (el) => el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
      );

      if (diagonalStart?.length === 4) {
        wonPlayer();
        return;
      }

      const diagonalEnd = Object.values(diagonal).filter(
        (el) => el.name.substring(2, 4) === selectedPiece.name.substring(2, 4)
      );

      if (diagonalEnd?.length === 4) {
        wonPlayer();
        return;
      }
    }
  };

  return (
    <div className="row">
      <div className="Score">
        <p>Tour du {params?.active}</p>
        <p>
          {`${params?.players[0]?.name} ${params?.players[0]?.score} - ${params?.players[1]?.score} ${params?.players[1]?.name}`}
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
                  if (params?.blocked) return;
                  let unused = dataPieces?.unused?.filter(
                    (elm) => elm.name !== selectedPiece?.name
                  );
                  let sameLine = dataPieces[index];

                  const obj = Object.assign({}, { ...dataPieces, unused });
                  if (Object.keys(column).length) {
                    toast.error("Already exists, change location");
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
                  level1Verif(sameLine, obj, index, hIndex, selectedPiece);
                }}
              >
                <img src={column?.img} />
              </div>
            );
          });
        })}
      </div>

      <div id="pieces" className="Pieces">
        {dataPieces.unused.map((res, index) => {
          return (
            <img
              src={res.img}
              alt="piece"
              className="pice"
              onClick={(target) => {
                if (params.blocked) return;
                setselectedPiece({
                  ...res,
                });
                setBoardStyleID("chessboardClick");
                setPiecesStyleClassName("");
                const player1Active =
                  params?.active === params?.players[0]?.name;
                setParams({
                  ...params,
                  active: params?.players[player1Active ? 1 : 0].name,
                });
              }}
            />
          );
        })}{" "}
      </div>

      {params?.blocked && (
        <button
          style={{ position: "absolute", bottom: "1rem" }}
          onClick={() => {
            const aux = Object.assign({}, params);
            aux.blocked = false;
            setParams(aux);
            setDataPieces({
              unused: pieces,
            });
          }}
        >
          Rejouer
        </button>
      )}
    </div>
  );
}
