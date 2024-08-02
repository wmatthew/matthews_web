const fs = require('fs');

var filePath = "_data/piece-library.json";
var rawString = fs.readFileSync(filePath, 'utf8')
var pieceLib = JSON.parse(rawString);
const Hydrator = require('./pieceHydrator.js');

module.exports = class Piece {

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
        var hydrated = Hydrator.hydrate(pieceLib[key]);

        // TODO: hack alert!
        hydrated.points.forEach(p => {
            p.x = p[0];
            p.y = p[1];
            p.z = p[2];
        });

        return hydrated;
    }

    static tests() {
        console.log("Testing Piece.js");

        var tPiece = Piece.pieceFromKey("T");
        console.log(JSON.stringify(tPiece));

        assert(true, "TODO: getOrientations");

                // TODO: move to shared util function
                function assert(condition, message) {
                    if (!condition) {
                        throw new Error("❌ Assertion failed: " + message);
                    } else {
                        console.log("✅ " + message);
                    }
                }
        
    }
}
