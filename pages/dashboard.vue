<template>
	<div>
		<div class="column is-10 is-offset-1 p-0">
			<section class="section mt-6 pb-2">

				<div class="columns">
					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="level">
								<div class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									<svg class="icon has-fill-grey-dark">
										<use xlink:href="@/assets/images/icons/bds.svg#timelines"></use>
									</svg>
									Genomes
								</div>
								<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									{{ Intl.NumberFormat('en-IN').format(dashboard['genomes_sequenced'] || 0 ) }}
								</span>
							</div>
						</div>
					</div>

					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="level">
								<div class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									<svg class="icon has-fill-grey-dark">
										<use xlink:href="@/assets/images/icons/bds.svg#action-g"></use>
									</svg>
									Mutations
								</div>
								<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									{{ Intl.NumberFormat('en-IN').format(dashboard['variants_catalogued'] || 0) }}
								</span>
							</div>
						</div>
					</div>

					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="level">
								<div class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									<svg class="icon has-fill-grey-dark">
										<use xlink:href="@/assets/images/icons/bds.svg#lines"></use>
									</svg>
									Lineages
								</div>
								<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									{{ Intl.NumberFormat('en-IN').format(dashboard['lineages_catalogued'] || 0) }}
								</span>
							</div>
						</div>
					</div>

					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="level">
								<div class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									<svg class="icon has-fill-grey-dark">
										<use xlink:href="@/assets/images/icons/bds.svg#shield-star-g"></use>
									</svg>
									States Covered
								</div>
								<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									{{ Intl.NumberFormat('en-IN').format(dashboard['states_covered'] || 0) }}
								</span>
							</div>
						</div>
					</div>

					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="level">
								<div class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									<svg class="icon has-fill-grey-dark">
										<use xlink:href="@/assets/images/icons/bds.svg#shield-star-g"></use>
									</svg>
									Districts Covered
								</div>
								<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
									{{ Intl.NumberFormat('en-IN').format(dashboard['states_covered'] || 0) }}
								</span>
							</div>
						</div>
					</div>

				</div>
			</section>

			<section class="section py-2">
				<div class="box is-raised is-unselectable">
					<BarChart
						v-model="bar_output"
						:State="map_output.name"
						:ChartData="bar_chart_data"
					/>
				</div>
			</section>

			<section class="section pt-2">
				<div class="columns">
					<div class="column">
						<div class="box is-raised is-unselectable">
							<MapChart
								v-model="map_output"
								:ChartData="map_data"
							/>
						</div>
					</div>

					<div class="column">
						<div class="box is-raised is-unselectable">
							<TreemapChart
								:Month="bar_output"
								:State="map_output.name"
								:ChartData="treemap_chart_data"
							/>
						</div>

						<div class="box is-raised is-unselectable">
							<LineageChart
								:Month="bar_output"
								:State="map_output.name"
								:ChartData="lineage_definition_data"
							/>
						</div>
					</div>

				</div>
			</section>
		</div>

	</div>
</template>

<script>
import { mapFields } from "vuex-map-fields"
import { map, forEach, uniq, sortBy } from "lodash"
import BarChart from "@/components/charts/bar-chart.vue"
import MapChart from "@/components/charts/map-chart.vue"
import Table from "@/components/table/table-advanced.vue"
import ScatterChart from "@/components/charts/scatter-chart.vue"
import TreemapChart from "@/components/charts/tree-map-chart.vue"
import LineageChart from "@/components/charts/lineage-profile-chart.vue"

export default {
	layout: 'normal',
	name: 'dashboard',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		map_output: {},
		bar_output: '',
	}),
	components: {
		Table,
		BarChart,
		MapChart,
		ScatterChart,
		TreemapChart,
		LineageChart
	},
	computed: {
		...mapFields([
			'active',
			'socket',
			'map_data',
			'dashboard',
			'bar_chart_data',
			'treemap_chart_data',
			'lineage_definition_data'
		]),
	},
	methods: {
	},
	beforeMount() {
		this.active = 'Dashboard'
	},
	mounted() {
		this.$nextTick(()=>{
			if(this.socket.isConnected && !this.socket.isLoaded.dashboard) {
				this.$store.dispatch('websocket_send', {'type': 'DASHBOARD'})
				this.$store.dispatch('websocket_send', {'type': 'BAR_CHART_DATA'})
				this.$store.dispatch('websocket_send', {'type': 'MAP_DATA', 'filter': { 'map_data': 'India' }})
				this.$store.dispatch('websocket_send', {'type': 'TREEMAP_CHART_DATA'})
				this.$store.dispatch('websocket_send', {'type': 'LINEAGE_DEFINITION_DATA'})
			}
		})
	},
	beforeDestroy() {
	}
};
</script>

<style scoped></style>
