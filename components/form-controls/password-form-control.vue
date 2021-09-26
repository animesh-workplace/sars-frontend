<template>
	<ValidationObserver v-slot="{ invalid, pristine, valid }">
		<ValidWatcher :valid="valid" @change="onInput($event)"/>
		<ValidationProvider
			name="password"
			v-slot="{ errors }"
			:rules="register ? 'required|passwd|confirmed:confirmation' : 'required|passwd'"
		>
			<div class="columns">
				<div class="column">
					<label :for="id1" class="label">Password</label>
					<div class="control has-icons-left has-icons-right">
						<input
							:id="id1"
							:type="hasvisiblepassword ? 'text' : 'password'"
							v-model="value"
							@input="onInput(valid)"
							:class="'input'.concat(pristine ? '' : (valid ? ' is-success' : ' is-danger'))"
						>
						<svg class="icon is-left is-clickable has-fill-blue-dark" v-if="show_icon1" @click="hasvisiblepassword = !hasvisiblepassword">
							<use xlink:href="@/assets/images/icons/bds.svg#eye-g" v-if="hasvisiblepassword"></use>
							<use xlink:href="@/assets/images/icons/bds.svg#eye-hide-g" v-else></use>
						</svg>
						<svg class="icon is-left" v-else>
							<use xlink:href="@/assets/images/icons/bds.svg#password"></use>
						</svg>
						<svg class="icon is-right has-fill-green" v-if="valid">
							<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
						</svg>
						<div class="icon is-right is-clickable" v-if="invalid">
							<b-tooltip
								animated
								multilined
								:delay="100"
								size="is-medium"
								type="is-danger"
								position="is-top"
								:label="errors[0]"
							>
								<svg class="image is-20x20 has-fill-red">
									<use xlink:href="@/assets/images/icons/bds.svg#info-bold-g"></use>
								</svg>
							</b-tooltip>
						</div>
					</div>
				</div>
			</div>
		</ValidationProvider>

		<ValidationProvider vid="confirmation" v-if="register">
			<div class="mt-2">
				<label :for="id2" class="label">Confirm Password</label>
				<div class="control has-icons-left has-icons-right">
					<input
						:id="id2"
						:type="hasvisiblepassword ? 'text' : 'password'"
						v-model="value2"
						@input="onInput(valid)"
						:class="'input'.concat(pristine ? '' : (valid ? ' is-success' : ' is-danger'))"
					>
					<svg class="icon is-left is-clickable has-fill-blue-dark" v-if="show_icon2" @click="hasvisiblepassword = !hasvisiblepassword">
						<use xlink:href="@/assets/images/icons/bds.svg#eye-g" v-if="hasvisiblepassword"></use>
						<use xlink:href="@/assets/images/icons/bds.svg#eye-hide-g" v-else></use>
					</svg>
					<svg class="icon is-left" v-else>
						<use xlink:href="@/assets/images/icons/bds.svg#password"></use>
					</svg>
					<svg class="icon is-right has-fill-green" v-if="valid">
						<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
					</svg>
				</div>
			</div>
		</ValidationProvider>
	</ValidationObserver>
</template>

<script>
import ValidWatcher from './valid-watcher.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

export default {
	props: {
		register: {
			type: Boolean
		}
	},
	data: () => ({
		value: '',
		value2: '',
		id1: Date.now() + Math.floor(Math.random()*10000 + 1),
		id2: Date.now() + Math.floor(Math.random()*10000 + 1),
		show_icon1: false,
		show_icon2: false,
		hasvisiblepassword: false,
	}),
	components: {
		ValidWatcher,
		ValidationProvider,
		ValidationObserver
	},
	methods: {
		onInput(valid) {
			this.show_icon1 = this.value == '' ? false : true
			this.show_icon2 = this.value2 == '' ? false : true
			let data = {
				value: this.value,
				value2: this.value2,
				validation: valid
			}
			this.$emit('input', data)
		},
	},
	computed: {
	},
	mounted() {
		this.$validator.extend('passwd', {
			getMessage: field => {
				return `Password requires atleast
							1 Capital Letter,
							1 Small Letter,
							1 Special Character,
							1 Number and
							length should be greater than 6`
			},
			validate: value => {
				let progress = 0
				if(/\d/.test(value)){
					progress += 20
				}
				if(/(.*[A-Z].*)/.test(value)){
					progress += 20
				}
				if(/(.*[a-z].*)/.test(value)){
					progress += 20
				}
				if(/[^A-Za-z0-9]/.test(value)){
					progress += 20
				}
				if(value.length >= 6){
					progress += 20
				}
				if(progress >= 100) {
					progress = 100
					return true
				}
				return false
			}
		})
	}
};
</script>

<style scoped>
.icon {
	pointer-events: all !important;
}
.is-20x20 {
	height: 18px;
	width: 18px;
}
</style>
