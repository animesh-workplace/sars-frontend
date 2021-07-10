<template>
	<div class="section px-0 pb-0 is-clipped">
		<iframe
			ref="nexstrain_iframe"
			src="https://nextstrain.org/community/animesh-workplace/INSACOG-DataHub/test"
		>
		</iframe>
	</div>
</template>

<script>
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'

export default {
	layout: 'normal',
	name: 'phylotree',
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

<style scoped>
	iframe {
		height: 92vh;
		width: 100vw;
	}
	.section {
		padding-top: 69px;
	}
	.is-clipped {
		overflow: hidden;
	}
</style>
