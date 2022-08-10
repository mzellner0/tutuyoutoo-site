<template>
  <div
    class="top"
    :style="{ 'background-image': `url(${getImageBg()})` }"
  >
    <img
      class="top__logo"
      src="@/assets/images/logo2.png"
      alt="logo"
    >
    <div class="top__title">
      <img
        src="@/assets/images/tutuyoutoo.svg"
        alt="Tutuyoutoo"
      >
      <p>{{ $tr[$route.params.lang].subtitle }}</p>
    </div>
  </div>
</template>

<script>
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: 'HomeView',
  mixins: [responsiveMixin],
  methods: {
    getImageBg() {
      if (this.isOnDesktop) {
        return require('../../assets/images/bg-line-1-desktop.png');
      } else if (this.isOnTablet) {
        return require('../../assets/images/bg-line-1-tablet.png');
      } else if (this.isOnPhone) {
        return require('../../assets/images/bg-line-1-phone.png');
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .top {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 1170px;
    background-position: bottom;
    &__logo {
      margin-top: $space-top-bot;
      width: 180px;
    }
    &__title {
      p {
        margin-top: 0px;
      }
      img {
        // font-size: 70px;
        margin: 15px 0px;
        width: 540px;
      }
    }
  }

  @include extraLargeScreen() {
    .top {
      background-position: top;
      background-size: 100% 1070px;
    }
  }

  @include breakpoint(1279) {
    .top {
      &__title {
        img {
          width: 430px;
        }
      }
    }
  }

  @include breakpoint(500) {
    .top {
      background-repeat: no-repeat;
      background-size: cover;
      height: 545px;
      background-position: bottom;
      &__logo {
        width: 140px;
      }
      &__title {
        img {
          width: 260px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
</style>
