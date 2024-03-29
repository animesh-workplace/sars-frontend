<template>
	<div>
		<section class="section mt-6 pb-0">
			<div class="container">
				<div class="level-item has-text-centered">
					<figure class="image has-logo-size">
						<img
							src="@/assets/logo/insacog_queryhub_logo.png"
							alt="INSACOG QueryHub, Logo"
						/>
					</figure>
				</div>
				<p align="justify">
					The INSACOG QueryHub enables the user to query across the
					SARS-CoV-2 genome sequences present at INSACOG DataHub. The
					idea behind creating the INSACOG QueryHub is to make the
					genomic data discoverable for research and clinical purpose
					to the public which will help in understanding the spread
					and control of the new coronavirus.The INSACOG QueryHub
					allows the user to search queries related to the presence or
					absence of specific/multiple variants and lineages in the
					dataset. The interface is developed and managed at National
					Institute of Biomedical Genomics.
				</p>
			</div>
		</section>
		<section class="section">
			<div :class="$device.isMobileOrTablet ? 'my-container-mobile': 'my-container'">
				<div class="columns">
					<div class="column is-5">
						<div class="mb-4">
							<div class="mb-2">
								<label class="label has-text-grey-dark">
									Lineage
								</label>
								<div
									class="control has-icons-left has-icons-right"
								>
									<input
										type="text"
										class="input"
										v-model="form.lineage"
									/>
									<svg class="icon is-left">
										<use
											xlink:href="@/assets/images/icons/bds.svg#filter-g"
										></use>
									</svg>
									<div class="icon is-right is-clickable">
										<vs-tooltip>
											<svg
												class="image is-20x20 has-fill-grey"
											>
												<use
													xlink:href="@/assets/images/icons/bds.svg#info-bold-g"
												></use>
											</svg>
											<template #tooltip>
												<p>
													Multiple lineages need to be
													comma separated
												</p>
											</template>
										</vs-tooltip>
									</div>
								</div>
							</div>

							<div class="mb-2">
								<label class="label has-text-grey-dark">
									State
								</label>
								<div
									class="control has-icons-left has-icons-right"
								>
									<input
										type="text"
										class="input"
										v-model="form.state"
									/>
									<svg class="icon is-left">
										<use
											xlink:href="@/assets/images/icons/bds.svg#filter-g"
										></use>
									</svg>
									<div class="icon is-right is-clickable">
										<vs-tooltip>
											<svg
												class="image is-20x20 has-fill-grey"
											>
												<use
													xlink:href="@/assets/images/icons/bds.svg#info-bold-g"
												></use>
											</svg>
											<template #tooltip>
												<p>
													Multiple states need to be
													comma separated
												</p>
											</template>
										</vs-tooltip>
									</div>
								</div>
							</div>

							<div class="mb-2">
								<label class="label has-text-grey-dark">
									Mutation
								</label>
								<div
									class="control has-icons-left has-icons-right"
								>
									<input
										type="text"
										class="input"
										v-model="form.mutation"
									/>
									<svg class="icon is-left">
										<use
											xlink:href="@/assets/images/icons/bds.svg#filter-g"
										></use>
									</svg>
									<div class="icon is-right is-clickable">
										<vs-tooltip>
											<svg
												class="image is-20x20 has-fill-grey"
											>
												<use
													xlink:href="@/assets/images/icons/bds.svg#info-bold-g"
												></use>
											</svg>
											<template #tooltip>
												<p>
													Mutations need to be in the
													format of <br />
													<span class="tag mt-2">
														Gene
													</span>
													:
													<span class="tag mt-2">
														Reference
													</span>
													<span class="tag mt-2">
														Position
													</span>
													<span class="tag mt-2">
														Mutant
													</span>
													<br />
													example:
													<span class="tag mt-2"
														>S:D614G</span
													>
													<br />Multiple mutations
													need to be comma separated
												</p>
											</template>
										</vs-tooltip>
									</div>
								</div>
							</div>

							<div class="columns is-mobile">
								<div class="column">
									<div class="mb-2">
										<label class="label has-text-grey-dark">
											From
										</label>
										<div class="control has-icons-left">
											<input
												type="date"
												class="input"
												v-model="form.from_date"
											/>
											<svg class="icon is-left">
												<use
													xlink:href="@/assets/images/icons/bds.svg#filter-g"
												></use>
											</svg>
										</div>
									</div>
								</div>
								<div class="column">
									<div class="mb-2">
										<label class="label has-text-grey-dark">
											To
										</label>
										<div class="control has-icons-left">
											<input
												type="date"
												class="input"
												v-model="form.to_date"
											/>
											<svg class="icon is-left">
												<use
													xlink:href="@/assets/images/icons/bds.svg#filter-g"
												></use>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div
							@click="send_websocket()"
							class="button is-fullwidth is-info"
						>
							<span>Search</span>
						</div>
					</div>

					<div class="column is-7 mt-4">
						<div class="columns" v-if="output != null">
							<div class="column is-1"></div>
							<div class="column">
								<table
									class="table is-striped is-hoverable is-bordered is-narrow has-text-centered is-fullwidth is-rounded"
								>
									<thead>
										<tr
											class="has-text-weight-medium is-size-4"
										>
											<th>State</th>
											<th>Count</th>
										</tr>
									</thead>
									<tbody>
										<tr
											:key="index"
											v-for="(item,
											index) in output.state"
										>
											<td>{{ item.state }}</td>
											<td>{{ item.count }}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="column">
								<table
									class="table is-striped is-hoverable is-bordered is-narrow has-text-centered is-fullwidth"
								>
									<thead>
										<tr
											class="has-text-weight-medium is-size-4"
										>
											<th>Lineage</th>
											<th>Count</th>
										</tr>
									</thead>
									<tbody>
										<tr
											:key="index"
											v-for="(item,
											index) in output.lineage"
										>
											<td>{{ item.lineage }}</td>
											<td>{{ item.count }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { isEmpty, startCase, map, toUpper } from 'lodash'

export default {
	layout: 'query',
	name: 'query-hub',
	middleware: ['guest'],
	data: () => ({
		form: {
			state: '',
			lineage: '',
			to_date: '',
			mutation: '',
			from_date: '',
		},
		connected: false,
		loading: null,
		output: null,
	}),
	components: {},
	methods: {
		connect_websocket() {
			this.$options.sockets = new WebSocket(
				`${process.env.WS_BASE_URL}/queryhub/`
			)
			this.$options.sockets.onmessage = (event) => {
				let websocket_data = JSON.parse(event.data)
				this.connected = true
				this.output = websocket_data['data']
				if (this.loading != null) {
					this.loading.close()
					this.loading = null
				}
			}
			this.$options.sockets.onerror = function (event) {
				console.log(event)
			}
		},
		send_websocket() {
			if (this.connected) {
				this.loading = this.$vs.loading({
					color: '#ffffff',
					text: 'Fetching...',
					background: '#020202',
				})
				// setTimeout(() => {
				this.$options.sockets.send(
					JSON.stringify({
						type: 'SEARCH',
						filter: {
							state: isEmpty(this.form.state)
								? null
								: map(this.form.state.split(','), (d) =>
										startCase(d)
								  ),
							to_date: isEmpty(this.form.to_date)
								? null
								: this.form.to_date,
							lineage: isEmpty(this.form.lineage)
								? null
								: map(this.form.lineage.split(','), (d) =>
										toUpper(d)
								  ),
							mutation: isEmpty(this.form.mutation)
								? null
								: map(this.form.mutation.split(','), (d) =>
										toUpper(d)
								  ),
							from_date: isEmpty(this.form.from_date)
								? null
								: this.form.from_date,
						},
					})
				)
				// }, 5000)
			}
		},
		disconnect_websocket() {
			this.$options.sockets.close()
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.connect_websocket()
		})
	},
	beforeDestroy() {
		this.disconnect_websocket()
	},
}
</script>

<style scoped>
.icon {
	pointer-events: all !important;
}
.is-20x20 {
	height: 18px;
	width: 18px;
}
th,
td {
	white-space: nowrap;
}
.is-centered {
	margin: 0 auto;
}
.my-container {
	margin: 0 5rem;
	position: relative;
}
.my-container-mobile {
	margin: 0 auto;
	position: relative;
}
.has-logo-size {
	width: 550px;
	max-height: 70px;
	max-width: 550px;
}
.is-rounded {
	border-radius: 1rem;
}
</style>
