// Do not implement this 
const path = require("path");
module.exports = {
    entry: {
        entry: ["@babel/polyfill", `${statementConfig.dir}/application/app.js`]
    },
    output: {
        path: path.resolve(__dirname, `${statementConfig.dir}/dist`),
        publicPath: `${statementConfig.publicPath}/dist/`,
        filename: "bundle.js"
    }
};
