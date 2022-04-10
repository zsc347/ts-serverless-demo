const path = require("path");

module.exports = function () {
    return {
        mode: "production",
        bail: true,
        entry: "./src/lambda.ts",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
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
