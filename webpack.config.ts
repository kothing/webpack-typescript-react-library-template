/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const plugins = function () {
  return [
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
  ];
};

const common_config = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
};

const dev_config = {
  ...common_config,
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "public/index.html",
        },
      ),
    ),
    ...plugins(),
  ],
};

const prod_config = {
  ...common_config,
  mode: "production",
  output: {
    publicPath: "./",
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "public/index.html",
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        },
      ),
    ),
    ...plugins(),
  ],
};

module.exports = (env: any, argv: any) => {
  if (argv.mode === "development") {
    return dev_config;
  }

  if (argv.mode === "production") {
    return prod_config;
  }
};
