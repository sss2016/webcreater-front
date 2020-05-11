const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const appMainJs  = './src/main.js';
const appIndexJs = './src/index.js';
const appAdminJs = './src/admin.js';
const appHtml    = './public/index.html';
const entry={
    index:appIndexJs,
    admin:appAdminJs
};
const output={
    filename: 'js/[name].[contenthash:8].chunk.js',
    path: path.join(__dirname, '../public/dist')
};
const plugins = [
    new HtmlWebpackPlugin({
        inject: true,
        chunks: ["index"],
        template: appHtml,
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ["admin"],
        template: appHtml,
        filename: 'admin.html',
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
      new CopyPlugin([

        { from: 'public/others/', to: './',force:true }
        
        ]),
      new CleanWebpackPlugin()
];
    // 配置相应的规则
    const rules=[
        {
            test: /\.css$/,
            use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader']
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
    ];
baseConfig.module.rules = rules;
baseConfig.plugins=plugins;
baseConfig.entry  =entry;
baseConfig.output = output;
module.exports = merge(baseConfig, {
	// 设置为生产模式
    mode: 'production'
});
