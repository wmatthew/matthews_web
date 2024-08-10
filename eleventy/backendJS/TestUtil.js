module.exports = class TestUtil {
    static assert(condition, message) {
        if (!condition) {
            console.log("  ❌ " + message);
        } else {
            console.log("  ✅ " + message);
        }
    }
}
