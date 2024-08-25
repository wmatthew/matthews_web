const fs = require('fs');
const Solver = require('../backendJS/Solver.js');
var constraintMetadata = JSON.parse(fs.readFileSync("_data/constraints-metadata.json", 'utf8'));

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
            "allowPieceOrienting"
            // add more here as we support constraint flags.
        ]; 
        var unsupportedFlags = Object.keys(constraintKeys).filter(f => !(supportedConstraints.includes(f)));
        if (unsupportedFlags.length > 0) {        
          console.log("⚠️  Warning: unsupported flags: " + unsupportedFlags);
        }
        return unsupportedFlags.length == 0;
    }

    static checkConstraint(constraintFlagHash, constraintKey) {
        if (constraintKey in constraintFlagHash) {
            return constraintFlagHash[constraintKey];
        } else {
            return constraintMetadata.Tiling_Default.constraint_flags[constraintKey];
        }
    }

    static setSolutionField(constraintObject) {
        constraintObject.solution = Solver.getSolution(constraintObject.key);
    }
}

