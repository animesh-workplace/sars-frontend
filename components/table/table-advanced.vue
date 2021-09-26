<template>
	<div>
		<vs-table id="table-advanced">
<!-- 			<template #header>
				<vs-input border color="#065F9E" placeholder="Search" v-model="search" id="search-bar" class="is-size-5">
					<template #icon>
						<svg class="icon has-fill-blue-dark">
							<use xlink:href="@/assets/images/icons/bds.svg#search"></use>
						</svg>
					</template>
				</vs-input>
			</template> -->

			<template #thead>
				<vs-tr>
					<vs-th class="no-pointer-event"></vs-th>
					<vs-th class="is-size-6">
						Virus name
					</vs-th>
					<vs-th class="is-size-6">
						Collection date
					</vs-th>
					<vs-th class="is-size-6">
						State
					</vs-th>
					<vs-th class="is-size-6">
						District
					</vs-th>
					<vs-th class="is-size-6">
						Gender
					</vs-th>
					<vs-th class="is-size-6">
						Age
					</vs-th>
					<vs-th class="is-size-6">
						Last vaccinated
					</vs-th>
					<vs-th class="is-size-6">
						Submitting lab
					</vs-th>
					<vs-th class="is-size-6">
						Lineage
					</vs-th>
					<vs-th class="is-size-6">
						Clade
					</vs-th>
					<vs-th class="is-size-6">
						Scorpio
					</vs-th>
				</vs-tr>
			</template>

			<template #tbody>
				<vs-tr
					:key="i"
					v-for="(tr,i) in TableData"
				>
					<vs-td class="no-pointer-event">
						<svg class="icon icon-size has-fill-blue-dark">
							<use xlink:href="@/assets/images/icons/bds.svg#arrow-right-g"></use>
						</svg>
					</vs-td>
					<vs-td class="is-size-6">{{ tr['Virus name'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['Collection date'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['State'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['District'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['Gender'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['Patient age'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['Last vaccinated'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['Submitting lab'] }}</vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['lineage']" theme="#FF8F41"/></vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['clade']" theme="#00C8B5"/></vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['scorpio_call']" theme="#7DB950"/></vs-td>

					<template #expand>
						<SubTable :detail="tr"/>
					</template>
				</vs-tr>
			</template>

			<template #footer>
				<vs-pagination
					v-model="page"
					color="#087FD2"
					:dotted-number="10"
					:length="Size"
				/>
			</template>
		</vs-table>

	</div>
</template>

<script>
import { forEach, camelCase } from 'lodash'
import Tag from "@/components/table/cool-tag.vue"
import SubTable from "@/components/table/sub-table.vue"

export default {
	data: () => ({
		page: 1,
		search: '',
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
	}),
	props: {
		TableData: {
			type: Array
		},
		Size: {
			type: Number
		}
	},
	watch: {
		page(value) {
			this.$store.dispatch('websocket_send',
				{'type': 'MY_METADATA', 'filter': { 'each_page': 15, 'page': value }}
			)
		},
	},
	components: {
		Tag,
		SubTable
	},
	computed: {
	},
	methods: {
	},
	beforeMount() {
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
	th, td {
		white-space: nowrap;
	}
	.icon-size {
		width: 2rem;
		height: 1.2rem;
	}
	.no-pointer-event {
		pointer-events: none;
	}
</style>
