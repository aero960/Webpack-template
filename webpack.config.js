const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-sunburst').BundleAnalyzerPlugin;


const statementConfig = {
    dir: './vueproj',
    publicPath: `/vueproj`,
    websiteMain: {
        title: "VUE app"
    }
}
const config = {

    entry: {
        entry: ["@babel/polyfill", `${statementConfig.dir}/application/app.js`]
    },
    output: {
        path: path.resolve(__dirname, `${statementConfig.dir}/dist`),
        publicPath: `${statementConfig.publicPath}/dist/`,
        filename: "bundle.js"
    },
    //dev server configuration
    devServer: {
        before:(app,server)=>{
                let {port} = server.options;
                   let _info = server.log.info;
                    // let open = new OpenBrowserPlugin({ url: 'http://localhost:8080' }).apply();
                 server.log.info = (args) =>{
                    return _info( args.match(/http:\/\/localhost/) ? `Server is Working at [ http://localhost:${port}/${statementConfig.dir.replace("./","")} ]` : args  )
                 }
        },

        hotOnly: true,
        filename: "bundle.js",
        port: 3000,
        compress: true,
        historyApiFallback: {
            rewrites: [
                {from: new RegExp(`^\/${path.basename(statementConfig.dir)}\/+`).source, to: `/${statementConfig.dir}/index.html`},
                {from: /.*/, to: '/assets/404template/index.html'}
            ]
        },
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
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
            title: statementConfig.websiteMain.title,
            filename: `../index.html`,
            files: {
                css: ["/scss/main.scss"]
            }
        }),
        new OpenBrowserPlugin({ url: `http://localhost:3000/${statementConfig.dir.replace("./","")}` }),

    ]
}

module.exports = () => {

    return config;
}
