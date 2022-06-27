const path = require("path");

module.exports = [
  {
    entry: "./src/app.ts",
    output: {
      path: path.join(__dirname, "build"),
      filename: "interfastingtimer.app.js",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    // target: "web",
    // node: {
    //   __dirname: false,
    // },
    optimization: {
      minimize: false,
      // minimizer: [new UglifyJsPlugin({
      //   include: /\.min\.js$/
      // })]
    }
  }
];