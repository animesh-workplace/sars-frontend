<template>
	<div class="column is-10 is-offset-1 p-0">
		<section class="section mt-6">
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
				vm.table_loading = true
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

<style scoped></style>
