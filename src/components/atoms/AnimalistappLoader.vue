<template>
	<div class="loader valign-wrapper" v-if="show">
		<div class="preloader-wrapper big active">
			<img src="https://images.animalistapp.com/brand/isotipo.png" class="responsive-img">
		</div>
	</div>
</template>

<style scope>
	.loader {
		z-index: 1000;
		position: fixed;
		height: 100vh;
		width: 100%;
		opacity: 0.5;
		background-color: #f5f5f5;
	}
	.loader .preloader-wrapper{
		margin: 0 auto;
	}
</style>

<script>
	export default {
		props: {
			'show':{type: Boolean,required: true}
		}
	}
</script>
