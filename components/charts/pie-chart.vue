<template>
	<div>
		<p align="center" class="is-size-4 has-text-weight-semibold has-text-grey-dark">
			Sequence Upload Statistics
		</p>

		<v-chart
			class="chart"
			ref="pie-chart"
			:option="options"
			:loading="chart_loader"
			:loading-options="loader_option"
		/>
	</div>
</template>

<script>
import { forEach, sortBy, map, intersection } from "lodash"
import { use } from 'echarts/core'
import {
	LegendComponent,
	TooltipComponent,
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'

use([
	PieChart,
	CanvasRenderer,
	LegendComponent,
	TooltipComponent,
])

export default {
	data: () => ({
		total_sum: 0,
		chartdata: [],
		chart_loader: true,
		loader_option: {
			lineWidth: 3,
			fontSize: 14,
			fontWeight: 500,
			text: 'Loading',
			color: '#c23531',
			fontFamily: 'Averta',
			maskColor: '#f6f8f9',
		},
		options: {
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow'
				},
				transitionDuration: 0.1,
				borderColor: '#fff',
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				formatter: function(params) {
					return `<b>${params.name.split(' ')[0]}</b> : ${params.value} (${params.percent}%)`
				},
			},
			legend: {
				itemGap: 10,
				itemWidth: 20,
				itemHeight: 20,
				icon: 'circle',
				left: 'center',
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				}
			},
			series: [
				{
					type: 'pie',
					top: '15%',
					radius: ['35%', '70%'],
					avoidLabelOverlap: true,
					itemStyle: {
						borderWidth: 2,
						borderRadius: 5,
						borderColor: '#f6f8f9',
					},
					label: {
						show: true,
						fontSize: 18,
						formatter: '',
						fontWeight: 500,
						position: 'center',
						fontFamily: 'Averta',
					},
					emphasis: {
						label: {
							show: true,
						}
					},
					data: []
				}
			]
		}
	}),
	components: {
		VChart
	},
	provide: {
		[THEME_KEY]: "light"
	},
	props: {
		// ChartData: {
		// 	type: Object
		// },
	},
	watch: {},
	computed: {
	},
	methods: {
		async get_chartdata() {
			const data = await this.$axios.$post('https://research.nibmg.ac.in/insacog/api/files/metadata-stats/')
			if(data.message == null) {
				let temp = []
				let sum = 0
				forEach(data, (d,i)=> temp.push({
					name: i.split('Insacog_')[1] + ` (${d})`,
					value: d
				}))
				forEach(data, (d,i)=> sum = sum + d)
				this.total_sum = sum
				this.chartdata = temp
				this.$refs['pie-chart'].clear()
				this.options.series[0].data = this.chartdata
				this.options.series[0].label.formatter = `Total: ${this.total_sum.toLocaleString('en-EN')}`
			}
			this.chart_loader = false
		},
	},
	beforeMount() {
		this.get_chartdata()
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
	.chart {
		height: 550px;
	}
</style>
