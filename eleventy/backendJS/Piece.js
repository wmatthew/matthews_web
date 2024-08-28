const fs = require('fs');

var pieceLib = JSON.parse(fs.readFileSync("_data/piece-library.json", 'utf8'));
const Hydrator = require('./pieceHydrator.js');
const TestUtil = require('./TestUtil.js');
const Constraints = require('./Constraints.js');

module.exports = class Piece {
    
    // Takes a hydrated piece as input. Returns a clone.
    // TODO: consolidate hydration and transform into one function?
    static transformPiece(piece, transform) {
        var newPiece = structuredClone(piece);

        var bottom = transform.split("")[0];

        if (bottom == "A") {
            // do nothing
        } else if (bottom == "N") {
            newPiece.points.forEach(p => { [p.z, p.y] = [p.y, p.z * -1]; });
        } else if (bottom == "E") {
            newPiece.points.forEach(p => { [p.z, p.x] = [p.x * -1, p.z]; });
        } else if (bottom == "W") {
            newPiece.points.forEach(p => { [p.z, p.x] = [p.x, p.z * -1]; });
        } else if (bottom == "S") {
            newPiece.points.forEach(p => { [p.z, p.y] = [p.y * -1, p.z]; });
        } else if (bottom == "U") {
            newPiece.points.forEach(p => { [p.x, p.z] = [p.x * -1, p.z * -1]; });
        } else {
            throw new Error("transformPiece: unknown transform: " + transform);
        }

        var turns = transform.split("")[1];
        if (turns == 0) {
            // do nothing
        } else if (turns == 1) {
            newPiece.points.forEach(p => { [p.x, p.y] = [p.y * -1, p.x]; });
        } else if (turns == 2) {
            newPiece.points.forEach(p => { [p.x, p.y] = [p.x * -1, p.y * -1]; });
        } else if (turns == 3) {
            newPiece.points.forEach(p => { [p.x, p.y] = [p.y, p.x * -1]; });
        } else {
            throw new Error("transformPiece: unknown turns: " + turns);
        }

        // Note: concat orientations
        newPiece.points.forEach(p => {
            if (p.orientation == undefined) p.orientation = "";
            p.orientation = p.orientation + transform;
        });

        // rehydrate the piece since we changed it.
        var fixedClone = Hydrator.fixCoordinates(newPiece);
        return Hydrator.hydrate(fixedClone);
    }

    // does not modify input
    // return a bunch of pieces that are modified versions of the input piece... with orientation set.
    static getOrientations(piece, constraints) {
        var directions = ["A"];
        if (Constraints.checkConstraint(constraints, "allowPieceOrienting")) {
            directions = ["A", "N", "E", "W", "S", "U"];
        }
        
        var result = directions.flatMap(direction => 
            [0,1,2,3].map(i => Piece.transformPiece(piece, direction + i))
        );

        if (Constraints.checkConstraint(constraints, "allowSupportedOverhangs")) {
            return result;
        } else {
            return result.filter(p => !p.hasOverhangs);
        }
    }

    // modifies input!
    static rotate90(piece) {
        piece.points.forEach(p => {
            [p.x, p.y] = [p.y, p.x * -1]; // destructuring assignment
        });
    }

    static pieceFromKey(key) {
        // TODO: move hydrate function to this file?
        return Hydrator.hydrate(pieceLib[key]);
    }

    static tests() {
        console.log("Piece.js");
        var rPiece = Piece.pieceFromKey("R");
        TestUtil.assertEqual(JSON.stringify(rPiece.points), '[{"x":1,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":1,"y":2,"z":1}]', "rPiece stringify");
        TestUtil.assertEqual(rPiece.pointsPretty, "1,1,1|2,1,1|1,2,1", "rPiece pretty");

        var disallowsOrienting = {allowPieceOrienting:false, allowSupportedOverhangs:true};
        var allowsOrienting = {allowPieceOrienting:true, allowSupportedOverhangs:true};
        var allowsOrientingNoOverhangs = {allowPieceOrienting:true, allowSupportedOverhangs:false};
        TestUtil.assertEqual(Piece.getOrientations(rPiece, disallowsOrienting).length, 4, "getOrientations has 4 entries");        
        TestUtil.assertEqual(Piece.getOrientations(rPiece, allowsOrienting).length, 24, "getOrientations has 24 entries");        

        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A0").pointsPretty, "1,1,1|2,1,1|1,2,1", "r-A0");
        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A1").pointsPretty, "2,1,1|2,2,1|1,1,1", "r-A1");
        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A2").pointsPretty, "2,2,1|1,2,1|2,1,1", "r-A2");

        TestUtil.assertEqual(
            Piece.transformPiece(Piece.transformPiece(rPiece, "A2"), "A2").pointsPretty,
            rPiece.pointsPretty, "A2 2x = A0");

        var PLRPiece = Piece.pieceFromKey("PLR");

        TestUtil.assertEqual(Piece.transformPiece(PLRPiece, "A0").pointsPretty, "1,1,1|1,1,2|2,1,1|2,1,2|3,1,1|1,2,1", "PLR-A0");
        TestUtil.assertEqual(Piece.transformPiece(PLRPiece, "N0").pointsPretty, "1,2,1|1,1,1|2,2,1|2,1,1|3,2,1|1,2,2", "PLR-N0");
        TestUtil.assertEqual(Piece.transformPiece(PLRPiece, "U0").pointsPretty, "3,1,2|3,1,1|2,1,2|2,1,1|1,1,2|3,2,2", "PLR-U0");
        TestUtil.assertEqual(Piece.transformPiece(PLRPiece, "W0").pointsPretty, "2,1,1|1,1,1|2,1,2|1,1,2|2,1,3|2,2,1", "PLR-W0");

        TestUtil.assertEqual(Piece.transformPiece(PLRPiece, "W0").footprintArea, 3, "PLR-W0 footprintArea");

        var PLRorientations = Piece.getOrientations(PLRPiece, allowsOrienting);
        TestUtil.assertEqual(PLRorientations.map(p => p.footprintArea).join(), "4,4,4,4,5,5,5,5,1,1,1,1,3,3,3,3,1,1,1,1,2,2,2,2", "PLRorientations footprintArea");

        var PLRorientationsNoOverhangs = Piece.getOrientations(PLRPiece, allowsOrientingNoOverhangs);
        TestUtil.assertEqual(PLRorientationsNoOverhangs.map(p => p.footprintArea).join(), "4,4,4,4,5,5,5,5,3,3,3,3", "PLRorientations footprintArea");
    }
}
