const fs = require('fs');
var filePath = "_data/board-library.json";
var rawString = fs.readFileSync(filePath, 'utf8')
var boardLib = JSON.parse(rawString);

module.exports = class Board {

    static boardFromKey(key) {
        return boardLib[key];
    }
}
