<template>
	<div>
		<div class="has-text-centered">
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-dark">
				{{ State }}'s Lineage Distribution
			</span>
			<span class="is-size-4 has-text-medium has-text-weight-semibold has-text-grey-light" v-if="Month != ''">
				[ Month: {{ Month }} ]
			</span>
		</div>

		<div class="column is-6 is-offset-3 mb-2">
			<div class="dropdown is-fullwidth is-hoverable">
				<div class="dropdown-trigger">
					<div class="button is-light is-fullwidth has-text-grey-dark">
						{{ default_show }}
					</div>
				</div>
				<div class="dropdown-menu">
					<div class="dropdown-content has-background-light">
						<div class="menu is-small">
							<ul class="menu-list">
								<li
									class="mb-1"
									:key="lineage"
									v-for="lineage in all_lineages"
									@click="change_lineage(lineage)"
								>
									<a
										:class="default_show == lineage ? 'dropdown-item has-background-blue has-text-weight-medium has-text-light' : 'dropdown-item has-text-weight-medium has-text-grey-dark'"
									>
										<svg class="icon icon-size has-fill-white" v-if="default_show == lineage">
											<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g"></use>
										</svg>
										{{ lineage }}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="field is-grouped is-grouped-multiline">
			<div class="control" v-for="muts in ChartData[default_show]" :key="muts">
				<div class="tags has-addons are-small">
					<div class="tag is-info">{{ muts }}</div>
					<div class="tag has-background-yellow-light">99.5%</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { forEach } from 'lodash'
import { mapFields } from 'vuex-map-fields'

export default {
	data: () => ({
		default_show: '',
		all_lineages: []
	}),
	components: {
	},
	props: {
		State: {
			type: String
		},
		ChartData: {
			type: Object
		},
		Month: {
			type: String
		}
	},
	watch: {
		ChartData(value) {
			this.all_lineages = Object.keys(value)
			this.default_show = this.all_lineages[0]
		},
		State(value) {
			this.all_lineages = Object.keys(this.ChartData)
			this.default_show = this.all_lineages[0]
		}
	},
	computed: {
	},
	methods: {
		change_lineage(lineage) {
			this.default_show = lineage
		}
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
	.dropdown-content {
		height: 15em;
		overflow: auto;
	}
</style>
