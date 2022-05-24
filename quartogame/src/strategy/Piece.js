export default class Piece {
    trou;
    black;
    bordered;
    circular;
    /**
     *
     * @param trou {boolean}
     * @param black {boolean}
     * @param bordered {boolean}
     * @param circular {boolean}
     */
    constructor(trou, black, bordered, circular) {
        this.trou = trou;
        this.black = black;
        this.bordered = bordered;
        this.circular = circular;
    }
    getIndex() {
        return (
            (this.black ? "b" : "w") +
            (this.circular ? "c" : "s") +
            (this.trou ? "e" : "f") +
            (this.bordered ? "r" : "n")
        );
    };

    /**
     *
     * @param piece {Piece}
     * @return boolean
     */
    equals(piece){
        return piece===null ? false : piece.getIndex() === this.getIndex()
    }
}