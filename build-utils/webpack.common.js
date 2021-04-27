const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import \'variables\';',
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                includePaths: ['src/styles'],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        chunkFilename: '[id].[chunkhash].js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/logo.png',
            favicons: {
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    windows: false,
                    yandex: false,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html'),
            title: 'Earthquake Zen Garden',
        }),
        new StylelintPlugin({
            configFile: 'stylelint.config.js',
            syntax: 'scss',
            files: './src/**/*.s?(a|c)ss'
        }),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name].css',
        }),
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles/'),
        },
        extensions: ['*', '.js', '.jsx'],
    },
};
