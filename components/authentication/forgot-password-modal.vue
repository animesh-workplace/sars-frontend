<template>
	<vs-dialog v-model="activateforgotpasswordmodal" blur not-close>
		<template #header>
			<div class="has-text-centered my-5">
				<span class="title is-3 has-text-black is-spaced has-text-weight-semibold">
					Forgot Password
				</span>
				<hr class="is-visible is-soft">
				<span class="subtitle is-5 has-text-black is-spaced has-text-weight-normal">
					<p>Don't worry</p>
					<p>We just need to identify you</p>
				</span>
			</div>
		</template>

		<div>
			<Username v-model="username" register/>
		</div>

		<template #footer>
			<div class="footer-dialog has-text-centered pb-4 mt-2">
				<div class="button is-info" :disabled="enablesubmit" @click="submitform">
					<span>Send Password Reset Link</span>
				</div>
			</div>
		</template>
	</vs-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Username from '@/components/form-controls/username-form-control.vue'

export default {
	data: () => ({
		username: {}
	}),
	components: {
		Username,
	},
	computed: {
		...mapFields('user-info-store', [
			'activateforgotpasswordmodal',
		]),
		enablesubmit() {
			if(this.username.validation) {
				return false
			}
			return true
		},
	},
	methods: {
		async submitform() {
			if(!this.enablesubmit) {
				let forgot_password_info = {
					username: this.username.value
				}
				this.$store.dispatch('user-info-store/forgot_password_submit', forgot_password_info)
			}
		}
	}
};
</script>

<style scoped></style>
