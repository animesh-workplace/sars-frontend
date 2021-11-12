<template>
	<div class="is-fullheight">
		<div class="column is-10 is-offset-1">
			<section class="section mt-6">
				<div class="box is-raised is-unselectable">

					<div :class="show_download ? 'level' : 'space' ">
						<div class="has-text-centered">
							<span class="is-size-4 has-text-weight-semibold has-text-grey-dark">
								Complete Metadata
							</span>
						</div>

						<div class="field has-addons mb-0 mr-2" v-click-outside="handleBlur" v-if="show_download">
							<div class="control">
								<vs-tooltip bottom color="#52A5E0">
									<div class="button is-fullwidth is-info" @click="download_annotated">
										<svg class="icon has-fill-white">
											<use xlink:href="@/assets/images/icons/bds.svg#download-g"></use>
										</svg>
										<span>Export</span>
									</div>
									<template #tooltip>
										<p class="has-text-weight-semibold">
											This downloads the items in the table below
										</p>
										<p class="has-text-weight-semibold has-text-centered">{{ last_updated }}</p>
									</template>
								</vs-tooltip>
							</div>

<!-- 							<div class="control">
								<div
									:class="time_dropdown ? 'dropdown is-iconless is-right is-active' : 'dropdown is-iconless is-right'"
								>
									<div class="dropdown-trigger">
										<div
											@click="activate_time_dropdown"
											:class="time_dropdown ? 'button has-background-info-dark' : 'button has-background-info'"
										>
											<svg class="icon has-fill-white">
												<use xlink:href="@/assets/images/icons/bds.svg#arrow-down-g"></use>
											</svg>
										</div>
									</div>
									<div class="dropdown-menu">
										<div class="dropdown-content width-adjust p-3">
											<p class="has-text-weight-medium is-size-5 has-text-centered">
												Limit your download to last
											</p>
											<div class="level my-2">
												<input
													type="number"
													placeholder="Enter Period"
													v-model="selected_time_period.value"
													class="input is-small has-rounded-input mr-2"
												>
												<div class="dropdown is-hoverable is-size-6">
													<div class="dropdown-trigger">
														<div class="button has-rounded-input">
															<span class="has-text-weight-normal is-size-5">
																{{ !selected_time_period.pristine ? selected_time_period.period : 'Select Interval' }}
															</span>
														</div>
													</div>

													<div class="dropdown-menu width-100p">
														<div class="dropdown-content">
															<a
																v-for="(time, index) in time_period"
																:class="time.active ? 'dropdown-item is-active has-text-weight-semibold has-text-black mb-1' : 'dropdown-item mb-1'"
																@click="select_time_period(time.name, index)"
															>
																{{ time.name }}
															</a>
														</div>
													</div>
												</div>
											</div>

											<div class="has-text-centered mb-2">
												<div class="button is-light has-rounded-input">
													<span>Download</span>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div> -->

						</div>
					</div>


					<div class="box medium has-skeleton mt-4" v-if="table_loading"></div>
					<Table :TableData="all_metadata" :Size="metadata_length" v-if="!table_loading && enable_table" class="mt-4"/>
					<div v-if="!enable_table && !table_loading">
						<span class="subtitle is-5 has-text-grey-dark">No data uploaded yet</span>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import JSZip from 'jszip'
import { map, forEach } from 'lodash'
import json2csv from 'csvjson-json2csv'
import { mapFields } from 'vuex-map-fields'
import Table from '@/components/table/table-advanced.vue'

export default {
	name: 'my_data',
	layout: 'normal2',
	middleware: ['auth', 'auth_logout'],
	data: () => ({
		page: 1,
		time_dropdown: false,
		my_notification: null,
		selected_time_period: {
			value: 5,
			from: 'my',
			period: '',
			pristine: true,
		},
		time_period: [
			{ name: 'Days', active: false },
			{ name: 'Months', active: false },
			{ name: 'Year', active: false },
			{ name: 'All', active: false },
		],
	}),
	components: {
		Table,
	},
	computed: {
		...mapFields([
			'active',
			'socket',
			'all_metadata',
			'table_search',
			'table_loading',
			'metadata_length',
			'download_metadata',
			'download_notification',
		]),
		...mapFields('user-info-store',[
			'download_link',
			'show_download'
		]),
		enable_table() {
			if(this.all_metadata) {
				if(this.all_metadata != null) {
					return true
				}
			}
			return false
		},
		last_updated() {
			let text = `Last updated: ${ this.$dayjs(this.download_link.last_updated).format('DD-MM-YYYY hh:mm A')}`
			return text
		}
	},
	watch: {
		download_notification(value) {
			if(!value) {
				let zip = new JSZip()
				let date_time = this.$dayjs().format('DD-MM-YYYY_hh-mm')
				// console.log('Value has changed to false. Data is ready close the notification')
				let link = document.createElement('a')
				zip.file('download/annotated_data.tsv', json2csv(this.download_metadata, { separator: '\t' }))

				let vm = this
				zip.generateAsync({
					type: "blob",
					compression: "DEFLATE",
					compressionOptions: {
						level: 5
					}
				}).then(function(content) {
					link.href = URL.createObjectURL(content)
					link.download = `download_data_${date_time}.zip`
					link.click()
					vm.my_notification.close()
				})
			}
		}
	},
	methods: {
		activate_time_dropdown() {
			if(this.show_download) {
				this.time_dropdown = !this.time_dropdown
			} else {
				this.$vs.notification({
					sticky: true,
					color: 'danger',
					duration: 'none',
					position: 'top-center',
					title: 'Well, would you look at that!!',
					text: "This doesn't work for you, don't try to be smart"
				})
			}
		},
		select_time_period(value, index) {
			this.selected_time_period.pristine = false
			this.selected_time_period.period = value
			map(this.time_period, d=>d.active = false)
			this.time_period[index].active = true
		},
		handleBlur() {
			this.time_dropdown = false
		},
		download_annotated() {
			this.my_notification = this.$vs.notification({
				type 		: 'border',
				text		: '<span class="has-text-grey-white">Please wait while we fetch and compile the data. Please do not close this window</span>',
				title 		: '<span class="is-size-5 has-text-weight-medium has-text-grey-white">Fetching data</span>',
				color 		: '#CE9F44',
				sticky		: true,
				duration 	: 'none',
				position	: 'top-center',
				buttonClose : false,
			})
			if(this.table_search) {
				this.$store.dispatch('websocket_send',
					{ type: 'DOWNLOAD_METADATA', filter: { search: this.table_search, 'each_page': 15, 'page': 1 }}
				)
			} else {
				this.$store.dispatch('websocket_send',
					{ type: 'DOWNLOAD_METADATA', filter: { 'each_page': 15, 'page': 1 }}
				)
			}
			this.download_notification = true
		},
	},
	beforeMount() {
		this.active = 'Sequences'
	},
	mounted() {
		this.$nextTick(()=>{
			if(this.socket.isConnected) {
				this.$store.dispatch('websocket_send', {
					'type': 'MY_METADATA',
					'filter': { 'each_page': 15, 'page': 1 }
				})
			}
		})
	},
	beforeDestroy() {
	}
};
</script>

<style scoped>
.medium {
	height: 770px;
}
.width-adjust{
	width: 500px;
}
.width-100p {
	width: 100%;
}
.has-rounded-input {
	border-radius: 0.25rem !important;
}
</style>
