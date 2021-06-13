<template>
	<section class="section mt-6">
<!-- 		<div class="column">
			<BarChartStats/>
		</div> -->

<!-- 		<div class="column">
			<D3Chart/>
		</div> -->

		<div class="box is-raised is-unselectable">
			<div class="box medium has-skeleton" v-if="table_loading"></div>
			<Table :tabledata="metadata" v-if="!table_loading && enable_table"/>
			<div v-if="!enable_table && !table_loading">
				<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
			</div>
		</div>
	</section>
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
		metadata: null,
		table_loading: true,
	}),
	components: {
		Table,
		D3Chart,
		BarChartStats,
	},
	computed: {
		enable_table() {
			if(this.metadata) {
				if(this.metadata.message == null) {
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
		async get_metadata_table() {
			this.metadata = await this.$axios.$post('/files/metadata-info/')
		}
	},
	beforeMount() {
		this.active = 'Sequences'
	},
	mounted() {
		// const loading = this.$vs.loading()
		this.$nextTick(async ()=>{
			await this.get_metadata_table()
			// loading.close()
			this.table_loading = false
		})
	}
};
</script>

<style scoped>
.medium {
	height: 770px;
}
</style>
