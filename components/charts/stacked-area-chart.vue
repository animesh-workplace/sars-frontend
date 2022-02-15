<template>
	<div>
		<div class="has-text-centered mb-2">
			<span
				class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark"
			>
				VOCs/VOIs/VUIs timeline (based on collection date)
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
import { map, filter } from 'lodash'
import { mapFields } from 'vuex-map-fields'
import {
	GridComponent,
	TitleComponent,
	LegendComponent,
	ToolboxComponent,
	TooltipComponent,
} from 'echarts/components'
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
				borderColor: '#fff',
				transitionDuration: 0.1,
				axisPointer: {
					type: 'line',
					label: {
						show: false,
					},
				},
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
			},
			legend: {
				top: 'top',
				itemGap: 15,
				itemWidth: 20,
				left: 'center',
				icon: 'roundRect',
				itemHeight: 20,
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				data: [],
			},
			grid: {
				y: '10%',
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					fontSize: 12,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				data: [],
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
				'#fb7293',
				'#37A2DA',
				'#fcd5cf',
				'#f5e8c8',
				'#b8d2c7',
				'#a4d8c2',
				'#f3d999',
				'#d3758f',
				'#c1d7a8',
				'#2e4783',
				'#C4D9E0',
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
	computed: {
		...mapFields(['landing_info', 'landing_info_loaded']),
	},
	methods: {
		async get_chartdata() {
			if (this.landing_info_loaded) {
				let my_data = this.landing_info.lineage_data
				let only_name = map(my_data, (d) => d.name)
				let s = map(my_data, (d) => ({
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
				this.options.xAxis.data = [
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
					'Jan-2022',
					'Feb-2022'
				]
				if(this.$device.isMobileOrTablet) {
					this.options.grid.y = '30%'
				}
			}
			this.chart_loader = false
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.get_chartdata()
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
