import React, { useState } from "react";
import "./GameRules.css";
import { useNavigate } from "react-router-dom";

export default function GameRules() {
  const navigate = useNavigate();
  const [value, setvalue] = useState("1");
  const [selectedPlayer, setselectedPlayer] = useState("Computer");
  const [Username, setUsername] = useState("");
  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  function onChangeValue(event) {
    setselectedPlayer(event.target.value);
  }
  const onChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="full">
      <div className="allInputs">
        <h3>Nom du joueur</h3>
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={Username}
          className="inputUsr"
        />
        <br />
        <h3>Contre</h3>
        <br />
        <div onChange={onChangeValue} className="radioButton">
          <input type="radio" value="IA" name="player" /> IA
          <input type="radio" value="J2" name="player" /> Joueur 2
        </div>{" "}
        <br />
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
            navigate(
              `/game?level=${value}&op=${selectedPlayer}&username=${Username}`
            );
          }}
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
