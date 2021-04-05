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
										<b class="has-text-red">Collection date</b> - Date in the format YYYY-MM-DD
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
					<div class="column is-4 is-offset-4 has-text-centered pt-0">
						<div
							@click="verify_data"
							:disabled="enable_submit"
							v-if="submit_data_button"
							class="button is-info is-fullwidth"
						>
							<span>Verify Data</span>
						</div>
						<div
							@click="upload_data"
							class="button is-info"
							:disabled="enable_submit"
							v-if="!submit_data_button"
						>
							<span>Upload Data</span>
						</div>
					</div>
				</div>


				<div class="box is-well" v-if="show_log">
					<div class="box is-well">
						<div
							class="level animate__animated animate__fadeIn delay-7ms"
						>
							<div class="level-left">
								<span class="has-text-grey-dark has-text-weight-semibold">
									Basic QC Check
								</span>
							</div>
							<div class="level-right">
								<Tag
									:tagtype="sequence.verification[2].verification && metadata.verification[2].verification"
								/>
							</div>
						</div>
					</div>

					<div class="column">
						<div
							:key="index"
							v-for="(data, index) in all_qc_checks"
						>
							<div :class="`level mb-2 animate__animated animate__fadeIn delay-${index}ms`">
								<div class="level-left">
									<span class="has-text-grey-dark has-text-weight-semibold">
										{{ data.name }}
									</span>
								</div>
								<div class="level-right">
									<Tag :tagtype="data.verification"/>
								</div>
							</div>

							<div
								v-if="data.id == 3 && !all_qc_checks[2].verification && missing_sequence.length"
								class="message mb-2 is-danger animate__animated animate__fadeIn delay-3ms"
							>
								<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
									Sequence missing for the following
								</p>
								<div v-for="(seq, index) in missing_sequence" :key="index">
									{{ seq }}
								</div>
							</div>

							<div
								v-if="data.id == 3 && !all_qc_checks[2].verification && missing_metadata.length"
								class="message mb-2 is-danger animate__animated animate__fadeIn delay-7ms"
							>
								<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
									Metadata missing for the following
								</p>
								<div v-for="(meta, index) in missing_metadata" :key="index">
									{{ meta }}
								</div>
							</div>

							<div
								v-if="data.id == 5 && !all_qc_checks[4].verification && already_uploaded.length"
								class="message is-danger animate__animated animate__fadeIn delay-3ms"
							>
								<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
									Following sequences are already uploaded
								</p>
								<div v-for="(seq, index) in already_uploaded" :key="index">
									{{ seq }}
								</div>
							</div>

						</div>
					</div>


<!-- 					<div
						v-if="sequence.verification[1].verification && !sequence.verification[2].verification"
						class="message is-danger animate__animated animate__fadeIn delay-7ms"
					>
						<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
							Metadata missing for the following
						</p>
						<div v-for="(meta, index) in missing_metadata" :key="index">
							{{ meta }}
						</div>
					</div>

					<div
						v-if="!all_qc_checks[4].verification"
						class="message is-danger animate__animated animate__fadeIn delay-3ms"
					>
						<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
							Following sequences are already uploaded
						</p>
						<div v-for="(seq, index) in already_uploaded" :key="index">
							{{ seq }}
						</div>
					</div> -->

<!-- 					<div class="column">
						<div
							:key="index"
							v-for="(data, index) in metadata.verification"
							:class="`level animate__animated animate__fadeIn delay-${index}ms`"
						>
							<div class="level-left">
								<span class="has-text-grey-dark has-text-weight-semibold">
									{{ data.name }}
								</span>
							</div>
							<div class="level-right">
								<Tag :tagtype="data.verification"/>
							</div>
						</div>
					</div>

					<div
						v-if="metadata.verification[1].verification && !metadata.verification[2].verification"
						class="message is-danger animate__animated animate__fadeIn delay-3ms"
					>
						<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
							Sequence missing for the following
						</p>
						<div v-for="(seq, index) in missing_sequence" :key="index">
							{{ seq }}
						</div>
					</div>


					<div class="column">
						<div
							:key="index"
							v-for="(data, index) in sequence.verification"
							:class="`level animate__animated animate__fadeIn delay-${index + 4}ms`"
						>
							<div class="level-left">
								<span class="has-text-grey-dark has-text-weight-semibold">
									{{ data.name }}
								</span>
							</div>
							<div class="level-right">
								<Tag :tagtype="data.verification"/>
							</div>
						</div>

					</div>

					<div
						v-if="sequence.verification[1].verification && !sequence.verification[2].verification"
						class="message is-danger animate__animated animate__fadeIn delay-7ms"
					>
						<p class="menu-label pl-0 is-size-6 has-text-grey-darker has-text-weight-medium side-element has-text-left">
							Metadata missing for the following
						</p>
						<div v-for="(meta, index) in missing_metadata" :key="index">
							{{ meta }}
						</div>
					</div> -->

				</div>

			</div>
		</div>
	</section>
