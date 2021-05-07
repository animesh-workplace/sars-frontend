<template>
	<div v-if="chartdata">
		<div class="columns">
			<div class="column is-4">
				<v-chart class="chart" :option="options"/>
			</div>
			<div class="column is-4">
				<v-chart class="chart" :option="options"/>
			</div>
		</div>
	</div>
</template>

<script>
import { forEach } from 'lodash'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { BarChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent,   CalendarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent, } from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CalendarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  LegendComponent
])

export default {
	data: () => ({
		chartdata: null,
		colors: [ '#087FD2', '#E26EA5', '#F45564', '#FF8F41', '#FFC748', '#99CC66', '#00C46C', '#00C8B5', '#01BFEA', '#AA50B5'],
		total_sum: 0,
		options: {
			legend: {
				data: ['Hello', 'Hello1'],
				icon: 'circle'
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: 'Hello',
					data: [120, 200, 150, 80, 70, 110, 130],
					type: 'bar',
					stack: 'total',
					showBackground: false,
					barWidth: 15,
					backgroundStyle: {
						color: 'rgba(180, 180, 180, 0.2)',
					},
					itemStyle: {
						borderRadius: [10, 10, 10, 10]
					}
				},
				{
					name: 'Hello1',
					data: [180, 100, 70, 160, 50, 20, 30],
					type: 'bar',
					stack: 'total',
					showBackground: false,
					barWidth: 15,
					backgroundStyle: {
						color: 'rgba(180, 180, 180, 0.2)',
					},
					itemStyle: {
						borderRadius: [10, 10, 10, 10]
					}
				},
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
	computed: {
	},
	methods: {
		async get_chartdata() {
			const data = await this.$axios.$post('/files/metadata-stats-state/')
			if(data.message == null) {
				let temp = {}
				let sum = 0
				forEach(data, (d,i)=> temp[i + ` (${d})`] = d)
				forEach(data, (d,i)=> sum = sum + d)
				this.total_sum = sum
				this.chartdata = temp
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
.chart {
  height: 400px;
}
</style>
