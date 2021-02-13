<template>
	<div>
		<div class="box medium has-skeleton mb-3" v-if="view_skeleton"></div>
		<file-pond
			maxFiles="1"
			name="file-upload"
			ref="pond_sequence"
			allowReplace="true"
			@addfile="onfileadd"
			allowProcess="false"
			allowMultiple="false"
			instantUpload="false"
			:process="file_config"
			v-show="!view_skeleton"
			@init="remove_skeleton"
			allowFilePoster="false"
			allowImagePreview="false"
			@removefile="removefilehandler"
			labelIdle="
				<span class='is-family-primary has-text-weight-semibold has-text-grey-dark is-clickable'>
					Drag & Drop your Multi-Sequence fasta or
				</span>
				<span
					class='is-family-primary has-text-weight-semibold has-text-grey-dark is-clickable'
					style='text-decoration: underline;'
				>
					Browse
				</span>
			"
			class="is-clickable"
		/>
	</div>
</template>

<script>
import 'filepond/dist/filepond.min.css'

import vueFilePond from 'vue-filepond'
import { map, forEach } from 'lodash'
// import { fasta, fastq } from 'bioinformatics-parser'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

let FilePond = vueFilePond(
	FilePondPluginFileValidateType,
);

export default {
	data: () => ({
		file_config: {
			process(fieldName, file, metadata, load, error, progress, abort, transfer, options) {
				function getCookie(name) {
					const value = `; ${document.cookie}`;
					const parts = value.split(`; ${name}=`);
					if (parts.length === 2) return parts.pop().split(";").shift();
				}
				let token = getCookie("auth._refresh_token.local")
				let image_link = 'http://localhost:8000/api'
				const formData = new FormData();
				formData.append("file", file, file.name);
				const request = new XMLHttpRequest();
				request.open("POST", `${image_link}/files/file-upload/`)
				if(token != undefined){
					request.setRequestHeader("Authorization", "JWT " + token)
				}
				request.upload.onprogress = (e) => {
					progress(e.lengthComputable, e.loaded, e.total)
				}
				request.onload = function() {
					if (request.status >= 200 && request.status < 300) {
						load(request.responseText);
					} else {
						error(request.responseText);
					}
				}
				request.send(formData)
				return {
					abort: () => {
						request.abort();
						abort();
					}
				}
			}
		},
		sequence: null,
		sequence_json: null,
		sequence_file: null,
		view_skeleton: true,
		sequence_verification: [],
		file_type_accepted: ['fasta', 'fa'],
	}),
	watch: {
		sequence_json(value) {
			let data = {
				data: value,
				file: this.sequence_file,
				reset: this.removefilehandler,
				filepond: this.$refs.pond_sequence,
				verification: this.sequence_verification,
			}
			this.$emit('input', data)
		},
	},
	methods: {
		remove_skeleton() {
			this.view_skeleton = false
		},
		onfileadd(error, file) {
			this.sequence_verification = [
				{ name: 'Sequence Fasta file format check', verification: false },
				{ name: 'Sequence Fasta file structure check', verification: false },
				{ name: 'Sequence Fasta file metadata check', verification: false }
			]
			let vm = this
			this.sequence_file = file
			var fileReader = new FileReader()
			if(this.file_type_accepted.includes(file.fileExtension)) {
				this.sequence_verification[0].verification = true
				fileReader.readAsText(file.file)
			} else {
				this.handle_pondfile_error(
					'invalid-format', 'File is of invalid type', 'Expects fasta or fa'
				)
				vm.$vs.notification({
					sticky: true,
					color: 'danger',
					position: 'bottom-right',
					title: 'File is of invalid type',
					text: 'Expects fasta or fa'
				})
			}

			fileReader.onload = function(e) {
				vm.sequence = e.target.result
				let parsed_data = null
				let Fasta = require('biojs-io-fasta')
				try {
					parsed_data = Fasta.parse(vm.sequence)
				} catch(err) {
					console.log('ERROR')
				}
				if(parsed_data) {
					vm.sequence_verification[1].verification = true
					let all_samples = []
					forEach(parsed_data, d=>{
						all_samples.push(d.name)
					})
					vm.sequence_json = all_samples
				} else {
					vm.handle_pondfile_error(
						'processing-warn', 'Invalid fasta file', 'File does not start with ">"'
					)
					vm.$vs.notification({
						sticky: true,
						color: '#FF8F41',
						position: 'bottom-right',
						title: 'Invalid fasta file',
						text: 'File does not start with ">"'
					})
				}
			}
		},
		removefilehandler() {
			this.sequence = null
			this.sequence_file = null
			this.sequence_json = null
			this.sequence_verification = []
		},
		handle_pondfile_error(type, main_text, sub_text) {
			this.$refs.pond_sequence.$el
					  .querySelector('.filepond--item')
					  .setAttribute('data-filepond-item-state', type)
			this.$refs.pond_sequence.$el
					  .querySelector('.filepond--file-status-main')
					  .textContent = main_text
			this.$refs.pond_sequence.$el
					  .querySelector('.filepond--file-status-sub')
					  .textContent = sub_text
		}
	}
};
</script>

<style scoped>
.medium {
	padding: 2.54em 2em;
}
</style>
