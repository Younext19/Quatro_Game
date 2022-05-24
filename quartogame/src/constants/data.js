import images from "./images";

const awards = [
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

// const pieces = [
//   {
//     img: images.bcen,
//   },
//   { img: images.bcer },
//   { img: images.bcfn },
//   { img: images.bcfr },
//   { img: images.bsen },
//   { img: images.bser },
//   { img: images.bsfn },
//   { img: images.bsfr },
//   { img: images.wcen },
//   { img: images.wcer },
//   { img: images.wcfn },
//   { img: images.wcfr },
//   { img: images.wsen },
//   { img: images.wser },
//   { img: images.wsfn },
//   { img: images.wsfr },
// ];

const Piece = function (trou, black, bordered, circular) {
  this.trou = trou;
  this.black = black;
  this.bordered = bordered;
  this.circular = circular;
  this.getIndex = () => {
    return (
      (black ? "b" : "w") +
      (circular ? "c" : "s") +
      (trou ? "e" : "f") +
      (bordered ? "r" : "n")
    );
  };
};
const piecesFun = [
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
export default { awards, piecesFun, Piece };
