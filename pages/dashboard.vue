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
									Genomes Sequenced
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
									Variants Catalogued
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

				</div>
			</section>

			<section class="section py-2">
				<div class="box is-raised is-unselectable">
					<!-- {{ map_output }} -->
					<!-- <ScatterChart :name="scatter_name"/> -->
					<BarChart/>
				</div>
			</section>

			<section class="section py-2">
				<div class="columns">
					<div class="column">
						<div class="box is-raised is-unselectable">
							<div class="dropdown is-hoverable is-fullwidth">
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
import { map, forEach, uniq } from "lodash"
import { mapFields } from "vuex-map-fields"
import MapChart from "@/components/charts/map-chart.vue"
import Table from "@/components/table/table-advanced.vue"
import { MAP_META } from "@/components/charts/map_config"
import ScatterChart from "@/components/charts/scatter-chart.vue"
import BarChart from "@/components/charts/bar-chart.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		all_metadata: null,
		table_loading: true,
		map_config: MAP_META,
		selected_state: 'India',
		selected_state_code: MAP_META['India'],
		map_output: null,
		dashboard: {},
		map_data: []
	}),
	components: {
		Table,
		BarChart,
		MapChart,
		ScatterChart
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
		}
	},
	methods: {
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
				if(JSON.parse(event.data)['type'] == 'DASHBOARD') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.dashboard = websocket_data
				}
				if(JSON.parse(event.data)['type'] == 'MAP_DATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.map_data = websocket_data
				}
			}
			this.$options.sockets.onerror = function(event) {
				console.log(event)
			}
			this.$options.sockets.onopen = function(event) {
				vm.$options.sockets.send(JSON.stringify({'type': 'ALL_METADATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'DASHBOARD'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'MAP_DATA'}))
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
