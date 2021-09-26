<template>
	<div class="column is-10 is-offset-1 p-0">
		<section class="section mt-6 pb-1">
			<div class="box is-raised is-unselectable">
				<div class="has-text-centered">
					<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
						Complete Metadata
					</span>
				</div>
				<div class="box medium has-skeleton mt-4" v-if="table_loading"></div>
				<Table :TableData="all_metadata" :Size="metadata_length" v-if="!table_loading && enable_table" class="mt-4"/>
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
	name: 'my_data',
	layout: 'normal2',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		page: 1,
	}),
	components: {
		Table,
	},
	computed: {
		...mapFields([
			'active',
			'socket',
			'all_metadata',
			'table_loading',
			'metadata_length',
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
	},
	beforeMount() {
		this.active = 'Sequences'
	},
	mounted() {
		this.$nextTick(()=>{
			if(this.socket.isConnected) {
				this.$store.dispatch('websocket_send', {
					'type': 'ALL_METADATA',
					'filter': { 'each_page': 10, 'page': 1 }
				})
			}
		})
	},
	beforeDestroy() {
	}
};
</script>

<style scoped>
.medium {
	height: 770px;
}
</style>
