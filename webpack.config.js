const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  target: "node16",
  entry: {
    cli: "./src/cli.ts",
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", "json"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ""),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: process.env.NODE_ENV !== "dev",
            },
          },
        ],
      },
    ],
  },
};
