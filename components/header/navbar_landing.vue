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

			<div v-if="$device.isMobile" class="has-text-centered">
				<nuxt-link to="/">
					<Logo class="image has-logo-size"/>
				</nuxt-link>
			</div>

			<div v-if="$auth.loggedIn && !$device.isMobile" :class="show_download ? 'are-you-able-to-see-this' : 'shift-center'">
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
				<div class="level mb-0" v-show="!$device.isMobile">
					<div
						@click="activate_login" v-if="!$auth.loggedIn"
						class="button is-fullwidth is-inverted is-success mr-2"
					>
						<span>Login</span>
					</div>

					<div class="field has-addons mb-0 mr-2" v-show="$auth.loggedIn && show_download" v-click-outside="handleBlur">
						<div class="control">
							<div class="button is-fullwidth is-success" @click="download">
								<svg class="icon has-fill-white">
									<use xlink:href="@/assets/images/icons/bds.svg#export-g"></use>
								</svg>
								<span>Download all</span>
							</div>
						</div>

						<div class="control">
							<div
								:class="time_dropdown ? 'dropdown is-iconless is-right is-active' : 'dropdown is-iconless is-right'"
							>
								<div class="dropdown-trigger">
									<div
										@click="activate_time_dropdown"
										:class="time_dropdown ? 'button has-background-success-dark' : 'button has-background-success'"
									>
										<svg class="icon has-fill-white">
											<use xlink:href="@/assets/images/icons/bds.svg#arrow-down-g"></use>
										</svg>
									</div>
								</div>
								<div class="dropdown-menu">
									<div class="dropdown-content width-adjust p-3">
										<p class="has-text-weight-medium is-size-5 has-text-centered">
											Limit your download to last
										</p>
										<div class="level my-2">
											<input
												type="number"
												placeholder="Enter Period"
												class="input is-small has-rounded-input mr-2"
											>
											<div class="dropdown is-hoverable is-size-6">
												<div class="dropdown-trigger">
													<div class="button has-rounded-input">
														<span class="has-text-weight-normal is-size-5">
															{{ !selected_time_period.pristine ? selected_time_period.period : 'Select Interval' }}
														</span>
													</div>
												</div>

												<div class="dropdown-menu width-100p">
													<div class="dropdown-content">
														<a
															v-for="(time, index) in time_period"
															:class="time.active ? 'dropdown-item is-active has-text-weight-semibold has-text-black mb-1' : 'dropdown-item mb-1'"
															@click="select_time_period(time.name, index)"
														>
															{{ time.name }}
														</a>
													</div>
												</div>
											</div>
										</div>

										<div class="has-text-centered mb-2">
											<div class="button is-light has-rounded-input">
												<span>Download</span>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
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
					<li @click="activate_login" v-if="!$auth.loggedIn">
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

		<vs-dialog
			v-model="login_active" @close="login_closed"
			overflow-hidden blur prevent-close width="35%"
		>
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
import { map } from 'lodash'
import { mapFields } from 'vuex-map-fields'
import Logo from '@/assets/logo/insacog_datahub_logo_white.svg?inline'
import LoginLayout from '@/components/authentication/login-layout.vue'

export default {
	data: () => ({
		add_shadow: false,
		login_active: false,
		dropdown_menu: false,
		time_dropdown: false,
		is_authenticated: false,
		selected_time_period: {
			pristine: true,
			value: 0,
			period: ''
		},
		time_period: [
			{ name: 'Days', active: false },
			{ name: 'Months', active: false },
			{ name: 'Year', active: false },
		],
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
		navbar_data: [
			{ name: 'Upload', link: '/upload', icon: 'share-g' },
			{ name: 'Sequences', link: '/my_data', icon: 'timelines-g' },
		],
	}),
	computed: {
		...mapFields([
			'active'
		]),
		...mapFields('user-info-store',[
			'download_link',
			'show_download'
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
		activate_login() {
			this.login_active = true
			this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
		},
		login_closed() {
			this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
		},
		logout() {
			this.$store.dispatch('user-info-store/user_logout')
			this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
		},
		open_dropdown_menu() {
			this.dropdown_menu = !this.dropdown_menu
		},
		activate_time_dropdown() {
			if(this.show_download) {
				this.time_dropdown = !this.time_dropdown
			} else {
				this.$vs.notification({
					sticky: true,
					color: 'danger',
					duration: 'none',
					position: 'top-center',
					title: 'Well, would you look at that!!',
					text: "This doesn't work for you, don't try to be smart"
				})
			}
		},
		select_time_period(value, index) {
			this.selected_time_period.pristine = false
			this.selected_time_period.period = value
			map(this.time_period, d=>d.active = false)
			this.time_period[index].active = true
		},
		handleBlur() {
			this.time_dropdown = false
		},
		async download() {
			if(this.show_download) {
				this.loader = this.$vs.loading()
				await this.$store.dispatch('user-info-store/set_download_link')
				let link = document.createElement('a')
				link.target = '_blank'
				link.href = this.download_link
				link.click()
				this.loader.close()
			} else {
				this.$vs.notification({
					sticky: true,
					color: 'danger',
					duration: 'none',
					position: 'top-center',
					title: 'Well, would you look at that!!',
					text: "This doesn't work for you, don't try to be smart."
				})
			}
		}
	}
};
</script>

<style scoped>
.has-logo-size {
	width: 98%;
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
.width-adjust{
	width: 500px;
}
.has-rounded-input {
	border-radius: 0.25rem !important;
}
.width-100p {
	width: 100%;
}
</style>
