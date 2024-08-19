//==========================================
// Solves things in constraint-library.json.
// To run: node backendJS/Solver.js
const jsonFormatter = require('./jsonFormatter.js');
const Board = require('./Board.js');
const Painter = require('./Painter.js');
const fs = require('fs');

module.exports = class Solver {

    //==========================================
    // Solver version log
    // 0.1.x: Initial version. No flags supported.
    static solverVersion = "0.1.1";
    static constraintsLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));

    // TODO: remove this after migration
    static migrateSolutionToSeparateFile(constraintKey) {
        // Find an entry in solutions.json

        // Remove from solutions.json and rewrite that file.

        // Create + write to a new file.
        var newPath = cachePath(constraintKey);
        // TODO

    }

    static cachePath(constraintKey) {
        var parentKey = Solver.constraintsLibrary[constraintKey].parentKey;
        return "_data/solutions/" + parentKey + "/" + constraintKey + ".json";
    }

    static solveChildPuzzles(constraintTemplateKey, useCache=true) {
        console.log("Solving for all children of: " + constraintTemplateKey);
        Object.values(Solver.constraintsLibrary).filter(
            c => c.parentKey == constraintTemplateKey
        ).forEach(c => {
            Solver.solvePuzzle(c.key, useCache);
        })
    }

    static solvePuzzle(constraintKey, useCache=true) {
        var fileData = fs.readFileSync("_data/solutions.json", 'utf8');
        console.log("About to parse " + Number(fileData.length).toLocaleString("en-US") + " characters of JSON.");
        var solutions = JSON.parse(fileData);
        console.log("Done parsing. " + Object.keys(solutions).length + " entries.");

        // TODO: use a better key- based on constraint values.
        if (useCache) {
            var cacheHits = 0;

            // old style cache
            if (solutions[constraintKey] && solutions[constraintKey].didWeBailOutEarly == false) {
                console.log(constraintKey + " was found in old cache. (took " + solutions[constraintKey].solveTimeSeconds + "s)");
                cacheHits++;
            }

            // new style cache
            if (fs.existsSync(Solver.cachePath(constraintKey))) {
                var solutionData = fs.readFileSync(Solver.cachePath(constraintKey), 'utf8');
                var solutionObj = JSON.parse(solutionData);
                if (solutionObj.didWeBailOutEarly == false) {
                    console.log(constraintKey + " was found in new cache. (took " + solutionObj.solveTimeSeconds + "s)");
                    cacheHits++;
                }
            }

            if (cacheHits > 0) {
                console.log("Cache hit x" + cacheHits + ". Skipping");
                return;
            }
        }

        var result = Solver.solveThisPuzzleWithoutLookingAtCache(constraintKey);

        solutions[constraintKey] = result;
        fs.writeFileSync("_data/solutions.json", jsonFormatter.formatJSON(solutions));
    }

    // Advance the partials and add findings to completedBoards.
    static stepSolverForward(oldState) {

        const bailAfterThisManyUniqueSolutionsFound = Infinity;
        const bailAfterThisManySteps = 100000;
        const BAILED_TOO_MANY_STEPS = "too many steps";
        const BAILED_TOO_MANY_SOLUTIONS = "too many solutions";
        const BAILED_ERRORS = "errors";
    
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
    
    static solveThisPuzzleWithoutLookingAtCache(constraintKey) {
        console.log("Solving " + constraintKey);

        var startTime = new Date();
        const puzzleReferenceCopy = Solver.constraintsLibrary[constraintKey];
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
            currentState = Solver.stepSolverForward(currentState);
        }
        
        var result = {
            // inputs
            "key": puzzle.key,
            "constraints": puzzleReferenceCopy,
            "solverVersion": Solver.solverVersion,
        
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
        
        //console.log("   " + result.numSolutionsTotal + " total solutions.");
        console.log("   " + result.numSolutionsUnique + " unique solutions. " + result.solveTimeSeconds + " seconds, " + result.numSteps + " steps.");
        return result;
    }

}