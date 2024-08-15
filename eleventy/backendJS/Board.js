const fs = require('fs');
var boardLib = JSON.parse(fs.readFileSync("_data/board-library.json", 'utf8'));
const Constraints = require('./Constraints.js');
const PieceSupply = require('./PieceSupply.js');
const Piece = require('./Piece.js');
const Vector = require('./Vector.js');
const TestUtil = require('./TestUtil.js');

module.exports = class Board {

    // TODO: unused
    static groupBoardsByCategory(boards) {
        var result = Object.values(boards).groupBy((b) => b.category);
        console.log(JSON.stringify(result));
        return result;
    }

    static boardFromKey(key) {
        return boardLib[key];
    }

    // We may want different selection logic here for different constraints.
    static getSuccessorPartials(currentPartial, puzzleState) {
        var successorPartials = [];

        // Select an empty point on the board to fill.
        // TODO: assess every target point on the board, not just the first one?
        var newPartials = currentPartial.board.points
            .filter(p => p.empty)
            .map(p => Board.getSuccessorPartialsForThisTargetPoint(currentPartial, puzzleState, p))
            .sort((a,b) => a.length - b.length)
            [0];

        // var newPartials = Board.getSuccessorPartialsForThisTargetPoint(currentPartial, puzzleState, targetPoint);
        // console.log("Adding Partials: ", newPartials.length);
        successorPartials.push(...newPartials);

        return successorPartials;
    }

    // does not modify its input.
    static getSuccessorPartialsForThisTargetPoint(currentPartial, puzzleState, targetPoint) {
        var result = [];
        var nextId = currentPartial.board.points.filter(p => p.id != undefined).reduce((max, p) => Math.max(max, p.id), 0) + 1;

        // For every piece...
        currentPartial.supply.forEach(pieceKeyAndQuantity => {
            var pieceKey = pieceKeyAndQuantity[0];
            var piece = Piece.pieceFromKey(pieceKey);

            // For every orientation of that piece...
            Piece.getOrientations(piece, puzzleState.puzzle.constraint_keys).forEach(orientedPiece => {

                // For every insertionPoint (offet) within that oriented piece...
                orientedPiece.points.forEach(insertionPoint => {

                    // If the piece fits there...
                    var itFits = orientedPiece.points.every(p => {
                        var target = Vector.minus(Vector.plus(targetPoint, p), insertionPoint);
                        var hit = currentPartial.board.points.find(a => a.x == target.x && a.y == target.y && a.z == target.z);
                        return !!hit && hit.empty;
                    });

                    if (!itFits) {
                        return;
                    }

                    // ...create a successor partial, and add it to the list.
                    var newPartial = structuredClone(currentPartial);
                    orientedPiece.points.forEach(p => {
                        var target = Vector.minus(Vector.plus(targetPoint, p), insertionPoint);
                        //console.log("   checking target: " + JSON.stringify(target));
                        var hit = newPartial.board.points.find(a => a.x == target.x && a.y == target.y && a.z == target.z);
                        hit.empty = false;
                        hit.pieceKey = pieceKey;
                        hit.orientation = p.orientation;
                        hit.id = nextId;
                    });

                    // Decrement piece count in supply
                    PieceSupply.decrementPieceCount(newPartial.supply, pieceKey);
                    result.push(newPartial);
                });
            });
        });    
        return result;    
    }

    // An orientation-independent representation of the board. Used to deduplicate solutions.
    // Note that we are making some assumptions about the puzzle here, and since this is global,
    // we can't change behavior based on constraint keys.
    // For example:
    // - If we are packing a cube, we want to dedupe all 24 orientations (6 faces * 4 rotations per face).
    // - If we are tiling a rectangular plane with pieces that extend upward, we don't want to dedupe flipping the plane over because that could equate different solutions.
    // Also:
    // - A 1x2x3 piece will have 3 effective orientations, not 6, because flipping it over occupies the same volume.
    static getUniqueKey(partialBoard) {

        return everyOrientation(partialBoard.points).map(points => {
            removeEmptyPoints(points);
            normalizeCoords(points);
            sortCoords(points);
            renumberPieceIDs(points);
            return "uniquekey_["+concatPieceKeys(points)+"]";
        }).sort()[0]; // return first one only

        //==========================================
        // Helper Functions

        // does not modify input. makes a bunch of copies.
        function everyOrientation(points) {
            var result = [];
            // Rotate board by every possible rotation and mirror flip.
            // 8 total (keep base in place; don't flip on side or upside down)
            for (var flips = 0; flips <= 1; flips++) {
                for (var turns = 0; turns <= 3; turns++) {
                    result.push(flipAndTurn(points, flips, turns));
                }
            }
            return result;
        }

        // does not modify input. makes a copy.
        function flipAndTurn(points, flips, turns) {
            var clone = structuredClone(points);
            for (var i = 0; i < flips; i++) {
                mirrorFlip(clone);
            }
            for (var i = 0; i < turns; i++) {
                rotate90(clone);
            }
            return clone;
        }

        // modifies input!
        function mirrorFlip(points) {
            points.forEach(p => { p.x *= -1; });
        }

        // TODO: share w similar function in Piece.js
        // modifies input!
        function rotate90(points) {
            points.forEach(p => {
                [p.x, p.y] = [p.y, p.x * -1]; // destructuring assignment
            });
        }

        // modifies input!
        function removeEmptyPoints(points) {
            var filteredPoints = points.filter(p => p.empty == false );
            points.length = 0;
            points.push(...filteredPoints);
        }

        // modifies input!
        function normalizeCoords(points) {
            var minX = Math.min(...points.map(p => p.x));
            var minY = Math.min(...points.map(p => p.y));
            var minZ = Math.min(...points.map(p => p.z));
            points.forEach(p => {
                p.x -= minX;
                p.y -= minY;
                p.z -= minZ;
            });
        }
        // modifies input!
        function sortCoords(points) {
            points.sort((a, b) => {
                if (a.x != b.x) return a.x - b.x;
                if (a.y != b.y) return a.y - b.y;
                return a.z - b.z;
            });
        }
        // modifies input!
        function renumberPieceIDs(points) {
            // make all IDs negative so we can renumber from 1 upward
            points.forEach(p => p.id *= -1);

            var nextId = 1;
            while(points.some(p => p.id < 0)) {
                var oldId = points.find(p => p.id < 0).id;
                points.forEach(p => {
                    if (p.id == oldId) {
                        p.id = nextId;
                    }
                });
                nextId++;
            }
        }
        // does not modify input. returns a string
        function concatPieceKeys(points) {
            return points.map(p => [p.x,p.y,p.z,p.id,p.pieceKey].join(",")).join(";");
        }
    }

    static isSolution(currentPartial, puzzleState) {
        if (Constraints.checkConstraint(puzzleState, Constraints.KEY.allowGaps) == true) {
            throw new Error("Board.isSolution not implemented when allowGaps is true.");
        }
        return currentPartial.board.points.every(p => !p.empty);
    }

    static tests() {
        console.log("Board.js");
        var board = Board.boardFromKey("rect2x4");
        board.points.map(p => {
            p.empty = true;
        });
        
        TestUtil.assert(board.points.length == 8, "rect2x4 has 8 points");
        var uniqueKey = Board.getUniqueKey(board);
        TestUtil.assert(uniqueKey == "uniquekey_[]", "uniqueKey is correct for empty board");

        // TODO: need to expose more from Solver.js to test this.
        // var successors = Board.getSuccessorPartials(currentPartial, puzzleState);
    }


}

