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
import { forEach } from 'lodash'

export default {
	data: () => ({
		chartdata: null,
		colors: [ '#087FD2', '#E26EA5', '#F45564', '#FF8F41', '#FFC748', '#00C46C', '#50B98C', '#00C8B5', '#01BFEA', '#AA50B5' ]
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
				let temp = {}
				forEach(data, (d,i)=> temp[i.split('Insacog_')[1]] = d)
				this.chartdata = temp
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
