<template>
	<vs-button size="small" transparent active :color="theme" class="no-pointer-event m-0">
		<span class="has-text-weight-semibold is-uppercase has-text-black">
			{{ name }}
		</span>
	</vs-button>
</template>

<script>
export default {
	props: {
		theme: {
			type: String,
		},
		name: {
			type: String,
		},
	}
};
</script>

<style scoped>
	.no-pointer-event {
		pointer-events: none;
	}
</style>
