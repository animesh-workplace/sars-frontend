<template>
	<div class="box is-floating has-background-info-light">
		<div
			:key="table_name"
			v-for="(table, table_name) in tables"
		>
			<div class="box is-small has-background-blue-lighter">
				<div class="has-text-grey-darker has-text-weight-semibold side-element pl-2">
					{{ table.name }}
				</div>
			</div>

			<table class="table is-fullwidth">
				<tbody>

					<tr
						:key="index"
						v-for="(info, index) in table.data"
						class="has-background-info-light"
					>
						<td class="table-header has-text-weight-medium has-text-grey-darker">{{ info.name }}</td>
						<td class="table-body" v-if="!info.has_tag">{{ detail[info.key] }}</td>
						<td class="table-body" v-else>
							<span v-if="detail[info.key] == 'None'">{{ detail[info.key] }}</span>
							<div v-else>
								<div
									:key="muts"
									:class="`tag has-background-${info.color}-light mr-2 mb-2`"
									v-for="muts in detail[info.key].split(',')"
								>
									{{ muts }}
								</div>
							</div>
						</td>
					</tr>

				</tbody>
			</table>

		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		tables: {
			table1: {
				name: 'Virus Detail',
				data: [
						{ name: 'Virus name', key: 'virusName', has_tag: false },
						{ name: 'Nextstrain Clade', key: 'clade', has_tag: false },
						{ name: 'Pangolin Lineage', key: 'lineage', has_tag: false },
						{ name: 'Scorpio', key: 'scorpioCall', has_tag: false },
						{ name: 'Nucleotide Substitution', key: 'substitutions', has_tag: true, color: 'purple' },
						{ name: 'Nucleotide Deletion', key: 'deletions', has_tag: true, color: 'pink' },
						{ name: 'Amino acid Substitution', key: 'aaSubstitutions', has_tag: true, color: 'yellow' },
						{ name: 'Amino acid Deletion', key: 'aaDeletions', has_tag: true, color: 'claim' },
					],
			},
			table2: {
				name: 'Sequence Information',
				data: [
						{ name: 'Collection date', key: 'collectionDate', has_tag: false },
						{ name: 'State', key: 'state', has_tag: false },
						{ name: 'District', key: 'district', has_tag: false },
						{ name: 'Patient status', key: 'patientStatus', has_tag: false },
						{ name: 'Last vaccinated', key: 'lastVaccinated', has_tag: false },
						{ name: 'Treatment', key: 'treatment', has_tag: false },
						{ name: 'Sequencing technology', key: 'sequencingTechnology', has_tag: false },
						{ name: 'Assembly method', key: 'assemblyMethod', has_tag: false },
						{ name: 'Originating Lab', key: 'originatingLab', has_tag: false },
						{ name: 'Submitting Lab', key: 'submittingLab', has_tag: false },
					],
			},
		}
	}),
	props: {
		detail: {
			type: Object,
		},
	}
};
</script>

<style scoped>
	th, td {
		white-space: wrap;
		word-break: break-word;
	}
	.no-pointer-event {
		pointer-events: none;
	}
	.side-element {
		position: relative;
	}
	.side-element::before {
		content: '';
		position: absolute;
		height: 80%;
		width: 5px;
		z-index: 2;
		top: 10%;
		left: -0.5%;
		background-color: #065F9E;
		opacity: 0.7;
		border-radius: 5px;
	}
	.table-header {
		width: 20%;
		vertical-align: middle;
	}
	.table-body {
		width: 80%;
		vertical-align: middle;
	}
</style>
