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
				// formatter: function (params) {
				// 	let selected = filter(params, (d) => d.value)

				// 	console.log(filter(params, (d) => d.value))
				// },
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
				data: [
					'Dec-2020',
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
					value: [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0.060551014229488345,
						0.7042253521126761,
					],
				},
				{
					name: 'Alpha',
					value: [
						31.292517006802722,
						21.660649819494584,
						28.945645055664706,
						26.28785917680559,
						6.23060692565471,
						0.848662037601007,
						0.14077610478638755,
						0.016485328058028353,
						0.01689617301681169,
						0.0073346046648085665,
						0.00977803852547179,
						0,
						0,
					],
				},
				{
					name: 'Beta',
					value: [
						1.3605442176870748,
						0,
						1.0478061558611658,
						1.3978772974372249,
						0.3020148111373133,
						0.06090875867949811,
						0.042844901456726654,
						0,
						0,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Gamma',
					value: [
						0,
						0,
						0.06548788474132286,
						0.025886616619207874,
						0.008274378387323651,
						0.004060583911966541,
						0,
						0,
						0.008448086508405846,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Delta (All)',
					value: [
						8.843537414965986,
						22.382671480144403,
						8.447937131630647,
						12.218483044266113,
						38.95577344751975,
						45.94956754781337,
						46.37042477659444,
						47.09858226178701,
						48.061164146320856,
						48.60642511368638,
						48.2839542387797,
						47.92612776264002,
						47.88732394366197,
					],
				},
				{
					name: 'Delta (Only B.1.617.2)',
					value: [
						2.0408163265306123,
						7.9422382671480145,
						3.143418467583497,
						5.88920528086979,
						20.127425427164784,
						16.778332724245747,
						16.62382176520994,
						18.513023409165843,
						16.558249556475456,
						16.12879565791404,
						14.471497017698251,
						14.774447471995156,
						19.014084507042252,
					],
				},
				{
					name: 'Delta (AY.XX)',
					value: [
						6.802721088435375,
						14.440433212996389,
						5.304518664047151,
						6.329277763396323,
						18.82834802035497,
						29.171234823567627,
						29.746603011384504,
						28.58555885262117,
						31.5029145898454,
						32.47762945577233,
						33.81245722108145,
						33.15168029064487,
						28.87323943661972,
					],
				},
				{
					name: 'Kappa',
					value: [
						4.761904761904762,
						8.664259927797833,
						27.70137524557957,
						31.827595133316077,
						8.51433536055604,
						0.8852072928087059,
						0.2509487085322561,
						0.20606660072535443,
						0.08448086508405846,
						0.10268446530731994,
						0.06844626967830253,
						0,
						0,
					],
				},
				{
					name: 'Eta',
					value: [
						0,
						0,
						1.8336607727570402,
						1.773233238415739,
						0.15307600016548756,
						0.04872700694359849,
						0.02448280083241523,
						0,
						0,
						0,
						0,
						0.030275507114744173,
						0,
					],
				},
				{
					name: 'Iota',
					value: [
						0,
						0,
						0,
						0.012943308309603937,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Epsilon',
					value: [
						0,
						0,
						0,
						0.012943308309603937,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Theta',
					value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Zeta',
					value: [
						0,
						0.6802721088435374,
						0,
						0.06548788474132286,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'Lambda',
					value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Mu',
					value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'B.1.618',
					value: [
						1.3605442176870748,
						1.8050541516245486,
						3.6018336607727566,
						1.3331607558892054,
						0.012411567580985477,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					],
				},
				{
					name: 'B.1.617.3',
					value: [
						0,
						0.36101083032490977,
						1.899148657498363,
						1.9544395547501943,
						0.4344048653344918,
						0.036545255207698864,
						0.006120700208103807,
						0.008242664029014177,
						0,
						0.0073346046648085665,
						0,
						0,
						0,
					],
				},
				{
					name: 'None',
					value: [
						42.857142857142854,
						22.743682310469314,
						17.94368041912246,
						10.937095521615326,
						6.43332919614414,
						6.216753969220774,
						6.7939772309952255,
						5.572040883613584,
						3.767846582749007,
						2.6697960979903184,
						3.353867214236824,
						4.056917953375719,
						3.5211267605633805,
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
