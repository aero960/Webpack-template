const path = require("path");
const statementConfig = require("./configuration/stmconfig.js");
const plugins = require("./configuration/plugin.js");
const loaders = require("./configuration/loaders.js");
const result  = require("./configuration/result");
const fs = require('fs');

const config = {
    mode: "development",
    devtool:"eval-cheap-module-source-map",

    //dev server configuration
    devServer: {
    before:(app,server)=>{
            let {port} = server.options;
               let _info = server.log.info;
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
};

Object.assign(config,result,plugins,loaders);

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