</template>

<script>
import { map, forEach } from "lodash"
import { mapFields } from 'vuex-map-fields'
import Tag from "@/components/upload/tag.vue"
import Table from "@/components/table/table.vue"
import MetadataUpload from "@/components/upload/metadata-upload.vue"
import SequenceUpload from "@/components/upload/sequence-upload.vue"
import LoginLayout from "@/components/authentication/login-layout.vue"

export default {
	layout: 'normal',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		loader: null,
		metadata: null,
		sequence: null,
		show_log: false,
		upload_percent: 0,
		missing_sequence: null,
		missing_metadata: null,
		already_uploaded: null,
		duplicate_sequence: null,
		duplicate_metadata: null,
		button_verification: false,
		metadata_requirement: false,
		sequence_requirement: false,
		id: Date.now() + Math.floor(Math.random()*10000 + 1),
		all_qc_checks: [
			{ id: 1, name: 'Metadata & Sequence file format check', verification: false },
			{ id: 2, name: 'Metadata & Sequence file structure check', verification: false },
			{ id: 3, name: 'Missing data check', verification: false },
			{ id: 4, name: 'Duplicate check', verification: false },
			{ id: 5, name: 'Already present check', verification: false },
		]
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
			this.missing_metadata = null
			this.missing_sequence = null
			this.already_uploaded = null
			this.duplicate_metadata = null
			this.duplicate_sequence = null
			this.button_verification = false
			return true
		},
		submit_data_button() {
			if(this.button_verification) {
				if(this.metadata && this.sequence) {
					if(this.metadata.file && this.sequence.file) {
						if(this.metadata.verification[2].verification && this.sequence.verification[2].verification) {
							return false
						}
					}
				}
				return true
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
		async verify_data() {
			if(this.metadata && this.sequence) {
				this.all_qc_checks[0].verification = true
				if(this.metadata.file && this.sequence.file) {
					this.all_qc_checks[1].verification = true
					this.missing_sequence = this.verify_metadata()
					this.missing_metadata = this.verify_sequence()
					if(this.metadata.verification[2].verification && this.sequence.verification[2].verification) {
						this.all_qc_checks[2].verification = true
					} else {
						this.all_qc_checks[2].verification = false
					}
					this.find_duplicate()
					await this.sequence_already_present()
					this.show_log = true
					if(this.metadata.verification[2].verification && this.sequence.verification[2].verification) {
						this.button_verification = true
					}
				} else {
					this.all_qc_checks[1].verification = false
				}
			} else {
				this.all_qc_checks[0].verification = false
			}
		},
		verify_metadata() {
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let missing_sequence = map(virus_name, (d,i)=> this.sequence.data.includes(d) ? '' : d).filter(String)
			if(!missing_sequence.length) {
				this.metadata.verification[2].verification = true
			}
			return missing_sequence
		},
		verify_sequence() {
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let missing_metadata = map(this.sequence.data, (d,i)=> virus_name.includes(d) ? '' : d).filter(String)
			if(!missing_metadata.length) {
				this.sequence.verification[2].verification = true
			}
			return missing_metadata
		},
		find_duplicate() {
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			let duplicates_metadata = virus_name.filter((e, i, a) => a.indexOf(e) !== i)
			let duplicates_sequence = this.sequence.data.filter((e, i, a) => a.indexOf(e) !== i)
			if(!(duplicates_metadata.length && duplicates_sequence.length)) {
				this.all_qc_checks[3].verification = true
			} else {
				this.all_qc_checks[3].verification = false
			}
		},
		async sequence_already_present() {
			let metadata_name = await this.$axios.$post('/files/metadata-info-name/')
			let virus_name = map(this.metadata.data, d=> d['Virus name'].replace('\r', ''))
			this.already_uploaded = map(virus_name, (d,i)=> metadata_name.includes(d) ? d : '').filter(String)
			if(!this.already_uploaded.length) {
				this.all_qc_checks[4].verification = true
			} else {
				this.all_qc_checks[4].verification = false
			}
		},
		upload_data() {
			let payload = new FormData()
			let time_now = Date.now()
			let metadata_file_name = 'metadata' + '_' + time_now + '.' + this.metadata.file.fileExtension
			let sequence_file_name = 'sequence' + '_' + time_now + '.' + this.sequence.file.fileExtension
			payload.append("metadata", this.metadata.file.file, metadata_file_name)
			payload.append("sequences", this.sequence.file.file, sequence_file_name)
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
