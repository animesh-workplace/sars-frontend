<template>
	<div>
		<Navbar/>
		<Nuxt/>
		<Footer/>
	</div>
</template>

<script>
import Navbar from '@/components/header/navbar_landing.vue'
import Footer from '@/components/footer/footer_landing.vue'

export default {
	name: 'normal-layout',
	data: () => ({
	}),
	components: {
		Navbar,
		Footer
	},
	computed: {
	},
	beforeMount(){
		this.$store.dispatch('set_landing_info')
		if(this.$auth.loggedIn) {
			console.log('This message should appear after refresh')
			// this.$store.dispatch('websocket_connect')
			// this.$store.dispatch('user-info-store/set_uploaded_metadata')
			// this.$store.dispatch('user-info-store/set_download_link')
		}
	},
};
</script>

<style scoped></style>
