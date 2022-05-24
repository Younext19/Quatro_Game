export class Strategy {
    /**
     *
     * @param node {Node}
     * @return Node
     */
  resolve(node,deapth){}
}

export class MinMaxStrategy extends Strategy{
    resolve(node,deapth) {
        if(node.isLeaf || deapth ===0)
            return node
        else {
            if(node.isMax){
                return node.nextChildren().reduce((acc,e) => {
                    const val1 = this.resolve(acc, deapth-1)
                    const val2 = this.resolve(e,deapth-1)
                    return val1.h>=val2.h ? val1 : val2
                } )
            }
            else {
                return node.nextChildren().reduce((acc,e) => {
                    const val1 = this.resolve(acc,deapth-1)
                    const val2 = this.resolve(e,deapth-1)
                    return val1.h>=val2.h ? val1 : val2
                } )
            }
        }
    }
}