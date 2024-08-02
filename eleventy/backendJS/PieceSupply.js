module.exports = class PieceSupply {
    static INFINITE_PIECES = -1;

    static decrementPieceCount(supply, pieceKey) {
        var oldQuantity = supply.find(a => a[0] == pieceKey)[1];

        if (oldQuantity == undefined) {
            throw new Error("decrementPieceCount: Piece "+pieceKey+" not found in supply.");
        }

        if (oldQuantity == PieceSupply.INFINITE_PIECES) {
            // It's infinite, do nothing.
            return;
        }

        if (oldQuantity == 1) {
            // It's the last one, remove the whole entry.
            supply = supply.filter(a => a[0] != pieceKey);
            // TODO: need to do splice instead so this updates other references of supply.
            throw new Error("decrementPieceCount: Not implemented.");
        }

        // Decrement by one.  
        supply.find(a => a[0] == pieceKey)[1] = oldQuantity - 1;    
    }

}