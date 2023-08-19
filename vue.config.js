const { defineConfig } = require('@vue/cli-service')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const path = require('path')

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: process.env.NODE_ENV === 'production'
		? '/dist/'
		: '/',

	pwa: {
		name: 'Погода',
		themeColor: 'transparent',
		msTileColor: '#3C6EAA',
		manifestOptions: {
			display: 'standalone',
			theme_color: 'transparent',
			background_color: '#3C6EAA'
		},
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/service-worker.js'
		}
	},

	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/scss/index.scss";`
			},
		},
	},

	devServer: {
		client: {
			webSocketURL: 'auto://0.0.0.0:0/ws'
		},
	},

	chainWebpack: config => {
		const svgInlinePath = path.resolve(__dirname, 'src/assets/img/svg-inline')

		config.module
			.rule('svg')
			.exclude.add(svgInlinePath)
			.end()

		config.module
			.rule('svg-inline')
			.include.add(svgInlinePath)
			.end()
			.test(/\.svg$/)
			.use('html-loader')
			.loader('html-loader')
			.options({
				esModule: false
			})

		config.plugin('preload-assets').use(PreloadWebpackPlugin, [
			{
				rel: 'preload',
				include: path.resolve(__dirname, 'src/assets'),
				as(entry) {
					if (/\.css(\?.*)?$/i.test(entry)) return 'style';
					if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(entry)) return 'font';
					if (/\.(png|jpe?g|gif)(\?.*)?$/i.test(entry)) return 'image';
					if (/\.svg(\?.*)?$/i.test(entry)) return 'image/svg+xml';
					return 'script';
				}
			}
		])
	}
})