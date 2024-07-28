//==========================================
// Regenerates constraint-library.json from constraint-templates.json.
// To run: node backendJS/generateConstraints.js
const Board = require('./Board.js');
const jsonFormatter = require('./jsonFormatter.js');
const fs = require('fs');

console.log("Generating constraints...");

// Read in the list of constraint templates
var filePath = "_data/constraints-templates.json";
var rawString = fs.readFileSync(filePath, 'utf8')
var constraintTemplates = JSON.parse(rawString);
var constraintLibrary = {};

var infinitePieces = -1;

//==========================================
// Set the 'key' field for each object
for (var key in constraintTemplates) {
    constraintTemplates[key].key = key;
}

//==========================================
// Copy over the custom entries as-is.
Object.values(constraintTemplates).filter(t => t.type == "Custom").forEach(t => {
    constraintLibrary[t.key] = t;
});

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
    var childSupply = [["PLR", infinitePieces]];
    var childBoard = "rect"+size+"x"+size;
    addClone(parentKey, childBoard, childSupply);
}

//==========================================
// Save it to constraint-library.json (overwrite)
var outputString = JSON.stringify(constraintLibrary, null, 2);
fs.writeFileSync("_data/constraints-library.json", jsonFormatter.formatJSON(outputString));

var numTemplates = Object.keys(constraintTemplates).length;
var numGenerated = Object.keys(constraintLibrary).length;
console.log("Generated " + numGenerated + " constraints from " + numTemplates + " templates.");

//==========================================
// Helper Functions
function addClone(parentKey, childBoardKey, childSupply) {
    var clone = structuredClone(constraintTemplates[parentKey]);
    clone.board = Board.boardFromKey(childBoardKey);
    clone.pieceSupply = childSupply;
    var childKey = parentKey + "_" + childBoard;
    clone.type = "Generated";
    clone.template = parentKey;
    //console.log(clone);
    constraintLibrary[childKey] = clone;
}