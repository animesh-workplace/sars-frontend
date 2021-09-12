<template>
	<vs-navbar color="#D5CABD" v-model="active" class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless">
		<template #left>
			<nuxt-link  to="/upload">
				<div v-if="!$device.isMobile">
					<div class="is-size-4-5 has-text-weight-semibold is-inline has-text-grey-darker">INSACOG</div>
					<div class="is-size-4-5 is-inline has-text-grey-dark">DataHub</div>
				</div>
				<div v-else>
					<div class="is-size-4 has-text-weight-semibold is-inline has-text-grey-darker">INSACOG</div>
					<div class="is-size-4 is-inline has-text-grey-dark">DataHub</div>
				</div>
			</nuxt-link>
		</template>

		<div v-for="(menu, index) in navbar_data" :key="index">
			<client-only>
				<vs-navbar-group v-if="menu.submenu">
					<span
						:class="active == menu.name ? 'is-size-6 has-text-weight-semibold' : 'is-size-6 has-text-weight-semibold'"
					>
						{{ menu.name }}
					</span>
					<template #items>
						<vs-navbar-item v-for="(submenu, index_submenu) in menu.submenu" :key="index_submenu" :id="submenu.name" :active="active == submenu.name">
							<span
								:class="active == submenu.name ? 'has-text-weight-semibold' : 'has-text-weight-semibold has-text-grey-darker'"
							>
								<fa :icon="['fas', 'flask']"/>
								{{ submenu.name }}
							</span>
						</vs-navbar-item>
					</template>
				</vs-navbar-group>

				<vs-navbar-item :id="menu.name" :active="active == menu.name" :to="menu.link" v-else>
					<svg class="icon has-fill-black is-clickable">
						<use :xlink:href="require('@/assets/images/icons/bds.svg') + `#${menu.icon}`"></use>
					</svg>
					<span
						v-if="!$device.isMobile"
						:class="active == menu.name ? 'is-size-6 has-text-weight-semibold' : 'is-size-6 has-text-weight-semibold'"
					>
						&nbsp;{{ menu.name }}
					</span>
				</vs-navbar-item>
			</client-only>
		</div>

		<template #right>
			<client-only>
				<div>
					<div class="button is-success mr-2" @click="download">
						<svg class="icon has-fill-white">
							<use xlink:href="@/assets/images/icons/bds.svg#export-g"></use>
						</svg>
						<span v-if="!$device.isMobile">Download</span>
					</div>
				</div>
				<div>
					<div class="button is-danger mr-2" @click="logout">
						<svg class="icon has-fill-white">
							<use xlink:href="@/assets/images/icons/bds.svg#exit-g"></use>
						</svg>
						<span v-if="!$device.isMobile">Logout</span>
					</div>
				</div>
			</client-only>
		</template>
	</vs-navbar>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
	data: () => ({
		add_shadow: false,
		navbar_data: [
			// { name: 'Home', link: '/' },
			{ name: 'Upload', link: '/upload', icon: 'share-g' },
			{ name: 'Sequences', link: '/my_data', icon: 'timelines-g' },
			{ name: 'Dashboard', link: '/dashboard', icon: 'segment-g' },
		],
		is_authenticated: false,
	}),
	computed: {
		...mapFields([
			'active'
		]),
		...mapFields('user-info-store',[
			'download_link'
		])
	},
	components: {
	},
	mounted() {
		this.is_authenticated = this.$auth.loggedIn
	},
	methods: {
		logout() {
			this.$store.dispatch('user-info-store/user_logout')
		},
		async download() {
			this.loader = this.$vs.loading()
			await this.$store.dispatch('user-info-store/set_download_link')
			let link = document.createElement('a')
			link.target = '_blank'
			link.href = this.download_link
			link.click()
			this.loader.close()
		}
	}
};
</script>

<style scoped>
.is-128 {
	margin-top: -5%;
	max-height: 58px;
	max-width: 128px;
	width: 128px;
}
.box {
	border-radius: 0 0 .75em .75em;
}
.is-sticky {
	position: fixed;
	top: 0;
	transition: top 2s linear;
}
.has-background-theme {
	background: #D5CABD;
}
.is-size-4-5 {
	font-size: 1.45rem !important;
}
.icon {
	height:  1.4em;
	width:  1.4em;
}
</style>
