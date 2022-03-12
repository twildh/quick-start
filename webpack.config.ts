import path from "path"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"

const CSS_MODULE_REGEX = /\.module\.s?css$/
const EXT_NAME = "QuickStart"

export default (
  _: string | Record<string, boolean | number | string>,
  args: { mode: string },
): Configuration => ({
  entry: {
    // Extension code
    content: "./src/content/index.tsx",
    background: "./src/background/index.ts",
    options: "./src/options/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devtool: args.mode === "development" ? "source-map" : false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: "babel-loader",
        exclude: /node_modules/,
      },
      // CSS modules (file names must end with ".module.scss" or ".module.css")
      {
        test: CSS_MODULE_REGEX,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
      // Other stylesheets
      {
        test: /\.s?css$/,
        exclude: CSS_MODULE_REGEX,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["content"], // Only load content script in main HTML
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      title: EXT_NAME,
    }),
    new CopyPlugin({
      patterns: [
        // Extension manifest
        "./manifest.json",

        // Extension icons
        { from: "./icons/", to: "./icons/" },

        // Options page
        { from: "./src/options/index.html", to: "./options.html" },
        { from: "./src/options/index.css", to: "./options.css" },
        {
          from: "./node_modules/webext-base-css/webext-base.css",
          to: "./webext-base.css",
        },
      ],
    }),
  ],
})
