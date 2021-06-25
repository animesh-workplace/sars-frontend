<template>
	<div>
		<div class="box medium has-skeleton mb-3" v-if="view_skeleton"></div>
		<vs-table v-model="temp_data" :key="id" id="table-advanced" v-else>
			<template #header>
				<vs-input border color="#065F9E" placeholder="Search" v-model="search" id="search-bar" class="is-size-5">
					<template #icon>
						<svg class="icon has-fill-blue-dark">
							<use xlink:href="@/assets/images/icons/bds.svg#search"></use>
						</svg>
					</template>
				</vs-input>
			</template>

			<template #thead>
				<vs-tr>
					<vs-th class="no-pointer-event"></vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'virusName')">
						Virus name
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'collectionDate')">
						Collection date
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'state')">
						State
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'district')">
						District
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'gender')">
						Gender
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'patientAge')">
						Age
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'lastVaccinated')">
						Last vaccinated
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'lineage')">
						Lineage
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'clade')">
						Clade
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'scorpioCall')">
						Scorpio
					</vs-th>
				</vs-tr>
			</template>

			<template #tbody>
				<vs-tr
					:key="i"
					open-expand-only-td
					v-for="(tr,i) in $vs.getPage($vs.getSearch(temp_data, search), page, 15)"
				>
					<vs-td class="no-pointer-event">
						<svg class="icon icon-size has-fill-blue-dark">
							<use xlink:href="@/assets/images/icons/bds.svg#arrow-right-g"></use>
						</svg>
					</vs-td>
					<vs-td class="is-size-6">{{ tr['virusName'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['collectionDate'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['state'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['district'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['gender'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['patientAge'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['lastVaccinated'] }}</vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['lineage']" theme="#FF8F41"/></vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['clade']" theme="#00C8B5"/></vs-td>
					<vs-td class="is-size-6"><Tag :name="tr['scorpioCall']" theme="#7DB950"/></vs-td>

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
					:length="$vs.getLength($vs.getSearch(temp_data, search), 15)"
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
		view_skeleton: true,
		temp_data: null,
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
	}),
	props: {
		tabledata: {
			type: Array
		}
	},
	watch: {
		// search(value) {
		// 	// this.temp_data = value
		// 	this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
		// }
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
		let my_test = []
		forEach(this.tabledata, (d,i)=>{
			my_test[i] = {}
			forEach(d, (d1,i1)=>{
				my_test[i][camelCase(i1)] = d1
			})
		})
		this.temp_data = my_test
		this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
	},
	mounted() {
		this.$nextTick(()=>{
			this.view_skeleton = false
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
	.medium {
		height: 770px;
	}
	.no-pointer-event {
		pointer-events: none;
	}
</style>
