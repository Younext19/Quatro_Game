import React, { useState } from "react";
import "./GameRules.css";
import { useNavigate } from "react-router-dom";

export default function GameRules() {
  const navigate = useNavigate();

  const [value, setvalue] = useState("1");
  const [selectedPlayer, setselectedPlayer] = useState("Computer");
  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  function onChangeValue(event) {
    setselectedPlayer(event.target.value);
  }

  return (
    <div className="full">
      <h2>Joueur 1</h2>
      <br />
      <h3>Vs</h3>
      <br />
      <div onChange={onChangeValue}>
        <input type="radio" value="Computer" name="player" /> Computer
        <input type="radio" value="J2" name="player" /> Joueur 2
      </div>{" "}
      <select value={value} onChange={handleChange}>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
      </select>
      <br />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/game?level=${value}&op=${selectedPlayer}`);
        }}
      >
        Commencer
      </button>
    </div>
  );
}
