import React, { useState } from "react";
import "./GameRules.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GameRules() {
  const navigate = useNavigate();
  const [value, setvalue] = useState("1");
  const [selectedFirstPlayer, setselectedFirstPlayer] = useState("AI");
  const [selectedPlayer, setselectedPlayer] = useState("AI");
  const [Username1, setUsername1] = useState("");
  const [Username2, setUsername2] = useState("");
  const [selectedAlgorithm1, setselectedAlgorithm1] = useState("minimax");
  const [selectedAlgorithm2, setselectedAlgorithm2] = useState("minimax");
  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  function onChangeAlgorithm1(event) {
    setselectedAlgorithm1(event.target.value);
  }
  function onChangeAlgorithm2(event) {
    setselectedAlgorithm2(event.target.value);
  }
  function onChangeValue(event) {
    setselectedPlayer(event.target.value);
  }
  function onChangeFirstPlayer(event) {
    setselectedFirstPlayer(event.target.value);
  }
  const onChangeFirstUsername = (event) => {
    setUsername1(event.target.value);
  };
  const onChangeSecondUsername = (event) => {
    setUsername2(event.target.value);
  };

  return (
    <div className="full">
      <div className="styling">
        <div className="allInputs">
          <select
            value={selectedFirstPlayer}
            onChange={onChangeFirstPlayer}
            className="selectors"
          >
            <option value="AI">Intelligence Artificielle</option>
            <option value="J1">Joueur</option>
          </select>
          {selectedFirstPlayer === "AI" ? (
            <div>
              <select
                value={selectedFirstPlayer}
                onChange={onChangeAlgorithm1}
                className="selectors"
              >
                <option value="minmiax">Minimax</option>
                <option value="AlphaBeta">Alpha Beta</option>
              </select>
            </div>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeFirstUsername}
              value={Username1}
              placeholder={"Nom du Joueur 1"}
              className="inputUsr"
            />
          )}

          <br />
          <h3>Contre</h3>
          <select
            value={selectedPlayer}
            onChange={onChangeValue}
            className="selectors"
          >
            <option value="AI">Intelligence Artificielle</option>
            <option value="J1">Joueur</option>
          </select>
          {selectedPlayer === "AI" ? (
            <div>
              <div>
                <select
                  value={selectedFirstPlayer}
                  onChange={onChangeAlgorithm2}
                  className="selectors"
                >
                  <option value="minimax">Minimax</option>
                  <option value="AlphaBeta">Alpha Beta</option>
                </select>
              </div>
            </div>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeSecondUsername}
              value={Username2}
              placeholder={"Nom du Joueur 2"}
              className="inputUsr"
            />
          )}

          <select value={value} onChange={handleChange} className="selectors">
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (
                (selectedFirstPlayer === "J1" && Username1 === "") ||
                (selectedFirstPlayer === "J2" && Username2 === "")
              ) {
                toast(`Vous devez donnez un nom au Joueur 1`);
              } else {
                navigate(
                  `/game?level=${value}&j1=${Username1}&j2=${Username2}&algorithm1=${selectedAlgorithm1}&algorithm2=${selectedAlgorithm2}`
                );
              }
            }}
            className="startButton"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}
