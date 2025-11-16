import TestUtil from './TestUtil.js';

export default class PieceSupply {
    static INFINITE_PIECES = -1;

    static decrementPieceCount(supply, pieceKey) {
        //console.log("   decrementPieceCount before: "+ JSON.stringify(supply));
        var oldQuantity = supply.find(a => a[0] == pieceKey)[1];

        if (oldQuantity == undefined) {
            throw new Error("decrementPieceCount: Piece "+pieceKey+" not found in supply.");
        } else if (oldQuantity == PieceSupply.INFINITE_PIECES) {
            // It's infinite, do nothing.
        } else if (oldQuantity == 1) {
            // It's the last one, remove the whole entry.
            // use splice so this updates other references of supply.
            var idx = supply.findIndex(a => a[0] == pieceKey);
            supply.splice(idx, 1);
        } else {
            // Decrement by one.  
            supply.find(a => a[0] == pieceKey)[1] = oldQuantity - 1;    
        }

        //console.log("   decrementPieceCount after: "+ JSON.stringify(supply));
        return supply;
    }

    static tests() {
        var supply = [["P",2],["Q",-1]];
        PieceSupply.decrementPieceCount(supply, "Q");
        TestUtil.assertEqualStringify(supply, [["P",2],["Q",-1]], "decrementPieceCount -1->-1");
        PieceSupply.decrementPieceCount(supply, "P");
        TestUtil.assertEqualStringify(supply, [["P",1],["Q",-1]], "decrementPieceCount 2->1");
        PieceSupply.decrementPieceCount(supply, "P");
        TestUtil.assertEqualStringify(supply, [["Q",-1]], "decrementPieceCount 1->0");

    }

}