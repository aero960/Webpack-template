const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const statementConfig = require("./stmconfig.js");

module.exports = {plugins:[
        new CleanWebpackPlugin(),
        new MinifyPlugin({}, {
            test: /\.js($|\?)/i
        }),
        new HtmlWebpackPlugin({
            title: `${statementConfig.dir.replace("./","")} app`,
            filename: `../index.html`
        }),
        new OpenBrowserPlugin({ url: `www.jsprojects.com/${statementConfig.dir.replace("./","")}/` }),
        new DashboardPlugin({ port: 4000 })
    ]};