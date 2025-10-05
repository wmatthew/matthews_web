//==========================================
// Regenerates constraint-library.json from constraint-templates.json.
// To run: node backendJS/generateConstraints.js
const Board = require('./Board.js');
const PieceSupply = require('./PieceSupply.js');
const jsonFormatter = require('./jsonFormatter.js');
const fs = require('fs');

module.exports = class ConstraintGenerator {

    static generateConstraints() {

        // Read in the list of constraint templates
        var filePath = "_data/constraints-templates.json";
        var rawString = fs.readFileSync(filePath, 'utf8')
        var constraintTemplates = JSON.parse(rawString);
        var constraintLibrary = {};

        //==========================================
        // Set the 'key' field for each object
        for (var key in constraintTemplates) {
            constraintTemplates[key].key = key;
            constraintTemplates[key].parentKey = false;
            if (!("url" in constraintTemplates[key])) {
                constraintTemplates[key].url = false;
            }
        }

        //==========================================
        // Write constraintTemplates.
        // Reformats this file, and makes sure the key field is set on all entries.
        fs.writeFileSync("_data/constraints-templates.json", jsonFormatter.formatJSON(constraintTemplates));

        //==========================================
        // Pentominos
        {
            var parentKey = "P_Pentominos";
            for (var size=1; size<=4; size++) {
                var childBoard = "pent" + size;
                for (var numPs=0; numPs<=size*size; numPs++) {
                    var numQs = size*size - numPs;
                    var childSupply = [];
                    if (numPs > 0) childSupply.push(["P",numPs]);
                    if (numQs > 0) childSupply.push(["Q", numQs]);
                    addClone(parentKey, childBoard, childSupply, ["Px"+numPs]);
                }
            }
        }

        //==========================================
        // Angel_Cube
        {
            var parentKey = "Angel_Cube";
            var childBoard = "cube4";
            var childSupply = [["T",8],["S2",4]];
            addClone(parentKey, childBoard, childSupply);
        }

        //==========================================
        // Tatami tilings
        {
            var parentKey = "Tatami";
            var childBoard = "rect4x4";
            var childSupply = [["I2", 8]];
            addClone(parentKey, childBoard, childSupply);
        }

        //==========================================
        // Clones tile a square
        var parentKey = "Clones_Tile_A_Square";
        var boards = [];
        for (var height=2; height<=7; height++) {
            for (var width=2; width<=height; width++) {
                boards.push("rect"+width+"x"+height);
            }
        }

        boards.forEach(board => {
            ["L", "PLR", "PQO", "PQR", "PQA", "APL", "P", "VPL", "L+3", "1x2x3", "2x3x5"].forEach(p => {
                var childSupply = [[p, PieceSupply.INFINITE_PIECES]];
                var childBoard = board;
                addClone(parentKey, childBoard, childSupply, [p]);
            });
        });

        // (simplest version; no upward overflow allowed)
        var parentKey = "Clones_Tile_A_Square_Simple";
        for (var size=3; size<=8; size++) {
            ["T"].forEach(p => {
                var childSupply = [[p, PieceSupply.INFINITE_PIECES]];
                var childBoard = "rect"+size+"x"+size;
                addClone(parentKey, childBoard, childSupply, [p]);
            });
        }

        // block city, 11x11, 2x3x5
        var parentKey = "";

        //==========================================
        // Save it to constraint-library.json (overwrite)
        fs.writeFileSync("_data/constraints-library.json", jsonFormatter.formatJSON(constraintLibrary));

        var numTemplates = Object.keys(constraintTemplates).length;
        var numGenerated = Object.keys(constraintLibrary).length;
        console.log("Generated " + numGenerated + " constraints from " + numTemplates + " templates.");

        //==========================================
        // Helper Functions
        function addClone(parentKey, childBoardKey, childSupply, extraFieldsForKey=[]) {

            var clone = structuredClone(constraintTemplates[parentKey]);

            clone.board = Board.boardFromKey(childBoardKey);
            clone.boardKey = childBoardKey;
            clone.pieceSupply = childSupply;

            var childKey = [parentKey, childBoardKey, ...extraFieldsForKey].join("_");
            clone.key = childKey;
            clone.parentKey = parentKey;
            clone.type = "Generated";
            clone.childShortName = [childBoardKey, ...extraFieldsForKey].join("_");
            clone.name = clone.name + " (" + clone.childShortName + ")";
            clone.template = parentKey;

            constraintLibrary[childKey] = clone;
        }

    }
}