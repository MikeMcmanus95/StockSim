module.exports = {
  entry: './client/app.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-maps',
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
