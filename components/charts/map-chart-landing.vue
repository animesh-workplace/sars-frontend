<template>
	<div>
		<div class="has-text-centered mb-2">
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
				India's Genome Distribution
			</span>
		</div>

		<v-chart
			class="chart"
			:loading="false"
			:option="options"
			@mouseover="get_data"
			@click="handle_click"
			@mouseout="get_data_default"
			:loading-options="loader_option"
		/>
	</div>
</template>

<script>
import { map, max, ceil, capitalize } from "lodash"
import { feature } from 'topojson-client'
import { use, registerMap } from 'echarts/core'
import {
	GeoComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'
import { MAP_META } from "@/components/charts/map_config"

import IN from "@/components/charts/maps/india.json"
registerMap('India', feature(IN, IN.objects.states))

use([
	MapChart,
	CanvasRenderer,
	GeoComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
])

export default {
	data: () => ({
		clicked: false,
		view_skeleton: true,
		map_config: MAP_META,
		selected_state: {
			name: 'India',
			type: 'Country'
		},
		selected: {
			name: 'India',
			mapName: 'India',
			mapType: 'COUNTRY',
		},
		loader_option: {
			lineWidth: 3,
			fontSize: 14,
			text: 'Loading',
			fontWeight: 500,
			color: '#c23531',
			fontFamily: 'Averta',
		},
		options: {
			tooltip: {
				trigger: 'item',
				position: 'right',
				formatter: '{b}: {c}',
				borderColor: '#fff',
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
			},
			visualMap: {
				min: 0,
				max: 10,
				orient: 'horizontal',
				align: 'top',
				inRange: {
					color: ['#e6f2fb', '#cee5f6', '#b5d9f2', '#9ccced', '#84bfe9', '#6bb2e4', '#52a5e0', '#3999db', '#218cd7', '#087fd2']
				},
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					color: '#706266',
					fontFamily: 'Averta',
				},
			},
			series: [{
				name: 'MAP_OF_INDIAN_STATES',
				type: 'map',
				map: 'India',
				data: [],
				zoom: 1.14,
				aspectScale: 0.85,
				nameProperty: 'st_nm',
				itemStyle: {
					borderColor: '#9C9090',
				},
				emphasis: {
					label: {
						show: false
					},
					itemStyle: {
						borderColor: '#2D232E',
						areaColor: 'inherit',
						borderWidth: 2
					}
				},
				select: {
					label: {
						show: false
					},
					itemStyle: {
						borderColor: '#2D232E',
						areaColor: 'inherit',
						borderWidth: 2
					}
				},
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
		ChartData: {
			type: Array
		}
	},
	watch: {
		ChartData(value) {
			let max_value = ceil(max(map(value, d=>d.value)), -2)
			this.options.series[0].data = value
			this.options.visualMap.max = max_value
			this.options.visualMap.text = [max_value, 0]
		}
	},
	computed: {
	},
	methods: {
		get_state_info(state) {
			this.$store.dispatch('websocket_send', {'type': 'MAP_DATA', 'filter': { 'map_data': state }})
		},
		select_state(state, info) {
			this.selected_state = {
				name: state,
				type: capitalize(info.mapType)
			}
			this.selected = {
				name: state,
				mapName: state,
				mapType: info.mapType
			}
			if(info.mapType == 'STATE') {
				this.options.series[0].nameProperty = 'district'
			} else {
				this.options.series[0].nameProperty = 'st_nm'
			}
			this.options.series[0].map = state
			this.get_state_info(state)
			this.$emit('input', this.selected)
		},
		get_data(event) {
			if(!this.clicked) {
				this.selected.name = event.name
				this.selected_state.type = this.selected.mapType == 'COUNTRY' ? 'State' : 'District'
				this.$emit('input', this.selected)
			}
		},
		handle_click(event) {
			if(this.selected.name == event.name) {
				this.clicked = !this.clicked
			} else {
				this.selected.name = event.name
				this.$emit('input', this.selected)
			}
		},
		get_data_default(event) {
			if(!this.clicked) {
				this.selected.name = this.selected.mapName
				this.selected_state.type = capitalize(this.selected.mapType)
			}
		},
		go_to() {
			this.$router.push({
				path: `/phylotree`,
			})
		}
	},
	mounted() {
		this.$nextTick(()=>{
			this.view_skeleton = false
			this.$emit('input', this.selected)
		})
	}
};
</script>

<style scoped>
	.chart {
		height: 600px;
	}
	.medium {
		height: 600px;
	}
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
