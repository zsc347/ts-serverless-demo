const path = require("path");

module.exports = function () {
    return {
        target: "node",
        bail: true,
        mode: "production",
        stats: "errors-warnings",
        entry: "./src/index.ts",
        devtool: "source-map",
        module: {
            rules: [
                // load ts with tsloader
                // see: https://webpack.js.org/guides/typescript/
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        externals: {
            awssdk: "awssdk"
        },
        output: {
            path: path.join(__dirname, "../build"),
            filename: "audit.js",
            libraryTarget: "commonjs2"
        }
    };
};
