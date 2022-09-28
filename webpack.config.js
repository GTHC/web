const path = require("path");
const webpack = require("webpack");

// Extracts CSS into .css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Removes exported JavaScript files from CSS-only entries
// in this example, entry.custom will create a corresponding empty custom.js file
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const isDev = process.env.NODE_ENV === "development";
const mode = isDev ? "development" : "production";

module.exports = {
    mode: mode,
    entry: {
        application: [
            "./app/javascript/application.js",
            "./app/assets/stylesheets/application.css",
        ],
        // custom: [
        //     "./app/assets/stylesheets/scaffolds.scss",
        //     "./app/assets/stylesheets/pages.scss",
        // ],
    },
    output: {
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        path: path.resolve(__dirname, "app/assets/builds"),
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".scss", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.(?:sa|sc|c)ss$/i,
                include: path.resolve("./app/javascript"),
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(?:sa|sc|c)ss$/i,
                exclude: path.resolve("./app/javascript"),
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx|)$/i,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
                exclude: /\.(s?(a?|c)ss|js|html)$/i,
                use: "file-loader",
            },
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
};
