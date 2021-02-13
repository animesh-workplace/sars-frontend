<template>
	<file-pond
		ref="pond"
		name="file-upload"
		instantUpload="false"
		:server="file_config"
		allow-multiple="false"
		allowFilePoster="false"
		allowImagePreview="false"
		labelIdle="Upload File Here"
		@processfile="handleOnprocessfile"
	/>
</template>

<script>
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import vueFilePond from 'vue-filepond'
import { mapFields } from 'vuex-map-fields'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginFileRename from 'filepond-plugin-file-rename'
import FilePondPluginImageFilter from 'filepond-plugin-image-filter'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

let FilePond = vueFilePond(
	FilePondPluginImageCrop,
	FilePondPluginImageEdit,
	FilePondPluginFilePoster,
	FilePondPluginFileRename,
	FilePondPluginImageFilter,
	FilePondPluginImageResize,
	FilePondPluginImagePreview,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateType,
	FilePondPluginFileValidateSize,
	FilePondPluginImageValidateSize,
	FilePondPluginImageExifOrientation
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
	}),
	computed: {
		// ...mapFields('file-info-store',[
		// 	'activateuploadfile',
		// ]),
	},
	methods: {
		async handleOnprocessfile(error, file){
			// this.$store.dispatch('file-info-store/get_file_info')
			// if(document.querySelector('.filepond--item').dataset.filepondItemState == "processing-complete") {
			// 	document.querySelector('.filepond--item').remove()
			// }
			// if(error){
			// 	console.log(JSON.parse(error.body));
			// }
		},
	}
};
</script>

<style scoped>
</style>
