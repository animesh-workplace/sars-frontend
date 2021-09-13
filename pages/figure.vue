<template>
	<div>
		<div class="column is-10 is-offset-1">

			<section class="section mt-6 pb-2">
				<!-- <div class="columns"> -->
					<div class="column">
						<div class="box is-raised is-unselectable">
							<MapChart
								v-model="map_output"
								:ChartData="mapData"
							/>
						</div>
					</div>
				<!-- </div> -->
			</section>
		</div>

	</div>
</template>

<script>
import { mapFields } from "vuex-map-fields"
import { map, forEach, uniq, sortBy } from "lodash"
import MapChart from "@/components/charts/map-chart.vue"

export default {
	layout: 'normal',
	name: 'dashboard',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		map_output: {},
		bar_output: '',

		// mapData: [ { "name": "Andaman and Nicobar Islands", "value": "7488" }, { "name":
		// "Andhra Pradesh", "value": "1922843" }, { "name": "Arunachal Pradesh", "value":
		// "39818" }, { "name": "Assam", "value": "533561" }, { "name": "Bihar", "value":
		// "723283" }, { "name": "Chandigarh", "value": "61831" }, { "name":
		// "Chhattisgarh", "value": "997973" }, { "name": "Dadra and Nagar Haveli and Daman and Diu",
		// "value": "10449" }, { "name": "Delhi", "value": "1435083" }, { "name":
		// "Goa", "value": "168716" }, { "name": "Gujarat", "value": "824241" }, { "name":
		// "Haryana", "value": "769279" }, { "name": "Himachal Pradesh", "value": "203626"
		// }, { "name": "Jammu and Kashmir", "value": "318693" }, { "name": "Jharkhand",
		// "value": "346302" }, { "name": "Karnataka", "value": "2871298" }, { "name":
		// "Kerala", "value": "3065336" }, { "name": "Ladakh", "value": "20195" }, {
		// "name": "Lakshadweep", "value": "10013" }, { "name": "Madhya Pradesh", "value":
		// "790175" }, { "name": "Maharashtra", "value": "6157799" }, { "name": "Manipur",
		// "value": "77725" }, { "name": "Meghalaya", "value": "54532" }, { "name":
		// "Mizoram", "value": "23993" }, { "name": "Nagaland", "value": "25939" }, {
		// "name": "Odisha", "value": "939752" }, { "name": "Puducherry", "value": "118978"
		// }, { "name": "Punjab", "value": "597598" }, { "name": "Rajasthan", "value":
		// "953126" }, { "name": "Sikkim", "value": "22321" }, { "name": "Tamil Nadu",
		// "value": "2518786" }, { "name": "Telangana", "value": "631173" }, { "name":
		// "Tripura", "value": "70476" }, { "name": "Uttar Pradesh", "value": "1707350" },
		// { "name": "Uttarakhand", "value": "341179" }, { "name": "West Bengal", "value":
		// "1512129" } ],

		// mapData: [ { "name": "Alipurduar", "value": 14212 }, { "name": "Cooch Behar", "value":
		// 26017 }, { "name": "Darjeeling", "value": 50843 }, { "name": "Kalimpong",
		// "value": 5678 }, { "name": "Jalpaiguri", "value": 38308 }, { "name": "Uttar Dinajpur",
		// "value": 19116 }, { "name": "Dakshin Dinajpur", "value": 16619 }, { "name": "Malda",
		// "value": 32477 }, { "name": "Murshidabad", "value": 33400 }, { "name": "Nadia",
		// "value": 67622 }, { "name": "Birbhum", "value": 40030 }, {"name": "Purulia",
		// "value": 19027 }, { "name": "Bankura", "value": 33322 }, {"name": "Jhargram",
		// "value": 10194 }, { "name": "Paschim Medinipur", "value": 48762 }, { "name": "Purba Medinipur",
		// "value": 58538 }, { "name": "Purba Bardhaman", "value": 39000 }, { "name": "Paschim Bardhaman",
		// "value": 55688 }, { "name": "Howrah", "value": 93161 }, { "name": "Hooghly",
		// "value": 80149 }, { "name": "North 24 Parganas", "value": 316212 }, { "name": "South 24 Parganas",
		// "value": 94625 }, { "name": "Kolkata", "value": 308218 } ],

		// mapData: [ { "name": "Delhi", "value": 1434188 } ],

		// mapData: [ { "name": "Bengaluru Urban", "value": 1214235 }, { "name": "Mysuru", "value":
		// 166940 }, { "name": "Tumakuru", "value": 115116 }, { "name": "Hassan", "value":
		// 102106 }, { "name": "Ballari", "value": 97049 }, { "name": "Dakshina Kannada",
		// "value": 93137 }, { "name": "Belagavi", "value": 75936 }, { "name": "Mandya",
		// "value": 70315 }, { "name": "Udupi", "value": 66585 }, { "name": "Shivamogga",
		// "value": 64269 }, { "name": "Kalaburagi", "value": 61341 }, { "name": "Dharwad",
		// "value": 59986 }, { "name": "Bengaluru Rural", "value": 59699 }, { "name":
		// "Uttara Kannada", "value": 51967 }, { "name": "Davanagere", "value": 49637 }, {
		// "name": "Chikkamagaluru", "value": 45748 }, { "name": "Kolar", "value": 44158 },
		// { "name": "Chikkaballapura", "value": 43201 }, { "name": "Raichur", "value":
		// 39786 }, { "name": "Vijayapura", "value": 35997 }, { "name": "Chitradurga",
		// "value": 35179 }, { "name": "Bagalkote", "value": 35001 }, { "name": "Koppal",
		// "value": 34901 }, { "name": "Chamarajanagara", "value": 31299 }, { "name":
		// "Kodagu", "value": 30613 }, { "name": "Yadgir", "value": 27427 }, { "name":
		// "Gadag", "value": 25829 }, { "name": "Bidar", "value": 24183 }, { "name":
		// "Ramanagara", "value": 23667 }, { "name": "Haveri", "value": 21670 } ],

		mapData: [],

	}),
	components: {
		MapChart,
	},
	computed: {
		...mapFields([
			'active',
			'socket',
			// 'map_data',
		]),
	},
	methods: {
	},
	beforeMount() {
		this.active = 'Dashboard'
	},
	mounted() {
		this.$nextTick(()=>{
			this.mapData = [ { "name": "Pune", "value": 1056217 }, { "name": "Mumbai", "value": 722878 }, {
		"name": "Thane", "value": 580152 }, { "name": "Nagpur", "value": 492532 }, {
		"name": "Nashik", "value": 398639 }, { "name": "Ahmednagar", "value": 268273 },
		{ "name": "Satara", "value": 193851 }, { "name": "Solapur", "value": 174686 }, {
		"name": "Raigad", "value": 168889 }, { "name": "Kolhapur", "value": 158071 }, {
		"name": "Sangli", "value": 155042 }, { "name": "Aurangabad", "value": 151420 },
		{ "name": "Jalgaon", "value": 139218 }, { "name": "Palghar", "value": 125436 },
		{ "name": "Amravati", "value": 94084 }, { "name": "Beed", "value": 93287 }, {
		"name": "Nanded", "value": 90394 }, { "name": "Latur", "value": 89915 }, {
		"name": "Chandrapur", "value": 87930 }, { "name": "Buldhana", "value": 84025 },
		{ "name": "Yavatmal", "value": 75969 }, { "name": "Ratnagiri", "value": 62357 },
		{ "name": "Osmanabad", "value": 61898 }, { "name": "Bhandara", "value": 60061 },
		{ "name": "Jalna", "value": 59762 }, { "name": "Akola", "value": 58871 }, {
		"name": "Wardha", "value": 58471 }, { "name": "Parbhani", "value": 51756 }, {
		"name": "Dhule", "value": 45830 }, { "name": "Sindhudurg", "value": 41814 }, {
		"name": "Washim", "value": 41393 }, { "name": "Gondia", "value": 40436 }, {
		"name": "Nandurbar", "value": 39029 }, { "name": "Gadchiroli", "value": 29583 },
		{ "name": "Hingoli", "value": 18284 } ]
			// if(this.socket.isConnected && !this.socket.isLoaded.dashboard) {
			// 	this.$store.dispatch('websocket_send', {'type': 'MAP_DATA', 'filter': { 'map_data': 'India' }})
			// }
		})
	},
	beforeDestroy() {
	}
};
</script>

<style scoped></style>
