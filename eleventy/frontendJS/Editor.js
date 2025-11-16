// import Plot from '../backendJS/Plot.mjs';

// UI for editor.md
console.log("Editor.js file loaded");

function loadEditor() {
    // wire up the buttons to the functions.
    document.getElementById("validate").addEventListener("click", validateButtonPress);
    document.getElementById("render").addEventListener("click", renderButtonPress);
    console.log("loadEditor starting.");
    parseAndRender();
}

function communicateResult(success, message) {
    if (success) {
        document.getElementById("editorTextArea").classList.remove("editor__textbox--loading");
        document.getElementById("editorTextArea").classList.remove("editor__textbox--error");
        document.getElementById("editorTextArea").classList.add("editor__textbox--success");
        document.getElementById("editorStatus").innerText = "Success: " + message;

    } else {
        document.getElementById("editorTextArea").classList.remove("editor__textbox--loading");
        document.getElementById("editorTextArea").classList.remove("editor__textbox--success");
        document.getElementById("editorTextArea").classList.add("editor__textbox--error");
        document.getElementById("editorStatus").innerText = "Error: " + message;
    }
}

function addCube(x, y, z) {
    console.log("Adding cube at " + x + ", " + y + ", " + z);
    var view3d = document.getElementById("editor3d");
    var polycube = view3d.querySelector('div.polycube');
    var newCube = document.createElement('div');
    newCube.classList.add("cube");
    newCube.style = cubeStyle(x,y,z);
    for (dir of ["front", "back", "top", "bottom", "left", "right"]) {
      var newFace = document.createElement('div');
      newFace.classList.add("cube__face")
      newFace.classList.add("cube__face--" + dir);
      newCube.appendChild(newFace);
      //console.log(newFace);
    }
    polycube.appendChild(newCube);
    //console.log(newCube);
}

function cubeStyle(x,y,z) {
return "transform: translateX(" +
            x * 200 +
            "px) translateZ(" +
            y * 200 +
            "px) translateY(" +
            z * -200 +
            "px);";

}

function validateButtonPress() {
    console.log("validateButtonPress not implemented");

}


function renderButtonPress() {
    console.log("renderButtonPress");
    parseAndRender();
}

function parseAndRender() {
    var rawText = document.getElementById("editorTextArea").innerText;
    var result;

    try {
      result = Plot.createFromString(rawText);
    } catch (error) {
        communicateResult(false, error.message);
        console.log("loadEditor failed; quitting early.");
        return;
    }

    communicateResult(true, "successfully updated");

    // iterate through plot object and render 3D

    addCube(0,0,0);
    addCube(1,0,0);
    addCube(3,0,0);

    console.log("loadEditor finished.");
}    

window.onload = loadEditor;
