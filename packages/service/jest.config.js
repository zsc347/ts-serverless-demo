// Reference: https://jestjs.io/docs/configuration
module.exports = {
    // Transform ts/tsx files with ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    // Files under `__tests__` folder and end with `.test.ts` or `.spec.ts`
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    // Ignore lib and node_modules folder
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
    collectCoverage: true
};
