export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'nuxt',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{
				charset: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: '',
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~layouts/global.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{
			src: '~/plugins/lazysizes.client.js',
			ssr: false,
		},
		{
			src: '~/plugins/gsap.js',
			ssr: false,
		},
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['nuxt-responsive-loader'],

	responsiveLoader: {
		name: 'images/[name]-[width].[ext]',
		sizes: [320, 640, 768, 960, 1024, 1280, 1600, 1920],
		quality: 85,
		adapter: require('responsive-loader/sharp'),
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend(config, { isClient, loaders: { vue } }) {
			if (isClient) {
				vue.transformAssetUrls.img = ['data-src', 'src']
				vue.transformAssetUrls.source = ['data-srcset', 'srcset']
			}
		},
	},
}
