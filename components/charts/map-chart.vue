<template>
	<div>
		<div class="box medium has-skeleton mb-3" v-if="view_skeleton"></div>
		<div v-else>

			<div class="has-text-centered">
				<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
					{{ selected.mapName }}'s Genome Distribution
				</span>
			</div>

			<div class="column is-10 is-offset-1">
				<div class="dropdown is-fullwidth is-hoverable">
					<div class="dropdown-trigger">
						<div class="button is-light is-fullwidth has-text-grey-dark">
							{{ selected_state.name }}
						</div>
					</div>
					<div class="dropdown-menu">
						<div class="dropdown-content has-background-light">
							<div class="menu is-small">
								<ul class="menu-list">
									<li
										class="mb-1"
										:key="state_name"
										@click="select_state(state_name, state_info)"
										v-for="(state_info, state_name) in map_config"
									>
										<a
											:class="selected_state.name == state_name ? 'dropdown-item has-background-blue has-text-weight-medium has-text-light' : 'dropdown-item has-text-weight-medium has-text-grey-dark'"
										>
											{{ state_name }}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<span class="has-text-weight-semibold has-text-grey-dark">
				{{ selected_state.type }} : {{ selected.name }}
			</span>
			<v-chart
				class="chart"
				:loading="false"
				:option="options"
				@mouseover="get_data"
				@click="handle_click"
				@mouseout="get_data_default"
				:loading-options="loader_option"
			/>
		</div>
	</div>
</template>

