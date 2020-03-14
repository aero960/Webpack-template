const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const statemenConfigs = {
    dir: './vueproj',
    publicPath: `/vueproj`,
    websiteMain: {
        title: "VUE app"
    }
}


const config = {

    entry: {
        entry: ["@babel/polyfill", `${statemenConfigs.dir}/application/app.js`]
    },
    output: {
        path: path.resolve(__dirname, `${statemenConfigs.dir}/dist`),
        publicPath: `${statemenConfigs.publicPath}/dist/`,
        filename: "bundle.js"
    },
    //dev server configuration
    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: {
            rewrites: [
                {from: /^\/vueproj\/+/, to: `/${statemenConfigs.dir}/index.html`},
                {from: /./, to: '/assets/404template/index.html'}
            ]
        }
    },
    //loaders
    module: {
        rules: [
        {
        test: [/\.js$/],
        exclude: [/node_modules/],
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
        },
        {
            test: [/\.pug$/],
            use: ['pug-loader']
        },
        {
            test: /\.(png|jpeg|ttf|jpg)$/,
            use: [{loader: 'url-loader', options: {limit: 10000}}]
        },
        {
            test: /\.s[ac]ss$/i,
            //by webpack kompilowal css i scss musza byc uzyte te 2 loadery scss i css
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: statemenConfigs.websiteMain.title,
            filename: `../index.html`,
            files: {
                css: ["/scss/main.scss"]
            }
        })

    ]
}

module.exports = () => {
    return config;
}
