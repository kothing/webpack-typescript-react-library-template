/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { join, resolve } = require("path");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const getPackageJson = function (...args: any[]) {
  const packageJSON = JSON.parse(fs.readFileSync(join(__dirname, "./package.json")));
  if (!args.length) {
    return packageJSON;
  }
  return args.reduce((out: { [x: string]: any }, key: string | number) => {
    out[key] = packageJSON[key];
    return out;
  }, {});
};

const {
  name: pkgName,
  version,
  description,
  license,
  author,
  repository,
  homepage,
} = getPackageJson("name", "version", "description", "license", "author", "repository", "homepage");

const banner = ` Name: ${pkgName}
 Version: ${version}
 Description: ${description}
 Author: ${author}
 Homepage: ${homepage}
 Repository: ${repository.url}

 Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

 This source code is licensed under the ${license} license found in the LICENSE file in the root directory of this source tree.`;

// common
const common = {
  mode: "production",
  entry: "./index.tsx",
  externals: ["react"],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // parallel: true, // Multi-threading
        extractComments: false,
      }),
    ],
  },
};

// config
module.exports = [
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "index.js",
      library: {
        type: "commonjs",
      },
    },
    ...common,
  },
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].js",
      libraryTarget: "umd",
    },
    ...common,
  },
  {
    experiments: {
      outputModule: true,
    },
    output: {
      path: resolve(__dirname, "dist/esm"),
      filename: "index.esm.js",
      libraryTarget: "module",
    },
    ...common,
  },
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "index.min.js",
    },
    ...common,
  },
];
