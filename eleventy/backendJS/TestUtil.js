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

    static assertEqualStringify(actual, expected, message) {
        if (JSON.stringify(actual) != JSON.stringify(expected)) {
            console.log("  ❌ " + message + " got: " + actual + "; expected " + expected + "");
        } else {
            console.log("  ✅ " + message);
        }
    }

    static assertSameKeys(actualHash, expectedHash, message) {
        var actualKeys = Object.keys(actualHash);
        var expectedKeys = Object.keys(expectedHash);

        var onlyActual = actualKeys.filter(k => !expectedKeys.includes(k));
        var onlyExpected = expectedKeys.filter(k => !actualKeys.includes(k));

        if (onlyActual.length !== 0) {
            console.log("  ❌ " + message + " unexpected keys: " + onlyActual.join(", "));
        } else if (onlyExpected.length !== 0) {
            console.log("  ❌ " + message + " missing keys: " +onlyExpected.join(", "));
        } else {
            console.log("  ✅ " + message);
        }
    }

}
