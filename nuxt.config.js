export default {
	target: 'server',
	loading: false,
	server: {
		port: 3002,
		// host: '0.0.0.0',
	},
	/*
	 ** Headers of the page
	 ** See https://nuxtjs.org/api/configuration-head
	 */
	head: {
		title: 'INSACOG DataHub | National Institute of Biomedical Genomics',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content:
					'INSACOG (Indian SARS-CoV-2 Consortium on Genomics or Indian SARS-CoV-2 Genetics Consortium) is the forum set up under the Ministry of Health and Family Welfare by the Government of India on 25 December 2020, to study and monitor genome sequencing and virus variation of circulating strains of COVID-19 in India. INSACOG works as a consortium of 10 national laboratories for genome sequencing located in different parts of India. All these 10 laboratories are required to share 5% of positive samples to INSACOG Data Hub for further research and studies. This is a national genomic sequencing database (INSACOG Data-Hub) center are appointed at National Institute of Biomedical Genomics (NIBMG)',
			},
			// Open Graph / Facebook
			{
				hid: 'og:type',
				name: 'og:type',
				property: 'og:type',
				content: 'Website',
			},
			{
				hid: 'og:url',
				name: 'og:url',
				property: 'og:url',
				content: 'https://research.nibmg.ac.in/insacog/',
			},
			{
				hid: 'og:title',
				name: 'og:title',
				property: 'og:title',
				content:
					'INSACOG DataHub | National Institute of Biomedical Genomics',
			},
			{
				hid: 'og:description',
				name: 'og:description',
				property: 'og:description',
				content:
					'INSACOG (Indian SARS-CoV-2 Consortium on Genomics or Indian SARS-CoV-2 Genetics Consortium) is the forum set up under the Ministry of Health and Family Welfare by the Government of India on 25 December 2020, to study and monitor genome sequencing and virus variation of circulating strains of COVID-19 in India. INSACOG works as a consortium of 10 national laboratories for genome sequencing located in different parts of India. All these 10 laboratories are required to share 5% of positive samples to INSACOG Data Hub for further research and studies. This is a national genomic sequencing database (INSACOG Data-Hub) center are appointed at National Institute of Biomedical Genomics (NIBMG)',
			},
			{
				hid: 'og:image',
				name: 'og:image',
				property: 'og:image',
				content:
					'https://repository-images.githubusercontent.com/342469060/849ca85d-e631-4ab1-83d0-55f78fc9c616',
			},
			// Twitter
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				property: 'twitter:card',
				content: 'summary_large_image',
			},
			{
				hid: 'twitter:url',
				name: 'twitter:url',
				property: 'twitter:url',
				content: 'https://research.nibmg.ac.in/insacog/',
			},
			{
				hid: 'twitter:title',
				name: 'twitter:title',
				property: 'twitter:title',
				content:
					'INSACOG DataHub | National Institute of Biomedical Genomics',
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				property: 'twitter:description',
				content:
					'INSACOG (Indian SARS-CoV-2 Consortium on Genomics or Indian SARS-CoV-2 Genetics Consortium) is the forum set up under the Ministry of Health and Family Welfare by the Government of India on 25 December 2020, to study and monitor genome sequencing and virus variation of circulating strains of COVID-19 in India. INSACOG works as a consortium of 10 national laboratories for genome sequencing located in different parts of India. All these 10 laboratories are required to share 5% of positive samples to INSACOG Data Hub for further research and studies. This is a national genomic sequencing database (INSACOG Data-Hub) center are appointed at National Institute of Biomedical Genomics (NIBMG)',
			},
			{
				hid: 'twitter:image',
				name: 'twitter:image',
				property: 'twitter:image',
				content:
					'https://repository-images.githubusercontent.com/342469060/849ca85d-e631-4ab1-83d0-55f78fc9c616',
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: `${process.env.ROUTER_BASE}/favicon.ico`,
			},
		],
		// script: [
		// 	{
		// 		async: true,
		// 		defer: true,
		// 		type: 'text/javascript',
		// 		src: 'https://research.nibmg.ac.in/umami/umami.js',
		// 		'data-website-id': '299b2805-f1e4-43a0-b240-e27c7eb5c27b',
		// 	},
		// ],
	},
	/*
	 ** Global CSS
	 */
	css: [
		// 'animate.css/animate.css',
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
		'@/plugins/vue-typed',
		'@/plugins/vue-moment',
		'@/plugins/v-clipboard',
		'@/plugins/vue-composition',
		'@/plugins/v-click-outside',
		{ src: '@/plugins/vue-chart', ssr: false },
		{ src: '@/plugins/vue-flickity', ssr: false },
		{ src: '@/plugins/vue-websocket', ssr: false },
		{ src: '@/plugins/vue-localstorage', ssr: false },
		{ src: '@/plugins/vue-sessionstorage', ssr: false },
	],
	/*
	 ** Auto import components
	 ** See https://nuxtjs.org/api/configuration-components
	 */
	components: false,
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: ['@nuxtjs/svg', '@nuxtjs/device', '@nuxtjs/style-resources'],
	device: {
		refreshOnResize: true,
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/auth',
		'@nuxtjs/axios',
		'nuxt-validate',
		'@nuxtjs/dayjs',
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
	},
	/*
	 ** Nuxt router module configuration
	 */
	router: {
		base: process.env.ROUTER_BASE,
	},
	/*
	 ** Nuxt auth module configuration
	 */
	auth: {
		localStorage: false,
		cookie: {
			options: {
				expires: 7,
			},
		},
		strategies: {
			local: {
				endpoints: {
					user: false,
					logout: false,
					login: { url: '/', method: 'post', propertyName: 'token' },
				},
				tokenType: 'JWT',
				tokenRequired: true,
			},
		},
		redirect: {
			home: '/upload',
			callback: false,
			login: '/',
			logout: '/',
		},
	},
	/*
	 ** Build configuration
	 ** See https://nuxtjs.org/api/configuration-build/
	 */
	build: {
		transpile: [/echarts/, /zrender/],
		babel: {
			plugins: [
				['@babel/plugin-proposal-optional-chaining', { loose: true }],
				[
					'@babel/plugin-proposal-nullish-coalescing-operator',
					{ loose: true },
				],
			],
		},
	},
}
