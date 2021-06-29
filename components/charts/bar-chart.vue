<template>
	<div>
		<v-chart
			class="chart"
			:loading="false"
			:option="options"
			:loading-options="loader_option"
			ref="bar-chart"
		/>
	</div>
</template>

<script>
import { forEach, sortBy, map } from "lodash"
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
		loader_option: {
			color: '#c23531',
			lineWidth: 3,
			text: 'Loading',
			fontFamily: 'Averta',
			fontWeight: 500,
			fontSize: 14,
		},
		options: {
			tooltip: {
				trigger: 'axis',
				position: 'right',
				axisPointer: {
					type: 'shadow'
				},
				transitionDuration: 0.4,
				borderColor: '#fff',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
				order: 'valueDesc'
			},
			legend: {
				data: [],
				icon: 'roundRect',
				itemGap: 20,
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					fontFamily: 'Averta',
				}
			},
			grid: {
				left: '3%',
				right: '3%',
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
				data: [],
				type: 'category',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
				axisTick: {
					alignWithLabel: true
				}
			},
			series: []
		}
	}),
	components: {
		VChart
	},
	provide: {
		[THEME_KEY]: "light"
	},
	props: {
		ChartData: {
			type: Object
		},
		State: {
			type: Object
		}
	},
	watch: {
		ChartData(value) {
			this.state_name = this.State.name
			this.options.xAxis.data = value['xAxis']['month']
			this.options.legend.data = map(sortBy(value[this.State.name], 'name'), d=>d.name)
			this.options.series = []
			forEach(value[this.State.name], d=>{
				this.options.series.push({
					name: d.name,
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: d.month
				})
			})
		},
		State(value) {
			if(this.state_name != value.district) {
				this.$refs['bar-chart'].clear()
				if(Object.keys(this.ChartData).length > 0) {
					this.state_name = value.district
					this.options.xAxis.data = this.ChartData['xAxis']['month']
					this.options.legend.data = map(sortBy(this.ChartData[value.district], 'name'), d=>d.name)
					this.options.series = []
					forEach(this.ChartData[value.district], d=>{
						this.options.series.push({
							name: d.name,
							type: 'bar',
							stack: 'total',
							label: {
								show: false
							},
							data: d.month
						})
					})
				}
			}
		}
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
		height: 200px;
	}
</style>
