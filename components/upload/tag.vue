<template>
	<span :class="tagtype ? 'tag is-success' : 'tag is-danger'">
		<svg class="icon is-small has-fill-white">
			<use xlink:href="@/assets/images/icons/bds.svg#check-bold-g" v-if="tagtype"></use>
			<use xlink:href="@/assets/images/icons/bds.svg#cross-bold-g" v-else></use>
		</svg>&nbsp;&nbsp;{{ tagtype ? 'Passed' : 'Failed' }}
	</span>
</template>

<script>
export default {
	props: {
		name: {
			type: String
		},
		tagtype: {
			type: Boolean,
			required: true
		}
	}
};
</script>

<style scoped></style>
