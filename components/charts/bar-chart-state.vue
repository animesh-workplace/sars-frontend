<template>
	<div>
		<div class="columns is-mobile mb-0">
			<div class="column is-8 is-offset-2 has-text-centered pb-4">
				<div
					class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark"
				>
					Sequence distribution (State)
					<vs-tooltip
						top
						class="is-inline-block is-shaked"
						color="#CEE5F6"
					>
						<svg class="icon is-small is-color-changed mb-1">
							<use
								xlink:href="@/assets/images/icons/bds.svg#info-bold-g"
							></use>
						</svg>
						<template #tooltip>
							<p class="has-text-black is-size-5">
								The numbers represented here are quality
								checked data and doesn't represent the actual genomes
								sequenced from these states
							</p>
						</template>
					</vs-tooltip>
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
import { orderBy, map } from 'lodash'
import { use } from 'echarts/core'
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
	components: {
		VChart,
	},
	provide: {
		[THEME_KEY]: 'light',
	},
	methods: {
		get_chartdata() {
			let my_data = [
				{ name: 'Delhi', value: 7201 },
				{ name: 'Kerala', value: 7444 },
				{ name: 'Haryana', value: 2811 },
				{ name: 'Uttar Pradesh', value: 1766 },
				{ name: 'Ladakh', value: 189 },
				{ name: 'Bihar', value: 359 },
				{ name: 'Assam', value: 1641 },
				{ name: 'Arunachal Pradesh', value: 126 },
				{ name: 'Karnataka', value: 4601 },
				{ name: 'Puducherry', value: 890 },
				{ name: 'Maharashtra', value: 10625 },
				{ name: 'Chandigarh', value: 351 },
				{ name: 'Himachal Pradesh', value: 1343 },
				{ name: 'Andhra Pradesh', value: 5569 },
				{ name: 'Telangana', value: 6925 },
				{ name: 'Rajasthan', value: 2254 },
				{ name: 'Tamil Nadu', value: 3802 },
				{ name: 'Odisha', value: 3454 },
				{ name: 'Meghalaya', value: 309 },
				{ name: 'Punjab', value: 3341 },
				{ name: 'Gujarat', value: 4405 },
				{ name: 'Madhya Pradesh', value: 1885 },
				{ name: 'Dadra and Nagar Haveli and Daman and Diu', value: 32 },
				{ name: 'Uttarakhand', value: 969 },
				{ name: 'Jharkhand', value: 851 },
				{ name: 'Jammu and Kashmir', value: 1792 },
				{ name: 'Manipur', value: 2056 },
				{ name: 'Goa', value: 738 },
				{ name: 'Andaman and Nicobar Islands', value: 56 },
				{ name: 'Chhattisgarh', value: 1992 },
				{ name: 'Lakshadweep', value: 70 },
				{ name: 'Tripura', value: 329 },
				{ name: 'West Bengal', value: 7405 },
				{ name: 'Mizoram', value: 2889 },
				{ name: 'Sikkim', value: 689 },
				{ name: 'Nagaland', value: 203 },
			]
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
