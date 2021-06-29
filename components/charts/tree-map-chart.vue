<template>
	<div>
		<v-chart
			class="chart"
			:loading="false"
			:option="options"
			:loading-options="loader_option"
		/>
	</div>
</template>

<script>
import { use } from 'echarts/core'
import {
	TitleComponent,
	TooltipComponent,
} from 'echarts/components'
import { TreemapChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'

use([
	TreemapChart,
	CanvasRenderer,
	// TitleComponent,
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
				trigger: 'item',
				position: 'right',
				transitionDuration: 0.4,
				borderColor: '#fff',
				formatter: '{b} <br/>Count: {c}',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
			},
			series: [
				{
					roam: false,
					nodeClick: false,
					breadcrumb: {
						show: false
					},
					name: 'Mutations',
					type: 'treemap',
					visibleMin: 50,
					stack: 'total',
					label: {
						show: true
					},
	                itemStyle: {
	                    borderRadius: 10,
	                    gapWidth: 2,
	                },
					data: [
					    {
					        "value": 40,
					        "name": "Spike",
					        "path": "Spike",
					        "children": [
					            {
					                "value": 12,
					                "name": "S:123",
					                "path": "Spike/S:123"
					            },
					            {
					                "value": 28,
					                "name": "S:124",
					                "path": "Spike/S:124"
					            },
					            {
					                "value": 20,
					                "name": "S:125",
					                "path": "Spike/S:125"
					            },
					            {
					                "value": 16,
					                "name": "S:126",
					                "path": "Spike/S:126"
					            }
					        ]
					    },
					    {
					        "value": 50,
					        "name": "Membrane",
					        "path": "Membrane",
					        "children": [
					            {
					                "value": 120,
					                "name": "M:123",
					                "path": "Membrane/M:123"
					            },
					            {
					                "value": 25,
					                "name": "M:124",
					                "path": "Membrane/M:124"
					            },
					            {
					                "value": 40,
					                "name": "M:125",
					                "path": "Membrane/M:125"
					            },
					            {
					                "value": 56,
					                "name": "M:126",
					                "path": "Membrane/M:126"
					            }
					        ]
					    }
					]
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
