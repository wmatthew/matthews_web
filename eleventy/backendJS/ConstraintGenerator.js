//==========================================
// Regenerates constraint-library.json from constraint-templates.json.
// To run: node backendJS/generateConstraints.js
const Board = require('./Board.js');
const PieceSupply = require('./PieceSupply.js');
const jsonFormatter = require('./jsonFormatter.js');
const fs = require('fs');

module.exports = class ConstraintGenerator {

    static generateConstraints() {

        console.log("Generating constraints...");

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
        }

        //==========================================
        // Write constraintTemplates.
        // Reformats this file, and makes sure the key field is set on all entries.
        fs.writeFileSync("_data/constraints-templates.json", jsonFormatter.formatJSON(constraintTemplates));

        //==========================================
        // Angel_Cube
        var parentKey = "Angel_Cube";
        var childBoard = "cube4";
        var childSupply = [["T",8],["S2",4]];
        addClone(parentKey, childBoard, childSupply);

        //==========================================
        // Tatami tilings
        var parentKey = "Tatami";
        var childBoard = "rect4x4";
        var childSupply = [["I2", 8]];
        addClone(parentKey, childBoard, childSupply);

        //==========================================
        // Clones tile a square
        var parentKey = "Clones_Tile_A_Square";
        for (var size=1; size<=10; size++) {
            var childSupply = [["PLR", PieceSupply.INFINITE_PIECES]];
            var childBoard = "rect"+size+"x"+size;
            addClone(parentKey, childBoard, childSupply, ["PLR"]);
        }

        var parentKey = "Clones_Tile_A_Square_Simple";
        for (var size=1; size<=8; size++) {
            var childSupply = [["T", PieceSupply.INFINITE_PIECES]];
            var childBoard = "rect"+size+"x"+size;
            addClone(parentKey, childBoard, childSupply, ["T"]);
        }

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
            clone.name = clone.name + " (" + [childBoardKey, ...extraFieldsForKey].join("_") + ")";
            clone.template = parentKey;

            constraintLibrary[childKey] = clone;
        }

    }
}