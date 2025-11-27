export default class Plot {

    static DIRECTIONS = {
        left: {x:-1,y:0,z:0},
        right: {x:1,y:0,z:0},
        back: {x:0,y:-1,z:0},
        front: {x:0,y:1,z:0},
        bottom: {x:0,y:0,z:-1},
        top: {x:0,y:0,z:1},
    };

    static EDGE_DIRECTIONS = {
        front: {
            top: this.DIRECTIONS.top,
            bottom: this.DIRECTIONS.bottom,
            right: this.DIRECTIONS.right,
            left: this.DIRECTIONS.left,
        },
        back: {
            top: this.DIRECTIONS.top,
            bottom: this.DIRECTIONS.bottom,
            right: this.DIRECTIONS.left,
            left: this.DIRECTIONS.right,
        },
        left: {
            top: this.DIRECTIONS.top,
            bottom: this.DIRECTIONS.bottom,
            right: this.DIRECTIONS.front,
            left: this.DIRECTIONS.back,
        },
        right: {
            top: this.DIRECTIONS.top,
            bottom: this.DIRECTIONS.bottom,
            right: this.DIRECTIONS.back,
            left: this.DIRECTIONS.front,
        },
        top: {
            top: this.DIRECTIONS.back,
            bottom: this.DIRECTIONS.front,
            right: this.DIRECTIONS.right,
            left: this.DIRECTIONS.left,
        },
        bottom: {
            top: this.DIRECTIONS.front,
            bottom: this.DIRECTIONS.back,
            right: this.DIRECTIONS.right,
            left: this.DIRECTIONS.left,
        },
    }

    constructor(inputString) {
        var sections = inputString.trim().split("--");

        this.points = sections[0].trim().split("-").flatMap((xyPlane, zIndex) => 
            xyPlane.trim().split("\n").flatMap((line, yIndex) =>
                line.split("").flatMap((idString, xIndex) => {
                    if (idString == "@") return [];
                    return [Plot.makePoint(xIndex, yIndex,zIndex, idString)];
            }))
        );

        // create faces; set interior flags
        this.points.forEach(point => {
            point.faces = {};
            Object.keys(Plot.DIRECTIONS).forEach(dir => {
                var otherAcrossFace = {
                    x: point.x + Plot.DIRECTIONS[dir].x,
                    y: point.y + Plot.DIRECTIONS[dir].y,
                    z: point.z + Plot.DIRECTIONS[dir].z                
                }
                point.faces[dir] = {
                    interior: point.id == this.idAt(otherAcrossFace)
                }
                Object.keys(Plot.EDGE_DIRECTIONS[dir]).forEach(edgeDir => {
                    var otherBeside = {
                        x: point.x + Plot.EDGE_DIRECTIONS[dir][edgeDir].x,
                        y: point.y + Plot.EDGE_DIRECTIONS[dir][edgeDir].y,
                        z: point.z + Plot.EDGE_DIRECTIONS[dir][edgeDir].z                
                    };
                    var otherDiagonal = {
                        x: point.x + Plot.EDGE_DIRECTIONS[dir][edgeDir].x + Plot.DIRECTIONS[dir].x,
                        y: point.y + Plot.EDGE_DIRECTIONS[dir][edgeDir].y + Plot.DIRECTIONS[dir].y,
                        z: point.z + Plot.EDGE_DIRECTIONS[dir][edgeDir].z + Plot.DIRECTIONS[dir].z,               
                    }
                    point.faces[dir][edgeDir] = {
                        interior: (point.id == this.idAt(otherBeside)) && 
                                 (this.idAt(otherAcrossFace) == this.idAt(otherDiagonal) ||
                                 Plot.popFromID(this.idAt(otherAcrossFace)) + Plot.popFromID(this.idAt(otherDiagonal)) == 0
                                )
                    };
                })
            })
        })

        this.center = Plot.calculateCenter(this.points);        

        // annotations
        if (sections.length > 1) {
            var annotations = sections[1].trim().split("\n");
            for (const annotation of annotations) {
                var [targetId, targetIndex, targetFace, targetDirection, targetColor, targetText] = annotation.split(",");
                var targetPoint = this.points.filter(point => point.id == targetId)[targetIndex-1];
                if (targetPoint == undefined) throw Error("targetPoint not found in: " + annotation);
                targetPoint.faces[targetFace].color = targetColor;
                targetPoint.faces[targetFace].text = targetText;
            }

        }

    }

    static calculateCenter(points) {
        var maxX = Math.max(...points.map(p => p.x));
        var minX = Math.min(...points.map(p => p.x));
        var maxY = Math.max(...points.map(p => p.y));
        var minY = Math.min(...points.map(p => p.y));
        var maxZ = Math.max(...points.map(p => p.z));
        var minZ = Math.min(...points.map(p => p.z));

        var midX = (maxX + minX) / 2;
        var midY = (maxY + minY) / 2;
        var midZ = (maxZ + minZ) / 2;

        return {x:midX, y:midY, z:midZ};
    }

    static makePoint(x,y,z,id) {
        var result = {};
        result.x = x;
        result.y = y;
        result.z = z;
        result.id = id;
        result.color = Plot.colorFromID(id);
        return result;
    }

    static colorFromID(idString) {
        // special cases
        if (idString == ".")
            return "hsl(0, 0.00%, 50%, 0.3)";

        var code = idString.charCodeAt() - 65;
        if (code >= 0 && code < 26) {
            var hue = 200 + 360 * 0.618034 * code;
            var sat = "90%";
            var light = (code % 2) ? "65%" : "45%"; 
            return "hsl(" + hue + ", "+sat+", " +light+ ")";
        } else {
            // unrecognized ID
            return "hsl(0, 0.00%, 50%)";
        }
    }

    static popFromID(idString) {
        if (idString == "." || idString == "@") return 0;
        return 1;
    }

    idAt(other) {
        var neighbor = this.points.find(p => p.x == other.x && p.y == other.y && p.z == other.z);
        return neighbor ? neighbor.id : "@";
    }
}