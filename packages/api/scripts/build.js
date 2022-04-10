"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
    throw err;
});

const fs = require("fs-extra");
const webpack = require("webpack");
const configFactory = require("../config/webpack.config");

// Generate configuration
const config = configFactory();

// Create the production build and print the deployment instructions.
async function build() {
    console.log("Creating an optimized production build...");
    const compiler = webpack(config);
    await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        });
    });
}

// Empty build folder
fs.emptyDirSync("../build");
build();
