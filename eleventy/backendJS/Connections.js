const fs = require('fs');
var constraintTemplates = JSON.parse(fs.readFileSync("_data/constraints-templates.json", 'utf8'));
var constraintLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));
var boardLib = JSON.parse(fs.readFileSync("_data/board-library.json", 'utf8'));
var pieceLib = JSON.parse(fs.readFileSync("_data/piece-library.json", 'utf8'));

module.exports = class Connections {

    static getUrl(key) {
        // Figure out if this is a board, constraint, constraintKey, or piece and return the right URL for it.
        if (key in boardLib) {
            return "/board/gallery/";
        }

        if (key in constraintLibrary) {
            return "/investigations/";
        }

        if (key in pieceLib) {
            return "/polycube/gallery/#:~:text=" + key;
        }

        if (key in constraintTemplates.Tiling_Default.constraint_flags) {
            return "/tiling/constraints/#:~:text=" + key;
        }

        throw new Error("Could not determine URL for key: " + key);
    }
}