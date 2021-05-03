<template>
	<div v-if="chartdata" class="set-relative">
		<pie-chart
			:donut="true"
			:legend="true"
			:colors="colors"
			:data="chartdata"
			class="pie-chart"
			:library="options"
		>
		</pie-chart>
		<span class="tag shift-up is-unselectable">Total: {{ total_sum }}</span>
	</div>
</template>

<script>
import { forEach } from 'lodash'

export default {
	data: () => ({
		chartdata: null,
		colors: [ '#087FD2', '#E26EA5', '#F45564', '#FF8F41', '#FFC748', '#99CC66', '#00C46C', '#00C8B5', '#01BFEA', '#AA50B5' ],
		total_sum: 0,
		options: {
			animation: {
				animateRotate: true
			},
			tooltips: {
				bodyFontSize: 14,
				bodyFontStyle: 700,
				bodyFontFamily: 'Averta',
				bodySpacing: 14,
				callbacks: {
					title: function() {},
					label: function(tooltipItem, data) {
						let value = data.datasets[0].data[tooltipItem.index]
						let name = data.labels[tooltipItem.index].split(' ')[0]
						let labels = `${name}: ${value}`
						return labels
					}
				}
			},
			legend: {
				labels: {
					fontSize: 14,
					fontStyle: 500,
					usePointStyle: true,
					fontFamily: 'Averta',
				}
			},
		}
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
				let sum = 0
				forEach(data, (d,i)=> temp[i.split('Insacog_')[1] + ` (${d})`] = d)
				forEach(data, (d,i)=> sum = sum + d)
				this.total_sum = sum
				this.chartdata = temp
				console.log(this.chartdata)
			}
		},
	},
	mounted() {
		this.$nextTick(()=>{
			this.get_chartdata()
		})
	}
};
</script>

<style scoped>
.set-relative {
	position: relative;
}
.shift-up {
	position: absolute;
	top: 55%;
	left: 42.5%;
	z-index: -1;
}
</style>
