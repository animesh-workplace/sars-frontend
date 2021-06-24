<template>
	<section class="hero is-fullheight">
		<div class="hero-body">
			<div class="container">
				<div class="column is-8 is-offset-2">
					<div class="box is-floating">
						WIP
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
	}),
	components: {
	},
	computed: {
		...mapFields([
			'active'
		]),
	},
	methods: {
	},
	beforeMount() {
		this.active = 'Dashboard'
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped></style>
