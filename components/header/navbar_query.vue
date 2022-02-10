<template>
	<div>
		<vs-navbar
			class="py-3 px-0 box is-floating is-sticky has-background-theme is-radiusless"
			:key="id"
		>
			<template #left>
				<div v-if="!$device.isMobile">
					<nuxt-link to="/">
						<Logo class="image has-logo-size" />
					</nuxt-link>
				</div>
			</template>

			<div v-if="$device.isMobile" class="has-text-centered">
				<nuxt-link to="/">
					<Logo class="image has-logo-size" />
				</nuxt-link>
			</div>

			<div
				v-if="$auth.loggedIn && !$device.isMobile"
				:class="
					show_download ? 'are-you-able-to-see-this' : 'shift-center'
				"
			>
				<vs-navbar-item
					v-for="(menu, index) in navbar_data"
					:key="index"
					:id="menu.name"
					:active="active == menu.name"
					:to="menu.link"
				>
					<svg class="icon has-fill-white is-clickable">
						<use
							:xlink:href="
								require('@/assets/images/icons/bds.svg') +
								`#${menu.icon}`
							"
						></use>
					</svg>
					<span
						v-if="!$device.isMobile"
						:class="
							active == menu.name
								? 'is-size-6 has-text-weight-semibold has-text-white'
								: 'is-size-6 has-text-weight-semibold has-text-light'
						"
					>
						&nbsp;{{ menu.name }}
					</span>
				</vs-navbar-item>
			</div>

			<template #right>
				<div class="level mb-0" v-show="!$device.isMobile">
					<div
						@click="activate_login"
						v-if="!$auth.loggedIn"
						class="button is-fullwidth is-inverted is-success mr-2"
					>
						<span>Login</span>
					</div>

					<div
						class="button is-fullwidth mr-2 no-pointer is-small"
						v-if="$auth.loggedIn"
					>
						<svg class="icon has-fill-white">
							<use
								xlink:href="@/assets/images/icons/bds.svg#person-g"
							></use>
						</svg>
						<span class="has-text-white">{{ $auth.user }}</span>
					</div>

					<div
						class="field has-addons mb-0 mr-2"
						v-show="$auth.loggedIn && show_download"
					>
						<vs-tooltip bottom color="#065F9E">
							<div
								class="button is-fullwidth is-success"
								@click="download"
							>
								<svg class="icon has-fill-white">
									<use
										xlink:href="@/assets/images/icons/bds.svg#export-g"
									></use>
								</svg>
								<span>Download all</span>
							</div>
							<template #tooltip>
								<p class="has-text-weight-semibold">
									This downloads the metadata and sequences
									from all institutes
								</p>
								<p
									class="has-text-weight-semibold has-text-centered"
								>
									{{ last_updated }}
								</p>
							</template>
						</vs-tooltip>
					</div>

					<div
						class="button is-fullwidth is-danger mr-2"
						v-if="$auth.loggedIn"
						@click="logout"
					>
						<span>Logout</span>
					</div>
				</div>

				<div v-show="$device.isMobile">
					<div
						class="button is-square is-borderless"
						@click="open_dropdown_menu"
					>
						<svg class="icon has-fill-white">
							<use
								xlink:href="@/assets/images/icons/bds.svg#dots-vert-g"
							></use>
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
					{{
						$auth.user
					}}
					<li @click="activate_login" v-if="!$auth.loggedIn">
						<a>
							<svg class="icon has-fill-white">
								<use
									xlink:href="@/assets/images/icons/bds.svg#person-assign-g"
								></use>
							</svg>
							Login
						</a>
					</li>
					<li v-if="$auth.loggedIn" @click="change_page('upload')">
						<a>
							<svg class="icon has-fill-white">
								<use
									xlink:href="@/assets/images/icons/bds.svg#share-g"
								></use>
							</svg>
							Upload
						</a>
					</li>
					<li v-if="$auth.loggedIn" @click="change_page('my_data')">
						<a>
							<svg class="icon has-fill-white">
								<use
									xlink:href="@/assets/images/icons/bds.svg#timelines-g"
								></use>
							</svg>
							Sequences
						</a>
					</li>
					<li @click="logout" v-if="$auth.loggedIn">
						<a>
							<svg class="icon has-fill-white">
								<use
									xlink:href="@/assets/images/icons/bds.svg#exit-g"
								></use>
							</svg>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>

		<vs-dialog
			v-model="login_active"
			overflow-hidden
			blur
			prevent-close
			width="35%"
		>
			<template #header>
				<h3 class="is-size-4 has-text-weight-medium mt-4">
					Log into <b>INSACOG</b> DataHub
				</h3>
			</template>
			<LoginLayout v-model="login_active" />
		</vs-dialog>
	</div>
