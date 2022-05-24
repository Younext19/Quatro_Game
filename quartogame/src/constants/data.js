import images from "./images";

const awards = [
  {
    imgUrl: images.award02,
    title: "Bib Gourmond",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award01,
    title: "Rising Star",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award04,
    title: "AA Hospitality",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: images.award03,
    title: "Outstanding",
    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
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
