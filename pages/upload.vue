<template>
	<section class="section mt-6">
		<div class="columns">
			<div class="column">
				<div class="box is-floating">
					<div
						:class="metadata_requirement ? 'box is-expandable has-background-blue-lighter is-unselectable is-expanded p-4' : 'box is-expandable has-background-blue-lighter is-unselectable p-4'"
						@click="open_expanded(1)"
					>
						<div class="level is-clickable mb-2">
						    <span class="title is-4 has-text-weight-semibold mb-0 has-text-grey-darker">
						    	Metadata requirements
						    </span>
						    <div class="level-right">
							    <span class="tag is-info is-rounded mr-1">csv</span>
							    <span class="tag is-info is-rounded mr-1">tsv</span>
							    <span class="tag is-info is-rounded mr-1">text</span>
							    <span class="tag is-info is-rounded mr-1">txt</span>
								<svg class="icon is-small has-fill-black">
									<use xlink:href="@/assets/images/icons/bds.svg#arrow-down-g"></use>
								</svg>
						    </div>
						</div>
						<a
							class="button has-text-grey-dark is-light is-small"
							href="http://research.nibmg.ac.in/insacog/media/template_metadata.csv"
						>
							Download Template
						</a>
					    <div class="expanded-content">
					    	<hr class="is-visible is-size-3 is-size-4-mobile has-background-primary-claim-gradient my-3">
					    	<div class="subtitle is-5 has-text-grey-dark">
					    		<p>Metadata needs to contain the following column names</p>
					    		<p class="has-text-weight-semibold has-text-red-dark">
					    			The column headers marked in red are mandatory
					    		</p>
					    		<ul>
									<li>
										<b class="has-text-red">Virus name</b> - e.g. India/CH-ICMR-51800/2020 (Must be FASTA-Header from the FASTA file)
									</li>
									<li>
										<b class="has-text-red">Type</b> - default must remain "betacoronavirus"
									</li>
									<li>
										<b>Passage details/history</b> - e.g. Original, Vero
									</li>
									<li>
										<b class="has-text-red">Collection date</b> - Date in the format [ DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD, YYYY/MM/DD ]
									</li>
									<li>
										<b class="has-text-red">Country</b> - Sample collected from which country
									</li>
									<li>
										<b class="has-text-red">State</b> - Sample collected from which state
									</li>
									<li>
										<b class="has-text-red">District</b> - Sample collected from which district
									</li>
									<li>
										<b class="has-text-red">Location</b> - Sample collected from which continent
									</li>
									<li>
										<b>Additional location information</b> - Any additional information such as Cruise Ship, Convention, Live animal market, School
									</li>
									<li>
										<b class="has-text-red">Host</b> - e.g. Human, Environment, Canine, Manis javanica, Rhinolophus affinis, etc
									</li>
									<li>
										<b>Additional host information</b> - e.g. Patient infected while traveling in ...
									</li>
									<li>
										<b>Gender</b> - Male/Female or Unknown
									</li>
									<li>
										<b>Patient age</b> - e.g.  65 or 7 months, or unknown
									</li>
									<li>
										<b>Patient status</b> - e.g.  Hospitalized, Released, Live, Deceased, or unknown
									</li>
									<li>
										<b>Specimen source</b> - e.g. Sputum, Alveolar lavage fluid, Oro-pharyngeal swab, Blood, Tracheal swab, Urine, Stool, Cloakal swab, Organ, Feces, Other
									</li>
									<li>
										<b>Outbreak</b> - Date, Location e.g. type of gathering, Family cluster, etc
									</li>
									<li>
										<b>Last vaccinated</b> - provide details if applicable
									</li>
									<li>
										<b>Treatment</b> - Include drug name, dosage
									</li>
									<li>
										<b class="has-text-red">Sequencing technology</b> - e.g.  Illumina Miseq, Sanger, Nanopore MinION, Ion Torrent, etc.
									</li>
									<li>
										<b class="has-text-red">Assembly method</b> - e.g. CLC Genomics Workbench 12, Geneious 10.2.4, SPAdes/MEGAHIT v1.2.9, UGENE v. 33, etc.
									</li>
									<li>
										<b class="has-text-red">Coverage</b> - e.g. 70x, 1000x, 10000x
									</li>
									<li>
										<b class="has-text-red">Originating lab</b> - Where the clinical specimen or virus isolate was first obtained
									</li>
									<li>
										<b class="has-text-red">Originating lab address</b> - Address of the originating lab
									</li>
									<li>
										<b class="has-text-red">Submitting lab</b> - Where sequence data have been generated and submitted
									</li>
									<li>
										<b class="has-text-red">Submitting lab address</b> - Address of the submitting lab
									</li>
									<li>
										<b>Sample ID given by the submitting lab</b> - Sample ID given by the submitting lab
									</li>
									<li>
										<b class="has-text-red">Authors</b> - a comma separated list of authors with complete first name followed by last name
									</li>
					    		</ul>
					    	</div>
					    </div>
					</div>

					<div
						:class="sequence_requirement ? 'box is-expandable has-background-blue-lighter is-unselectable is-expanded p-4' : 'box is-expandable has-background-blue-lighter is-unselectable p-4'"
						@click="open_expanded(2)"
					>
						<div class="level is-clickable mb-0">
						    <span class="title is-4 has-text-weight-semibold mb-0 has-text-grey-darker">
						    	Sequence requirements
						    </span>
						    <div class="level-right">
							    <span class="tag is-info is-rounded mr-1">fasta</span>
							    <span class="tag is-info is-rounded mr-1">fa</span>
								<svg class="icon is-small has-fill-black">
									<use xlink:href="@/assets/images/icons/bds.svg#arrow-down-g"></use>
								</svg>
						    </div>
						</div>
					    <div class="expanded-content">
					    	<hr class="is-visible is-size-3 is-size-4-mobile has-background-primary-claim-gradient my-3">
					    	<div class="subtitle is-5 has-text-grey-dark">
								<p>
									The strain column in metadata must match the fasta sequence header.
									The sequence fasta file must be a multi fasta file in the following format:
								</p>
								<p class="mt-2">
									>sequence1<br>
									NTAAAGGTTTATACCTTCCCAGGTAACAAACC......<br>
									>sequence2<br>
									NTAAAGGTTTATACCTTCCCAGGTAACAAACC......<br>
									>sequence3<br>
									NTAAAGGTTTATACCTTCCCAGGTAACAAACC......<br>
									...<br>
									>sequence300<br>
									NTAAAGGTTTATACCTTCCCAGGTAACAAACC......<br>
								</p>
					    	</div>
					    </div>
					</div>

				</div>
			</div>

			<div class="column is-8 ">
				<div class="box is-floating">
					<div class="columns">
						<div class="column is-6">
							<MetadataUpload v-model="metadata" :key="id"/>
						</div>
						<div class="column is-6">
							<SequenceUpload v-model="sequence" :key="id"/>
						</div>
					</div>
					<div class="columns has-text-centered pt-0">

						<div
							:class="qc_passed_metadata.length > 0 ? 'column is-4 is-offset-2' : 'column is-4 is-offset-4'"
							v-if="submit_data_button"
						>
							<div
								@click="verify_data"
								:disabled="enable_submit"
								class="button is-info is-fullwidth"
							>
								<span>Verify Data</span>
							</div>
						</div>

						<div class="column is-4" v-if="submit_data_button && qc_passed_metadata.length > 0">
							<div
								class="button is-warning is-fullwidth"
								@click="upload_data"
							>
								<span>Upload QC passed data ({{ qc_passed_metadata.length }})</span>
							</div>
						</div>

						<div class="column" v-if="!submit_data_button">
							<div
								@click="upload_data"
								class="button is-success is-fullwidth"
								:disabled="enable_submit"
							>
								<span>Upload Data</span>
							</div>
						</div>
					</div>
				</div>


				<div class="box is-well" v-if="show_log">

					<div class="box is-well">
						<div class="level animate__animated animate__fadeIn delay-7ms">
							<div class="level-left">
								<span class="has-text-grey-dark has-text-weight-semibold">
									Basic QC Check
								</span>
							</div>
							<div class="level-right">
								<span class="tag is-warning is-rounded" v-if="qc_failed_metadata.length">
									{{ qc_failed_metadata.length }}
								</span>
								<Tag
									:tagtype="all_qc_checks.map(d=>d.verification).reduce((a,b)=>a+b,0) == 5"
								/>
							</div>
						</div>
					</div>

					<div class="column">
						<div
							:key="index"
							v-for="(check, index) in all_qc_checks"
						>
							<div :class="`level mb-2 animate__animated animate__fadeIn delay-${index}ms`">
								<div class="level-left">
									<span class="has-text-grey-dark has-text-weight-semibold">
										{{ check.name }}
									</span>
								</div>
								<div class="level-right">
									<Tag :tagtype="check.verification"/>
								</div>
							</div>

							<div
								v-if="check.data.length"
								v-for="(sub_check, sub_check_index) in check.data"
							>
								<div
									:class="`message mb-2 is-danger animate__animated animate__fadeIn delay-${index}ms`"
								>
									<div class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
										{{ sub_check.header }}
										<div class="tag is-warning is-rounded">
											{{ sub_check.value.length }}/{{ metadata.data.length }}
										</div>
									</div>

									<div class="block mb-1" v-if="sub_check.info">
										<span class="has-text-grey-darker">
											{{ sub_check.info.value.length > 1 ? `${sub_check.info.header}s` : sub_check.info.header }}
										</span>

										<vs-tooltip color="#087FD2" class="is-inline-block" interactivity>
											<svg class="icon is-small has-fill-blue-dark is-clickable">
												<use xlink:href="@/assets/images/icons/bds.svg#help-bold-g"></use>
											</svg>
											<template #tooltip class="has-text-left">
												<p class="is-size-6 has-text-white has-text-weight-medium side-element-white mb-2">
													Correct States/Union Territories:
												</p>
												<div
													class="is-inline-block has-text-left has-text-light"
													v-for="(seq, index_seq) in all_states_indian"
												>
													{{ (index_seq+1) == all_states_indian.length ? seq : `${seq},&nbsp;`}}
												</div>
											</template>
										</vs-tooltip>

										<span class="has-text-grey-darker">:</span>
										<div class="is-inline-block" v-for="(seq, index_seq) in sub_check.info.value">
											{{ (index_seq + 1) == sub_check.info.value.length ? seq : `${seq},&nbsp;`}}
										</div>
									</div>

									<div v-for="seq in sub_check.value">
										{{ seq }}
									</div>
								</div>
							</div>

						</div>
					</div>

				</div>

			</div>
		</div>
	</section>
