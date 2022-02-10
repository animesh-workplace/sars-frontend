<template>
	<div>
		<section class="section mt-6 pb-0">
			<div class="columns is-vcentered">
				<div class="column is-8">
					<div class="columns is-centered mb-0">
						<div class="column is-8">
							<div class="level py-2">
								<div class="level-item has-text-centered">
									<figure class="image has-logo-size">
										<img
											src="@/assets/logo/insacog_logo.png"
											alt="Indian SARS-CoV-2 Genomics Consortium, Logo"
										/>
									</figure>
								</div>
							</div>

							<div class="level is-mobile">
								<figure
									:class="
										$device.isMobileOrTablet
											? 'image is-64x64'
											: 'image is-128x128'
									"
								>
									<img
										src="@/assets/logo/mohfw_logo.png"
										alt="Ministry of Health and Family Welfare, Logo"
									/>
								</figure>
								<figure
									:class="
										$device.isMobileOrTablet
											? 'image is-64x64'
											: 'image is-128x128'
									"
								>
									<img
										src="@/assets/logo/dbt_logo.png"
										alt="Department of Biotechnology, Governement of India, Logo"
									/>
								</figure>
								<figure
									:class="
										$device.isMobileOrTablet
											? 'image is-64x64'
											: 'image is-128x128'
									"
								>
									<img
										src="@/assets/logo/csir_logo.png"
										alt="Council of Scientific and Industrial Research, Logo"
									/>
								</figure>
								<figure
									:class="
										$device.isMobileOrTablet
											? 'image is-64x64'
											: 'image is-128x128'
									"
								>
									<img
										src="@/assets/logo/icmr_logo.png"
										alt="Indian Council of Medical Reasearch, Logo"
									/>
								</figure>
							</div>
						</div>
					</div>

					<div class="pb-3">
						<p align="justify">
							The Indian SARS-CoV-2 Genomics Consortium (INSACOG),
							a consortium of 49 Laboratories is a Pan-India
							network to monitor genomic variations in the
							SARS-CoV-2 by a sentinel sequencing effort. The
							network carries out whole genome sequencing of
							SARS-CoV-2 virus across the nation, aiding the
							understanding of how the virus spreads and evolves,
							and provide information to aid public health
							response. It is jointly initiated by the Union
							Health Ministry of Health, and Department of
							Biotechnology (DBT) with Council for Scientific &
							Industrial Research (CSIR) and Indian Council of
							Medical Research (ICMR). INSACOG DataHub developed &
							maintained at National Institute of Biomedical
							Genomics is an effort to store and analyze the whole
							genome sequence of SARS-CoV-2.
						</p>
					</div>

					<div class="columns is-vcentered pt-4">
						<div class="column has-text-centered">
							<div
								class="box p-2 is-floating has-background-yellow-lightest"
							>
								<div v-if="$device.isDesktop">
									<p class="has-text-weight-medium is-size-5">
										Genomes Uploaded
									</p>
									<p class="has-text-weight-medium is-size-4">
										<animated-number
											:value="
												landing_info.genomes_sequenced
											"
											:duration="1000"
											:formatValue="formatnumber"
										/>
									</p>
								</div>
								<p
									class="has-text-weight-medium is-size-5"
									v-else
								>
									Genomes Uploaded:
									<animated-number
										:value="landing_info.genomes_sequenced"
										:duration="1000"
										:formatValue="formatnumber"
									/>
								</p>
							</div>
						</div>
						<div class="column has-text-centered">
							<div
								class="box p-2 is-floating has-background-yellow-lightest"
							>
								<div v-if="$device.isDesktop">
									<p class="has-text-weight-medium is-size-5">
										Lineages Found
									</p>
									<p class="has-text-weight-medium is-size-4">
										<animated-number
											:value="
												landing_info.lineages_catalogued
											"
											:duration="1000"
											:formatValue="formatnumber"
										/>
									</p>
								</div>
								<p
									class="has-text-weight-medium is-size-5"
									v-else
								>
									Lineages Found:
									<animated-number
										:value="
											landing_info.lineages_catalogued
										"
										:duration="1000"
										:formatValue="formatnumber"
									/>
								</p>
							</div>
						</div>
						<div class="column has-text-centered">
							<div
								class="box p-2 is-floating has-background-yellow-lightest"
							>
								<div v-if="$device.isDesktop">
									<p class="has-text-weight-medium is-size-5">
										States Covered
									</p>
									<p class="has-text-weight-medium is-size-4">
										<animated-number
											:value="landing_info.states_covered"
											:duration="1000"
											:formatValue="formatnumber"
										/>
									</p>
								</div>
								<p
									class="has-text-weight-medium is-size-5"
									v-else
								>
									States Covered:
									<animated-number
										:value="landing_info.states_covered"
										:duration="1000"
										:formatValue="formatnumber"
									/>
								</p>
							</div>
						</div>
					</div>

					<div class="has-text-centered">
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.pangolin_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.scorpio_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.nextclade_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.constellation_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.pangolearn_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="landing_info.pango_designation_version"
							theme="#FF8F41"
						/>
						<Tag
							class="is-inline-block mt-1"
							:name="last_updated"
							theme="#7DB950"
						/>
					</div>

					<div class="py-3">
						<div class="level mt-2 mb-0">
							<div class="level-item has-text-centered">
								<figure
									:class="
										$device.isMobileOrTablet
											? 'image is-custom-mobile'
											: 'image is-custom'
									"
								>
									<img
										src="@/assets/logo/nibmg_logo.png"
										alt="National Institute of Biomedical Genomics, Logo"
									/>
								</figure>
							</div>
						</div>
					</div>

					<div class="py-3">
						<div class="level mt-2 mb-0">
							<div class="level-item has-text-centered">
								<nuxt-link to="/query">
									<figure class="image has-logo-size">
										<img
											src="@/assets/logo/insacog_queryhub_logo.png"
											alt="INSACOG QueryHub, Logo"
										/>
									</figure>
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>

				<div class="column is-4">
					<PieChart
						class="pt-6"
						v-if="page_loaded"
						:key="
							landing_info_loaded
								? Date.now() +
								  Math.floor(Math.random() * 10000 + 1)
								: 123
						"
					/>
				</div>
			</div>
		</section>

		<section class="section is-relative">
			<div class="divider">
				<svg
					data-name="Layer 1"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						class="shape-fill"
					></path>
				</svg>
			</div>

			<div class="column pb-6">
				<StackChart
					v-if="page_loaded"
					:key="
						landing_info_loaded
							? Date.now() + Math.floor(Math.random() * 10000 + 1)
							: 123
					"
				/>
			</div>

			<div class="column pb-12">
				<StateChart
					v-if="page_loaded"
					:key="
						landing_info_loaded
							? Date.now() + Math.floor(Math.random() * 10000 + 1)
							: 123
					"
				/>
			</div>

			<!-- <div class="column pb-6"> -->
			<!-- <div class="column"> -->
			<!-- <MapChart /> -->
			<!-- <ThemeRiverChart /> -->
			<!-- </div> -->
			<!-- <div class="column"></div> -->
			<!-- </div> -->
		</section>

		<section class="section has-background-theme">
			<p align="center" class="has-text-weight-semibold is-size-3">
				Participating Institutes
			</p>
			<Carousel />
		</section>

		<section class="section is-large is-relative">
			<div class="divider2">
				<svg
					data-name="Layer 1"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						class="shape-fill"
					></path>
				</svg>
			</div>
		</section>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import AnimatedNumber from 'animated-number-vue'
