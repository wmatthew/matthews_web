const fs = require('fs');
var constraintTemplates = JSON.parse(fs.readFileSync("_data/constraints-templates.json", 'utf8'));
var constraintLibrary = JSON.parse(fs.readFileSync("_data/constraints-library.json", 'utf8'));
var constraintMetadata = JSON.parse(fs.readFileSync("_data/constraints-metadata.json", 'utf8'));
var boardLib = JSON.parse(fs.readFileSync("_data/board-library.json", 'utf8'));
var pieceLib = JSON.parse(fs.readFileSync("_data/piece-library.json", 'utf8'));

module.exports = class Connections {

    static getUrl(key) {
        // Figure out if this is a board, constraint, constraintKey, or piece and return the right URL for it.
        // TODO: unit test: make sure no two entities share the same key.
        if (key in boardLib) {
            return "/board/gallery/#:~:text=" + key;
        }

        if (key in constraintTemplates) {
            return "/investigations/#:~:text=Key: " + escape(key);
        }

        if (key in constraintLibrary) {
            return "/investigations/#:~:text=Key: " + escape(key);
        }

        if (key in pieceLib) {
            return "/polycube/gallery/#:~:text=Key: " + escape(key);
        }

        if (key in constraintMetadata.Tiling_Default.constraint_flags) {
            return "/tiling/constraints/#:~:text=" + escape(key);
        }

        throw new Error("Could not determine URL for key: " + key);

        function escape(rawString) {
            return rawString.replace("-", "%2D"); // https://web.dev/articles/text-fragments#:~:text=This%20is%20especially%20
        }
    }

    static getThingsThatUsePiece(pieceKey) {
        var result = Object.values(constraintTemplates).concat(Object.values(constraintLibrary)).filter(obj => {
            return ("key" in obj) &&
            ("type" in obj) &&
            ("pieceSupply" in obj) &&
            ["Template", "Generated"].includes(obj.type) &&
            Array.isArray(obj.pieceSupply) &&
            (obj.pieceSupply.map(p => p[0]).includes(pieceKey));
        }
        ).map(obj => {return {url:Connections.getUrl(obj.key), displayName:obj.name};});
        return result;
    }

    static getThingsThatUseBoard(boardKey) {

        var result = Object.values(constraintLibrary).filter(obj => {
            return ("key" in obj) &&
            obj.boardKey == boardKey;
        }
        ).map(obj => {return {url:Connections.getUrl(obj.key), displayName:obj.name};});

        return result;
    }

    static getConstraintTemplatesThatUseKey(key) {
        var result = Object.values(constraintTemplates).filter(obj => {
            return ("key" in obj) &&
            ("type" in obj) &&
            obj.type == "Template" &&
            ("constraint_flags" in obj) &&
            (key in obj.constraint_flags);
        }
        ).map(obj => {return {url:Connections.getUrl(obj.key), displayName:obj.name};});
        return result;
    }

    // Given a parent template, find children.
    static getChildConstraints(templateKey) {
        var result = Object.values(constraintLibrary).filter(obj => {
            return ("key" in obj) &&
            ("type" in obj) &&
            ("parentKey" in obj) &&
            obj.type == "Generated" &&
            obj.parentKey == templateKey;
        }
        ).map(obj => {return {url:Connections.getUrl(obj.key), displayName:obj.name};});
        return result;
    }
}