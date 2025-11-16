export class Plot {

// TODO: add unit tests

    // return object (or throw error if invalid)
    static createFromString(inputString) {

        var sections = inputString.trim().split("--");
        if (sections.length > 2) {
            //throw new Error("too many sections in Plot");
            // actually, allow these sections as commentary
        }

        var levels = sections[0].trim().split("-").map((val, idx) => {
        });

        if (sections.length == 1) {
            // return early; no annotations
        }

        throw new Error("Plot.createFromString: not implemented");
    }

/*
// What functions does Plot expose to FE rendering?

getCubes() // returns an array of cubes
cube has: x,y,z,id,interior, css style

getFace(cube, direction) // returns a face
face has: cube, direction, interior, css style

getEdge(face, direction) // returns an edge
edge has: face, direction, interior, css style

*/

}