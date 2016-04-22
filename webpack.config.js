var path = require('path');

var webpack = require('webpack');
var srcDir = path.resolve(__dirname, 'src/ts');
var outputDir = path.resolve(__dirname, 'assets');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry : {
      'app' : './src/ts/AppInit.ts',
      'tests' : './src/test/testsBootstrap.ts'
    },
    output: {
        path: outputDir,
        filename: '[name].js',
        souceMapFilename: '[name].map',
        publicPath : '/assets/'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    devServer : {
      contentBase : 'app'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.tsx?$/, loader: 'ts-loader' },
            //{ test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"}
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
        ],
    },
    plugins : [
      // Simply copies the files over
      // new CopyWebpackPlugin([
      //     { from: dir_html } // to: output.path
      // ]),
      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin()
    ],
    devtool: 'source-map'
};
