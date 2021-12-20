<template>
	<div>
		<div class="columns is-mobile mb-0">
			<div class="column is-8 is-offset-2 has-text-centered pb-4">
				<div
					class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark"
				>
					Sequence distribution (State)
				</div>
			</div>
		</div>

		<v-chart
			ref="bar-chart"
			:loading="false"
			class="chart-mobile"
			:option="options_mobile"
			v-if="$device.isMobileOrTablet"
			:loading-options="loader_option"
		/>

		<v-chart
			v-else
			class="chart"
			ref="bar-chart"
			:loading="false"
			:option="options_desktop"
			:loading-options="loader_option"
		/>
	</div>
</template>

<script>
import { use } from 'echarts/core'
import { orderBy, map } from 'lodash'
import { mapFields } from 'vuex-map-fields'
import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'

use([
	BarChart,
	GridComponent,
	CanvasRenderer,
	LegendComponent,
	TooltipComponent,
])

export default {
	data: () => ({
		loader_option: {
			color: '#c23531',
			lineWidth: 3,
			text: 'Loading',
			fontFamily: 'Averta',
			fontWeight: 500,
			fontSize: 14,
		},
		options_desktop: {
			tooltip: {
				trigger: 'axis',
				position: 'right',
				axisPointer: {
					type: 'shadow',
				},
				borderColor: '#fff',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
				formatter: function (params) {
					let rename = {
						AP: 'Andhra Pradesh',
						AR: 'Arunachal Pradesh',
						AS: 'Assam',
						BR: 'Bihar',
						CT: 'Chhattisgarh',
						GA: 'Goa',
						GJ: 'Gujarat',
						HR: 'Haryana',
						HP: 'Himachal Pradesh',
						JH: 'Jharkhand',
						KA: 'Karnataka',
						KL: 'Kerala',
						MP: 'Madhya Pradesh',
						MH: 'Maharashtra',
						MN: 'Manipur',
						ML: 'Meghalaya',
						MZ: 'Mizoram',
						NL: 'Nagaland',
						OR: 'Odisha',
						PB: 'Punjab',
						RJ: 'Rajasthan',
						SK: 'Sikkim',
						TN: 'Tamil Nadu',
						TG: 'Telangana',
						TR: 'Tripura',
						UT: 'Uttarakhand',
						UP: 'Uttar Pradesh',
						WB: 'West Bengal',
						AN: 'Andaman and Nicobar Islands',
						CH: 'Chandigarh',
						DN: 'Dadra and Nagar Haveli and Daman and Diu',
						DL: 'Delhi',
						JK: 'Jammu and Kashmir',
						LA: 'Ladakh',
						LD: 'Lakshadweep',
						PY: 'Puducherry',
					}
					return `<b>${rename[params[0].name]} (${
						params[0].name
					})</b> : ${params[0].value}`
				},
			},
			grid: {
				left: 5,
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
			},
			xAxis: {
				data: [],
				type: 'category',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
				axisTick: {
					alignWithLabel: true,
				},
			},
			series: [],
		},
		options_mobile: {
			tooltip: {
				trigger: 'axis',
				position: 'right',
				axisPointer: {
					type: 'shadow',
				},
				borderColor: '#fff',
				textStyle: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
				formatter: function (params) {
					let rename = {
						AP: 'Andhra Pradesh',
						AR: 'Arunachal Pradesh',
						AS: 'Assam',
						BR: 'Bihar',
						CT: 'Chhattisgarh',
						GA: 'Goa',
						GJ: 'Gujarat',
						HR: 'Haryana',
						HP: 'Himachal Pradesh',
						JH: 'Jharkhand',
						KA: 'Karnataka',
						KL: 'Kerala',
						MP: 'Madhya Pradesh',
						MH: 'Maharashtra',
						MN: 'Manipur',
						ML: 'Meghalaya',
						MZ: 'Mizoram',
						NL: 'Nagaland',
						OR: 'Odisha',
						PB: 'Punjab',
						RJ: 'Rajasthan',
						SK: 'Sikkim',
						TN: 'Tamil Nadu',
						TG: 'Telangana',
						TR: 'Tripura',
						UT: 'Uttarakhand',
						UP: 'Uttar Pradesh',
						WB: 'West Bengal',
						AN: 'Andaman and Nicobar Islands',
						CH: 'Chandigarh',
						DN: 'Dadra and Nagar Haveli and Daman and Diu',
						DL: 'Delhi',
						JK: 'Jammu and Kashmir',
						LA: 'Ladakh',
						LD: 'Lakshadweep',
						PY: 'Puducherry',
					}
					return `<b>${rename[params[0].name]} (${
						params[0].name
					})</b> : ${params[0].value}`
				},
			},
			grid: {
				left: 0,
				right: 15,
				bottom: '0%',
				containLabel: true,
			},
			xAxis: {
				type: 'value',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
			},
			yAxis: {
				data: [],
				type: 'category',
				axisLabel: {
					fontFamily: 'Averta',
					fontWeight: 500,
				},
				axisTick: {
					alignWithLabel: true,
				},
			},
			series: [],
		},
	}),
	computed: {
		...mapFields(['landing_info', 'landing_info_loaded']),
	},
	components: {
		VChart,
	},
	provide: {
		[THEME_KEY]: 'light',
	},
	methods: {
		async get_chartdata() {
			if (this.landing_info_loaded) {
				let my_data = this.landing_info.map_data
				let rename = {
					'Andhra Pradesh': 'AP',
					'Arunachal Pradesh': 'AR',
					Assam: 'AS',
					Bihar: 'BR',
					Chhattisgarh: 'CT',
					Goa: 'GA',
					Gujarat: 'GJ',
					Haryana: 'HR',
					'Himachal Pradesh': 'HP',
					Jharkhand: 'JH',
					Karnataka: 'KA',
					Kerala: 'KL',
					'Madhya Pradesh': 'MP',
					Maharashtra: 'MH',
					Manipur: 'MN',
					Meghalaya: 'ML',
					Mizoram: 'MZ',
					Nagaland: 'NL',
					Odisha: 'OR',
					Punjab: 'PB',
					Rajasthan: 'RJ',
					Sikkim: 'SK',
					'Tamil Nadu': 'TN',
					Telangana: 'TG',
					Tripura: 'TR',
					Uttarakhand: 'UT',
					'Uttar Pradesh': 'UP',
					'West Bengal': 'WB',
					'Andaman and Nicobar Islands': 'AN',
					Chandigarh: 'CH',
					'Dadra and Nagar Haveli and Daman and Diu': 'DN',
					Delhi: 'DL',
					'Jammu and Kashmir': 'JK',
					Ladakh: 'LA',
					Lakshadweep: 'LD',
					Puducherry: 'PY',
				}

				if (this.$device.isMobileOrTablet) {
					let output = [
						{
							type: 'bar',
							data: map(
								orderBy(my_data, ['name'], 'desc'),
								(d) => d.value
							),
							label: {
								show: true,
								fontSize: 11,
								fontWeight: 500,
								fontFamily: 'Averta',
								position: this.$device.isMobileOrTablet
									? 'right'
									: 'top',
							},
						},
					]
					this.options_mobile.yAxis.data = map(
						orderBy(my_data, ['name'], 'desc'),
						(d) => rename[d.name]
					)
					this.options_mobile.series = output
				} else {
					let output = [
						{
							type: 'bar',
							data: map(
								orderBy(my_data, ['name'], 'asc'),
								(d) => d.value
							),
							itemStyle: {
								borderRadius: [3, 3, 0, 0],
							},
							label: {
								show: true,
								fontSize: 11,
								fontWeight: 500,
								fontFamily: 'Averta',
								position: this.$device.isMobileOrTablet
									? 'right'
									: 'top',
							},
						},
					]
					this.options_desktop.xAxis.data = map(
						orderBy(my_data, ['name'], 'asc'),
						(d) => rename[d.name]
					)
					this.options_desktop.series = output
				}
			} else {
				console.log('Data not loaded')
			}
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.get_chartdata()
		})
	},
}
</script>

<style scoped>
.chart {
	height: 500px;
}
.chart-mobile {
	height: 700px;
}
.dropdown-content {
	height: 15em;
	overflow: auto;
}
/*@keyframes shake {
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(15deg);
	}
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(-15deg);
	}
	100% {
		transform: rotate(0deg);
	}
}*/
@keyframes colorchange {
	0% {
		fill: #8a7d7f;
	}
	33% {
		fill: #f45564;
	}
	66% {
		fill: #f45564;
	}
	100% {
		fill: #8a7d7f;
	}
}
.is-shaked {
	animation: shake 1s infinite ease-in-out;
}
.is-color-changed {
	animation: colorchange 1s infinite ease-in-out;
}
.vs-tooltip {
	padding: 0.25rem !important;
}
</style>
