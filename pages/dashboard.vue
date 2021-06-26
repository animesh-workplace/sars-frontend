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
									{{ Intl.NumberFormat('en-IN').format('10000') }}
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
									{{ Intl.NumberFormat('en-IN').format('10000') }}
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
									{{ Intl.NumberFormat('en-IN').format('10000') }}
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
									{{ Intl.NumberFormat('en-IN').format('10000') }}
								</span>
							</div>
						</div>
					</div>

				</div>
			</section>

			<section class="section py-2">
				<div class="columns">
					<div class="column">
						<div class="box is-raised is-unselectable"></div>
					</div>
					<div class="column">
						<div class="box is-raised is-unselectable"></div>
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
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'
import Table from "@/components/table/table-advanced.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		all_metadata: null,
		table_loading: true,
	}),
	components: {
		Table,
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
	},
	methods: {
		get_websocket_data() {
			let vm = this
			this.$options.sockets = new WebSocket(`${process.env.WS_BASE_URL}/frontend/`)
			this.$options.sockets.onmessage = (event) => {
				if(JSON.parse(event.data)['type'] == 'ALL_METADATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.all_metadata = websocket_data.length ? websocket_data : null
					vm.table_loading = false
				}
			}
			this.$options.sockets.onerror = function(event) {
				console.log(event)
			}
			this.$options.sockets.onopen = function(event) {
				vm.$options.sockets.send(JSON.stringify({'type': 'ALL_METADATA'}))
			}

		}
	},
	beforeMount() {
		this.active = 'Dashboard'
	},
	mounted() {
		this.$nextTick(()=>{
			this.get_websocket_data()
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
</style>
