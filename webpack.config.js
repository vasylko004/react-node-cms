"use strict"
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

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
    module: {
        rules: [{
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'targets': {
                    'node': 'current'
                  }
                }]
              ]
            }
          }
        }]
    }
}

