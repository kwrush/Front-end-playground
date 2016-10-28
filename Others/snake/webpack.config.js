var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.resolve(__dirname, 'src'),
                exclude: '/node_modules'
            }
        ]
    },
    devtool: 'source-map'
};
