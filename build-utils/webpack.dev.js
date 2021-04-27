const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, '..', './dist'),
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'eval-source-map',
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
