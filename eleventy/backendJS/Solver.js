//==========================================
// Solves things in constraint-library.json.
// To run: node backendJS/Solver.js
const jsonFormatter = require('./jsonFormatter.js');
const fs = require('fs');

//==========================================
// Read in the existing constraints + solutions
var solutions = JSON.parse(fs.readFileSync("_data/solutions.json", 'utf8'));
var constraintsLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));

//==========================================
// TODO: iterate thru constraints; skip over the ones that are not supported.
Object.values(constraintsLibrary).forEach(constraint => {
    console.log(constraint.key);
});

//==========================================
// Write out the solutions file.
fs.writeFileSync("_data/solutions.json", jsonFormatter.formatJSON(solutions));
console.log("Solver complete.");
