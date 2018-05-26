'use strict'

import path                     from 'path';
import HtmlPlugin               from 'html-webpack-plugin';
import CopyPlugin               from 'copy-webpack-plugin';
import CompressionPlugin        from 'compression-webpack-plugin';
import MiniCssExtractPlugin     from 'mini-css-extract-plugin';
import UglifyJsPlugin           from 'uglifyjs-webpack-plugin';

import config                   from './src/config';

const plugins = [
	new HtmlPlugin({
		template: path.resolve(__dirname, 'src/index.html'),
		filename: 'index.html',
		inject: 'body',
		excludeChunks: ['back'],
	}),
	new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0,
	}),
	new CopyPlugin([{
		from: 'asset/manifest.json',
		to: 'manifest.json',
	}, {
		from: 'asset/_locales',
		to: '_locales',
	}, {
		from: 'asset/twemoji',
		to: 'twemoji',
	}, {
		from: 'asset/*.png',
		to: '.',
		flatten: true,
	}]),
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[id].css',
	}),
];

if (!config.debug) {
	plugins.push(new UglifyJsPlugin({
		parallel: true,
		extractComments: true,
		uglifyOptions: {
			output: {
				comments: false,
			},
		},
	}));
}

export default {
	entry: {
		front: path.resolve(__dirname, 'src/front.js'),
		back: path.resolve(__dirname, 'src/back.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		sourceMapFilename: '[name].map',
		pathinfo: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'./',
			'./asset/',
			'./node_modules/',
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						"react",
						[
							"env", {
								targets: {
									node: "current",
									browsers: [
										"last 3 Chrome versions"
									]
								}
							}
						]
					],
					plugins: [
						'transform-runtime',
						'transform-class-properties',
						"transform-object-rest-spread",
					],
				},
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			}, {
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4,
							},
						},
					},
				],
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				loaders: [
					'url-loader',
				],
			}, {
				test: /\.html$/i,
				loader: 'raw-loader!html-minifier-loader'
			}
		],
	},
	plugins,
	mode: config.debug ? 'development' : 'production',
	devtool: config.debug ? 'source-map' : undefined,
};
