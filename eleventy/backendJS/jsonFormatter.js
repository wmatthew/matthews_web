// Pretty JSON formatting.
// If a line starts with one of these, start a new line.
var importantSubstrings = ["p", "b", "c", "a", "r", "d", "s", "_"];

// Takes in either a string or an object and returns a formatted JSON string.
export default class JSONFormatter {
    static formatJSON(rawInput) {

        var inputString;
    
        if (typeof rawInput === "string") {
            inputString = rawInput;
        } else if (typeof rawInput === "object") {
            inputString = JSON.stringify(rawInput, null, 2);
        } else {
            throw new Error("formatJSON: input must be a string or JSON object");
        }
    
        return inputString.split("\n").map(function(line) {
            if (importantSubstrings.some(prefix => line.includes(`${prefix}`))) {  
              return "\n" + line;
            } else
              return line.trimStart();
            }
        ).join("");
    }
}