</template>

<script>
import FuzzySet from 'fuzzyset'
import json2csv from 'csvjson-json2csv'
import { mapFields } from 'vuex-map-fields'
import Tag from "@/components/upload/tag.vue"
import Table from "@/components/table/table.vue"
import MetadataUpload from "@/components/upload/metadata-upload.vue"
import SequenceUpload from "@/components/upload/sequence-upload.vue"
import LoginLayout from "@/components/authentication/login-layout.vue"
import { map, forEach, startCase, capitalize, toLower, uniq, difference, sum, isEmpty } from "lodash"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		loader: null,
		metadata: null,
		sequence: null,
		show_log: false,
		upload_percent: 0,
		metadata_requirement: false,
		sequence_requirement: false,
		all_states_indian: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'],
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
		all_qc_checks: [
			{ id: 1, name: 'Metadata & Sequence file format check', verification: false, data: [] },
			{ id: 2, name: 'Metadata & Sequence file structure check', verification: false, data: [] },
			{ id: 3, name: 'Missing Metadata/Sequence check', verification: false, data: [] },
			{ id: 4, name: 'Duplicate check', verification: false, data: [] },
			{ id: 5, name: 'Already present check', verification: false, data: [] },
		],
		qc_failed_metadata: [],
		qc_passed_metadata: [],
		qc_passed_sequences: [],
	}),
	components: {
		Tag,
		Table,
		LoginLayout,
		MetadataUpload,
		SequenceUpload,
	},
	computed: {
		enable_submit() {
			if(this.metadata && this.sequence) {
				if(this.metadata.file && this.sequence.file) {
					return false
				}
			}
			this.show_log = false
			this.qc_failed_metadata = []
			this.qc_passed_metadata = []
			this.qc_passed_sequences = []
			forEach(this.all_qc_checks, d=> {
				d.verification = false
				d.data = []
			})
			return true
		},
		submit_data_button() {
			if(sum(map(this.all_qc_checks, d=>d.verification)) == 5) {
				return false
			}
			return true
		},
		...mapFields([
			'active'
		]),
	},
	methods: {
		open_expanded(type) {
			if(type == 1) {
				this.metadata_requirement = !this.metadata_requirement
			} else {
				this.sequence_requirement = !this.sequence_requirement
			}
		},
		verify_data() {
			forEach(this.all_qc_checks, d=> {
				d.verification = false
				d.data = []
			})
			if(this.metadata && this.sequence) {
				this.all_qc_checks[0].verification = true
				if(this.metadata.file && this.sequence.file) {
					this.check_state_information()
					this.check_collection_date()
					if(!this.all_qc_checks[1].data.length) {
						this.all_qc_checks[1].verification = true
					}
					this.find_missing_sequence_or_metadata()
					this.find_duplicate()
					this.sequence_already_present()
					this.get_qc_passed_data()
					this.show_log = true
				}
			}
		},
		check_collection_date() {
			let collection_date_error_id = map(this.metadata.data,
				d=>this.$moment(d['Collection date'], ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'], true).isValid() ? '' : d['Virus name']
			).filter(String)
			let collection_date_early = map(this.metadata.data,
					d=>this.$moment(d['Collection date'], ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'], true).isBefore('2020-01-01', 'year') ? d['Virus name'] : ''
			).filter(String)
			let empty_collection_date_id = map(this.metadata.data,
				d=>d['Collection date'] == '' ? d['Virus name'] : ''
			).filter(String)

			if(collection_date_error_id.length || empty_collection_date_id.length || collection_date_early.length) {
				if(difference(collection_date_error_id, empty_collection_date_id).length) {
					this.all_qc_checks[1].data.push({
						info: false,
						header: 'Error in collection date format (DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD, YYYY/MM/DD)',
						value: difference(collection_date_error_id, empty_collection_date_id)
					})
				}
				if(empty_collection_date_id.length) {
					this.all_qc_checks[1].data.push({
						info: false,
						header: 'Empty collection date for following',
						value: empty_collection_date_id
					})
				}
				if(collection_date_early.length) {
					this.all_qc_checks[1].data.push({
						info: false,
						header: 'Collection date for following earlier than 2020',
						value: collection_date_early
					})
				}
				this.all_qc_checks[1].verification = false
			}
			forEach(collection_date_error_id, d=> this.qc_failed_metadata.push(d))
			forEach(collection_date_early, d=> this.qc_failed_metadata.push(d))
			forEach(empty_collection_date_id, d=> this.qc_failed_metadata.push(d))
			this.qc_failed_metadata = uniq(this.qc_failed_metadata)
		},
		check_state_information() {
			let fs = FuzzySet(this.all_states_indian, false)
			let wrong_state_names = uniq(map(this.metadata.data, d=> fs.get(d['State']) ? '' : d['State']).filter(String))
			let wrong_state_id = map(this.metadata.data, d=> fs.get(d['State']) ? '' : d['Virus name']).filter(String)
			let empty_state_id = map(this.metadata.data, d=> d['State'] == '' ? d['Virus name']: '').filter(String)
			if(wrong_state_id.length || empty_state_id.length) {
				if(difference(wrong_state_id, empty_state_id).length) {
					this.all_qc_checks[1].data.push({
						info: {
							header: 'Wrong state name',
							value: wrong_state_names
						},
						header: 'Following ids have wrong state info',
						value: difference(wrong_state_id, empty_state_id)
					})
				}
				if(empty_state_id.length) {
					this.all_qc_checks[1].data.push({
						info: false,
						header: 'Empty state information for following',
						value: empty_state_id
					})
				}
				this.all_qc_checks[1].verification = false
			}
			forEach(wrong_state_id, d=> this.qc_failed_metadata.push(d))
			forEach(empty_state_id, d=> this.qc_failed_metadata.push(d))
			this.qc_failed_metadata = uniq(this.qc_failed_metadata)
		},
		find_missing_sequence_or_metadata() {
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let missing_sequence = map(virus_name, (d,i)=> this.sequence.data.includes(d) ? '' : d).filter(String)
			let missing_metadata = map(this.sequence.data, (d,i)=> virus_name.includes(d) ? '' : d).filter(String)
			if(!missing_sequence.length && !missing_metadata.length) {
				this.all_qc_checks[2].verification = true
			} else {
				if(missing_sequence.length) {
					this.all_qc_checks[2].data.push({
						info: false,
						header: 'Sequence missing for the following',
						value: missing_sequence
					})
				}
				if(missing_metadata.length) {
					this.all_qc_checks[2].data.push({
						info: false,
						header: 'Metadata missing for the following',
						value: missing_metadata
					})
				}
				this.all_qc_checks[2].verification = false
			}
			forEach(missing_sequence, d=> this.qc_failed_metadata.push(d))
			forEach(missing_metadata, d=> this.qc_failed_metadata.push(d))
			this.qc_failed_metadata = uniq(this.qc_failed_metadata)
		},
		find_duplicate() {
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let duplicates_metadata = virus_name.filter((e, i, a) => a.indexOf(e) !== i)
			let duplicates_sequence = this.sequence.data.filter((e, i, a) => a.indexOf(e) !== i)
			if(!duplicates_metadata.length && !duplicates_sequence.length) {
				this.all_qc_checks[3].verification = true
			} else {
				if(duplicates_metadata.length) {
					this.all_qc_checks[3].data.push({
						info: false,
						header: 'Duplicate Metadata found',
						value: duplicates_metadata
					})
				}
				if(duplicates_sequence.length) {
					this.all_qc_checks[3].data.push({
						info: false,
						header: 'Duplicate Sequences found',
						value: duplicates_sequence

					})
				}
				this.all_qc_checks[3].verification = false
			}
			forEach(duplicates_metadata, d=> this.qc_failed_metadata.push(d))
			forEach(duplicates_sequence, d=> this.qc_failed_metadata.push(d))
			this.qc_failed_metadata = uniq(this.qc_failed_metadata)
		},
		async sequence_already_present() {
			let metadata_name = await this.$axios.$post('/files/metadata-info-name/')
			if(metadata_name.message) {
				this.all_qc_checks[4].verification = true
				return
			}
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let already_uploaded = map(virus_name, (d,i)=> metadata_name.includes(d) ? d : '').filter(String)
			if(!already_uploaded.length) {
				this.all_qc_checks[4].verification = true
			} else {
				this.all_qc_checks[4].data.push({
					info: false,
					header: 'Following sequences are already uploaded',
					value: already_uploaded
				})
				this.all_qc_checks[4].verification = false
			}
			console.log('reached here')
			forEach(already_uploaded, d=> this.qc_failed_metadata.push(d))
			this.qc_failed_metadata = uniq(this.qc_failed_metadata)
		},
		get_qc_passed_data() {
			// this.qc_failed_metadata = uniq(this.qc_failed_metadata)
			this.qc_passed_metadata = map(this.metadata.data, d=> this.qc_failed_metadata.includes(d['Virus name']) ? '' : d).filter(String)
			console.log(this.qc_failed_metadata, this.qc_passed_metadata)
			let qc_passed_name = map(this.metadata.data, d=> this.qc_failed_metadata.includes(d['Virus name']) ? '' : d['Virus name']).filter(String)
			this.qc_passed_sequences = map(this.sequence.fasta, d=> qc_passed_name.includes(d.name) ? d : '').filter(String)
			let Fasta = require('biojs-io-fasta')
			if(this.qc_passed_metadata.length > 1) {
				return true
			}
			return false
		},
		upload_data() {
			let Fasta = require('biojs-io-fasta')
			let payload = new FormData()
			let time_now = Date.now()
			let metadata_file_name = 'metadata' + '_' + time_now + '.' + this.metadata.file.fileExtension
			let sequence_file_name = 'sequence' + '_' + time_now + '.' + this.sequence.file.fileExtension
			let metadata_blob = new Blob([json2csv(this.qc_passed_metadata)], { type: "application/json" })
			let sequence_blob = new Blob([Fasta.write(this.qc_passed_sequences)], { type: "application/json" })
			// payload.append("metadata", this.metadata.file.file, metadata_file_name)
			// payload.append("sequences", this.sequence.file.file, sequence_file_name)
			payload.append("metadata", metadata_blob, metadata_file_name)
			payload.append("sequences", sequence_blob, sequence_file_name)
			let vm = this
			const config = {
				onUploadProgress: function(progressEvent) {
					vm.upload_percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				}
			}
			this.loader = this.$vs.loading()
			const data = this.$axios.$post('/files/file-upload/', payload, config)
			let temp_metadata = this.metadata.data
			forEach(temp_metadata, d=> d['Submission Date'] = time_now)
			const metadata_upload = this.$axios.$post('/files/metadata-upload/', {
				metadata: this.metadata.data
			})
			setTimeout(() => {
				this.loader.close()
				let file = this.$el.querySelectorAll('.filepond--item')
				let main_label = this.$el.querySelectorAll('.filepond--file-status-main')
				forEach(file, d=> d.setAttribute('data-filepond-item-state', 'processing-complete'))
				forEach(main_label, d=> d.textContent = 'Uploaded Successfully')
				this.id = Date.now() + Math.floor(Math.random()*10000 + 1)
				this.show_log = false
				this.qc_failed_metadata = []
				this.qc_passed_metadata = []
				this.qc_passed_sequences = []
				forEach(this.all_qc_checks, d=> {
					d.verification = false
					d.data = []
				})
			}, 1000)

		}
	},
	beforeMount() {
		this.active = 'Upload'
	},
	mounted() {
		this.$nextTick(()=>{
		})
	}
};
</script>

<style scoped>
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
	left: -1.5%;
	background-color: #F45564;
	opacity: 0.7;
	border-radius: 5px;
}
.side-element-white {
	position: relative;
}
.side-element-white::before {
	content: '';
	position: absolute;
	height: 80%;
	width: 5px;
	z-index: 2;
	top: 10%;
	left: -1.5%;
	background-color: #EFECF2;
	opacity: 0.7;
	border-radius: 5px;
}
.delay-0ms {
	animation-delay: 200ms;
}
.delay-1ms {
	animation-delay: 300ms;
}
.delay-2ms {
	animation-delay: 400ms;
}
.delay-3ms {
	animation-delay: 500ms;
}
.delay-4ms {
	animation-delay: 600ms;
}
.delay-5ms {
	animation-delay: 700ms;
}
.delay-6ms {
	animation-delay: 800ms;
}
.delay-7ms {
	animation-delay: 900ms;
}
ul {
	list-style: none;
}
ul li::before {
	width: 1em;
	content: "\2022";
	font-weight: bold;
	display: inline-block;
}
.overflow-scroll {
	overflow-y: scroll;
}
</style>
