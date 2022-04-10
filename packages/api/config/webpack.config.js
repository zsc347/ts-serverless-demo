const path = require("path");

module.exports = function () {
    return {
        mode: "production",
        bail: true,
        entry: "./src/lambda.ts",
        devtool: "source-map",
        module: {
            rules: [
                // load ts with ts-loader
                // see: https://webpack.js.org/guides/typescript/
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                // load source map for dependency modules
                // see: https://webpack.js.org/loaders/source-map-loader/
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: "source-map-loader"
                }
            ]
        },
        target: "node",
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        externals: {
            "aws-sdk": "aws-sdk"
        },
        output: {
            path: path.join(__dirname, "../build"),
            filename: "lambda.js",
            libraryTarget: "commonjs2"
        }
    };
};
