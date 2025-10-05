const fs = require('fs');
const Solver = require('../backendJS/Solver.js');
var constraintMetadata = JSON.parse(fs.readFileSync("_data/constraints-metadata.json", 'utf8'));
const TestUtil = require('./TestUtil.js');

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
        "colorByDistinctOrientation": "colorByDistinctOrientation",
        "allowColorVertexNeighbors": "allowColorVertexNeighbors",
        "allowColorEdgeNeighbors": "allowColorEdgeNeighbors",
        "allowColorFaceNeighbors": "allowColorFaceNeighbors",
        "allowHiddenNeighborsToBreakColorRules": "allowHiddenNeighborsToBreakColorRules",
        "allowGroundFloorToBreakColorRules": "allowGroundFloorToBreakColorRules",
        "allow4PieceEdgeIntersections": "allow4PieceEdgeIntersections",
        "allowPieceRotation": "allowPieceRotation",
        "allowPieceOrienting": "allowPieceOrienting",
        "allowUnusedPieces": "allowUnusedPieces",
        "allowUnusedOrientations": "allowUnusedOrientations",
        "allowPieceMirroring": "allowPieceMirroring"
    }

    static getUnsupportedConstraints(constraintKeys) {
        var supportedConstraints = [
            "allowPieceOrienting",
            "allowUpwardOverflow",
            "colorByOrientation",
            "colorByPiece",
            "allowColorVertexNeighbors"
            // add more here as we support constraint flags.
        ]; 
        return Object.keys(constraintKeys).filter(f => !(supportedConstraints.includes(f)));
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

    static tests() {
        console.log("Constraints.js");

        // make sure every constraint has an icon, etc.
        var keys = Constraints.KEY;
        TestUtil.assertSameKeys(keys, constraintMetadata.Icons, "every constraint has an icon.");
        TestUtil.assertSameKeys(keys, constraintMetadata.Descriptions, "every constraint has a description.");
        TestUtil.assertSameKeys(keys, constraintMetadata.Tiling_Default.constraint_flags, "every constraint has a default value.");       
    }
}

