"use strict"
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });



module.exports = {
    target: "node",
    entry: "./server/src/index.js",
    externals: nodeModules,
    output: {
        path: path.resolve(__dirname, "./server/dist"),
        filename: "server.js"
    },
    resolve: {
      modules: [
        path.resolve('./src/'),
        'node_modules',
      ],
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: '/.js$/',
          loader: 'babel-loader',
        },
      ],
    }
}

