const fs = require('fs');

var filePath = "_data/piece-library.json";
var rawString = fs.readFileSync(filePath, 'utf8')
var pieceLib = JSON.parse(rawString);

class Piece {
}

export function pieceFromKey(key) {
    return pieceLib[key];
}

module.exports = { Piece };
