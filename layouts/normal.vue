<template>
	<div>
		<Navbar/>
		<Nuxt/>
	</div>
</template>

<script>
import Navbar from '@/components/navbar/top-nav.vue'

export default {
	name: 'normal-layout',
	middleware: 'auth',
	data: () => ({
	}),
	components: {
		Navbar
	},
	computed: {
	},
	beforeMount(){
		if(this.$auth.loggedIn) {
			console.log('This message should appear after refresh')
			this.$store.dispatch('websocket_connect')
			this.$store.dispatch('user-info-store/set_uploaded_metadata')
			// this.$store.dispatch('user-info-store/set_download_link')
		}
	},
};
</script>

<style scoped></style>
