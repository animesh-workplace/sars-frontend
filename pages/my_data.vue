<template>
	<div class="column is-10 is-offset-1 p-0">
		<section class="section mt-6 pb-1">
			<div class="box is-raised is-unselectable">
				<span class="title is-4 has-text-weight-semibold mb-0 has-text-grey-darker">
					Metadata uploaded by you
				</span>
				<div class="box medium has-skeleton mt-3" v-if="table_loading1"></div>
				<Table :tabledata="my_metadata" v-if="!table_loading1 && enable_table1" class="mt-3"/>
				<div v-if="!enable_table1 && !table_loading1">
					<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
				</div>
			</div>
		</section>

<!-- 		<section class="section">
			<div class="box is-raised is-unselectable">
				<span class="title is-4 has-text-weight-semibold mb-0 has-text-grey-darker">
					Metadata uploaded by all
				</span>
				<div class="box medium has-skeleton mt-3" v-if="table_loading2"></div>
				<Table :tabledata="all_metadata" v-if="!table_loading2 && enable_table2" class="mt-3"/>
				<div v-if="!enable_table2 && !table_loading2">
					<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
				</div>
			</div>
		</section> -->
	</div>
</template>

<script>
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'
import Table from "@/components/table/table-new.vue"
import D3Chart from "@/components/charts/d3-chart.vue"
import BarChartStats from "@/components/charts/bar-chart-stats.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		page: 1,
		my_metadata: null,
		all_metadata: null,
		table_loading1: true,
		table_loading2: true,
	}),
	components: {
		Table,
		D3Chart,
		BarChartStats,
	},
	computed: {
		enable_table1() {
			if(this.my_metadata) {
				if(this.my_metadata != null) {
					return true
				}
			}
			return false
		},
		enable_table2() {
			if(this.all_metadata) {
				if(this.all_metadata != null) {
					return true
				}
			}
			return false
		},
		...mapFields([
			'active'
		]),
	},
	methods: {
		get_websocket_data() {
			let vm = this
			this.$options.sockets = new WebSocket(`${process.env.WS_BASE_URL}/frontend/`)
			this.$options.sockets.onmessage = (event) => {
				if(JSON.parse(event.data)['type'] == 'MY_METADATA') {
					let websocket_data = JSON.parse(event.data)['data']
					vm.my_metadata = websocket_data.length ? websocket_data : null
					vm.table_loading1 = false
				}
				// if(JSON.parse(event.data)['type'] == 'ALL_METADATA') {
				// 	let websocket_data = JSON.parse(event.data)['data']
				// 	vm.all_metadata = websocket_data.length ? websocket_data : null
				// 	vm.table_loading2 = false
				// }
			}
			this.$options.sockets.onerror = function(event) {
				console.log(event)
			}
			this.$options.sockets.onopen = function(event) {
				// vm.$options.sockets.send(JSON.stringify({'type': 'ALL_METADATA'}))
				vm.$options.sockets.send(JSON.stringify({'type': 'MY_METADATA'}))
				vm.table_loading1 = true
				// vm.table_loading2 = true
			}

		}
	},
	beforeMount() {
		this.active = 'Sequences'
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
