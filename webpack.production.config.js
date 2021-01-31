const path = require('path');
module.exports = {
    mode: 'production',
    entry: './resources/js/app.jsx',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.production.js'
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                }
            }
        }, {
             test: /\.css$/,
             use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        } ]
    }
};