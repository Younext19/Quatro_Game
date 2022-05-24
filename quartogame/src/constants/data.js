import images from "./images";
import Piece from "../strategy/Piece";
import {AlphaBetaStrategy, MinMaxStrategy} from "../strategy/Strategy";

export const awards = [
  {
    imgUrl: images.award01,
    title: "Joueur",
    subtitle: "Le premier joueur est tiré au sort",
  },
  {
    imgUrl: images.award02,

    title: "Gameplay",
    subtitle:
      "choisit une des 16 pièces et la donne à son adversaire et il place sur case libre",
  },
  {
    imgUrl: images.award03,
    title: "Gameplay",
    subtitle:
      "Celui-ci doit la placer sur une des cases du plateau et choisir ensuite on revient à 2.",
  },
  {
    imgUrl: images.award04,
    title: "Gain de la partie",
    subtitle: "Il crée une ligne de 4 pièces de mêmes caractéristique.",
  },
];

export const piecesFun = [
  new Piece(false, false, false, false),
  new Piece(false, false, false, true),
  new Piece(false, false, true, false),
  new Piece(false, false, true, true),
  new Piece(false, true, false, false),
  new Piece(false, true, false, true),
  new Piece(false, true, true, false),
  new Piece(false, true, true, true),
  new Piece(true, false, false, false),
  new Piece(true, false, false, true),
  new Piece(true, false, true, false),
  new Piece(true, false, true, true),
  new Piece(true, true, false, false),
  new Piece(true, true, false, true),
  new Piece(true, true, true, false),
  new Piece(true, true, true, true),
];

/**
 *
 * @param algo {string}
 * @return {Strategy}
 */
export function getAlgorithmInstance(algo){
  if (algo==="minimax")
    return new MinMaxStrategy()
  if (algo==="AlphaBeta")
    return new AlphaBetaStrategy()
  throw new Error("not implemented")
}
