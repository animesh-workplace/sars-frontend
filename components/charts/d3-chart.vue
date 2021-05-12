<template>
	<div class="column is-5">
		<svg
			id="d3chart"
			ref="d3chart"
			:viewBox="`0 0 ${width} ${height}`"
			preserveAspectRatio="xMidYMid meet"
		>
			<g class="regions"/>
			<g class="state-borders"/>
			<g class="district-borders"/>
			<g class="circles"/>
		</svg>
	</div>
</template>

<script>
import * as d3 from 'd3'
import { forEach } from 'lodash'
import * as topojson from 'topojson-client'

export default {
	data: () => ({
		chartdata: null,
		width: 432,
		height: 488,
		MAP_META: {
			TT: {
				geoDataFile: 'https://raw.githubusercontent.com/covid19india/covid19india-react/master/public/maps/india.json',
				mapType: 0,
			},
		},
		STATE_NAMES: {
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
			TT: 'India',
			UN: 'Unassigned',
		}
	}),
	props: {
	},
	computed: {
	},
	methods: {
		generateArc() {
			let svg = d3.select("#d3chart")
			d3.json(this.MAP_META.TT.geoDataFile).then(
				function(data) {
					let path = d3.geoPath().projection(
						d3.geoIdentity()
							.reflectY(true)
							.fitSize([432,488], topojson.feature(data, data.objects.states))
					)
					svg.select('.regions')
						.selectAll('path')
						.data(topojson.feature(data, data.objects.states).features, (d) => d.id)
						.join(
							(enter) =>
								enter
									.append('path')
									.attr('d', path)
									.attr('stroke-width', 1.8)
									.attr('stroke-opacity', 1)
									.style('cursor', 'pointer')
									.on('mouseenter', (event, d) => {
										console.log(d.properties.st_nm)
									})
									.on('pointerdown', (event, d) => {
										console.log('mouse down')
									})
									.attr('fill', '#efefef')
									.attr('stroke', 'rgba(0, 123, 255, 0.5)'),
							(update) => update,
							(exit) =>
								exit
									.transition(d3.transition().duration(300))
									.attr('stroke', '#000')
									.attr('fill', '#fff')
									.remove()
						)

				}
			)
		}
	},
	mounted() {
		this.$nextTick(()=>{
			this.generateArc()
		})
	}
};
</script>

<style scoped>
.set-relative {
	position: relative;
}
.shift-up {
	position: absolute;
	top: 55%;
	left: 42.5%;
	z-index: -1;
}
.chart {
  height: 400px;
}
</style>
