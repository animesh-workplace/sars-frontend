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
						{ name: 'Virus name', key: 'Virus name', has_tag: false },
						{ name: 'Nextstrain Clade', key: 'clade', has_tag: false },
						{ name: 'Pangolin Lineage', key: 'lineage', has_tag: false },
						{ name: 'Scorpio', key: 'scorpio_call', has_tag: false },
						{ name: 'Nucleotide Substitution', key: 'substitutions', has_tag: true, color: 'purple' },
						{ name: 'Nucleotide Deletion', key: 'deletions', has_tag: true, color: 'pink' },
						{ name: 'Amino acid Substitution', key: 'aaSubstitutions', has_tag: true, color: 'yellow' },
						{ name: 'Amino acid Deletion', key: 'aaDeletions', has_tag: true, color: 'claim' },
					],
			},
			table2: {
				name: 'Sequence Information',
				data: [
						{ name: 'Collection date', key: 'Collection date', has_tag: false },
						{ name: 'State', key: 'State', has_tag: false },
						{ name: 'District', key: 'District', has_tag: false },
						{ name: 'Patient status', key: 'Patient status', has_tag: false },
						{ name: 'Last vaccinated', key: 'Last vaccinated', has_tag: false },
						{ name: 'Treatment', key: 'Treatment', has_tag: false },
						{ name: 'Sequencing technology', key: 'Sequencing technology', has_tag: false },
						{ name: 'Assembly method', key: 'Assembly method', has_tag: false },
						{ name: 'Originating Lab', key: 'Originating lab', has_tag: false },
						{ name: 'Submitting Lab', key: 'Submitting lab', has_tag: false },
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
