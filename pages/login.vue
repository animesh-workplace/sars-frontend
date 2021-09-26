<template>
	<div></div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import AnimatedNumber from 'animated-number-vue'
import PieChart from '@/components/charts/pie-chart.vue'
import MapChart from '@/components/charts/map-chart-landing.vue'
import Carousel from '@/components/institutes/institute-carousel.vue'

export default {
	name: 'login',
	layout: 'normal2',
	middleware: ['redirect'],
	data: () => ({
	}),
	components: {
		Carousel,
		PieChart,
		MapChart,
		AnimatedNumber,
	},
	computed: {
		...mapFields([
			'landing_info',
			'landing_info_loaded'
		]),
	},
	methods: {
		formatnumber(x) {
			return x.toLocaleString('en-EN');
		},
	},
	beforeMount() {
	},
	mounted() {
	}
};
</script>

<style scoped>
.has-logo-size {
	width: 500px;
	max-height: 65px;
	max-width: 500px;
}
.divider {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
	z-index: -1;
}
.divider svg {
	position: relative;
	display: block;
	width: calc(160% + 1.3px);
	height: 150px;
}
.divider .shape-fill {
	fill: #EAE9EB;
}
.divider2 {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: -1;
	overflow: hidden;
	line-height: 0;
}
.divider2 svg {
	height: 150px;
	display: block;
	position: relative;
	width: calc(160% + 1.3px);
}
.divider2 .shape-fill {
	fill: #EAE9EB;
}
.has-background-theme {
	background: #EAE9EB;
}
.is-180x180 {
	width: 180px;
	height: 180px;
}
.has-background-yellow-lightest {
	background: #FFF7D6;
}
</style>
