<template>
	<div>
		<section class="section is-large has-background-blue is-relative">
				<div class="custom-shape-divider-bottom-1631345787">
				    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
				    </svg>
				</div>
		</section>
<!-- 		<div class="column is-5 is-offset-3 p-0">
			<footer class="footer">
				<div class="content has-text-centered">
					<p class="mb-0">
						<b>INSACOG</b> DataHub is developed & maintained by NSM group
					</p>
					<p>
						Source Code is available at <a class="has-text-info" href="https://github.com/animesh-workplace/sars-frontend">https://github.com/animesh-workplace/sars-frontend</a>
					</p>
				</div>
			</footer>
		</div> -->
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
.custom-shape-divider-bottom-1631345787 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1631345787 svg {
    position: relative;
    display: block;
    width: calc(160% + 1.3px);
    height: 150px;
}

.custom-shape-divider-bottom-1631345787 .shape-fill {
    fill: #f6f8f9;
}
.is-size-4-5 {
	font-size: 1.45rem !important;
}
.footer {
	padding: 0.5rem 1.5rem;
}
.is-right {
	position: fixed;
	right:  0;
	z-index: 1;
}
.has-background-mask {
	-webkit-mask: url('../assets/wavesNegative.svg');
	-webkit-mask-size: cover;
	mask-size: cover;
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: bottom center;
	mask-position: bottom center;
}

</style>
