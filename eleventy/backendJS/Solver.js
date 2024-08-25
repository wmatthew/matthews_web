//==========================================
// Solves things in constraint-library.json.
// To run: node backendJS/Solver.js
const jsonFormatter = require('./jsonFormatter.js');
const Board = require('./Board.js');
const Painter = require('./Painter.js');
const Constraints = require('./Constraints.js');
const fs = require('fs');

module.exports = class Solver {

    //==========================================
    // Solver version log
    // 0.1.x: Initial version. No flags supported.
    static solverVersion = "0.1.1";
    static constraintsLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));

    static getSolution(constraintKey) {
        if (!(constraintKey in Solver.constraintsLibrary)) {
            // It's not in the library, probably because it's a template.
            return false;
        }
        var path = Solver.cachePath(constraintKey);
        if (fs.existsSync(path) == false) {
            // console.log("No solution file found for " + constraintKey);
            return false;
        }
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    // the new cache
    static cachePath(constraintKey) {
        var parentKey = Solver.constraintsLibrary[constraintKey].parentKey;
        var path = "_data/solutions/" + parentKey + "/" + constraintKey + ".json";
        //console.log("path: " + path);
        return path;
    }

    // uses the new cache
    static saveResult(constraintKey, result) {
        console.log("Saving result for " + constraintKey);
        var newFilePath = Solver.cachePath(constraintKey);

        // Create dir if it doesn't exist
        var segments = newFilePath.split("/");
        var leafDirPath = segments.slice(0, segments.length-1).join("/");
        console.log("Making dir: " + leafDirPath);
        fs.mkdirSync(leafDirPath, {recursive: true});
        console.log("Made dir: " + leafDirPath);

        // write to the file, creating if necessary
        fs.writeFileSync(newFilePath, jsonFormatter.formatJSON(result));
    }

    static solveChildPuzzles(constraintTemplateKey, useCache=true) {
        console.log("Solving for all children of: " + constraintTemplateKey);
        Object.values(Solver.constraintsLibrary).filter(
            c => c.parentKey == constraintTemplateKey
        ).forEach(c => {
            Solver.solvePuzzle(c.key, useCache);
        })
    }

    // TODO: cache could use a better key- based on constraint values?
    static solvePuzzle(constraintKey, useCache=true) {
        console.log("solvePuzzle: " + constraintKey);

        if (useCache) {
            var solutionObj = Solver.getSolution(constraintKey);
            if (solutionObj && solutionObj.didWeBailOutEarly == false) {
                console.log(constraintKey + " found in cache. (took " + solutionObj.solveTimeSeconds + "s)");
                return;
            } else {
                console.log(constraintKey + " not found in cache.");
            }
        }

        var result = Solver.solveThisPuzzleWithoutLookingAtCache(constraintKey);
        Solver.saveResult(constraintKey, result);
    }

    // Advance the partials and add findings to completedBoards.
    static stepSolverForward(oldState) {

        const bailAfterThisManyUniqueSolutionsFound = Infinity;
        const bailAfterThisManySteps = 100000;
        const BAILED_TOO_MANY_STEPS = "too many steps";
        const BAILED_TOO_MANY_SOLUTIONS = "too many solutions";
        const BAILED_DUE_TO_ERRORS = "errors";
    
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
            // Save this new solution to an array and hash.
            newState.completedBoards.push(candidate.board);
            var key = Board.getUniqueKey(candidate.board);

            // Paint it. Can always repaint later/display differently if needed.
            Painter.paintPoints(candidate.board.points);

            newState.completedBoardsUnique[key] = candidate.board;

            console.log("🎉 Found a solution! now have " + newState.completedBoards.length + " (" + Object.keys(newState.completedBoardsUnique).length + " uniq)");

        } else {
            // Push + Pop = stack = depth first search
            newState.partials.push(...Board.getSuccessorPartials(candidate, newState));
        }

        return newState;
    }
    
    static solveThisPuzzleWithoutLookingAtCache(constraintKey) {
        console.log("solveThisPuzzleWithoutLookingAtCache: " + constraintKey);

        var startTime = new Date();
        const puzzleReferenceCopy = Solver.constraintsLibrary[constraintKey];

        // For now, warn only.
        Constraints.areTheseConstraintsSupported(puzzleReferenceCopy.constraint_flags);

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

        // Only five unique solutions
        var truncatedUniqueSolutions = {};
        Object.keys(currentState.completedBoardsUnique).slice(0,5).forEach(k => {
            truncatedUniqueSolutions[k] = currentState.completedBoardsUnique[k];
        });

        var result = {
            // inputs
            "key": puzzle.key,
            "constraints": puzzleReferenceCopy,
            "solverVersion": Solver.solverVersion,
        
            // outputs
            //"solutionsTotal": currentState.completedBoards, // debugging only.
            //"solutionsUnique": currentState.completedBoardsUnique, // debugging only.
            "solutionsUnique": truncatedUniqueSolutions,
            "numSolutionsTotal": currentState.completedBoards.length,
            "numSolutionsUnique": Object.keys(currentState.completedBoardsUnique).length,
        
            // process details
            "numSteps": currentState.numSteps,
            "didWeBailOutEarly": currentState.didWeBailOutEarly,
            "solveTimeSeconds": parseInt((new Date() - startTime) / 1000),
            "solveDate": new Date().toLocaleDateString()
        };
        
        console.log("   " + result.numSolutionsUnique + " unique solutions. " + result.solveTimeSeconds + " seconds, " + result.numSteps + " steps.");
        return result;
    }

}