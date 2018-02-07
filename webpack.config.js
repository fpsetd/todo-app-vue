const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		app: './js/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js?v=[hash]'
	},
	resolve: {
		extensions: ['.vue', '.js', '.css']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			}, {
				test: /\.vue$/,
				use: ['vue-loader']
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css?v=[contenthash]',
		}),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	]
}
