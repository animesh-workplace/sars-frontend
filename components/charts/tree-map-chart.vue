<template>
	<div>
		<div class="tags mt-2">
			<span
				:key="gene"
				class="tag is-info is-clickable"
				@click="change_treemap(gene)"
				v-for="gene in ChartData.genes"
			>
				{{ gene }}
			</span>
		</div>
		<v-chart
			class="chart"
			:loading="false"
			:option="options"
			:loading-options="loader_option"
			ref="treemap-chart"
		/>
	</div>
</template>

<script>
import { forEach, sortBy, map } from "lodash"
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
	TitleComponent,
	TooltipComponent,
])

export default {
	data: () => ({
		color_scheme: {
			S: '#37a2da',
			E: '#8378ea',
			M: '#9d96f5',
			N: '#e7bcf3',
			ORF1a: '#e690d1',
			ORF1b: '#e062ae',
			ORF3a: '#fb7293',
			ORF6: '#ff9f7f',
			ORF7a: '#ffdb5c',
			ORF7b: '#9fe6b8',
			ORF8: '#67e0e3',
			ORF9b: '#32c5e9',
		},
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
					// roam: false,
					// nodeClick: false,
					breadcrumb: {
						// show: false,
						borderRadius: 5,
						itemStyle: {
							textStyle: {
								fontFamily: 'Averta',
								fontWeight: 500
							},
						}
					},
					name: 'Mutations',
					type: 'treemap',
					visibleMin: 50,
					stack: 'total',
					label: {
						show: true,
						fontFamily: 'Averta',
						fontWeight: 500,
						label: '{b} ({c})'
						// color: '#51434B'
					},
	                itemStyle: {
	                    borderRadius: 5,
	                    gapWidth: 1,
	                },
					data: []
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
			this.options.series[0].data.push({
				name: value['India']['S'].name,
				children: value['India']['S'].children,
				value: Object.keys(value['India']['S'].children).length,
			})
		},
		State(value) {
			if(this.state_name != value.district) {
				if(Object.keys(this.ChartData).length > 0) {
					this.state_name = value.district
					this.$refs['treemap-chart'].clear()
					this.options.series[0].data = []
					if(this.ChartData[value.district] != undefined) {
						this.options.series[0].data.push({
			                itemStyle: {
								color: this.color_scheme['S'],
			                },
							name: this.ChartData[value.district]['S'].name,
							children: this.ChartData[value.district]['S'].children,
							value: Object.keys(this.ChartData[value.district]['S'].children).length,
						})
					}
				}
			}
		}
	},
	computed: {
	},
	methods: {
		change_treemap(gene) {
			this.$refs['treemap-chart'].clear()
			this.options.series[0].data = []
			this.options.series[0].data.push({
                itemStyle: {
					color: this.color_scheme[gene],
                },
				name: this.ChartData['India'][gene].name,
				children: this.ChartData['India'][gene].children,
				value: Object.keys(this.ChartData['India'][gene].children).length,
			})
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
		height: 300px;
	}
</style>
