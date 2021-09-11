<template>
	<div>
		<section class="section is-relative mt-5">
			<div class="columns is-vcentered">
				<div class="column is-8">
					<div class="column is-8 is-offset-2">
						<div class="level py-2">
							<div class="level-item has-text-centered">
								<figure class="image has-logo-size">
									<img src="@/assets/logo/insacog_logo.png" alt="Indian SARS-CoV-2 Genomics Consortium, Logo">
								</figure>
							</div>
						</div>

						<div class="level is-mobile">
							<div class="level-item has-text-centered">
								<figure :class="$device.isMobile ? 'image is-96x96' : 'image is-180x180'">
									<img src="@/assets/logo/mohfw_logo.png" alt="Ministry of Health and Family Welfare, Logo">
								</figure>
							</div>
							<div class="level-item has-text-centered">
								<figure :class="$device.isMobile ? 'image is-96x96' : 'image is-180x180'">
									<img src="@/assets/logo/dbt_logo.png" alt="Department of Biotechnology, Governement of India, Logo">
								</figure>
							</div>
							<div class="level-item has-text-centered">
								<figure :class="$device.isMobile ? 'image is-96x96' : 'image is-180x180'">
									<img src="@/assets/logo/csir_logo.png" alt="Council of Scientific and Industrial Research, Logo">
								</figure>
							</div>
							<div class="level-item has-text-centered">
								<figure :class="$device.isMobile ? 'image is-96x96' : 'image is-180x180'">
									<img src="@/assets/logo/icmr_logo.png" alt="Indian Council of Medical Reasearch, Logo">
								</figure>
							</div>
						</div>

					</div>

					<div class="pb-3">
						<p align="justify">
							The Indian SARS-CoV-2 Genomics Consortium (INSACOG), jointly initiated by the Union Health Ministry of Health, and Department of Biotechnology (DBT) with Council for Scientific & Industrial Research (CSIR) and Indian Council of Medical Research (ICMR), is a consortium of 28 National Laboratories to monitor the genomic variations in the SARS-CoV-2. INSACOG is a multi-laboratory, multi-agency, Pan-India network to monitor genomic variations in the SARS-CoV-2 by a sentinel sequencing effort. The network carries out whole genome sequencing of SARS-CoV-2 virus across the nation, aiding the understanding of how the virus spreads and evolves, and provide information to aid public health response.
						</p>
					</div>

					<div class="columns is-vcentered is-mobile">
						<div class="column has-text-centered">
							<div class="box is-floating has-background-yellow-lighter">
								<p class="has-text-weight-medium is-size-5">Genomes Uploaded</p>
								<p class="has-text-weight-semibold is-size-4">
									<animated-number value="50123" :duration="1000" :formatValue="formatnumber"/>
								</p>
							</div>
						</div>
						<div class="column has-text-centered">
							<div class="box is-floating has-background-yellow-lighter">
								<p class="has-text-weight-medium is-size-5">Lineages Found</p>
								<p class="has-text-weight-semibold is-size-4">
									<animated-number value="50123" :duration="1000" :formatValue="formatnumber"/>
								</p>
							</div>
						</div>
						<div class="column has-text-centered">
							<div class="box is-floating has-background-yellow-lighter">
								<p class="has-text-weight-medium is-size-5">States Covered</p>
								<p class="has-text-weight-semibold is-size-4">
									<animated-number value="50123" :duration="1000" :formatValue="formatnumber"/>
								</p>
							</div>
						</div>
					</div>

				</div>
				<div class="column">
					<div class="box is-floating has-background-green is-large">

					</div>
				</div>
			</div>

<!-- 			<div class="divider">
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
				</svg>
			</div> -->
		</section>

		<!-- <section class="section is-large"></section> -->

	</div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import PieChartStats from '@/components/charts/pie-chart-stats.vue'
import LoginLayout from '@/components/authentication/login-layout.vue'
// import InsacogLogo from '@/assets/logo/insacog_logo.png?inline'

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
		],
		mobile_device: false,
	}),
	components: {
		// InsacogLogo,
		LoginLayout,
		PieChartStats,
		AnimatedNumber,
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
.is-180x180 {
	width: 180px;
	height: 180px;
}
</style>
