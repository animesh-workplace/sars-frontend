<template>
	<div class="my-4">
		<client-only>
			<Flickity ref="flickity" :options="flickityOptions">
				<div class="carousel-cell" v-for="item in data_set">
					<InstituteCard :item="institute_set[item[0]]"/>
					<InstituteCard :item="institute_set[item[1]]" :class="$device.isMobile ? 'shift-mobile' : 'shift'"/>
				</div>
			</Flickity>
		</client-only>
	</div>
</template>

<script>
import InstituteCard from '@/components/institutes/institute-card.vue'

export default {
	data: () => ({
		data_set: [],
		institute_set: [
			{ name:'National Institute of Biomedical Genomics', location: 'Kalyani, West Bengal', link: 'https://www.nibmg.ac.in'},
			{ name:'Institute of Life Sciences', location: 'Bhubaneshwar, Odisha', link: 'https://www.ils.res.in'},
			{ name:'National Centre for Cell Science', location: 'Pune, Maharashtra', link: 'https://www.nccs.res.in'},
			{ name:'Centre for Cellular and Molecular Biology', location: 'Hyderabad, Telangana', link: 'https://www.ccmb.res.in'},
			{ name:'Institute of Genomics and Integrative Biology', location: 'New Delhi', link: 'https://www.igib.res.in'},
			{ name:'National Institute of Virology', location: 'Pune, Maharashtra', link: 'https://www.niv.co.in'},
			{ name:'Centre for DNA Fingerprinting and Diagnostics', location: 'Hyderabad, Telangana', link: 'http://www.cdfd.org.in'},
			{ name:'Institute for Stem Cell Science and Regenerative Medicine', location: 'Bengaluru, Karnataka', link: 'https://instem.res.in'},
			{ name:'National Centre for Disease Control - Epidemiology Division', location: 'New Delhi', link: 'https://ncdc.gov.in'},
			{ name:'National Institute of Mental Health and Neuro Sciences Hospital', location: 'Bengaluru, Karnataka', link: 'https://nimhans.ac.in'},
		],
		flickityOptions: {
			contain: true,
			pageDots: false,
			wrapAround: true,
			freeScroll: true,
			prevNextButtons: true,
			freeScrollFriction: 0.1,
		},		
	}),
	components: {
		InstituteCard,
	},
	computed: {
	},
	methods: {
		carousel_data() {
			let length = this.institute_set.length
			for(let i=0; i<(length-1);i+=2) {
				this.data_set.push([i, i+1])
			}
		}
	},
	beforeMount(){
		this.carousel_data()
	},
};
</script>

<style scoped>
.shift {
	transform: translateX(-300px);
}
.shift-mobile {
	transform: translateX(-160px);
}
</style>
