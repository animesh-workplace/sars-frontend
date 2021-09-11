<template>
	<section class="section has-background-theme p-2 footer">
		<div class="has-text-centered">
			<p class="subtitle is-5 has-text-light my-1">
				© INSACOG DataHub 2021. All rights reserved.
			</p>
			<p class="subtitle is-5 has-text-light my-0">
				<b>INSACOG</b> DataHub is developed & maintained by NSM group
			</p>
			<p class="subtitle is-5 has-text-light my-0">
				Maintained at National Institute of Biomedical Genomics (NIBMG), Kalyani
			</p>
			<p class="subtitle is-5 has-text-light pb-2">
				Source Code is available at <a class="has-text-blue-light" href="https://github.com/animesh-workplace/sars-frontend">https://github.com/animesh-workplace/sars-frontend</a>
			</p>
		</div>
	</section>
</template>

<script>

export default {
	data: () => ({
	}),
	computed: {
	},
	components: {
	},
	mounted() {
	},
	methods: {
	}
};
</script>

<style scoped>
.is-soft-white {
	background: linear-gradient( 90deg,
		rgba(255,255,255,0),
		rgba(255,255,255,.4) 12%,
		rgba(255,255,255,.4) 88%,
		rgba(255,255,255,0)
	)
}
.has-background-theme {
	background: #0a2d4d;
}
.footer {
	left: 0;
	bottom: 0;
	width: 100%;
	position: fixed;
}
</style>
