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
					<span class="has-text-weight-semibold has-text-grey-dark">
						{{ map_output.district || selected_state }} Lineage Distribution
					</span>
					<BarChart
						:ChartData="bar_chart_data"
						:State="Object.keys(map_output).length ? map_output : selected_state_code"
					/>
				</div>
			</section>

			<section class="section py-2">
				<div class="columns">
					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="dropdown is-fullwidth is-hoverable">
								<div class="dropdown-trigger">
									<div class="button is-light is-fullwidth has-text-grey-dark">
										{{ selected_state }}
									</div>
								</div>
								<div class="dropdown-menu">
									<div class="dropdown-content has-background-light">
										<a
											:key="state_name"
											@click="select_state(state_name, state_info)"
											v-for="(state_info, state_name) in map_config"
											:class="selected_state == state_name ? 'dropdown-item is-active has-text-weight-medium has-text-grey-dark' : 'dropdown-item has-text-weight-medium has-text-grey-dark'"
										>
											{{ state_name }}
										</a>
									</div>
								</div>
							</div>
							<MapChart :show="selected_state_code" v-model="map_output" :mapData="map_data"/>
						</div>
					</div>
					<div class="column">
						<div class="box is-raised is-unselectable">
							<span class="has-text-weight-semibold has-text-grey-dark">
								{{ map_output.district || selected_state }} Mutation Profile
							</span>
							<TreemapChart
								:ChartData="treemap_chart_data"
								:State="Object.keys(map_output).length ? map_output : selected_state_code"
							/>
						</div>

						<div class="box is-raised is-unselectable">
							<span class="has-text-weight-semibold has-text-grey-dark">
								{{ map_output.district || selected_state }} Lineage Profile
							</span>
							<div class="columns mt-2">
								<div class="column" v-for="lineage in get_state_lineages">
									<div
										@click="change_selected_lineage(lineage)"
										class="box is-small is-raised hover-to-floating has-background-light"
									>
										<span class="has-text-weight-medium has-text-grey-dark">
											{{ lineage }}
										</span>
									</div>
								</div>
							</div>

							<div class="tags mt-1">
								<div
									class="tag has-background-blue-light"
									v-for="muts in lineage_definition_data[selected_lineage]"
								>
									{{ muts }}
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>

			<section class="section pt-2">
				<div class="box is-raised is-unselectable">
					<span class="title is-4 has-text-weight-semibold mb-0 has-text-grey-darker">
						Complete Metadata
					</span>
					<div class="box medium has-skeleton mt-4" v-if="table_loading"></div>
					<Table :tabledata="all_metadata" v-if="!table_loading && enable_table" class="mt-4"/>
					<div v-if="!enable_table && !table_loading">
						<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
					</div>
				</div>
			</section>
		</div>

	</div>
</template>

<script>
import { map, forEach, uniq, sortBy } from "lodash"
import { mapFields } from "vuex-map-fields"
import MapChart from "@/components/charts/map-chart.vue"
import Table from "@/components/table/table-advanced.vue"
import { MAP_META } from "@/components/charts/map_config"
import ScatterChart from "@/components/charts/scatter-chart.vue"
import BarChart from "@/components/charts/bar-chart.vue"
import TreemapChart from "@/components/charts/tree-map-chart.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		map_data: [],
		dashboard: {},
		map_output: {},
		bar_chart_data: {},
		all_metadata: null,
		table_loading: true,
		map_config: MAP_META,
		selected_lineage: '',
		treemap_chart_data: {},
		selected_state: 'India',
		lineage_definition_data: {},
		selected_state_code: MAP_META['India'],
	}),
	components: {
		Table,
		BarChart,
		MapChart,
		ScatterChart,
		TreemapChart,
	},
	computed: {
		...mapFields([
			'active'
		]),
		enable_table() {
			if(this.all_metadata) {
				if(this.all_metadata != null) {
					return true
				}
			}
			return false
		},
		scatter_name() {
			if(this.map_output == null) {
				return 'India'
			} else {
				return this.map_output.district
			}
		},
		get_state_lineages() {
			let lineages = []
			if(this.map_output.district) {
				lineages = map(sortBy(this.bar_chart_data[this.map_output.district], 'name'), d=>d.name)
			} else {
				lineages = map(sortBy(this.bar_chart_data['India'], 'name'), d=>d.name)
			}
			this.selected_lineage = lineages[0]
			return lineages
		}
	},
	methods: {
		change_selected_lineage(lineage) {
			this.selected_lineage = lineage
		},
		select_state(state, info) {
			this.$set(info, 'name', state)
			this.selected_state = state
			this.selected_state_code = info
		},
		get_websocket_data() {
			let vm = this
			this.$options.sockets = new WebSocket(`${process.env.WS_BASE_URL}/frontend/`)
			this.$options.sockets.onmessage = (event) => {
				if(JSON.parse(event.data)['type'] == 'ALL_METADATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.all_metadata = websocket_data.length ? websocket_data : null
					vm.table_loading = false
				}
				else if(JSON.parse(event.data)['type'] == 'DASHBOARD') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.dashboard = websocket_data
				}
				else if(JSON.parse(event.data)['type'] == 'MAP_DATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.map_data = websocket_data
				}
				else if(JSON.parse(event.data)['type'] == 'BAR_CHART_DATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.bar_chart_data = websocket_data
				}
				else if(JSON.parse(event.data)['type'] == 'TREEMAP_CHART_DATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.treemap_chart_data = websocket_data
				}
				else if(JSON.parse(event.data)['type'] == 'LINEAGE_DEFINITION_DATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.lineage_definition_data = websocket_data
				}
			}
			this.$options.sockets.onerror = function(event) {
				console.log(event)
			}
			this.$options.sockets.onopen = function(event) {
				vm.$options.sockets.send(JSON.stringify({'type': 'ALL_METADATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'DASHBOARD'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'MAP_DATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'BAR_CHART_DATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'TREEMAP_CHART_DATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'LINEAGE_DEFINITION_DATA'}))
			}

		}
	},
	beforeMount() {
		this.active = 'Dashboard'
	},
	mounted() {
		this.$nextTick(()=>{
			this.get_websocket_data()
			this.$set(this.selected_state_code, 'name', 'India')
		})
	},
	beforeDestroy() {
		this.$options.sockets.close()
	}
};
</script>

<style scoped>
	.medium {
		height: 770px;
	}
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
