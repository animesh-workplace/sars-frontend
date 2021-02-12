<template></template>

<script>
export default {
	props: ['valid'],
	watch: {
		valid: {
			immediate: true,
			handler () {
				this.$emit('change', this.valid)
			}
		}
	}
};
</script>

<style></style>
