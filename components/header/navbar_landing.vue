<template>
	<div>
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
				<div v-show="$screen.breakpoint != 'mobile'">
					<div class="button is-outlined is-inverted is-success mr-2">
						<span>Login</span>
					</div>

					<div class="button is-inverted is-info mr-2">
						<span>Get Started</span>
					</div>
				</div>
				<div v-show="$screen.breakpoint == 'mobile'">
					<div class="button is-square is-borderless" @click="open_dropdown_menu">
						<svg class="icon has-fill-white">
							<use xlink:href="@/assets/images/icons/bds.svg#dots-vert-g"></use>
						</svg>
					</div>


				</div>
			</template>
		</vs-navbar>

		<div
			v-if="dropdown_menu"
			class="box box-width is-floating is-sticky has-background-green is-radiusless mt-7"
		>
			<div class="menu has-text-centered is-inverted">
				<ul class="menu-list">
					<li>
						<a>
							<svg class="icon has-fill-white">
								<use xlink:href="@/assets/images/icons/bds.svg#person-assign-g"></use>
							</svg>
							Login
						</a>
					</li>
					<li>
						<a>
							<svg class="icon has-fill-white">
								<use xlink:href="@/assets/images/icons/bds.svg#badge-g"></use>
							</svg>
							Register
						</a>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_datahub_logo_white.svg?inline'

export default {
	data: () => ({
		add_shadow: false,
		mobile_device: false,
		dropdown_menu: false,
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
		open_dropdown_menu() {
			this.dropdown_menu = !this.dropdown_menu
		}
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
.mt-7 {
	margin-top: 4.2rem!important;
}
.box-width {
	width: 100%;
	z-index: 9999;
}
</style>
