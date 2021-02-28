<template>
	<section class="section mt-6">
		<div class="box is-raised table-container is-unselectable">
			<div v-if="enable_table">
				<Table :tabledata="$vs.getPage(metadata, page, 30)"/>
				<div class="has-text-centered">
					<vs-pagination color="#D5CCBF" :dotted-number="10" v-model="page" :length="$vs.getLength(metadata, 30)" />
				</div>
			</div>
			<div v-else>
				<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
			</div>
		</div>
	</section>
</template>

<script>
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'
import Table from "@/components/table/table.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		page: 1,
		metadata: null
	}),
	components: {
		Table,
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
		const loading = this.$vs.loading()
		this.$nextTick(()=>{
			this.get_metadata_table()
			loading.close()
		})
	}
};
</script>

<style scoped></style>
