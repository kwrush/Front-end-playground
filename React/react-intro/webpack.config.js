var path = require('path');
var webpack = require('webpack');

var APP_PATH = path.resolve(__dirname, 'app_intro');

module.exports = {
    entry: APP_PATH + '/app.jsx',
    output: {
        path: APP_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'app_intro'),
        historyApiFallback: false
    },

    devtool: 'source-map'
};