import Tag from '@/components/table/cool-tag.vue'
import PieChart from '@/components/charts/pie-chart.vue'
import MapChart from '@/components/charts/map-chart-landing.vue'
import StackChart from '@/components/charts/stacked-area-chart.vue'
import StateChart from '@/components/charts/bar-chart-state.vue'
import Carousel from '@/components/institutes/institute-carousel.vue'
import ThemeRiverChart from '@/components/charts/themeriver-chart.vue'

export default {
	name: 'landing',
	layout: 'normal2',
	middleware: ['guest'],
	data: () => ({
		page_loaded: false,
	}),
	components: {
		Tag,
		Carousel,
		PieChart,
		MapChart,
		StateChart,
		StackChart,
		AnimatedNumber,
		ThemeRiverChart,
	},
	computed: {
		...mapFields(['landing_info', 'landing_info_loaded']),
		last_updated() {
			let text = `Last updated: ${this.$dayjs(
				this.landing_info.last_updated
			).format('DD-MM-YYYY hh:mm A')}`
			return text
		},
	},
	methods: {
		formatnumber(x) {
			return x.toLocaleString('en-IN')
		},
	},
	beforeMount() {},
	mounted() {
		this.$nextTick(() => {
			this.page_loaded = true
		})
	},
}
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
	fill: #eae9eb;
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
	fill: #eae9eb;
}
.has-background-theme {
	background: #eae9eb;
}
.is-180x180 {
	width: 180px;
	height: 180px;
}
.is-80x80 {
	width: 80px;
	height: 80px;
}
.has-background-yellow-lightest {
	background: #fff7d6;
}
.is-custom {
	width: 140px;
}
.is-custom-mobile {
	width: 128px;
}
.pb-12 {
	padding-bottom: 12rem;
}
</style>
