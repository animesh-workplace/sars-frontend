<template>
	<div>
		<vs-table v-model="temp_data" :key="id">
			<template #header>
				<vs-input border color="#065F9E" placeholder="Search" v-model="search" id="search-bar">
					<template #icon>
						<svg class="icon has-fill-blue-dark">
							<use xlink:href="@/assets/images/icons/bds.svg#search"></use>
						</svg>
					</template>
				</vs-input>
			</template>

			<template #thead>
				<vs-tr>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'virusName')">
						Virus name
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'type')">
						Type
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'passageDetailsHistory')">
						Passage details/history
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'collectionDate')">
						Collection date
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'country')">
						Country
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'state')">
						State
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'district')">
						District
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'location')">
						Location
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'additionalLocationInformation')">
						Additional location information
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'host')">
						Host
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'additionalHostInformation')">
						Additional host information
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'gender')">
						Gender
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'patientAge')">
						Patient age
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'patientStatus')">
						Patient status
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'specimenSource')">
						Specimen source
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'outbreak')">
						Outbreak
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'lastVaccinated')">
						Last vaccinated
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'treatment')">
						Treatment
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'sequencingTechnology')">
						Sequencing technology
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'assemblyMethod')">
						Assembly method
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'coverage')">
						Coverage
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'originatingLab')">
						Originating lab
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'originatingLabAddress')">
						Originating lab address
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'submittingLab')">
						Submitting lab
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'submittingLabAddress')">
						Submitting lab address
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'sampleIdGivenByTheSubmittingLab')">
						Sample ID given by the submitting lab
					</vs-th>
					<vs-th sort class="is-size-6" @click="temp_data = $vs.sortData($event, temp_data, 'authors')">
						Authors
					</vs-th>
				</vs-tr>
			</template>

			<template #tbody>
				<vs-tr
					:key="i"
					v-for="(tr,i) in $vs.getPage($vs.getSearch(temp_data, search), page, 15)"
				>
					<vs-td class="is-size-6">{{ tr['virusName'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['type'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['passageDetailsHistory'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['collectionDate'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['country'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['state'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['district'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['location'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['additionalLocationInformation'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['host'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['additionalHostInformation'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['gender'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['patientAge'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['patientStatus'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['specimenSource'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['outbreak'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['lastVaccinated'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['treatment'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['sequencingTechnology'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['assemblyMethod'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['coverage'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['originatingLab'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['originatingLabAddress'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['submittingLab'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['submittingLabAddress'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['sampleIdGivenByTheSubmittingLab'] }}</vs-td>
					<vs-td class="is-size-6">{{ tr['authors'] }}</vs-td>
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

export default {
	data: () => ({
		page: 1,
		search: '',
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
		console.log(my_test)
		this.temp_data = my_test
		this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
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
    /*border: 0.5px dashed #DFDBE3;*/
    /*width: 100px !important;*/
    /*overflow: hidden;*/
}
/*#search-bar > .vs-input {
	width: 100%;
}*/
</style>
