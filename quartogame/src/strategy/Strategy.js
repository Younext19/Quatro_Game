export class Strategy {
    /**
     *
     * @param node {Node}
     * @param depth {number}
     * @return Node
     */
  resolve(node,depth){}
}

export class MinMaxStrategy extends Strategy{
    resolve(node,depth) {
        if(node.size === 0 || depth ===0)
            return node
        else {
            if(node.isMax){

                return node.children.reduce((acc,e) => {
                    const val1 = this.resolve(acc, depth-1)
                    const val2 = this.resolve(e,depth-1)
                    return val1.h(depth-1)>=val2.h(depth-1) ? val1 : val2
                } )

            }
            else {

                return node.children.reduce((acc,e) => {
                    const val1 = this.resolve(acc,depth-1)
                    const val2 = this.resolve(e,depth-1)
                    return val1.h(depth-1)>=val2.h(depth-1) ? val1 : val2
                } )
            }
        }
    }
}

export class AlphaBetaStrategy extends Strategy{
    resolve(node,depth) {
        return this.resolveAlphaBeta(node,depth,null,null)
    }
    resolveAlphaBeta(node,depth,alpha,beta){
        if(node.size === 0 || depth ===0)
            return node
        else {
            if(node.isMax){
                let nAlpha = alpha
                while (!(nAlpha !== null &&  beta!==null && nAlpha.h(depth-1) >= beta.h(depth-1)) && node.size > node.currentChild){
                    const child = node.nextChild()
                    const f = this.resolveAlphaBeta(child,depth-1,nAlpha,beta)
                    if (nAlpha === null)
                        nAlpha = f
                    else
                        nAlpha = nAlpha.h(depth-1)>= f.h(depth-1) ? nAlpha : f
                }
               return nAlpha

            }
            else {
                let nBeta = beta
                while (!(alpha !== null &&  nBeta!==null && alpha.h(depth-1) >= nBeta.h(depth-1)) && node.size > node.currentChild){
                    const child = node.nextChild()
                    const f = this.resolveAlphaBeta(child,depth-1,alpha,nBeta)
                    if (nBeta === null)
                        nBeta = f
                    else
                        nBeta = nBeta.h(depth-1)<= f.h(depth-1) ? nBeta : f
                }
                return nBeta
            }
        }
    }
}