</template>

<script>
import { map } from 'lodash'
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_queryhub_logo_white.svg?inline'
import LoginLayout from '@/components/authentication/login-layout.vue'

export default {
	data: () => ({
		add_shadow: false,
		login_active: false,
		dropdown_menu: false,
		is_authenticated: false,
		id: Date.now() + Math.floor(Math.random() * 10000 + 1),
		navbar_data: [
			{ name: 'Upload', link: '/upload', icon: 'share-g' },
			{ name: 'Sequences', link: '/my_data', icon: 'timelines-g' },
		],
	}),
	computed: {
		...mapFields(['active']),
		...mapFields('user-info-store', ['download_link', 'show_download']),
		last_updated() {
			let text = `Last updated: ${this.$dayjs(
				this.download_link.last_updated
			).format('DD-MM-YYYY hh:mm A')}`
			return text
		},
	},
	components: {
		Logo,
		LoginLayout,
	},
	watch: {
		login_active(value) {
			this.id = Date.now() + Math.floor(Math.random() * 10000 + 1)
		},
	},
	beforeMount() {},
	mounted() {
		this.is_authenticated = this.$auth.loggedIn
	},
	methods: {
		change_page(page) {
			this.$router.push(`/${page}`)
		},
		activate_login() {
			this.login_active = true
			this.id = Date.now() + Math.floor(Math.random() * 10000 + 1)
		},
		logout() {
			this.$store.dispatch('user-info-store/user_logout')
			this.id = Date.now() + Math.floor(Math.random() * 10000 + 1)
		},
		open_dropdown_menu() {
			this.dropdown_menu = !this.dropdown_menu
		},
		async download() {
			if (this.show_download) {
				this.loader = this.$vs.loading()
				await this.$store.dispatch('user-info-store/set_download_link')
				let link = document.createElement('a')
				link.target = '_blank'
				link.href = this.download_link.link
				link.click()
				this.loader.close()
			} else {
				this.$vs.notification({
					sticky: true,
					color: 'danger',
					duration: 'none',
					position: 'top-center',
					title: 'Well, would you look at that!!',
					text: "This doesn't work for you, don't try to be smart.",
				})
			}
		},
		download_limit() {
			this.loader = this.$vs.loading({
				type: 'border',
				text: 'Fetching data...',
				color: '#ffffff',
				background: '#020202',
			})
			this.$store.dispatch('websocket_send', {
				type: 'MY_DOWNLOAD',
				filter: {
					period: this.selected_time_period.period,
					value: this.selected_time_period.value,
					from: this.selected_time_period.from,
				},
			})
			this.loader.close()
		},
	},
}
</script>

<style scoped>
.has-logo-size {
	width: 98%;
	max-height: 44px;
	max-width: 350px;
}
.box {
	border-radius: 0 0 0.75em 0.75em;
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
	margin-top: 4.2rem !important;
}
.box-width {
	width: 100%;
	z-index: 9999;
}
.shift-center {
	margin-right: 15vw;
}
.no-pointer {
	pointer-events: none;
}
</style>
