//==========================================
// Regenerates board-library.json.
// To Run: node backendJS/generateBoards.js

// Output format:
// array of (pairs of (x,y,z) coords defining a bounding box)
const fs = require('fs');
const jsonFormatter = require('./jsonFormatter.js');

console.log("Generating boards...");
var boardLibrary = {};

//==========================================
// P-Pentomino Boards
for (var i=1; i<=8; i++) {
    var description = i==1 ? "Pentomino." : "Pentomino scaled up " + i + "x.";
    var key = "pent" + i;
    var points = [];
    points.push([pt(1, 1, 1), pt(2*i, 2*i, 1)]);
    points.push([pt(1, 2*i+1, 1), pt(i, 3*i, 1)]);
    add(key, points, description, "Pentomino");
}

//==========================================
// Cube Boards
for (var i=1; i<=6; i++) {
    add("cube" + i, [[pt(1, 1, 1), pt(i, i, i)]], "Cube of side length " + i + ".", "Cube");
}

//==========================================
// Rectangle Boards
// Keep this one last because it's a lot of stuff.
var RECT_MAX_SIZE = 16;
for (var i=1; i<=RECT_MAX_SIZE; i++) {
    for (var j=1; j<=RECT_MAX_SIZE; j++) {
        var description = "Rectangle of size " + i + "x" + j + ".";
        add("rect" + i + "x" + j, [[pt(1, 1, 1), pt(i, j, 1)]], description, "Rectangle");
    }
}

//==========================================
function add(key, value, description, category) {
    //console.log(key);
    //console.log(JSON.stringify(value));
    var points = [];
    value.forEach(pair => {
        var box1 = pair[0];
        var box2 = pair[1];
        for (var i=box1.x; i<=box2.x; i++) {
            for (var j=box1.y; j<=box2.y; j++) {
                for (var k=box1.z; k<=box2.z; k++) {
                    points.push(pt(i,j,k));
                }
            }
        }        
    });

    boardLibrary[key] = {
        "key": key,
        "boxes": value,
        "points": points,
        "area": points.length,
        "description": description,
        "category": category
    };
}

function pt(x1,y1,z1) {
    return {x:x1, y:y1, z:z1};
}

//==========================================
fs.writeFileSync("_data/board-library.json", jsonFormatter.formatJSON(boardLibrary));
console.log("Generated " + Object.keys(boardLibrary).length + " boards.");
