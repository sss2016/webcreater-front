const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// 入口文件
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '/dist/js')
    },
    devtool:'cheap-source-map',
    module: {
    	// 配置相应的规则
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader','css-loader', 'postcss-loader']
            }, {
                test: /\.js[x]?$/,
                use: {
                  loader:'babel-loader',
                  options: {
                    presets: ["@babel/react", "@babel/preset-env"]
                  }
                },
                exclude: /node_modules/,

            }, {
                test: /\.less$/,
                use: ['style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'],
            },{
              test: /\.(png|jpe?g)/i,
              use: [
                {
                  loader: "url-loader",
                  options: {
                    name: "./img/[name].[ext]",
                    limit: 10000
                  }
                },
                {
                  loader: "img-loader"
                }
              ]
            }
        ]
    },
    // 配置相应的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ]
};
