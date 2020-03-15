 statementConfig = {
    dir: './jeszczeinny',

    rewrite: true
};

statementConfig.publicPath = statementConfig.dir.replace(".","");
module.exports = statementConfig;