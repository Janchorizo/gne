const path = require('path');

const outputDirectory = './dist'


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname,outputDirectory)
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, "src/common"),
      components: path.resolve(__dirname, "src/components"),
      themes: path.resolve(__dirname, "src/themes"),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.*\.svg$/,
        use: 'url-loader'
      },
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  devServer: {
    port: 3000,
  },
  devtool: "cheap-module-source-map",
};
