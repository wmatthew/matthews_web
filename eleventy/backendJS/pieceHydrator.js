// Precompute fields for a piece in the pieceLibrary
module.exports = class Hydrator {

    static hydrate(piece) {
        //console.log("Hydrating piece: ", piece);
        // generate points if we don't already have them
        if (!piece.points) {
          piece.points = Hydrator.convertCompactToPoints(piece.compact);
        }

        if (!piece.compact) {
            piece.compact = false;
        }

        piece.pointsPretty = piece.points.map(p => p.join(",")).join("|");

        // filter out non-peak points
        // add labels, '?' for overhangs
        piece.elevationMap = piece.points.filter(p => p[2] == Math.max(...piece.points.filter(a => a[0]==p[0]&&a[1]==p[1]).map(a => a[2])));

        piece.volume = piece.points.length;

        piece.maxX = Math.max(...piece.points.map(p => p[0]));
        piece.minX = Math.min(...piece.points.map(p => p[0]));
        piece.maxY = Math.max(...piece.points.map(p => p[1]));
        piece.minY = Math.min(...piece.points.map(p => p[1]));
        piece.maxZ = Math.max(...piece.points.map(p => p[2]));
        piece.minZ = Math.min(...piece.points.map(p => p[2]));

        piece.midX = (piece.maxX + piece.minX) / 2;
        piece.midY = (piece.maxY + piece.minY) / 2;
        piece.midZ = (piece.maxZ + piece.minZ) / 2;

        piece.pointsRender = piece.points.map(p => transformStyle(p[0] +1 - piece.midX, p[1] +1 - piece.midY, p[2] +1 - piece.midZ)); // a series of transforms

        piece.width = piece.maxX - piece.minX + 1;
        piece.height = piece.maxY - piece.minY + 1;
        piece.depth = piece.maxZ - piece.minZ + 1;

        piece["isHydrated"] = true;
        //console.log("Hydrated piece: ", piece);
        return piece;

        function transformStyle(x,y,z) {
            // note: Y and Z deliberately swapped here.
            return "transform: translateX(" +
                x * 200 +
                "px) translateZ(" +
                y * 200 +
                "px) translateY(" +
                z * -200 +
                "px);";
          }
    
    }

    static convertCompactToPoints(compact) {
        var points = [];
        compact.split("//").forEach((plane, z) => {
            plane.split("/").forEach((row, y) => {
                row.split("").forEach((cell, x) => {
                    for (var i = 1; i <= cell; i++) {
                        points.push([x +1, y + 1, z + i ]);
                    }
                });
            });
        });
        return points;
    }

    static hideOneLabels(label) {
        return (label == "1") ? "" : label;
    }

    // Make sure the coordinates start at (1,1)
    static fixCoordinates(grid) {
        const newGrid = structuredClone(grid);

        var minX = Math.min(...grid.points.map(p => p.x));
        var minY = Math.min(...grid.points.map(p => p.y));

        newGrid.points = grid.points.map(p => {
            p.x = p.x - minX + 1;
            p.y = p.y - minY + 1;
            return p;
        });

        return newGrid;
    }

    static rotatePiece(piece) {
        const newPiece = structuredClone(piece);
        newPiece.points = piece.points.map(p => {
            const newP = structuredClone(p);
            newP[0] = p[1];
            newP[1] = -p[0];
            return newP;
        });
        return Hydrator.fixCoordinates(newPiece);
    }
}
