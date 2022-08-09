<template>
	<div class="social">
		<p>{{ $tr[$route.params.lang].follow }}</p>
		<div class="social__icons">
			<a href="https://www.tiktok.com/@tutuyoutoo" target="_blank">
				<img src="@/assets/images/tiktok.svg" alt="tik tok" />
			</a>
			<a href="https://www.instagram.com/tutuyoutoo/" target="_blank">
				<img src="@/assets/images/instagram.svg" alt="instagram" />
			</a>
			<a href="https://www.facebook.com/Tutuyoutoo" target="_blank">
				<img src="@/assets/images/facebook.svg" alt="facebook" />
			</a>
			<a href="https://www.linkedin.com/company/tutuyoutoo/" target="_blank">
				<img src="@/assets/images/linkedin.svg" alt="linkedin" />
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "Social"
}
</script>

<style lang="scss" scoped>
.social {
	flex-direction: column;
	display: flex;
	align-items: center;
	justify-content: center;
  width: 900px;
  padding: 0px 80px;
  padding-bottom: 100px;
	margin-top: 60px;
  border-bottom: 2px solid $color-police-main;
	&__icons {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 50px;
			margin: 0px 10px;
			cursor: pointer;
		}
	}
	p {
		font-size: 20px;
	}
}
@include breakpoint(1279) {
  .social {
    width: 600px;
    padding: 0px 60px;
    padding-bottom: 70px;
  }
}

@include breakpoint(800) {
  .social {
		margin-top: 40px;
    width: 90%;
    padding: 0px;
    padding-bottom: 50px;
  }
}
</style>