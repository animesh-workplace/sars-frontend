<template>
	<div>
<!-- 		<client-only>
			<Flickity ref="flickity" :options="flickityOptions">
				<div class="carousel-cell" v-for="gene in ChartData.genes">
					<div class="column" @click="change_treemap(gene)">
						<div class="box is-small is-floating fixed-size has-text-centered">
							<svg class="icon icon-size has-fill-white" v-if="selected_gene == gene">
								<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
							</svg>
							<span class="is-size-5 has-text-medium has-text-weight-medium has-text-black">
								{{ gene }}
							</span>
						</div>
					</div>
				</div>
			</Flickity>
		</client-only> -->

		<div class="has-text-centered">
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
				{{ State }}'s Mutation Profile
			</span>
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-light" v-if="Month != ''">
				[ Month: {{ Month }} ]
			</span>
		</div>

		<div class="column is-6 is-offset-3">
			<div class="dropdown is-fullwidth is-hoverable">
				<div class="dropdown-trigger">
					<div class="button is-light is-fullwidth has-text-grey-dark">
						Select Gene
					</div>
				</div>
				<div class="dropdown-menu">
					<div class="dropdown-content has-background-light">
						<div class="menu is-small">
							<ul class="menu-list">
								<li
									:key="gene"
									class="mb-1"
									@click="change_treemap(gene)"
									v-for="gene in ChartData.genes"
								>
									<a
										:class="selected_gene == gene ? 'dropdown-item has-background-blue has-text-weight-medium has-text-light' : 'dropdown-item has-text-weight-medium has-text-grey-dark'"
									>
										<svg class="icon icon-size has-fill-white" v-if="selected_gene == gene">
											<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
										</svg>
										{{ gene }}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>


		<v-chart
			class="chart"
			:loading="false"
			:option="options"
			ref="treemap-chart"
			:loading-options="loader_option"
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
		selected_gene: 'S',
		loader_option: {
			color: '#c23531',
			lineWidth: 3,
			text: 'Loading',
			fontFamily: 'Averta',
			fontWeight: 500,
			fontSize: 14,
		},
		flickityOptions: {
			contain: true,
			pageDots: false,
			wrapAround: true,
			freeScroll: true,
			prevNextButtons: true,
			freeScrollFriction: 0.1,
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
					width: '100%',
					height: '100%',
					breadcrumb: {
						// show: false,
						// borderRadius: 5,
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
			type: String
		},
		Month: {
			type: String
		}
	},
	watch: {
		ChartData(value) {
			this.state_name = this.State
			this.$refs['treemap-chart'].clear()
			this.options.series[0].data = []
			this.options.series[0].data.push({
				name: value['India'][this.selected_gene].name,
				children: value['India'][this.selected_gene].children,
				value: Object.keys(value['India'][this.selected_gene].children).length,
			})
		},
		State(value) {
			if(this.state_name != value) {
				if(Object.keys(this.ChartData).length > 0) {
					this.state_name = value
					this.$refs['treemap-chart'].clear()
					this.options.series[0].data = []
					if(this.ChartData[value] != undefined) {
						this.options.series[0].data.push({
			                itemStyle: {
								color: this.color_scheme[this.selected_gene],
			                },
							name: this.ChartData[value][this.selected_gene].name,
							children: this.ChartData[value][this.selected_gene].children,
							value: Object.keys(this.ChartData[value][this.selected_gene].children).length,
						})
					}
				}
			}
		},
	},
	computed: {
	},
	methods: {
		change_treemap(gene) {
			this.selected_gene = gene
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
	.fixed-size {
		min-width: 100px;
		max-width: 100px;
	}
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