<script>
import { map, max, ceil, capitalize } from "lodash"
import { feature } from 'topojson-client'
import { use, registerMap } from 'echarts/core'
import {
	GeoComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import VChart, { THEME_KEY } from "vue-echarts"
import { CanvasRenderer } from 'echarts/renderers'
import { MAP_META } from "@/components/charts/map_config"

import AP from "@/components/charts/maps/andhrapradesh.json"
import AR from "@/components/charts/maps/arunachalpradesh.json"
import AS from "@/components/charts/maps/assam.json"
import BR from "@/components/charts/maps/bihar.json"
import CT from "@/components/charts/maps/chhattisgarh.json"
import GA from "@/components/charts/maps/goa.json"
import GJ from "@/components/charts/maps/gujarat.json"
import HR from "@/components/charts/maps/haryana.json"
import HP from "@/components/charts/maps/himachalpradesh.json"
import JK from "@/components/charts/maps/jammukashmir.json"
import JH from "@/components/charts/maps/jharkhand.json"
import KA from "@/components/charts/maps/karnataka.json"
import KL from "@/components/charts/maps/kerala.json"
import MP from "@/components/charts/maps/madhyapradesh.json"
import MH from "@/components/charts/maps/maharashtra.json"
import MN from "@/components/charts/maps/manipur.json"
import ML from "@/components/charts/maps/meghalaya.json"
import MZ from "@/components/charts/maps/mizoram.json"
import NL from "@/components/charts/maps/nagaland.json"
import OR from "@/components/charts/maps/odisha.json"
import PB from "@/components/charts/maps/punjab.json"
import RJ from "@/components/charts/maps/rajasthan.json"
import SK from "@/components/charts/maps/sikkim.json"
import TN from "@/components/charts/maps/tamilnadu.json"
import TG from "@/components/charts/maps/telangana.json"
import TR from "@/components/charts/maps/tripura.json"
import UT from "@/components/charts/maps/uttarakhand.json"
import UP from "@/components/charts/maps/uttarpradesh.json"
import WB from "@/components/charts/maps/westbengal.json"
import AN from "@/components/charts/maps/andamannicobarislands.json"
import CH from "@/components/charts/maps/chandigarh.json"
import DN from "@/components/charts/maps/dnh-and-dd.json"
import DL from "@/components/charts/maps/delhi.json"
import LA from "@/components/charts/maps/ladakh.json"
import LD from "@/components/charts/maps/lakshadweep.json"
import PY from "@/components/charts/maps/puducherry.json"
import IN from "@/components/charts/maps/india.json"

registerMap('Andhra Pradesh', feature(AP, AP.objects.districts))
registerMap('Arunachal Pradesh', feature(AR, AR.objects.districts))
registerMap('Assam', feature(AS, AS.objects.districts))
registerMap('Bihar', feature(BR, BR.objects.districts))
registerMap('Chhattisgarh', feature(CT, CT.objects.districts))
registerMap('Goa', feature(GA, GA.objects.districts))
registerMap('Gujarat', feature(GJ, GJ.objects.districts))
registerMap('Haryana', feature(HR, HR.objects.districts))
registerMap('Himachal Pradesh', feature(HP, HP.objects.districts))
registerMap('Jammu and Kashmir', feature(JK, JK.objects.districts))
registerMap('Jharkhand', feature(JH, JH.objects.districts))
registerMap('Karnataka', feature(KA, KA.objects.districts))
registerMap('Kerala', feature(KL, KL.objects.districts))
registerMap('Madhya Pradesh', feature(MP, MP.objects.districts))
registerMap('Maharashtra', feature(MH, MH.objects.districts))
registerMap('Manipur', feature(MN, MN.objects.districts))
registerMap('Meghalaya', feature(ML, ML.objects.districts))
registerMap('Mizoram', feature(MZ, MZ.objects.districts))
registerMap('Nagaland', feature(NL, NL.objects.districts))
registerMap('Odisha', feature(OR, OR.objects.districts))
registerMap('Punjab', feature(PB, PB.objects.districts))
registerMap('Rajasthan', feature(RJ, RJ.objects.districts))
registerMap('Sikkim', feature(SK, SK.objects.districts))
registerMap('Tamil Nadu', feature(TN, TN.objects.districts))
registerMap('Telangana', feature(TG, TG.objects.districts))
registerMap('Tripura', feature(TR, TR.objects.districts))
registerMap('Uttarakhand', feature(UT, UT.objects.districts))
registerMap('Uttar Pradesh', feature(UP, UP.objects.districts))
registerMap('West Bengal', feature(WB, WB.objects.districts))
registerMap('Andaman and Nicobar Islands', feature(AN, AN.objects.districts))
registerMap('Chandigarh', feature(CH, CH.objects.districts))
registerMap('Dadra and Nagar Haveli and Daman and Diu', feature(DN, DN.objects.districts))
registerMap('Delhi', feature(DL, DL.objects.districts))
registerMap('Ladakh', feature(LA, LA.objects.districts))
registerMap('Lakshadweep', feature(LD, LD.objects.districts))
registerMap('Puducherry', feature(PY, PY.objects.districts))
registerMap('India', feature(IN, IN.objects.states))

use([
	MapChart,
	CanvasRenderer,
	GeoComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
])

export default {
	data: () => ({
		clicked: false,
		view_skeleton: true,
		map_config: MAP_META,
		selected_state: {
			name: 'India',
			type: 'Country'
		},
		selected: {
			name: 'India',
			mapName: 'India',
			mapType: 'COUNTRY',
		},
		loader_option: {
			color: '#c23531',
			lineWidth: 3,
			text: 'Loading',
			fontFamily: 'Averta',
			fontWeight: 500,
			fontSize: 14,
		},
		options: {
			tooltip: {
				trigger: 'item',
				position: 'right',
				formatter: '{b}: {c}',
				borderColor: '#fff',
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					fontFamily: 'Averta',
				},
			},
			visualMap: {
				min: 0,
				max: 10,
				orient: 'horizontal',
				align: 'left',
				inRange: {
					color: ['#e6f2fb', '#cee5f6', '#b5d9f2', '#9ccced', '#84bfe9', '#6bb2e4', '#52a5e0', '#3999db', '#218cd7', '#087fd2']
				},
				textStyle: {
					fontSize: 14,
					fontWeight: 500,
					color: '#706266',
					fontFamily: 'Averta',
				},
			},
			series: [{
				name: 'MAP_OF_INDIAN_STATES',
				type: 'map',
				map: 'India',
				data: [],
				zoom: 1.14,
				aspectScale: 0.85,
				nameProperty: 'st_nm',
				itemStyle: {
					borderColor: '#9C9090',
				},
				emphasis: {
					label: {
						show: false
					},
					itemStyle: {
						borderColor: '#2D232E',
						areaColor: 'inherit',
						borderWidth: 2
					}
				},
				select: {
					label: {
						show: false
					},
					itemStyle: {
						borderColor: '#2D232E',
						areaColor: 'inherit',
						borderWidth: 2
					}
				},
			}]
		}
	}),
	components: {
		VChart
	},
	provide: {
		[THEME_KEY]: "light"
	},
	props: {
		ChartData: {
			type: Array
		}
	},
	watch: {
		ChartData(value) {
			let max_value = ceil(max(map(value, d=>d.value)), -2)
			this.options.series[0].data = value
			this.options.visualMap.max = max_value
			this.options.visualMap.text = [max_value, 0]
		}
	},
	computed: {
	},
	methods: {
		select_state(state, info) {
			this.selected_state = {
				name: state,
				type: capitalize(info.mapType)
			}
			this.selected = {
				name: state,
				mapName: state,
				mapType: info.mapType
			}
			if(info.mapType == 'STATE') {
				this.options.series[0].nameProperty = 'district'
			} else {
				this.options.series[0].nameProperty = 'st_nm'
			}
			this.options.series[0].map = state
			this.$emit('input', this.selected)
		},
		get_data(event) {
			if(!this.clicked) {
				this.selected.name = event.name
				this.selected_state.type = this.selected.mapType == 'COUNTRY' ? 'State' : 'District'
				this.$emit('input', this.selected)
			}
		},
		handle_click(event) {
			if(this.selected.name == event.name) {
				this.clicked = !this.clicked
			} else {
				this.selected.name = event.name
				this.$emit('input', this.selected)
			}
		},
		get_data_default(event) {
			if(!this.clicked) {
				this.selected.name = this.selected.mapName
				this.selected_state.type = capitalize(this.selected.mapType)
			}
		},
	},
	mounted() {
		this.$nextTick(()=>{
			this.view_skeleton = false
			this.$emit('input', this.selected)
		})
	}
};
</script>

<style scoped>
	.chart {
		height: 600px;
	}
	.medium {
		height: 600px;
	}
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
