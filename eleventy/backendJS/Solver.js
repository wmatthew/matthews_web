//==========================================
// Solves things in constraint-library.json.
// To run: node backendJS/Solver.js
const solverVersion = "0.1";
const jsonFormatter = require('./jsonFormatter.js');
const fs = require('fs');

//==========================================
// Read in the existing constraints + solutions
var solutions = JSON.parse(fs.readFileSync("_data/solutions.json", 'utf8'));
var constraintsLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));

//==========================================
// Iterate thru constraints; skip over the ones that are not supported.
var supportedConstraints = []; // none for now!

Object.values(constraintsLibrary).forEach(constraint => {
    var unsupportedFlagCount = Object.keys(constraint.constraint_flags).filter(f => !(supportedConstraints.includes(f))).length;
    var supported = unsupportedFlagCount == 0;
    if (!supported) {
        console.log(constraint.key + ": has unsupported flags.");
    } else {
        console.log(constraint.key + ": supported.");
    }
});

//==========================================
// Solve one simple one
var puzzle = constraintsLibrary["Clones_Tile_A_Square_Simple_rect4x4_T"];
var result = {
    "key": puzzle.key,
    "constraints": puzzle,
    "solverVersion": solverVersion,
    "solutions": [], // 1-5 maps of representative solutions (pieces used + orientations)
    "numSolutions": 0,
    "quitEarly": "TODO",
    "solveTime": "TODO",
    "solveDate": new Date().toISOString()
    // - Anything else? Can add more later. TODO: check 2020 solver...
};

solutions[puzzle.key] = result;

//==========================================
// Write out the solutions file.
fs.writeFileSync("_data/solutions.json", jsonFormatter.formatJSON(solutions));
console.log("Solver complete.");
