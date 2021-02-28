export default {
/*
** Nuxt rendering mode
** See https://nuxtjs.org/api/configuration-mode
*/
	mode: 'universal',
/*
** Nuxt target
** See https://nuxtjs.org/api/configuration-target
*/
	target: 'server',
	loading: false,
	// loading: {
	// 	color: 'blue',
	// 	height: '5px',
	// 	continuous: true,
	// },
/*
** Headers of the page
** See https://nuxtjs.org/api/configuration-head
*/
	head: {
		title: 'INSACOG DataHub',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
		script: [
			{ src: '' }
		],
	},
/*
** Global CSS
*/
	css: [
		'animate.css/animate.css',
		'vuesax/dist/vuesax.css',
		'biings-ds/build/bds.css',
		'static/css/style.css',
	],
/*
** Plugins to load before mounting the App
** https://nuxtjs.org/guide/plugins
*/
	plugins: [
		'@/plugins/vuesax',
		'@/plugins/vue-moment',
		{ src: '@/plugins/vue-chart', ssr: false },
		{ src: '@/plugins/vue-localstorage', ssr: false },
		{ src: '@/plugins/vue-sessionstorage', ssr: false },
	],
/*
** Auto import components
** See https://nuxtjs.org/api/configuration-components
*/
	components: true,
/*
** Nuxt.js dev-modules
*/
	buildModules: [
		'@nuxtjs/svg',
		'@nuxtjs/style-resources',
	],
/*
** Nuxt.js modules
*/
	modules: [
		'@nuxtjs/auth',
		'@nuxtjs/axios',
		'nuxt-validate',
		'@nuxtjs/dotenv',
		'cookie-universal-nuxt',
		['nuxt-buefy', { materialDesignIcons: false }],
	],
/*
** Axios module configuration
** See https://axios.nuxtjs.org/options
*/
	axios: {
		baseURL: process.env.BASE_URL,
	},
/*
** Nuxt validate module configuration
*/
	nuxtValidate: {
		lang: 'en',
		nuxti18n: {
			// rules: ["required", "min", "alpha"]
		}
	},
/*
** Nuxt router module configuration
*/
	router: {
		base: '/insacog/',
	// 	middleware: ['loggedIn']
	},
/*
** Nuxt content module configuration
*/
	// content: {
	// 	liveEdit: false
	// },
/*
** Nuxt auth module configuration
*/
	auth: {
		localStorage: false,
		cookie: {
			options: {
				expires: 7
			}
		},
		strategies: {
			local: {
				endpoints: {
					user: false,
					logout: false,
					login: { url: '/login/', method: 'post', propertyName: 'token' },
				},
				tokenType: 'JWT',
				tokenRequired: true,
			},
		},
		redirect: {
			home: '/upload',
			callback: false,
			login: '/login',
			logout: '/login',
		}
	},
/*
** Build configuration
** See https://nuxtjs.org/api/configuration-build/
*/
	build: {
	}
}
