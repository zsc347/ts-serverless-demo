module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"],
    // ignore all dist folder
    ignorePatterns: ["**/dist", "**/build", "node_moudules"],
    rules: {
        quotes: 0,
        semi: 0,
        "linebreak-style": 0,
        "no-var": "error",
        "no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: false,
                argsIgnorePattern: "^_"
            }
        ]
    }
};
