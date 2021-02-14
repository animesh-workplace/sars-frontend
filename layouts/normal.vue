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
		// if(this.$auth.loggedIn) {
		// 	this.$store.dispatch('user-info-store/set_userinfo')
		// }
	},
};
</script>

<style scoped></style>
