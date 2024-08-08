const fs = require('fs');
var constraintTemplates = JSON.parse(fs.readFileSync("_data/constraints-templates.json", 'utf8'));
var constraintLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));
var solutions = JSON.parse(fs.readFileSync("_data/solutions.json", 'utf8'));

module.exports = class Constraints {

    // Use these static values to avoid undetected typos.
    static KEY = {
        "allowGaps": "allowGaps",
        "allowGroundLevelOverflow": "allowGroundLevelOverflow",
        "allowSkyLevelOverflow": "allowSkyLevelOverflow",
        "allowUpwardOverflow": "allowUpwardOverflow",
        "allowUnsupportedOverhangs": "allowUnsupportedOverhangs",
        "allowSupportedOverhangs": "allowSupportedOverhangs",
        "allowSkyPieces": "allowSkyPieces",
        "colorByPiece": "colorByPiece",
        "colorByOrientation": "colorByOrientation",
        "allowColorVertexNeighbors": "allowColorVertexNeighbors",
        "allowColorEdgeNeighbors": "allowColorEdgeNeighbors",
        "allowColorFaceNeighbors": "allowColorFaceNeighbors",
        "allowHiddenNeighborsToBreakColorRules": "allowHiddenNeighborsToBreakColorRules",
        "allow4PieceEdgeIntersections": "allow4PieceEdgeIntersections",
        "allowPieceRotation": "allowPieceRotation",
        "allowPieceOrienting": "allowPieceOrienting",
        "allowUnusedPieces": "allowUnusedPieces",
        "allowUnusedOrientations": "allowUnusedOrientations"       
    }

    static areTheseConstraintsSupported(constraintKeys) {
        var supportedConstraints = [
            // for now, we don't support any flags! add more here as we support constraint flags.
        ]; 
        var unsupportedFlags = Object.keys(constraintKeys).filter(f => !(supportedConstraints.includes(f)));
        console.log(unsupportedFlags.length + " unsupported flags.");
        return unsupportedFlagCount.length == 0;
    }

    static checkConstraint(newState, constraintKey) {
        var flagHash = newState.puzzle.constraint_flags;
        if (flagHash[constraintKey] == undefined) {
            return constraintTemplates.Tiling_Default[constraintKey];
        }
        return flagHash[constraintKey];
    }

    static setSolutionField(constraintObject) {
        var key = constraintObject.key;
        if (key in solutions) {
            constraintObject.solution = solutions[key];
        } else {
            constraintObject.solution = "n/a";
        }
    }
}

