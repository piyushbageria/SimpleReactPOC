var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/app/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};
