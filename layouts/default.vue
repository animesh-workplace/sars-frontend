<template>
	<div>
		<Nuxt/>
	</div>
</template>

<script>

export default {
	name: 'default-layout',
	middleware: 'guest',
	data: () => ({
	}),
	components: {
	},
	computed: {
	},
	beforeMount(){
	},
};
</script>

<style scoped></style>
