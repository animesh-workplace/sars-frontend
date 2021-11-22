<template>
	<div>
		<Navbar/>
		<Nuxt class="min-height"/>
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
			this.$store.dispatch('user-info-store/get_user_status')
			this.$store.dispatch('websocket_connect')
			this.$store.dispatch('user-info-store/set_uploaded_metadata')
			this.$store.dispatch('user-info-store/set_download_link')
		}
	},
};
</script>

<style scoped>
.min-height {
	min-height: calc(100vh - 128px);
}
</style>
