<template>
	<div v-if="chartdata">
		<div class="columns">
			<div class="column is-4">
				<v-chart class="chart" :option="options"/>
			</div>
		</div>
	</div>
</template>

<script>
import { forEach } from 'lodash'
import * as topojson from 'topojson-client'
import { mapFields } from 'vuex-map-fields'
import { use, registerMap } from 'echarts/core'
import {
	GeoComponent,
	GridComponent,
	TitleComponent,
	LegendComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'
import indiaJSON from '@/components/charts/maps/india.json'

registerMap('india', topojson.feature(indiaJSON, indiaJSON.objects.states))

use([
	MapChart,
	CanvasRenderer,
	GeoComponent,
	GridComponent,
	TitleComponent,
	LegendComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
])

export default {
	data: () => ({
		chartdata: null,
		colors: [ '#087FD2', '#E26EA5', '#F45564', '#FF8F41', '#FFC748', '#99CC66', '#00C46C', '#00C8B5', '#01BFEA', '#AA50B5'],
		total_sum: 0,
		websocket_output: null,
		options: {
			// title: {
			// 	text: 'Indian Map',
			// 	subtext: 'Testing India Map'
			// },
			// tooltip: {
			// 	trigger: 'item',
			// 	showDelay: 0,
			// 	transitionDuration: 0.2,
			// },
			visualMap: {
				min: 0,
				max: 2000,
				text: ['High', 'Low'],
				realtime: false,
				calculable: true,
				inRange: {
					color: ['#EEDCF0', '#AA50B5']
				}
			},
			series: [{
				name: 'india_map',
				type: 'map',
				map: 'india',
				// roam: true,
				zoom: 1.20,
				aspectScale: 0.85,
				nameProperty: 'st_nm',
				itemStyle: {
					borderColor: '#AA50B5',
				},
				emphasis: {
					itemStyle: {
						borderColor: '#803C88',
						areaColor: 'inherit',
						borderWidth: 1.5
					}
				},
			}]
		}
		// options: {
		// 	legend: {
		// 		data: ['Hello', 'Hello1'],
		// 		icon: 'circle'
		// 	},
		// 	xAxis: {
		// 		type: 'category',
		// 		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		// 	},
		// 	yAxis: {
		// 		type: 'value',
		// 	},
		// 	series: [
		// 		{
		// 			name: 'Hello',
		// 			data: [120, 200, 150, 80, 70, 110, 130],
		// 			type: 'bar',
		// 			stack: 'total',
		// 			showBackground: false,
		// 			barWidth: 15,
		// 			backgroundStyle: {
		// 				color: 'rgba(180, 180, 180, 0.2)',
		// 			},
		// 			itemStyle: {
		// 				borderRadius: [10, 10, 10, 10]
		// 			}
		// 		},
		// 		{
		// 			name: 'Hello1',
		// 			data: [180, 100, 70, 160, 50, 20, 30],
		// 			type: 'bar',
		// 			stack: 'total',
		// 			showBackground: false,
		// 			barWidth: 15,
		// 			backgroundStyle: {
		// 				color: 'rgba(180, 180, 180, 0.2)',
		// 			},
		// 			itemStyle: {
		// 				borderRadius: [10, 10, 10, 10]
		// 			}
		// 		},
		// 	]
		// }
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
		...mapFields([
			'websocket_connection'
		]),
	},
	methods: {
		async get_chartdata() {
			const data = await this.$axios.$post('/files/metadata-stats-state/')
			console.log(data)
			if(data.message == null) {
				let temp = []
				let sum = 0
				forEach(data, (d,i)=> temp.push({ name:i, value:d }))
				forEach(data, (d,i)=> sum = sum + d)
				this.total_sum = sum
				this.chartdata = temp
				this.options.series[0].data = temp
			}
		},
		get_websocket_data() {
			this.$options.sockets = new WebSocket(`${process.env.WS_BASE_URL}/frontend/`)
			this.$options.sockets.onmessage = (event) => {
				let websocket_data = JSON.parse(event.data)['message']
				console.log(websocket_data)
			}
			this.$options.sockets.onerror = function(event) {
				console.log(event)
			}

			let vm = this
			this.$options.sockets.onopen = function(event) {
				vm.$options.sockets.send(JSON.stringify({"type": "MY_METADATA"}))
			}

		}
	},
	mounted() {
		this.$nextTick(()=>{
			// this.get_chartdata()
			// this.get_websocket_data()
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
  height: 600px;
}
</style>
