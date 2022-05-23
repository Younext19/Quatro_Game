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
  const [PiecesStyleClassName, setPiecesStyleClassName] = useState("Pieces");
  const [PiecesImageStyleClassName, setPiecesImageStyleClassName] =
    useState("pice");

  function wonPlayer() {
    toast(`${params.active} won`);
    let index = params?.players?.findIndex(
      ({ name }) => name === params?.active
    );
    const aux = Object.assign({}, params);
    aux.players[index].score += 1;
    aux.blocked = true;
    setParams(aux);
  }
  function level1Verif(sameLine, obj, index, hIndex, selectedPiece) {
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
    if (index == hIndex || index + hIndex == 3) {
      //it's on the axis
      const diagonal = [0, 1, 2, 3]
        .map((el) => {
          const line = obj[el] ?? {};
          return line[el] ?? {};
        })
        .filter((el) => Object.keys(el).length);

      const diagReverse = [0, 1, 2, 3]
        .map((elm) => {
          for (let __index = 0; __index < 4; __index++) {
            const lineReverse = obj[elm] ?? {};
            if (lineReverse[__index] != undefined && __index != elm) {
              return lineReverse[__index] ?? {};
            }
          }
          return {};
        })
        .filter((elm) => Object.keys(elm).length);

      if (diagonal.length != 4 && diagReverse.length != 4) {
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

      const diagRevStart = Object.values(diagReverse).filter(
        (el) => el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
      );
      if (diagRevStart?.length === 4) {
        wonPlayer();
        return;
      }

      const diagRevEnd = Object.values(diagReverse).filter(
        (el) => el.name.substring(2, 4) === selectedPiece.name.substring(2, 4)
      );

      if (diagRevEnd?.length === 4) {
        wonPlayer();
        return;
      }
    }
  }

  function level2Verif(sameLine, obj, index, hIndex, selectedPiece) {
    var newObject = JSON.parse(JSON.stringify(obj));
    delete newObject["unused"];
    console.log(newObject["0"]);
    console.log(newObject["1"]);
    console.log(newObject["2"]);
    console.log(newObject["3"]);

    const newObjectValues0 = newObject["0"] ?? {};
    const newObjectValues1 = newObject["1"] ?? {};
    const newObjectValues2 = newObject["2"] ?? {};
    const newObjectValues3 = newObject["3"] ?? {};

    console.log(newObjectValues0);
    console.log(newObjectValues1);
    console.log(newObjectValues2);
    console.log(newObjectValues3);

    console.log(Object.keys(newObjectValues0));
    console.log(Object.keys(newObjectValues1));
    const ObjectValues0Keys = Object.keys(newObjectValues0);
    const ObjectValues1Keys = Object.keys(newObjectValues1);

    let true_num = 0;
    for (let j = 0; j < ObjectValues1Keys.length; j++) {
      let boolInc = ObjectValues0Keys.includes(ObjectValues1Keys[j]);
      console.log("CHeck if 0 contains 1");
      console.log(boolInc);
      if (boolInc) {
        true_num++;
        if (true_num >= 2) {
          console.log("HNA RBAH");
          // HNA 3amar un carre donc hna on vérifie split
          Object.values(sameLine).filter(
            (el) =>
              el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
          );
        }
      }
    }
    // 0 WITH 1
    // if (
    //   Object.keys(newObject["1"]) != undefined ||
    //   Object.keys(newObject["0"]) != undefined
    // ) {
    //   console.log(Object.keys(newObject["0"]));
    //   console.log(Object.keys(newObject["1"]));
    // }

    console.log("SMALEFAEFMAKF");
    console.log(sameLine);
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
    if (index == hIndex || index + hIndex == 3) {
      //it's on the axis
      const diagonal = [0, 1, 2, 3]
        .map((el) => {
          const line = obj[el] ?? {};
          return line[el] ?? {};
        })
        .filter((el) => Object.keys(el).length);
      const diagReverse = [0, 1, 2, 3]
        .map((elm) => {
          for (let __index = 0; __index < 4; __index++) {
            const lineReverse = obj[elm] ?? {};
            if (lineReverse[__index] != undefined && __index != elm) {
              return lineReverse[__index] ?? {};
            }
          }
          return {};
        })
        .filter((elm) => Object.keys(elm).length);
      if (diagonal.length != 4 && diagReverse.length != 4) {
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
      const diagRevStart = Object.values(diagReverse).filter(
        (el) => el.name.substring(0, 2) === selectedPiece.name.substring(0, 2)
      );
      if (diagRevStart?.length === 4) {
        wonPlayer();
        return;
      }
      const diagRevEnd = Object.values(diagReverse).filter(
        (el) => el.name.substring(2, 4) === selectedPiece.name.substring(2, 4)
      );
      if (diagRevEnd?.length === 4) {
        wonPlayer();
        return;
      }
    }
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

  return (
    <div className="row">
      {/* <img
        src={selectedPiece.img}
        alt="piece"
        className="pice"
        onClick={(target) => {
          console.log(target);
        }}
      /> */}
      <div className="Score">
        <p>Pièce Choisi : </p>
        {selectedPiece && <img src={selectedPiece?.img} alt="bing" />}
        <br />
        <br />
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
                  console.log(selectedPiece);

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
                  //level1Verif(sameLine, obj, index, hIndex, selectedPiece);
                  level2Verif(sameLine, obj, index, hIndex, selectedPiece);

                  setPiecesImageStyleClassName("pice");
                  setPiecesStyleClassName("Pieces");
                }}
              >
                <img src={column?.img} />
              </div>
            );
          });
        })}
      </div>

      <div className={PiecesStyleClassName}>
        {dataPieces.unused.map((res, index) => {
          return (
            <img
              src={res.img}
              alt="piece"
              className={PiecesImageStyleClassName}
              onClick={(target) => {
                if (params.blocked) return;
                setselectedPiece({
                  ...res,
                });
                setBoardStyleID("chessboardClick");
                setPiecesImageStyleClassName("piceClicked");
                setPiecesStyleClassName("PiecesClicked");
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
