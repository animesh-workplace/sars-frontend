<template>
	<div class="my-4">
		<client-only>
			<Flickity ref="flickity" :options="flickityOptions">
				<div class="carousel-cell" v-for="item in data_set">
					<InstituteCard :item="institute_set[item[0]]"/>
					<InstituteCard :item="institute_set[item[1]]" :class="$device.isMobile ? 'shift-mobile' : 'shift'"/>
					<InstituteCard :item="institute_set[item[2]]"/>
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
			{
				name:'National Institute of Biomedical Genomics',
				location: 'Kalyani, West Bengal',
				link: 'https://www.nibmg.ac.in'
			},
			{
				name:'Institute of Life Sciences',
				location: 'Bhubaneshwar, Odisha',
				link: 'https://www.ils.res.in'
			},
			{
				name:'National Centre for Cell Science',
				location: 'Pune, Maharashtra',
				link: 'https://www.nccs.res.in'
			},
			{
				name:'Centre for Cellular and Molecular Biology',
				location: 'Hyderabad, Telangana',
				link: 'https://www.ccmb.res.in'
			},
			{
				name:'Institute of Genomics and Integrative Biology',
				location: 'New Delhi',
				link: 'https://www.igib.res.in'
			},
			{
				name:'National Institute of Virology',
				location: 'Pune, Maharashtra',
				link: 'https://www.niv.co.in'
			},
			{
				name:'Centre for DNA Fingerprinting and Diagnostics',
				location: 'Hyderabad, Telangana',
				link: 'http://www.cdfd.org.in'
			},
			{
				name:'Institute for Stem Cell Science and Regenerative Medicine',
				location: 'Bengaluru, Karnataka',
				link: 'https://instem.res.in'
			},
			{
				name:'National Centre for Disease Control - Epidemiology Division',
				location: 'New Delhi',
				link: 'https://ncdc.gov.in'
			},
			{
				name:'National Institute of Mental Health and Neuro Sciences Hospital',
				location: 'Bengaluru, Karnataka',
				link: 'https://nimhans.ac.in'
			},
			{
				name: "All India Institute of Medical Sciences",
				location: "Raipur, Chhattisgarh",
				link: "https://www.aiimsraipur.edu.in/"
			},
			{
				name: "B.J. Medical College and Civil hospital",
				location: "Ahmedabad, Gujrat",
				link: "http://www.bjmcabd.edu.in/"
			},
			{
				name: "Centre for Brain Research, Indian Institute of Science",
				location: "Bangalore, Karnataka",
				link: "https://www.cbr.iisc.ac.in/"
			},
			{
				name: "Central Drug Research Institute",
				location: "Lucknow, Uttar Pradesh",
				link: "https://www.cdri.res.in/"
			},
			{
				name: "Indian Institute Of Chemical Biology",
				location: "Kolkata, West Bengal",
				link: "https://iicb.res.in/"
			},
			{
				name: "North East Institute Of Science and Technology",
				location: "Jorhat, Assam",
				link: "https://neist.res.in/"
			},
			{
				name: "Gujarat Biotechnology Research Centre",
				location: "Gandhinagar, Gujarat",
				link: "https://gbrc.org.in/route.php"
			},
			{
				name: "Institute Of Bioresources and Sustainable Development",
				location: "Imphal, Manipur",
				link: "http://ibsdimphal.com/"
			},
			{
				name: "Indian Institutes of Science Education and Research",
				location: "Pune, Maharashtra",
				link: "https://www.iiserpune.ac.in/"
			},
			{
				name: "Institute of Liver and Biliary Sciences",
				location: "New Delhi, New Delhi",
				link: "https://www.ilbs.in/"
			},
			{
				name: "Institute of Microbial Technology",
				location: "Chandigrah, Chandigarh",
				link: "https://csir-imtech.business.site/"
			},
			{
				name: "Jawaharlal Nehru Centre for Advanced Scientific Research",
				location: "Bangalore, Karnataka",
				link: "https://www.jncasr.ac.in/"
			},
			{
				name: "National Botanical Research Institute",
				location: "Lucknow, Uttar Pradesh",
				link: "https://www.nbri.res.in/"
			},
			{
				name: "National Chemical Laboratory",
				location: "Pune, Maharashtra",
				link: "https://www.ncl-india.org/"
			},
			{
				name: "National Institute for Research in Tuberculosis",
				location: "Chennai, Tamil Nadu",
				link: "http://www.nirt.res.in/"
			},
			{
				name: "Rajiv Gandhi Centre for Biotechnology",
				location: "Thiruvananthapuram, Kerala",
				link: "https://rgcb.res.in/"
			},
			{
				name: "Regional Medical Research Center",
				location: "Bhubaneswar, Odisha",
				link: "http://www.rmrcbbsr.gov.in/covid_intro.php"
			},
			{
				name: "Regional Medical Research Centre",
				location: "Dibrugarh, Assam",
				link: "http://www.rmrcne.org.in/"
			}
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
			for(let i=0; i<(length-2);i+=3) {
				this.data_set.push([i, i+1, i+2])
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
