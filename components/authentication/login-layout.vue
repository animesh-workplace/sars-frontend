<template>
	<div :key="id">
<!-- 		<div class="has-text-centered my-4">
			<h3 class="title is-3 has-text-black is-spaced has-text-weight-semibold">
				Login
			</h3>
		</div> -->
		<Username v-model="username" register/>
		<Password v-model="password" @keyup.enter.native="submit_login_data"/>
		<div class="column is-6 is-offset-3 mt-2">
			<div class="button is-info is-fullwidth" :disabled="enable_submit" @click="submit_login_data">
				<span>Sign in</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import ForgotPassword from './forgot-password-modal.vue'
import Username from '@/components/form-controls/username-form-control.vue'
import Password from '@/components/form-controls/password-form-control.vue'

export default {
	data: () => ({
		username: {},
		password: {},
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
	}),
	components: {
		Username,
		Password,
		ForgotPassword
	},
	computed: {
		enable_submit() {
			if(this.username.validation && this.password.validation) {
				return false
			}
			return true
		},
	},
	methods: {
		async submit_login_data() {
			if(!this.enable_submit) {
				const loading = this.$vs.loading({
					color: '#ffffff',
					text: 'Loading...',
					background: '#020202',
				})
				let logininfo = {
					username: this.username.value,
					password: this.password.value
				}
				await this.$store.dispatch('user-info-store/user_login', logininfo)
				this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
				loading.close()
				this.$emit('input', false)
				this.$router.push('/upload')
			}
		},
	},
};
</script>

<style scoped></style>
