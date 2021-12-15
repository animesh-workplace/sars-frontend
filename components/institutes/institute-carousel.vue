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
				"name": "National Institute of Biomedical Genomics (NIBMG)",
				"location": "Kalyani, West Bengal",
				"link": "https://www.nibmg.ac.in"
			},
			{
				"name": "Translational Health Science and Technology Institute (THSTI)",
				"location": "Faridabad, Haryana",
				"link": "https://thsti.res.in/newthsti/"
			},
			{
				"name": "Sri Aurobindo Institute of Medical Sciences & Post Graduate Institute (SAIMS & PGI)",
				"location": "Indore, Madhya Pradesh",
				"link": "https://www.saimsonline.com"
			},
			{
				"name": "Regional Medical Research Centre (RMRC)",
				"location": "Dibrugarh, Assam",
				"link": "http://www.rmrcne.org.in/"
			},
			{
				"name": "Regional Medical Research Centre (RMRC)",
				"location": "Bhubaneswar, Odisha",
				"link": "http://www.rmrcbbsr.gov.in/covid_intro.php"
			},
			{
				"name": "Rajiv Gandhi Centre for Biotechnology (RGCB)",
				"location": "Thiruvananthapuram, Kerala",
				"link": "https://rgcb.res.in/"
			},
			{
				"name": "National Institute of Virology (NIV)",
				"location": "Pune, Maharashtra",
				"link": "https://www.niv.co.in"
			},
			{
				"name": "National Institute for Research in Tuberculosis (NIRT)",
				"location": "Chennai, Tamil Nadu",
				"link": "http://www.nirt.res.in/"
			},
			{
				"name": "National Institute of Mental Health and Neuro Sciences Hospital (NIMHANS)",
				"location": "Bangalore, Karnataka",
				"link": "https://nimhans.ac.in"
			},
			{
				"name": "North East Institute of Science and Technology (NEIST)",
				"location": "Jorhat, Assam",
				"link": "https://neist.res.in/"
			},
			{
				"name": "National Chemical Laboratory (NCL)",
				"location": "Pune, Maharashtra",
				"link": "https://www.ncl-india.org/"
			},
			{
				"name": "National Centre for Disease Control (NCDC)",
				"location": "New Delhi",
				"link": "https://ncdc.gov.in"
			},
			{
				"name": "National Centre for Cell Science (NCCS)",
				"location": "Pune, Maharashtra",
				"link": "https://www.nccs.res.in"
			},
			{
				"name": "National Botanical Research Institute (NBRI)",
				"location": "Lucknow, Uttar Pradesh",
				"link": "https://www.nbri.res.in/"
			},
			{
				"name": "Mahatma Gandhi Medical College (MGMC)",
				"location": "Jaipur, Rajasthan",
				"link": "http://sbvu.ac.in/mgmcri/"
			},
			{
				"name": "Kempegowda Institute of Medical Sciences (KIMS)",
				"location": "Bangalore, Karnataka",
				"link": "http://www.kimsbangalore.edu.in"
			},
			{
				"name": "Jawaharlal Nehru Centre for Advanced Scientific Research (JNCASR)",
				"location": "Bangalore, Karnataka",
				"link": "https://www.jncasr.ac.in/"
			},
			{
				"name": "Institute for Stem Cell Science and Regenerative Medicine (InSTEM/NCBS)",
				"location": "Bangalore, Karnataka",
				"link": "https://instem.res.in"
			},
			{
				"name": "Institute of Microbial Technology (IMTECH)",
				"location": "Chandigarh",
				"link": "https://csir-imtech.business.site/"
			},
			{
				"name": "Institute of Life Sciences (ILS)",
				"location": "Bhubaneshwar, Odisha",
				"link": "https://www.ils.res.in"
			},
			{
				"name": "Institute of Liver and Biliary Sciences (ILBS)",
				"location": "New Delhi",
				"link": "https://www.ilbs.in/"
			},
			{
				"name": "Indian Institute of Science Education and Research (IISER)",
				"location": "Pune, Maharashtra",
				"link": "https://www.iiserpune.ac.in/"
			},
			{
				"name": "Indian Institute of Chemical Biology (IICB)",
				"location": "Kolkata, West Bengal",
				"link": "https://iicb.res.in/"
			},
			{
				"name": "Indira Gandhi Institute of Medical Sciences (IGIMS)",
				"location": "Patna, Bihar",
				"link": "http://www.igims.org"
			},
			{
				"name": "Institute of Bioresources and Sustainable Development (IBSD)",
				"location": "Imphal, Manipur",
				"link": "http://ibsdimphal.com/"
			},
			{
				"name": "Institute of Genomics and Integrative Biology (IGIB)",
				"location": "New Delhi",
				"link": "https://www.igib.res.in"
			},
			{
				"name": "Gandhi Medical College (GMC)",
				"location": "Secunderabad, Telangana",
				"link": "https://www.gandhihospital.in"
			},
			{
				"name": "Government Medical College (GMC)",
				"location": "Patiala, Punjab",
				"link": "https://gmcpatiala.com"
			},
			{
				"name": "Government Doon Medical College (GDMC)",
				"location": "Dehradun, Uttarakhand",
				"link": "https://doonmedical.org"
			},
			{
				"name": "Gujarat Biotechnology Research Centre (GBRC)",
				"location": "Gandhinagar, Gujarat",
				"link": "https://gbrc.org.in/route.php"
			},
			{
				"name": "Central Drug Research Institute (CDRI)",
				"location": "Lucknow, Uttar Pradesh",
				"link": "https://www.cdri.res.in/"
			},
			{
				"name": "Centre for DNA Fingerprinting and Diagnostics (CDFD)",
				"location": "Hyderabad, Telangana",
				"link": "http://www.cdfd.org.in"
			},
			{
				"name": "Centre for Cellular and Molecular Biology (CCMB)",
				"location": "Hyderabad, Telangana",
				"link": "https://www.ccmb.res.in"
			},
			{
				"name": "Centre for Brain Research - Indian Institute of Science (CBR-IISc)",
				"location": "Bangalore, Karnataka",
				"link": "https://www.cbr.iisc.ac.in/"
			},
			{
				"name": "Byramjee Jeejeebhoy Government Medical College (BJGMC)",
				"location": "Pune, Maharashtra",
				"link": "http://www.bjmcabd.edu.in/"
			},
			{
				"name": "All India Institute of Medical Sciences (AIIMS)",
				"location": "New Delhi",
				"link": "https://www.aiims.edu/en.html"
			},
			{
				"name": "All India Institute of Medical Sciences (AIIMS)",
				"location": "Bhopal, Madhya Pradesh",
				"link": "https://www.aiimsbhopal.edu.in"
			},
			{
				"name": "Kasturba Hospital for Infectious Diseases (KHID)",
				"location": "Mumbai, Maharashtra",
				"link": "https://portal.mcgm.gov.in/irj/portal/anonymous/qlkasturbhahosp?guest_user=english"
			}
		],
		flickityOptions: {
			contain: true,
			pageDots: true,
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
	/*transform: translateX(-160px);*/
}
</style>
