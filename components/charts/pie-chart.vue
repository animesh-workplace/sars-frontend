<template>
	<div>
		<p
			align="center"
			class="is-size-4 has-text-weight-semibold has-text-grey-dark pb-4"
		>
			Sequence statistics (Institute)
		</p>

		<v-chart
			ref="pie-chart"
			:option="options"
			:loading="chart_loader"
			:loading-options="loader_option"
			:class="$device.isMobileOrTablet ? 'chart-mobile': 'chart-desktop'"
		/>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { forEach, sortBy, map, intersection } from 'lodash'
import { use } from 'echarts/core'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'

use([PieChart, CanvasRenderer, LegendComponent, TooltipComponent])

export default {
	data: () => ({
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
					type: 'shadow',
				},
				transitionDuration: 0.1,
				borderColor: '#fff',
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
				formatter: function (params) {
					return `<b>${params.name.split(' ')[0]}</b> : ${
						params.value
					} (${params.percent}%)`
				},
			},
			legend: {
				itemGap: 10,
				itemWidth: 20,
				itemHeight: 15,
				icon: 'circle',
				left: 'center',
				top: 'top',
				padding: [0, 0, 0, 0],
				textStyle: {
					fontSize: 15,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
			},
			series: [
				{
					type: 'pie',
					top: '20%',
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
						},
					},
					data: [],
				},
			],
			color: [
				// Default
				'#37a2da',
				'#32c5e9',
				'#67e0e3',
				'#9fe6b8',
				'#ffdb5c',
				'#ff9f7f',
				'#fb7293',
				'#e062ae',
				'#e690d1',
				'#e7bcf3',
				'#9d96f5',
				'#8378ea',
				'#96bfff',
				// Macrons2
				'#ed9678',
				'#e7dac9',
				'#cb8e85',
				'#f3f39d',
				'#c8e49c',
				'#f16d7a',
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
				// Infographic
				'#C1232B',
				'#27727B',
				'#FCCE10',
				'#E87C25',
				'#B5C334',
				'#FE8463',
				'#9BCA63',
				'#FAD860',
				'#F3A43B',
				'#60C0DD',
				'#D7504B',
				'#C6E579',
				'#F4E001',
				'#F0805A',
				'#26C0C0',
				// Roma
				'#E01F54',
				'#001852',
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
	props: {},
	watch: {},
	computed: {
		...mapFields(['landing_info', 'landing_info_loaded']),
	},
	methods: {
		async get_chartdata() {
			if (this.landing_info_loaded) {
				this.options.series[0].data = this.landing_info.pie_chart_data
				this.options.series[0].label.formatter = `Total: ${this.landing_info.genomes_sequenced.toLocaleString(
					'en-EN'
				)}`
				if(this.$device.isMobileOrTablet) {
					this.options.series[0].top = '30%'
					this.options.series[0].radius = ['50%', '100%']
				}
			}
			this.chart_loader = false
		},
	},
	beforeMount() {},
	mounted() {
		this.$nextTick(() => {
			this.get_chartdata()
		})
	},
}
</script>

<style scoped>
.chart-desktop {
	height: 650px;
}
.chart-mobile {
	height: 750px;
}
</style>
