export default class Node {
    parent;
    data;
    addedPiece;
    freePieces;
    isMax;
    isLeaf;
    /**
     *
     * @type {[Node] | null}
     */
    children = null;
    /**
     *
     * @type {number}
     */
    currentChild = 0;
    checkWin;

    /**
     *
     * @param isLeaf {boolean}
     * @param parent {Node | null}
     * @param data {[[Piece|null]]}
     * @param freePieces {[Piece]}
     * @param isMax {boolean}
     * @param addedPiece {Piece | null}
     * @param checkWin {Function}
     */
    constructor(isLeaf,parent,data,freePieces,isMax,addedPiece,checkWin) {
        this.addedPiece = addedPiece;
        this.parent = parent;
        this.data = data;
        this.freePieces = freePieces;
        this.isMax = isMax;
        this.isLeaf = isLeaf
        this.checkWin = checkWin;

    }

    /**
     *
     * @return {number}
     */
    get size(){
        if (!this.children)
            this.children = this.nextChildren()
        return this.children.length
    }
    get h(){
        if (!this.isLeaf)
            return 0
        return this.isMax ? 1 : -1
    }
    /**
     * @return [Node]
     */
    nextChildren(){
        if (this.isLeaf)
            return [];
        return this.freePieces.flatMap(
            piece => this.next(piece)).slice(0,16)
    }
    next(piece){
        return getNextGames(this.data,piece).map(
            data =>
                new Node(this.checkWin(data),this,data,this.freePieces.filter(e=>e!==piece),!this.isMax,piece,this.checkWin)
        )
    }
    getSource(){
        if(this.parent.parent == null)
            return this
        return this.parent.getSource()
    }
    nextChild(){
        if (this.currentChild >= this.size)
            return null
        return this.children[this.currentChild++]
    }
}

/**
 *
 * @param data {[[Piece|null]]}
 * @param piece {Piece}
 * @return [[[Piece|null]]]
 */
function getNextGames(data, piece) {
    const games = data.flatMap(
        (row,rowIndex)=> row.map(
            (elem, colIndex) =>{
                if(elem ===null){
                    const newData = clone(data)
                    newData[rowIndex][colIndex] = piece
                    return newData
                }
                return null
            }
        )
    ).filter(e => e != null)

    return getSet([],games);
}

/**
 *
 * @param data1 {[[[Piece|null]]]}
 * @param data2 {[[[Piece|null]]]}
 * @return [[[Piece|null]]]
 */
function getSet(data1,data2) {
    if (data2.length === 0){
        return data1
    }
    const head = data2[0]
    const tail = data2.slice(1)
    if (data1.some(d => isEqual(d,head))){
        return getSet(data1,tail)
    }
    return getSet([...data1,head],tail)
}
/**
 *
 * @param data1 {[[Piece|null]]}
 * @param data2 {[[Piece|null]]}
 * @return boolean
 */
function isEqual(data1,data2){
    const tData1 = transposes(data1)
    const tData2 = transposes(data2)
    return tData1.some(d1 => tData2.some(d2 => isDataEquals(d1,d2)))
}

/**
 *
 * @param data {[[Piece|null]]}
 * @return [[[Piece|null]]]
 */
function transposes(data) {
    const result = [data]
    let temp = data
    for (let i = 0;i<3;i++){
        temp = temp[0].map((_, colIndex) => temp.map(row => row[colIndex]));
        result.push(temp)
        temp = temp.map(row => row.reverse());
        result.push(temp)
    }
   return result
}

/**
 *
 * @param data {[[Piece|null]]}
 * @return [[Piece|null]]
 */
function clone(data) {
    return data.map(row => row.slice())
}

/**
 *
 * @param data1 {[[Piece|null]]}
 * @param data2 {[[Piece|null]]}
 * @return boolean
 */
function isDataEquals(data1,data2) {
    return data1.every(
        (row,rowIndex) =>
            row.every(
                (elem,colIndex) =>
                    isPiecesEqual(elem,data2[rowIndex][colIndex])
            )
    )
}

/**
 *
 * @param piece1 {Piece | null}
 * @param piece2 {Piece | null}
 */
function isPiecesEqual(piece1, piece2) {
    if(piece1 === null && piece2 === null)
        return true
    if (piece1 === null || piece2===null)
        return false
    return piece1.getIndex() === piece2.getIndex()
}