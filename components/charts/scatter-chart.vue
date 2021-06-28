<template>
	<div class="column">
		<v-chart
			class="chart"
			:option="options"
		/>
	</div>
</template>

<script>
import { use } from 'echarts/core'
import {
	TitleComponent,
	TooltipComponent,
	SingleAxisComponent,
} from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'


use([
	ScatterChart,
	CanvasRenderer,
	TitleComponent,
	TooltipComponent,
	SingleAxisComponent,
])

export default {
	data: () => ({
		state_name: null,
		clicked: false,
		options: {
			tooltip: {
				position: 'top',
			},
			title: {
				textBaseline: 'middle',
				top: '7%',
				text: 'India'
			},
	        grid: [
	          { height: 50, top: 60, left: 40, right: 20 },
	          { top: 160, bottom: 110, left: 40, right: 20 },
	        ],
			singleAxis: {
				left: 100,
				type: 'category',
				boundaryGap: false,
				top: '5%',
				height: '5%',
				data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a','10a','11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'],
				axisLabel: {
					interval: 2
				}
			},
			series: [{
				singleAxisIndex: 0,
		        coordinateSystem: 'singleAxis',
		        type: 'scatter',
		        data: [[0,5],[1,1],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,2],[12,4],[13,1],[14,1],[15,3],[16,4],[17,6],[18,4],[19,4],[20,3],[21,3],[22,2],[23,5]],
		        symbolSize: function (dataItem) {
		            return dataItem[1] * 4;
		        }
			}]
		}
	}),
	components: {
		VChart
	},
	provide: {
		[THEME_KEY]: "light"
	},
	props: {
		name: {
			type: String
		}
	},
	watch: {
		name(value) {
			this.options.title.text = value
		}
	},
	computed: {
	},
	methods: {
		get_data(event) {
			if(!this.clicked) {
				this.state_name = event.name
			}
			// console.log(event.name)
		},
		get_data_default(event) {
			if(!this.clicked) {
				this.state_name = 'India | bharat'
			}
			// console.log(event.name)
		},
		change_data() {
			this.options.series[0].map = 'wb'
			this.options.series[0].nameProperty = 'district'
		}
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
