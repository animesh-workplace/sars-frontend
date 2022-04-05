<template>
	<div>
		<div class="box medium has-skeleton mb-3" v-if="view_skeleton"></div>
		<file-pond
			maxFiles="1"
			credits="false"
			name="file-upload"
			ref="pond_metadata"
			allowReplace="true"
			@addfile="onfileadd"
			allowProcess="false"
			allowMultiple="false"
			instantUpload="false"
			v-show="!view_skeleton"
			@init="remove_skeleton"
			allowFilePoster="false"
			allowImagePreview="false"
			@removefile="removefilehandler"
			labelIdle="
				<span class='is-family-primary has-text-weight-semibold has-text-grey-dark is-clickable'>
					Drag & Drop your Metadata or
				</span>
				<span
					class='is-family-primary has-text-weight-semibold has-text-grey-dark is-clickable'
					style='text-decoration: underline;'
				>
					Browse
				</span>
			"
			class="is-clickable hover-to-box"
		/>
	</div>
</template>

<script>
import 'filepond/dist/filepond.min.css'

import { map, sum, forEach, startCase } from 'lodash'
import vueFilePond from 'vue-filepond'
import csv2json from 'csvjson-csv2json'
import { mapFields } from 'vuex-map-fields'
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'


let FilePond = vueFilePond();

export default {
	data: () => ({
		metadata: null,
		metadata_file: null,
		metadata_json: null,
		view_skeleton: true,
		metadata_verification: [],
		file_type_accepted: ['text', 'csv', 'tsv', 'txt'],
	}),
	computed: {
		...mapFields([
			'missing_columns'
		]),
	},
	watch: {
		metadata_json(value) {
			let data = {
				data: value,
				file: this.metadata_file,
				reset: this.removefilehandler,
				filepond: this.$refs.pond_metadata,
				verification: this.metadata_verification
			}
			this.$emit('input', data)
		},
	},
	methods: {
		remove_skeleton() {
			this.view_skeleton = false
		},
		onfileadd(error, file) {
			this.metadata_verification = [
				{ name: 'Metadata format check', verification: false },
				{ name: 'Metadata structure check', verification: false },
				{ name: 'Metadata sequence check', verification: false }
			]
			let vm = this
			this.metadata_file = file

			var fileReader = new FileReader()
			if(this.file_type_accepted.includes(file.fileExtension)) {
				this.metadata_verification[0].verification = true
				fileReader.readAsText(file.file)
			} else {
				this.handle_pondfile_error(
					'invalid-format', 'File is of invalid type', 'Expects csv, tsv or text/txt'
				)
				vm.$vs.notification({
					sticky: true,
					duration: 10000,
					progress: 'auto',
					color: 'danger',
					position: 'bottom-right',
					title: 'File is of invalid type',
					text: 'Expects csv, tsv or text/txt'
				})
			}

			fileReader.onload = function(e) {
				vm.metadata = e.target.result
				vm.metadata_json = csv2json(vm.metadata, { parseNumbers: true })
				forEach(vm.metadata_json, (d,i)=> {
					vm.metadata_json[i]['Virus name'] = String(d['Virus name']).replace('\r', '')
				})
				let state = vm.check_columns()
				if(state.return_value) {
					vm.metadata_verification[1].verification = true
				} else {
					vm.metadata_verification[1].verification = false
					vm.handle_pondfile_error(
						'processing-warn', 'Columns not matching', 'Check metadata requirements'
					)
					let missing_text = ''
					forEach(state.missing,
						(d,i)=> missing_text = i == 1 ? `<b>${d}<b>` : `${missing_text}<br><b>${d}<b>`
					)
					vm.$vs.notification({
						sticky: true,
						duration: 'none',
						color: '#FF8F41',
						position: 'bottom-right',
						title: 'Following columns are missing:',
						text: missing_text
					})
				vm.final_json = 'Error in Sample sheet. Please conform to the sample sheet rules'
				}
			}
		},
		check_columns() {
			let state = []
			let missing_columns = []
			let keys = Object.keys(this.metadata_json[0])
			let required_columns = [ 'Virus name', 'Type', 'Passage details/history', 'Collection date', 'Country', 'State', 'District', 'Location', 'Additional location information', 'Host', 'Additional host information', 'Gender', 'Patient age', 'Patient status', 'Specimen source', 'Outbreak', 'Last vaccinated', 'Treatment', 'Sequencing technology', 'Assembly method', 'Coverage', 'Originating lab', 'Originating lab address', 'Submitting lab', 'Submitting lab address', 'Sample ID given by the submitting lab', 'Authors' ]
			for(var i=0; i<required_columns.length; i++) {
				state[i] = keys.includes(required_columns[i])
				if(!state[i]) {
					missing_columns.push(required_columns[i])
				}
			}
			if(sum(state) == 27) {
				return {
					missing: missing_columns,
					return_value: 1
				}
			} else 	{
				return {
					missing: missing_columns,
					return_value: 0
				}
			}
		},
		removefilehandler() {
			this.metadata = null
			this.metadata_file = null
			this.metadata_json = null
			this.metadata_verification = null
		},
		handle_pondfile_error(type, main_text, sub_text) {
			this.$refs.pond_metadata.$el
					  .querySelector('.filepond--item')
					  .setAttribute('data-filepond-item-state', type)
			this.$refs.pond_metadata.$el
					  .querySelector('.filepond--file-status-main')
					  .textContent = main_text
			this.$refs.pond_metadata.$el
					  .querySelector('.filepond--file-status-sub')
					  .textContent = sub_text
		}
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
.medium {
	padding: 2.54em 2em;
}
</style>
