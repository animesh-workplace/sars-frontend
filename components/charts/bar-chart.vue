<template>
	<div>
		<v-chart
			class="chart"
			:option="options"
		/>
	</div>
</template>

<script>
import { use } from 'echarts/core'
import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'

use([
	BarChart,
	GridComponent,
	CanvasRenderer,
	LegendComponent,
	TooltipComponent,
])

export default {
	data: () => ({
		state_name: null,
		clicked: false,
		options: {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				borderColor: '#fff',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500
				}
			},
			legend: {
				data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					fontFamily: 'Averta',
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500
				}
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
				axisTick: {
					alignWithLabel: true
				}
			},
			series: [
				{
					name: 'Direct',
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: [320, 302, 301, 334, 390, 330, 320]
				},
				{
					name: 'Mail Ad',
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: 'Affiliate Ad',
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: 'Video Ad',
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: [150, 212, 201, 154, 190, 330, 410]
				},
				{
					name: 'Search Engine',
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: [820, 832, 901, 934, 1290, 1330, 1320]
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
	},
	watch: {
	},
	computed: {
	},
	methods: {
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
	.chart {
		height: 300px;
	}
</style>
