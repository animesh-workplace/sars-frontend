<template>
	<vs-navbar class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless">
		<template #left>
			<div v-if="$screen.breakpoint != 'mobile'">
				<nuxt-link to="/upload">
					<Logo class="image has-logo-size"/>
				</nuxt-link>
			</div>
		</template>

		<div v-show="mobile_device || $screen.breakpoint == 'mobile'">
			<nuxt-link to="/upload">
				<Logo class="image has-logo-size"/>
			</nuxt-link>
		</div>

		<template #right>
			<div v-if="$screen.breakpoint != 'mobile'">
				<div class="button is-outlined is-inverted is-success mr-2">
					<span>Login</span>
				</div>

				<div class="button is-inverted is-info mr-2">
					<span>Get Started</span>
				</div>
			</div>
			<div v-else>

			</div>
		</template>
	</vs-navbar>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_datahub_logo_white.svg?inline'

export default {
	data: () => ({
		mobile_device: false,
		add_shadow: false,
		navbar_data: [
			// { name: 'Home', link: '/' },
			// { name: 'Upload', link: '/upload', icon: 'share-g' },
			// { name: 'Sequences', link: '/my_data', icon: 'timelines-g' },
			// { name: 'Dashboard', link: '/dashboard', icon: 'segment-g' },
		],
		is_authenticated: false,
	}),
	computed: {
	},
	components: {
		Logo,
	},
	beforeMount() {
		this.mobile_device = this.$screen.breakpoint == 'mobile'
	},
	mounted() {
		this.is_authenticated = this.$auth.loggedIn
	},
	methods: {
		logout() {
			this.$store.dispatch('user-info-store/user_logout')
		},
	}
};
</script>

<style scoped>
.has-logo-size {
	width: 350px;
	max-height: 44px;
	max-width: 350px;
}
.box {
	border-radius: 0 0 .75em .75em;
}
.is-sticky {
	top: 0;
	position: fixed;
	transition: top 2s linear;
}
.has-background-theme {
	background: #0a2d4d;
}
</style>
