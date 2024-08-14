module.exports = class TestUtil {
    static assert(condition, message) {
        if (!condition) {
            console.log("  ❌ " + message);
        } else {
            console.log("  ✅ " + message);
        }
    }
    static assertEqual(actual, expected, message) {
        if (actual !== expected) {
            console.log("  ❌ " + message + " got: " + actual + "; expected " + expected + "");
        } else {
            console.log("  ✅ " + message);
        }
    }
}
