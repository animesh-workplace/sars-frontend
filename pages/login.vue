<template>
	<section class="section">
		<div class="columns is-vcentered">
			<div class="column is-3 has-text-centered mt-6">
				<div class="is-size-4 has-text-weight-semibold is-inline has-text-grey-darker">
					Participating Institutes
				</div>
				<div
					class="box is-raised is-small hover-to-box"
					v-for="name in institutes"
					:key="name"
				>
					<span class="has-text-weight-semibold has-text-grey-dark">{{ name }}</span>
				</div>
			</div>

			<div class="column is-5">
				<div class="column">
					<div class="has-text-centered">
						<nuxt-link  to="/upload">
							<div class="is-size-2 has-text-weight-semibold is-inline has-text-grey-darker">
								INSACOG
							</div>
							<div class="is-size-2 is-inline has-text-grey-dark">
								&nbsp;DataHub
							</div>
						</nuxt-link>
					</div>
					<div class="box is-floating">
						<LoginLayout/>
					</div>
				</div>
			</div>

			<div class="column is-4 has-text-centered">
				<div class="is-size-4 has-text-weight-semibold is-inline has-text-grey-darker">
					Sequences Upload Statistics
				</div>
				<PieChartStats/>
			</div>
		</div>
	</section>
</template>

<script>
import PieChartStats from "@/components/charts/pie-chart-stats.vue"
import LoginLayout from "@/components/authentication/login-layout.vue"

export default {
	data: () => ({
		institutes: [
			'CSIR Institute of Genomics and Integrative Biology (IGIB), Delhi',
			'CSIR Centre for Cellular and Molecular Biology (CCMB), Hyderabad',
			'DBT National Institute of Biomedical Genomics (NIBMG), Kalyani ',
			'DBT- Institute of Life Sciences (ILS), Bhubaneshwar',
			'DBT InSTEM/NCBS, Bengaluru',
			'DBT-Centre for DNA Fingerprinting and Diagnostics (CDFD), Hyderabad',
			'ICMR-National Institute of Virology, Pune',
			'DBT National Centre for Cell Science, Pune',
			'National Centre for Disease Control, Delhi - Division of Bio-technology, Epidemiology and Central Surveillance Unit',
			'National Institute of Mental Health and Neuro Sciences Hospital (NIMHANS), Bangalore',
		]
	}),
	components: {
		LoginLayout,
		PieChartStats,
	},
	methods: {
	},
	mounted() {
		// $cookies.remove('c_uid')
	}
};
</script>

<style scoped>
.is-size-4-5 {
	font-size: 1.45rem !important;
}
</style>
