module.exports = class Painter {

    // Takes in an array of points with fields x,y,z,id.
    // MODIFIES INPUT: sets additional field 'color' for each point.
    // By default, colors are [1,2,3...]
    static paintPoints(points) {
        var nextColor = 1;

        // This is a mapping of ID to:
        // - own color (or [] if not set)
        // - neighbor IDs
        // - distinct colors of neighbors
        var idMap = {};
        points.map(p => p.id).filter(onlyUnique).forEach(id => {
            idMap[id] = {
                color: [],
                neighbors: [],
                neighborColors: []
            };
        });

        // Set neighbor IDs based on proximity.
        points.forEach(point => {
            var newNeighborIds = points.filter(possibleNeighbor => 
                point.id != possibleNeighbor.id &&
                Math.abs(possibleNeighbor.x - point.x) <= 1 &&
                Math.abs(possibleNeighbor.y - point.y) <= 1 &&
                Math.abs(possibleNeighbor.z - point.z) <= 1).map(neighbor => neighbor.id);
            idMap[point.id].neighbors = idMap[point.id].neighbors.concat(newNeighborIds).filter(onlyUnique);
        });

        while (unpaintedIds().length > 0) {

            updateNeighborColors();

            var targetId = unpaintedIds().sort(idComparator)[0];

            if (idMap[targetId].neighborColors.length == nextColor - 1) {
                // need to create a new color.
                paintOneId(targetId, nextColor);
                nextColor++;
            } else {
                var colorOptions = Array(nextColor-1).fill(0).map((_,idx) => idx+1);
                idMap[targetId].neighbors.forEach(n => {
                    colorOptions = colorOptions.filter(c => !idMap[n].color.includes(c));
                });
                var selectedColor = colorOptions.sort(colorComparator)[0];
                paintOneId(targetId, selectedColor);
            }
        }

        return points;

        function unpaintedIds() {
            return Object.keys(idMap).filter(id => idMap[id].color.length == 0);
        }

        // Return the one that appears on the map the most.
        function colorComparator(a, b) {
            return Object.values(idMap).filter(idObj => idObj.color.includes(b)).length - Object.values(idMap).filter(idObj => idObj.color.includes(a)).length;
        }

        // Return the one with the most distinct neighbor colors.
        function idComparator(a, b) {
            if (idMap[b].neighborColors.length == idMap[a].neighborColors.length) {
                // Tiebreak: most blank neighbors.
                idMap[b].neighbors.filter(n => idMap[n].color.length == 0).length - idMap[a].neighbors.filter(n => idMap[n].color.length == 0).length;
            }
            return idMap[b].neighborColors.length - idMap[a].neighborColors.length;
        }

        function updateNeighborColors() {
            Object.keys(idMap).forEach(id => {
                idMap[id].neighborColors = idMap[id].neighbors.flatMap(n => idMap[n].color).filter(onlyUnique);
            });
        }

        function paintOneId(id, color) {
            idMap[id].color = [color];
            points.filter(p => p.id == id).forEach(p => p.color = color);
        }

        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        }
    }

}