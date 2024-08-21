const Solver = require('../backendJS/Solver.js');

//Solver.solvePuzzle("Clones_Tile_A_Square_Simple_rect6x6_T");
//Solver.solvePuzzle("P_Pentominos_pent1_Px0", false);

//Solver.solveChildPuzzles("P_Pentominos");

var solutions = Solver.readSolutionsJSON();        
Object.keys(solutions).forEach(function(key) {
Solver.migrateSolutionToNewCache(key);
});