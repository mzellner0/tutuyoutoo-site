<template>
  <div
    id="download"
    :class="['download', { 'download--is-last': isLast }]"
  >
    <h2>{{ $tr[$route.params.lang].downloadTitle }}</h2>
    <div class="download__section">
      <a
        class="download-icon android"
        target="_blank"
        :href="isOnLanding ? null : 'https://play.google.com/store/apps/details?id=com.tutuyoutoo.app'"
      >
        <img
          src="@/assets/images/home/android.svg"
          alt="download on android"
        >
        <p>{{ $tr[$route.params.lang].android }}</p>
      </a>
      <a
        class="download-icon apple"
        :href="isOnLanding ? null : 'https://apps.apple.com/fr/app/tutuyoutoo/id1623327908'"
        target="_blank"
      >
        <img
          src="@/assets/images/home/apple.svg"
          alt="download on apple"
        >
        <p>{{ $tr[$route.params.lang].iphone }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLast: { type: Boolean, default: false },
    isOnLanding: { type: Boolean, default: false }
  },
};
</script>

<style lang="scss" scoped>
.download {
  width: 980px;
  padding: 70px 40px;
  border-bottom: 2px solid $color-police-main;
	&--is-last {
		margin-top: 70px;
		border: none;
	}
	h2, h3 {
		margin: 0;
		text-align: center;
	}
	h2 {
		margin-bottom: 5px;
		text-transform: uppercase;
	}
	h3 {
		margin-bottom: 20px;
		font-size: 18px;
		text-transform: none;
	}
	&__section {
		margin-top: 50px;
		@include flex(row, flex-end, center);
		.apple {
			cursor: pointer;
			width: 140px;
			margin-left: 50px;
		}
		.android {
			cursor: pointer;
			width: 200px;
			margin-right: 50px;
		}
		.download-icon {
			@include flex(column, center, center);
			p {
				text-align: center;
			}
			img {
				width: 100%;
			}
		}
	}
}

@include breakpoint(1279) {
  .download {
    width: 600px;
    padding: 70px 60px;
		&--is-last {
			margin-top: 20px;
    	padding-bottom: 0px;
		}
  }
}

@include breakpoint(800) {
  .download {
    width: calc(90% - 25px);
    padding: 60px 0px;
		&--is-last {
			margin-top: 20px;
    	padding-bottom: 0px;
		}
		h2 {
			font-size: 18px;
		}
		h3 {
			font-size: 14px;
		}
		&__section {
			margin-top: 30px;
			.apple {
				width: 60px;
				margin-left: 20px;
			}
			.android {
				width: 100px;
				margin-right: 20px;
			}
			.download-icon {
				p {
					font-size: 12px;
				}
			}
		}
  }
}
</style>