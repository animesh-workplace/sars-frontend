<template>
	<vs-navbar color="#D5CABD" v-model="active" class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless">
		<template #left>
			<nuxt-link  to="/upload">
				<div class="is-size-4-5 has-text-weight-semibold is-inline has-text-grey-darker">INSACOG</div>
				<div class="is-size-4-5 is-inline has-text-grey-dark">DataHub</div>
			</nuxt-link>
		</template>

		<div v-for="(menu, index) in navbar_data" :key="index">
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
				<span
					:class="active == menu.name ? 'is-size-6 has-text-weight-semibold' : 'is-size-6 has-text-weight-semibold'"
				>
					{{ menu.name }}
				</span>
			</vs-navbar-item>
		</div>

		<template #right>
			<client-only>
				<div>
					<div class="button is-success mr-2" @click="download">
						<span>Download</span>
					</div>
				</div>
				<div>
					<div class="button is-danger mr-2" @click="logout">
						<span>Logout</span>
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
			{ name: 'Upload', link: '/upload' },
			{ name: 'Sequences', link: '/my_data' },
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
</style>
