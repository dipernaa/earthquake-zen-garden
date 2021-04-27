const path = require('path');

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '..', './dist'),
    },
    mode: 'production',
};
