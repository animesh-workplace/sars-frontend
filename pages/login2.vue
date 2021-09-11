<template>
	<div>
		<section class="section is-large is-relative">
			<div class="divider">
			    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
			    </svg>
			</div>
		</section>
	</div>
</template>

<script>
import Blob from '@/assets/blob-haikei_1.svg?inline'
import PieChartStats from "@/components/charts/pie-chart-stats.vue"
import LoginLayout from "@/components/authentication/login-layout.vue"

export default {
	name: 'login',
	layout: 'normal2',
	data: () => ({
		institutes: [
			'CSIR Institute of Genomics and Integrative Biology (IGIB), Delhi',
			'CSIR Centre for Cellular and Molecular Biology (CCMB), Hyderabad',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyani1',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyani2',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyan3',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyani',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalysani',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyseani',
		]
	}),
	components: {
		Blob,
		LoginLayout,
		PieChartStats,
	},
	methods: {
	},
	mounted() {
	}
};
</script>

<style scoped>
.divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
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
.is-right {
	position: fixed;
	right:  0;
	z-index: 1;
}
</style>
