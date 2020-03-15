const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const statementConfig = require("./stmconfig.js");
const fs = require('fs');

statementConfig.publicPath = statementConfig.dir.replace(".","");

const config = {
    mode: "development",
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
        host: "localhost",
        disableHostCheck: true,
        hotOnly: true,
        filename: "bundle.js",
        port: 4000,
        compress: true,
        historyApiFallback: (statementConfig.rewrite) ? {
            rewrites: [
                {from: new RegExp(`^\/${path.basename(statementConfig.dir)}\/+`).source, to: `/${statementConfig.dir}/index.html`},
                {from: /.*/, to: '/assets/404template/index.html'}
            ]
        }: {},
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
            title: `${statementConfig.dir.replace("./","")} app`,
            filename: `../index.html`
        }),
        new OpenBrowserPlugin({ url: `www.jsprojects.com/${statementConfig.dir.replace("./","")}/` }),
        new DashboardPlugin({ port: 4000 })
    ]
};
module.exports = () => {
    const projectPath =`${statementConfig.dir}/application`;
    if(!fs.existsSync(projectPath) && !fs.existsSync(projectPath + '/app.js')){
        fs.mkdirSync(projectPath,0o777);
        fs.writeFileSync(projectPath+ '/app.js','console.log("success")',()=>{
            console.log("created main file application")
        });
    }
   return config;

};

