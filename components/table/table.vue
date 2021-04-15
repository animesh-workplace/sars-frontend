<template>
	<table class="table is-striped is-hoverable is-bordered is-narrow">
		<thead>
			<tr>
				<th>Virus name</th>
				<th>Type</th>
				<th>Passage details/history</th>
				<th>Collection date</th>
				<th>Country</th>
				<th>State</th>
				<th>District</th>
				<th>Location</th>
				<th>Additional location information</th>
				<th>Host</th>
				<th>Additional host information</th>
				<th>Gender</th>
				<th>Patient age</th>
				<th>Patient status</th>
				<th>Specimen source</th>
				<th>Outbreak</th>
				<th>Last vaccinated</th>
				<th>Treatment</th>
				<th>Sequencing technology</th>
				<th>Assembly method</th>
				<th>Coverage</th>
				<th>Originating lab</th>
				<th>Originating lab address</th>
				<th>Submitting lab</th>
				<th>Submitting lab address</th>
				<th>Sample ID given by the submitting lab</th>
				<th>Authors</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(data,index) in temp_data" :key="index">
				<td>{{ data['Virus name'] }}</td>
				<td>{{ data['Type'] }}</td>
				<td>{{ data['Passage details/history'] }}</td>
				<td>{{ data['Collection date'] }}</td>
				<td>{{ data['Country'] }}</td>
				<td>{{ data['State'] }}</td>
				<td>{{ data['District'] }}</td>
				<td>{{ data['Location'] }}</td>
				<td>{{ data['Additional location information'] }}</td>
				<td>{{ data['Host'] }}</td>
				<td>{{ data['Additional host information'] }}</td>
				<td>{{ data['Gender'] }}</td>
				<td>{{ data['Patient age'] }}</td>
				<td>{{ data['Patient status'] }}</td>
				<td>{{ data['Specimen source'] }}</td>
				<td>{{ data['Outbreak'] }}</td>
				<td>{{ data['Last vaccinated'] }}</td>
				<td>{{ data['Treatment'] }}</td>
				<td>{{ data['Sequencing technology'] }}</td>
				<td>{{ data['Assembly method'] }}</td>
				<td>{{ data['Coverage'] }}</td>
				<td>{{ data['Originating lab'] }}</td>
				<td>{{ data['Originating lab address'] }}</td>
				<td>{{ data['Submitting lab'] }}</td>
				<td>{{ data['Submitting lab address'] }}</td>
				<td>{{ data['Sample ID given by the submitting lab'] }}</td>
				<td>{{ data['Authors'] }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	data: () => ({
		temp_data: null
	}),
	props: {
		tabledata: {
			type: Array
		}
	},
	watch: {
		tabledata(value) {
			this.temp_data = value
		}
	},
	components: {
	},
	computed: {
	},
	methods: {
	},
	beforeMount() {
		this.temp_data = this.tabledata
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
</style>
