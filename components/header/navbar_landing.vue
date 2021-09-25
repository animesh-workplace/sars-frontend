<template>
	<div>
		<vs-navbar class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless">
			<template #left>
				<div v-if="!$device.isMobile">
					<nuxt-link to="/upload">
						<Logo class="image has-logo-size"/>
					</nuxt-link>
				</div>
			</template>

			<div v-show="$device.isMobile">
				<nuxt-link to="/upload">
					<Logo class="image has-logo-size"/>
				</nuxt-link>
			</div>

			<template #right>
				<div v-show="!$device.isMobile">
					<div
						@click="active = true" v-if="!$auth.loggedIn"
						class="button is-fullwidth is-inverted is-success mr-2"
					>
						<span>Login</span>
					</div>

					<div class="button is-fullwidth is-danger mr-2" v-if="$auth.loggedIn">
						<span>Logout</span>
					</div>
				</div>
				<div v-show="$device.isMobile">
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
			class="box box-width is-floating is-sticky has-background-theme is-radiusless mt-7"
		>
			<div class="menu has-text-centered is-inverted">
				<ul class="menu-list">
					<li @click="active = true" v-if="!$auth.loggedIn">
						<a>
							<svg class="icon has-fill-white">
								<use xlink:href="@/assets/images/icons/bds.svg#person-assign-g"></use>
							</svg>
							Login
						</a>
					</li>
					<li @click="active = true" v-if="$auth.loggedIn">
						<a>
							<svg class="icon has-fill-white">
								<use xlink:href="@/assets/images/icons/bds.svg#exit-g"></use>
							</svg>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>

		<vs-dialog v-model="active" overflow-hidden blur prevent-close width="35%">
			<template #header>
				<h3 class="is-size-4 has-text-weight-medium mt-4">
					Log into <b>INSACOG</b> DataHub
				</h3>
			</template>
			<LoginLayout/>
		</vs-dialog>

	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_datahub_logo_white.svg?inline'
import LoginLayout from '@/components/authentication/login-layout.vue'

export default {
	data: () => ({
		active: false,
		add_shadow: false,
		dropdown_menu: false,
		is_authenticated: false,
	}),
	computed: {
	},
	components: {
		Logo,
		LoginLayout,
	},
	beforeMount() {
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
