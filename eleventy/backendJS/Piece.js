const fs = require('fs');

var pieceLib = JSON.parse(fs.readFileSync("_data/piece-library.json", 'utf8'));
const Hydrator = require('./pieceHydrator.js');
const TestUtil = require('./TestUtil.js');

module.exports = class Piece {
    
    // takes a hydrated piece as input.
    // TODO: consolidate hydration and transform into one function?
    static transformPiece(piece, transform) {
        //console.log("transformPiece: " + transform + ", " + piece.points.length);
        //console.log("before:  " + JSON.stringify(piece.points));

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

        //console.log("after:  " + JSON.stringify(newPiece.points));

        // rehydrate the piece since we changed it.
        return Hydrator.hydrate(Hydrator.fixCoordinates(newPiece));
    }

    // return a bunch of pieces that are modified versions of the input piece... with orientation set.
    static getOrientations(piece, constraints) {
        var orientations = [];
        orientations.push(...Piece.fourRotations(piece, "A"));

        // TODO: turn the piece to rest on the other faces. A+NEWS+U

        return orientations;
    }

    static fourRotations(piece, direction) {
        var rotations = [];
        var newPiece = structuredClone(piece);

        for (var i = 0; i < 4; i++) {
            var orientationName = direction + i;
            //console.log("newPiece: " + JSON.stringify(newPiece));
            newPiece.points.forEach(p => p.orientation = orientationName);
            rotations.push(newPiece);
            
            newPiece = structuredClone(newPiece);
            Piece.rotate90(newPiece);
        }
        return rotations; 
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

        TestUtil.assert(Piece.getOrientations(rPiece).length==4, "getOrientations");

        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A0").pointsPretty, "1,1,1|2,1,1|1,2,1", "r-A0");
        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A1").pointsPretty, "2,1,1|2,2,1|1,1,1", "r-A1");
        TestUtil.assertEqual(Piece.transformPiece(rPiece, "A2").pointsPretty, "2,2,1|1,2,1|2,1,1", "r-A2");


    }
}
