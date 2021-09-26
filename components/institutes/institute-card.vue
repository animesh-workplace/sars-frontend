<template>
	<div :class="$device.isMobile ? 'box is-popping has-background-white fixed-size-mobile mr-3' : 'box is-popping has-background-white fixed-size mr-3'">
		<div class="columns is-mobile">
<!-- 			<div class="column is-2" v-if="!$device.isMobile">
				<div class="image is-64x64 is-circle has-background-red-light"></div>
			</div> -->
			<div class="column">
				<p class="has-text-weight-medium is-size-5">
					<svg class="icon">
						<use xlink:href="@/assets/images/icons/bds.svg#business-g"></use>
					</svg>
					{{ item.name }}
				</p>
				<p class="is-size-6 has-text-grey-dark">
					<svg class="icon has-fill-grey-dark">
						<use xlink:href="@/assets/images/icons/bds.svg#location-g"></use>
					</svg>
					{{ item.location }}
				</p>
				<div class="is-size-6 has-text-grey-dark">
					<svg class="icon has-fill-grey-dark">
						<use xlink:href="@/assets/images/icons/bds.svg#link-g"></use>
					</svg>
					<a :href="item.link" target="_blank" class="has-text-info">{{ item.link }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
	}),
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	components: {
	},
	computed: {
	},
	beforeMount(){
	},
};
</script>

<style scoped>
.fixed-size {
	min-width: 500px;
	max-width: 500px;
	min-height: 130px;
}
.fixed-size-mobile {
	min-width: 320px;
	max-width: 320px;
	min-height: 120px;
}
.is-circle {
	border-radius: 96px;
}
</style>
