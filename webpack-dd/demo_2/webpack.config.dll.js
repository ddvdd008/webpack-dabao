//webpack-base
/*单页面webpack+react页面配置*/
const path = require('path');
const webpack = require('webpack');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PATHS = require('./PATHS');
let dllConfig = {
	entry:{
		vendors:['react',
		'redux',
		'react-dom',
		'react-redux',
		'react-router',
		'antd/dist/antd.min.css',
		PATHS.ASSETS.join('common.scss')]
    },
    module:{
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader?sourceMap'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
			})
        }]
    },
	output:{
         path:PATHS.DIST,//打包编译完的文件根目录
         filename: "js/[name].js",//打包编译完文件路径和名称
         library: '[name]',
	},
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
			// assetNameRegExp: /.css$/g,
			// cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
        }),
         //webpack3.0以上
        new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ]
};
module.exports = dllConfig;
