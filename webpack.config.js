var path = require('path');

module.exports = {

    entry: {
      javascript: path.resolve(__dirname, 'src/app/index.js'),
      html:path.resolve(__dirname, 'src/index.html')
    },

    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    module:{
      loaders:[
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',

        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel',
          query:
          {
            presets:['react']
          }
        }
      ]
    }
};
