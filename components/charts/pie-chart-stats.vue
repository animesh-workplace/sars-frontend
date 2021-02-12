<template>
	<div v-if="chartdata">
		<pie-chart
			:donut="true"
			:legend="true"
			:colors="colors"
			:data="chartdata"
			class="pie-chart"
		>
		</pie-chart>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
	data: () => ({
		chartdata: null,
		colors: [ '#AA50B5', '#E26EA5', '#F45564', '#FF8F41', '#FFC748', '#00C46C', '#50B98C', '#00C8B5', '#01BFEA', '#087FD2' ]
	}),
	components: {
	},
	props: {
	},
	computed: {
	},
	methods: {
		async get_chartdata() {
			const data = await this.$axios.$post('/files/metadata-stats/')
			if(data.message == null) {
				this.chartdata = data
			}
		}
	},
	mounted() {
		this.$nextTick(()=>{
			this.get_chartdata()
		})
	}
};
</script>

<style scoped></style>
