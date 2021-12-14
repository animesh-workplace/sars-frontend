<template>
	<div>
		<div class="has-text-centered mb-2">
			<span
				class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark"
			>
				VOCs/VOIs/VUIs distribution timeline (based on collection date)
			</span>
		</div>

		<div class="columns is-vcentered mb-0">
			<div class="column">
				<v-chart
					class="chart"
					:option="options"
					:loading="chart_loader"
					:loading-options="loader_option"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { map, max, ceil, capitalize } from 'lodash'
import {
	GridComponent,
	TitleComponent,
	LegendComponent,
	ToolboxComponent,
	TooltipComponent,
} from 'echarts/components'
// import 'echarts/theme/roma'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'

use([
	LineChart,
	GridComponent,
	TitleComponent,
	CanvasRenderer,
	LegendComponent,
	ToolboxComponent,
	TooltipComponent,
])

export default {
	data: () => ({
		chart_loader: true,
		loader_option: {
			lineWidth: 3,
			fontSize: 14,
			text: 'Loading',
			fontWeight: 500,
			color: '#c23531',
			maskColor: '#f6f8f9',
			fontFamily: 'Averta',
		},
		options: {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					label: {
						show: false,
					},
				},
			},
			legend: {
				top: 'top',
				itemGap: 15,
				itemWidth: 20,
				left: 'center',
				icon: 'circle',
				itemHeight: 15,
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				data: [],
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					fontSize: 12,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				data: [
					'Jan-2021',
					'Feb-2021',
					'Mar-2021',
					'Apr-2021',
					'May-2021',
					'Jun-2021',
					'Jul-2021',
					'Aug-2021',
					'Sep-2021',
					'Oct-2021',
					'Nov-2021',
					'Dec-2021',
				],
			},
			yAxis: {
				max: 100,
				type: 'value',
				axisLabel: {
					fontSize: 12,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
			},
			series: [],
			color: [
				'#E01F54',
				'#fcd5cf',
				'#f5e8c8',
				'#b8d2c7',
				'#c6b38e',
				'#a4d8c2',
				'#f3d999',
				'#d3758f',
				'#dcc392',
				'#2e4783',
				'#82b6e9',
				'#ff6347',
				'#a092f1',
				'#0a915d',
				'#eaf889',
				'#6699FF',
				'#ff6666',
				'#3cb371',
				'#d5b158',
				'#38b6b6',
			],
		},
	}),
	components: {
		VChart,
	},
	provide: {
		[THEME_KEY]: 'light',
	},
	props: {
		ChartData: {
			type: Array,
		},
	},
	computed: {},
	methods: {
		async get_chartdata() {
			if (this.landing_info_loaded) {
			}
			this.chart_loader = false
		},
	},
	mounted() {
		this.$nextTick(() => {
			let test_data = [
				{
					name: 'Omicron',
					value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.06, 0.7],
				},
				{
					name: 'Alpha',
					value: [
						21.66,
						28.94,
						26.28,
						6.23,
						0.84,
						0.14,
						0.02,
						0.01,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Beta',
					value: [0, 1.04, 1.39, 0.3, 0.06, 0.04, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Gamma',
					value: [0, 0.06, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Delta (All)',
					value: [
						22.38,
						8.44,
						12.21,
						38.95,
						45.94,
						46.37,
						47.09,
						48.06,
						48.6,
						48.28,
						47.92,
						47.88,
					],
				},
				{
					name: 'Delta (Only B.1.617.2)',
					value: [
						7.94,
						3.14,
						5.88,
						20.12,
						16.77,
						16.62,
						18.51,
						16.55,
						16.12,
						14.47,
						14.77,
						19.01,
					],
				},
				{
					name: 'Delta (AY.XX)',
					value: [
						14.44,
						5.3,
						6.32,
						18.82,
						29.17,
						29.74,
						28.58,
						31.5,
						32.47,
						33.81,
						33.15,
						28.87,
					],
				},
				{
					name: 'Kappa',
					value: [
						8.66,
						27.7,
						31.82,
						8.51,
						0.889,
						0.25,
						0.2,
						0.08,
						0.1,
						0.06,
						0,
						0,
					],
				},
				{
					name: 'Eta',
					value: [
						0,
						1.83,
						1.77,
						0.15,
						0.04,
						0.02,
						0,
						0,
						0,
						0,
						0.03,
						0,
					],
				},
				{
					name: 'Iota',
					value: [0, 0, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Epsilon',
					value: [0, 0, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{ name: 'Theta', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{
					name: 'Zeta',
					value: [0, 0.07, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{ name: 'Lambda', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ name: 'Mu', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{
					name: 'B.1.618',
					value: [1.8, 3.6, 1.33, 0.01, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'B.1.617.3',
					value: [0.36, 1.89, 1.95, 0.43, 0.04, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'None',
					value: [
						22.74,
						17.94,
						10.93,
						6.43,
						6.21,
						6.79,
						5.57,
						3.76,
						2.66,
						3.35,
						4.05,
						3.52,
					],
				},
			]

			let only_name = map(test_data, (d) => d.name)
			let s = map(test_data, (d) => ({
				stack: true,
				name: d.name,
				type: 'line',
				smooth: true,
				silent: true,
				data: d.value,
				showSymbol: false,
				label: { show: false },
				lineStyle: { width: 0 },
				areaStyle: { opacity: 1 },
			}))
			this.options.series = s
			this.options.legend.data = only_name
			this.chart_loader = false
		})
	},
}
</script>

<style scoped>
.chart {
	height: 500px;
}
.medium {
	height: 600px;
}
.dropdown-content {
	height: 15em;
	overflow: auto;
}
</style>
