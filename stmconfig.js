statementConfig = {
    name: 'jeszczeinny',
    configurationFolder : "./configuration",
    rewrite: true
};
statementConfig.dir = `./${statementConfig.name}`;
statementConfig.publicPath = statementConfig.dir.replace(".","");
module.exports = statementConfig;