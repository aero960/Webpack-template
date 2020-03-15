module.exports = {
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
    }
}
