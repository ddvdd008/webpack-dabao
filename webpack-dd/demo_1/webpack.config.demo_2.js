//webpack-base
/*单页面webpack+react页面配置*/
const path = require('path');
const webpack = require('webpack');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = require('./PATHS');
let prdConfig = {
	entry:{
		app:'./index.js'
	},
	output:{
         path:PATHS.DIST,//打包编译完的文件根目录
         filename: "js/[name].js",//打包编译完文件路径和名称
         chunkFilename: 'js/[name].js',//按需加载的文件打包编译完路径
         publicPath: '/dist/',  
	},
	module:{
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=40000'
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader?sourceMap'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?sourceMap', 'sass-loader?sourceMap']})
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
        }),
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        })
    ]
};
module.exports = prdConfig;
