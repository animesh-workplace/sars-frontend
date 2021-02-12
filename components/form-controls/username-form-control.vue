<template>
	<ValidationObserver v-slot="{ invalid, pristine, valid }">
		<ValidWatcher :valid="valid" @change="onInput($event)"/>
		<ValidationProvider rules="required|min:4" v-slot="{ errors }" :name="register ? 'username' : 'username/email'">
			<div class="columns">
				<div class="column">
					<label :for="id" class="label">{{ register ? 'Username' : 'Username or Email' }}</label>
					<div class="control has-icons-left has-icons-right">
						<input
							:id="id"
							type="text"
							v-model="value"
							@input="onInput(valid)"
							:class="'input'.concat(pristine ? '' : (valid ? ' is-success' : ' is-danger'))"
						>
						<svg class="icon is-left">
							<use xlink:href="@/assets/images/icons/bds.svg#person-new-g" v-if="register"></use>
							<use xlink:href="@/assets/images/icons/bds.svg#person-g" v-else></use>
						</svg>
						<svg class="icon is-right has-fill-green" v-if="valid">
							<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
						</svg>
						<div class="icon is-right is-clickable" v-if="invalid">
							<b-tooltip
								animated
								multilined
								:delay="100"
								size="is-small"
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
	</ValidationObserver>
</template>

<script>
import ValidWatcher from './valid-watcher.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
	data: () => ({
		value: '',
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
	}),
	components: {
		ValidWatcher,
		ValidationProvider,
		ValidationObserver,
	},
	props: {
		register: {
			type: Boolean
		}
	},
	methods: {
		onInput(valid) {
			let data = {
				value: this.value,
				validation: valid
			}
			this.$emit('input', data)
		},
	},
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
