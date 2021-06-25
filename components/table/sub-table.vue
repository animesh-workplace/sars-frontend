<template>
	<div class="box is-floating has-background-info-light no-pointer-event">
		<div
			:key="table_name"
			v-for="table in tables"
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



<!-- 		<div class="box is-small has-background-blue-lighter">
			<div class="has-text-grey-darker has-text-weight-semibold side-element pl-2">
				Sequence Information
			</div>
		</div> -->


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
						{ name: 'Substitution', key: 'aaSubstitutions', has_tag: true, color: 'yellow' },
						{ name: 'Deletion', key: 'aaDeletions', has_tag: true, color: 'claim' },
					],
			},

		}

		// table1: [
		// 	{ name: 'Virus name', key: 'virusName', has_tag: false },
		// 	{ name: 'Nextstrain Clade', key: 'clade', has_tag: false },
		// 	{ name: 'Pangolin Lineage', key: 'lineage', has_tag: false },
		// 	{ name: 'Scorpio', key: 'scorpioCall', has_tag: false },
		// 	{ name: 'Substitution', key: 'aaSubstitutions', has_tag: true, color: 'yellow' },
		// 	{ name: 'Deletion', key: 'aaDeletions', has_tag: true, color: 'claim' },
		// ]
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
