<template>
	<div>
		<div class="has-text-centered">
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
				{{ State }}'s Lineage Distribution
			</span>
		</div>

		<div class="column is-6 is-offset-3 mb-2">
			<div class="dropdown is-fullwidth is-hoverable">
				<div class="dropdown-trigger">
					<div class="button is-light is-fullwidth has-text-grey-dark">
						Select Lineages
					</div>
				</div>
				<div class="dropdown-menu">
					<div class="dropdown-content has-background-light">
						<div class="menu is-small">
							<ul class="menu-list">
								<li
									class="mb-1"
									:key="lineage"
									v-for="lineage in all_lineages"
									@click="add_remove_lineage(lineage)"
								>
									<a
										:class="default_show.includes(lineage) ? 'dropdown-item has-background-blue has-text-weight-medium has-text-light' : 'dropdown-item has-text-weight-medium has-text-grey-dark'"
									>
										<svg class="icon icon-size has-fill-red" v-if="default_show.includes(lineage)">
											<use xlink:href="@/assets/images/icons/bds.svg#remove-g"></use>
										</svg>
										<svg class="icon icon-size has-fill-green" v-else>
											<use xlink:href="@/assets/images/icons/bds.svg#add-g"></use>
										</svg>
										{{ lineage }}
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
			ref="bar-chart"
			:loading="false"
			:option="options"
			@zr:click="handle_click"
			:loading-options="loader_option"
		/>
	</div>
</template>

<script>
import { forEach, sortBy, map, intersection } from "lodash"
import { use } from 'echarts/core'
import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'

use([
	BarChart,
	GridComponent,
	CanvasRenderer,
	LegendComponent,
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
		render: Date.now() + Math.floor(Math.random()*10000 + 1),
		all_lineages: [],
		default_show: ['B.1.1.7', 'B.1.351', 'B.1.351.2', 'B.1.351.3', 'P.1', 'P.1.1', 'P.1.2', 'B.1.617.2', 'AY.1', 'AY.2', 'B.1.525', 'B.1.526', 'B.1.617.1', 'C.37'],
		options: {
			tooltip: {
				trigger: 'axis',
				position: 'right',
				axisPointer: {
					type: 'shadow'
				},
				// transitionDuration: 0.4,
				borderColor: '#fff',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
				order: 'valueDesc'
			},
			legend: {
				data: [],
				icon: 'roundRect',
				itemGap: 20,
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					fontFamily: 'Averta',
				}
			},
			grid: {
				left: '3%',
				right: '3%',
				bottom: '3%',
				containLabel: true,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500
				}
			},
			xAxis: {
				data: [],
				type: 'category',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500
				},
				axisTick: {
					alignWithLabel: true
				}
			},
			series: []
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
		}
	},
	watch: {
		ChartData(value) {
			this.state_name = this.State
			this.options.xAxis.data = value['xAxis']['month']
			this.all_lineages = map(sortBy(value[this.State], 'name'), d=>d.name)
			this.options.legend.data = intersection(this.default_show, this.all_lineages)
			this.options.series = []
			forEach(value[this.State], d=>{
				if(this.options.legend.data.includes(d.name)) {
					this.options.series.push({
						name: d.name,
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						data: d.month
					})
				}
			})
			this.render = Date.now() + Math.floor(Math.random()*10000 + 1)
		},
		State(value) {
			if(this.state_name != value) {
				this.$refs['bar-chart'].clear()
				if(Object.keys(this.ChartData).length > 0) {
					this.state_name = value
					this.options.xAxis.data = this.ChartData['xAxis']['month']
					this.all_lineages = map(sortBy(this.ChartData[value], 'name'), d=>d.name)
					this.options.legend.data = intersection(this.default_show, this.all_lineages)
					this.options.series = []
					forEach(this.ChartData[value], d=>{
						if(this.options.legend.data.includes(d.name)) {
							this.options.series.push({
								name: d.name,
								type: 'bar',
								stack: 'total',
								label: {
									show: false
								},
								data: d.month
							})
						}
					})
				}
			}
		}
	},
	computed: {
	},
	methods: {
		add_remove_lineage(lineage) {
			if(this.default_show.includes(lineage)) {
				let default_show_index = this.default_show.indexOf(lineage)
				this.default_show.splice(default_show_index, 1)
				this.options.legend.data = intersection(this.default_show, this.all_lineages)
				let series_index = map(this.options.series, (d,i)=>d.name == lineage ? i : '').filter(String)
				this.options.series.splice(series_index[0], 1)
				this.$refs['bar-chart'].clear()
			} else {
				this.default_show.push(lineage)
				this.options.legend.data = intersection(this.default_show, this.all_lineages)
				this.options.series.push({
					name: this.ChartData[this.State][lineage].name,
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					data: this.ChartData[this.State][lineage].month
				})
				this.$refs['bar-chart'].clear()
			}
		},
		handle_click(event) {
			let location = [event.offsetX, event.offsetY]
			let selected_month = this.ChartData.xAxis.month[
					this.$refs['bar-chart'].convertFromPixel({seriesIndex: 0}, location)[0]
				]
			console.info(selected_month)
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
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
