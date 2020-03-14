const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node-modules/,
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!index.html', '!favicon-16x16.png', '!styles.css'],
    }),
  ],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.ts']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  mode: 'development',
}

module.exports = config;
