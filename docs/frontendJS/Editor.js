// UI for editor.md.
import Plot from "../backendJS/Plot.js";

function initialSetup() {
    var area = document.getElementById("editorTextArea");
    if (area.addEventListener) {
        area.addEventListener('input', parseAndRender, false); // normal browsers
      } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', parseAndRender); // IE
      }

      parseAndRender();    
}

function parseAndRender() {
    var rawText = document.getElementById("editorTextArea").value;

    try {
      var result = new Plot(rawText);
    } catch (error) {
      communicateResult(false, error.message);
      return;
    }

    render3dView(result);
    renderSideView(result);

    communicateResult(true, result.points.length + " points, " + rawText.length + " chars");
}    

function communicateResult(success, message) {
    if (success) {
        document.getElementById("editorTextArea").className = '';
        document.getElementById("editorTextArea").classList.add("editor__textbox--success");
        document.getElementById("editorStatus").innerText = message;

    } else {
        document.getElementById("editorTextArea").className = '';
        document.getElementById("editorTextArea").classList.add("editor__textbox--error");
        document.getElementById("editorStatus").innerText = "Error: " + message;
    }
}

function addCube(point) {
    var polycube = document.querySelector('#editor3d div.polycube');
    var newCube = document.createElement('div');
    newCube.classList.add("cube");
    newCube.style = cubeStyle(point);
    for (var dir of Object.keys(Plot.DIRECTIONS)) {
      if (point.faces[dir].interior == false) {
        var newFace = document.createElement('div');
        newFace.classList.add("cube__face")
        newFace.classList.add("cube__face--" + dir);
        setFaceStyle(newFace, point, dir);
        newCube.appendChild(newFace);
      }
    }
    polycube.appendChild(newCube);
}

function setFaceStyle(faceDiv, point, dir) {
    var style = "background: " + point.color + ";";
    if ("color" in point.faces[dir]) {
        // annotation override
        style = "background: " + point.faces[dir].color + ";";
    }
    if ("text" in point.faces[dir]) {
        faceDiv.classList.add("show_cube_face_labels");
        faceDiv.textContent = point.faces[dir].text.trim();
    }

    Object.keys(Plot.EDGE_DIRECTIONS[dir]).forEach(edgeDir => {
        if (point.faces[dir][edgeDir].interior == true) {
            style = style + "border-" + edgeDir + ": 0px solid red;";
        } else {
          if (point.id == ".") {
            style = style + "border-" + edgeDir + ": 3px dotted black;";
          } else {
            style = style + "border-" + edgeDir + ": 5px solid black;";
          }
        }
    })

    faceDiv.style = style;
}

function cubeStyle(point) {
  return "transform: "+
    "translateX(" + point.x * 200 + "px) "+
    "translateZ(" + point.y * 200 + "px) "+
    "translateY(" + point.z * -200 + "px);";
}

function render3dView(plot) {
    document.querySelector('#editor3d div.polycube').style = "transform: "+
        "translateX(" + (  0 - plot.center.x*200)+"px) "+
        "translateZ(" + (  0 - plot.center.y*200)+"px) "+
        "translateY(" + (100 + plot.center.z*200)+"px);"

    document.querySelector('#editor3d div.polycube').textContent = "";
    plot.points.forEach(point => {
        addCube(point);
    })
}

// TODO: generalize this for all six directions
function renderSideView(plot) {

    var parent = document.querySelector('#editorTop div.actualMap');

    // clear out the view
    parent.textContent = "";

    // filter out non-extrema points that aren't relevant to this view
    var visiblePoints = plot.points.filter(point => 
        point.id !== "."
    ).filter(point =>
        !plot.points.some(otherPoint =>
            point.x == otherPoint.x &&
            point.y == otherPoint.y &&
            point.z < otherPoint.z &&
            otherPoint.id !== "."
        )
    );
    
    visiblePoints.forEach(point => {
        addSquare(parent, visiblePoints, point, "top");
    });

}

function addSquare(parent, visiblePoints, point, label) {

    var newSquare = document.createElement('div');
    newSquare.classList.add("map-cell");
    newSquare.style.gridArea = (point.y+1)+" / "+(point.x+1) +" / auto / auto"
    newSquare.style.backgroundColor = point.color;

    var content = document.createElement('div');
    content.textContent = elevationAt(point);
    content.classList.add("cell-content");
    newSquare.appendChild(content);

    function elevationAt(target) {
        var elevation = visiblePoints.filter(candidate =>
            target.x == candidate.x &&
            target.y == candidate.y
        ).map(point => point.z)[0] +1 ; 
        return elevation || -1;       
    }

    Object.keys(Plot.EDGE_DIRECTIONS.top).forEach(edgeDir => {

        var neighborPos = {
            x: point.x + Plot.EDGE_DIRECTIONS.top[edgeDir].x,
            y: point.y + Plot.EDGE_DIRECTIONS.top[edgeDir].y
        };

        if (elevationAt(neighborPos) !== elevationAt(point)) {
            var styleKey = "border" + String(edgeDir).charAt(0).toUpperCase() + String(edgeDir).slice(1);
            newSquare.style[styleKey] = "5px solid black";
        }
    });

    parent.appendChild(newSquare);
}

window.onload = initialSetup;
