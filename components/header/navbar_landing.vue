<template>
	<div>
		<vs-navbar class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless" :key="id">
			<template #left>
				<div v-if="!$device.isMobile">
					<nuxt-link to="/">
						<Logo class="image has-logo-size"/>
					</nuxt-link>
				</div>
			</template>

			<div v-if="$device.isMobile">
				<nuxt-link to="/">
					<Logo class="image has-logo-size"/>
				</nuxt-link>
			</div>

			<div v-if="$auth.loggedIn && !$device.isMobile" class="shift-center">
				<vs-navbar-item
					v-for="(menu, index) in navbar_data" :key="index"
					:id="menu.name" :active="active == menu.name" :to="menu.link"
				>
					<svg class="icon has-fill-white is-clickable">
						<use :xlink:href="require('@/assets/images/icons/bds.svg') + `#${menu.icon}`"></use>
					</svg>
					<span
						v-if="!$device.isMobile"
						:class="active == menu.name ? 'is-size-6 has-text-weight-semibold has-text-white' : 'is-size-6 has-text-weight-semibold has-text-light'"
					>
						&nbsp;{{ menu.name }}
					</span>
				</vs-navbar-item>
			</div>

			<template #right>
				<div v-show="!$device.isMobile">
					<div
						@click="login_active = true" v-if="!$auth.loggedIn"
						class="button is-fullwidth is-inverted is-success mr-2"
					>
						<span>Login</span>
					</div>

					<div class="button is-fullwidth is-danger mr-2" v-if="$auth.loggedIn" @click="logout">
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
					<li @click="logout" v-if="$auth.loggedIn">
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

		<vs-dialog v-model="login_active" overflow-hidden blur prevent-close width="35%">
			<template #header>
				<h3 class="is-size-4 has-text-weight-medium mt-4">
					Log into <b>INSACOG</b> DataHub
				</h3>
			</template>
			<LoginLayout v-model="login_active"/>
		</vs-dialog>

	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_datahub_logo_white.svg?inline'
import LoginLayout from '@/components/authentication/login-layout.vue'

export default {
	data: () => ({
		add_shadow: false,
		login_active: false,
		dropdown_menu: false,
		is_authenticated: false,
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
		navbar_data: [
			{ name: 'Upload', link: '/upload', icon: 'share-g' },
			{ name: 'Sequences', link: '/my_data', icon: 'timelines-g' },
			// { name: 'Dashboard', link: '/dashboard', icon: 'segment-g' },
		],
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
			this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
		},
		open_dropdown_menu() {
			this.dropdown_menu = !this.dropdown_menu
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
.shift-center {
	margin-right: 15vw;
}
</style>
