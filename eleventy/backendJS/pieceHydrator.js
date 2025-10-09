// Precompute fields for a piece in the pieceLibrary
module.exports = class Hydrator {

    // modify the piece in place
    static hydrate(piece) {
        // only generate points from compact if we don't already have them
        if (!piece.points) {
          piece.points = Hydrator.convertCompactToPoints(piece.compact);
        }

        if (!piece.compact) {
            piece.compact = false;
        }

        piece.pointsPretty = piece.points.map(p => [p.x,p.y,p.z].join(",")).join("|");

        // filter out non-peak points
        // add labels, '?' for overhangs
        // TODO These next three lines assume coordinates start at (1,1,1) - ie, that they're already corrected.
        piece.elevationMap = piece.points.filter(p => p.z == Math.max(...piece.points.filter(a => a.x==p.x&&a.y==p.y).map(a => a.z)));
        piece.hasOverhangs = piece.elevationMap.some(p => piece.points.filter(a => a.x==p.x&&a.y==p.y).length < p.z);
        piece.floorPoints = piece.points.filter(p => p.z == 1);
        piece.footprintArea = piece.floorPoints.length;

        piece.volume = piece.points.length;

        piece.maxX = Math.max(...piece.points.map(p => p.x));
        piece.minX = Math.min(...piece.points.map(p => p.x));
        piece.maxY = Math.max(...piece.points.map(p => p.y));
        piece.minY = Math.min(...piece.points.map(p => p.y));
        piece.maxZ = Math.max(...piece.points.map(p => p.z));
        piece.minZ = Math.min(...piece.points.map(p => p.z));

        piece.midX = (piece.maxX + piece.minX) / 2;
        piece.midY = (piece.maxY + piece.minY) / 2;
        piece.midZ = (piece.maxZ + piece.minZ) / 2;

        piece.pointsRender = piece.points.map(p => transformStyle(p.x +1 - piece.midX, p.y +1 - piece.midY, p.z +1 - piece.midZ));

        piece.width = piece.maxX - piece.minX + 1;
        piece.height = piece.maxY - piece.minY + 1;
        piece.depth = piece.maxZ - piece.minZ + 1;

        piece["isHydrated"] = true;
        return piece;

        // This is the style for the entire cube AND individual faces
        function transformStyle(x,y,z) {
            // every position has an ID, color, and text
            // ID:0 = empty space

            // TODO: if the position on the other side of the face matches ID, omit the face.
            // if it's different, render the face

            var style = {};

            // Style for the overall cube
            // note: Y and Z are deliberately swapped here.
            style.cube = "transform: translateX(" +
            x * 200 +
            "px) translateZ(" +
            y * 200 +
            "px) translateY(" +
            z * -200 +
            "px);";

            // Style for the front face of the cube
            style.front = false; // face color, or false to omit

            // Style for the back face of the cube
            style.front = false; // face color, or false to omit

            // ...

            // Style for the left face of the cube
            style.left = {};
            style.left.color = "#f00";
            style.left.border = "5px dotted #000"; // TODO: split into 4 attributes
            style.left.text = "left";

            return style.cube;
          }
    
    }

    static convertCompactToPoints(compact) {
        var points = [];
        compact.split("//").forEach((plane, z) => {
            plane.split("/").forEach((row, y) => {
                row.split("").forEach((cell, x) => {
                    for (var i = 1; i <= cell; i++) {
                        points.push({x: x + 1, y: y + 1, z:z + i });
                    }
                });
            });
        });
        return points;
    }

    static hideOneLabels(label) {
        return (label == "1") ? false : label;
    }

    // Ensure the coordinates start at (1,1,1)
    // returns a clone
    static fixCoordinates(grid) {
        const newGrid = structuredClone(grid);

        var minX = Math.min(...grid.points.map(p => p.x));
        var minY = Math.min(...grid.points.map(p => p.y));
        var minZ = Math.min(...grid.points.map(p => p.z));

        newGrid.points = grid.points.map(p => {
            p.x = p.x - minX + 1;
            p.y = p.y - minY + 1;
            p.z = p.z - minZ + 1;
            return p;
        });

        return newGrid;
    }

    static rotatePiece(piece) {
        // TODO: deprecate in favor of Piece.transformPiece
        const newPiece = structuredClone(piece);
        newPiece.points = piece.points.map(p => {
            const newP = structuredClone(p);
            newP.x = p.y;
            newP.y = -p.x;
            return newP;
        });
        return Hydrator.fixCoordinates(newPiece);
    }
}
