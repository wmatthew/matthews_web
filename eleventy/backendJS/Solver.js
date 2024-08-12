//==========================================
// Solves things in constraint-library.json.
// To run: node backendJS/Solver.js
const jsonFormatter = require('./jsonFormatter.js');
const Board = require('./Board.js');
const Painter = require('./Painter.js');
const fs = require('fs');

const bailAfterThisManyUniqueSolutionsFound = Infinity;
const bailAfterThisManySteps = 10000;
const BAILED_TOO_MANY_STEPS = "too many steps";
const BAILED_TOO_MANY_SOLUTIONS = "too many solutions";
const BAILED_ERRORS = "errors";

//==========================================
// Solver version log
// 0.1.x: Initial version. No flags supported.
const solverVersion = "0.1.1";

//==========================================
// Read existing constraints + solutions
var solutions = JSON.parse(fs.readFileSync("_data/solutions.json", 'utf8'));
var constraintsLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));

//==========================================
// Solve one simple puzzle
solveThisPuzzle("Clones_Tile_A_Square_Simple_rect4x4_T");
solveThisPuzzle("Clones_Tile_A_Square_Simple_rect6x6_T");
solveThisPuzzle("Clones_Tile_A_Square_Simple_rect8x8_T");

//==========================================
// Write solutions file
fs.writeFileSync("_data/solutions.json", jsonFormatter.formatJSON(solutions));
console.log("Wrote to solutions.json. Solver complete.");

//==========================================
// Helper Functions
function solveThisPuzzle(constraintKey) {
    console.log("Solving " + constraintKey);

    // TODO: check cache.

    var startTime = new Date();
    const puzzleReferenceCopy = constraintsLibrary[constraintKey];
    var puzzle = structuredClone(puzzleReferenceCopy);
    puzzle.board.points.map(p => {
        p.empty = true;
    });
    
    var currentState = {
        "puzzle": puzzle,
        "partials": [{
            board: puzzle.board,
            supply: puzzle.pieceSupply
        }],
        "completedBoards": [],
        "completedBoardsUnique": {},
        "numSteps": 0,
        "didWeBailOutEarly": false
    };
    
    while (currentState.partials.length > 0 && currentState.didWeBailOutEarly == false) {
        currentState = stepSolverForward(currentState);
    }
    
    var result = {
        // inputs
        "key": puzzle.key,
        "constraints": puzzleReferenceCopy,
        "solverVersion": solverVersion,
    
        // outputs
        "solutionsTotal": currentState.completedBoards, // TODO: remove. debugging only.
        "solutionsUnique": currentState.completedBoardsUnique, // TODO: remove. debugging only.
        //"solutionsUnique": Object.values(currentState.completedBoardsUnique).slice(0,5), // Up to 5 unique solutions
        "numSolutionsTotal": currentState.completedBoards.length,
        "numSolutionsUnique": Object.keys(currentState.completedBoardsUnique).length,
    
        // process details
        "numSteps": currentState.numSteps,
        "didWeBailOutEarly": currentState.didWeBailOutEarly,
        "solveTimeSeconds": parseInt((new Date() - startTime) / 1000),
        "solveDate": new Date().toLocaleDateString()
    };
    
    solutions[puzzle.key] = result;
    console.log(" " + result.numSolutionsTotal + " total solutions.");
    console.log(" " + result.numSolutionsUnique + " unique solutions.");
    console.log(" Solved " + puzzle.key + " in " + result.solveTimeSeconds + " seconds (" + result.numSteps + " steps).");
}

// Advance the partials and add findings to completedBoards.
function stepSolverForward(oldState) {

    var newState = structuredClone(oldState);
    newState.numSteps += 1;

    if (newState.numSteps > bailAfterThisManySteps) {
        console.log("💀 Bailing out early: too many steps");
        newState.didWeBailOutEarly = BAILED_TOO_MANY_STEPS;
    }
    if (Object.keys(newState.completedBoardsUnique).length > bailAfterThisManyUniqueSolutionsFound) {
        console.log("💀 Bailing out early: too many boards");
        newState.didWeBailOutEarly = BAILED_TOO_MANY_SOLUTIONS;
    }
    
    var candidate = newState.partials.pop();

    // console.log("Filled " + candidate.board.points.filter(p => !p.empty).length + " of " + candidate.board.points.length + " points.");

    if (Board.isSolution(candidate, newState)) {
        //console.log("🎉 Found a solution!");
        // Save this new solution to an array and hash.
        newState.completedBoards.push(candidate.board);
        var key = Board.getUniqueKey(candidate.board);

        // Paint it. Can always repaint later/display differently if needed.
        Painter.paintPoints(candidate.board.points);

        newState.completedBoardsUnique[key] = candidate.board;

    } else {
        // Push + Pop = stack = depth first search
        newState.partials.push(...Board.getSuccessorPartials(candidate, newState));
        //console.log("🔍 " + newState.partials.length + " partials.");
    }

    return newState;
}

