const path = require('path') // ne marche qu'en node js : permet d'utiliser une librairy du node js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// pour exporter des données
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer:
    {
        contentBase: './dist',
        open: true,
        host: '0.0.0.0', // = serveur local --> permet de lancer le serveur et rendre accessible dev local
        useLocalIp: true
    },
    entry: path.resolve(__dirname, '../src/index.js'),
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
    [
        new CopyWebpackPlugin([ { from: 'static' } ]),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, '../src/index.html')
        })
    ],
    module:
    {
        rules:
        [
            {
                test: /\.html$/, // = tout ce qui se termine par .html + un plugin
                use: ['html-loader']
            },
            {
                test: /\.js$/, // = tout ce qui se termine par .js + un plugin
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.styl$/, // = tout ce qui se termine par .css
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outPath: 'images/'}
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eat)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outPath: 'fonts/'}
                    }
                ]
            }
        ]
    }
}

