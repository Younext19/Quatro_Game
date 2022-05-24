import React from "react";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <h1 className="app__header-h1">Quarto Game</h1>
        <p className="p__opensans" style={{ margin: "2rem 0" }}>
          Dans ce jeu de réflexion, les seize pièces du jeu, toutes différentes,
          possèdent chacune 4 caractères distincts : haute ou basse, ronde ou
          carrée, claire ou foncée, pleine ou creuse. Chacun à son tour choisit
          et donne une pièce à l'adversaire, qui doit la jouer sur une case
          libre. Le gagnant est celui qui, avec une pièce reçue, crée un
          alignement de 4 pièces ayant au moins un caractère commun et annonce :
          «QUARTO !».
        </p>
        <button
          type="button"
          className="custom__button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/game-settings");
          }}
        >
          Play Game
        </button>
      </div>
      <div className="app__wrapper_img">
        <img src={images.quarto_img} alt="header img" />
      </div>
    </div>
  );
};
export default Header;
