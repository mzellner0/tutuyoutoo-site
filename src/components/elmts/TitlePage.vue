<template>
  <div
    class="title"
    :style="{ 'background-image': `url(${getImageBg()})` }"
  >
    <img
      class="title__logo"
      src="@/assets/images/logo2.png"
      alt="logo"
      @click="onClickGoBack"
    >
    <div
      class="title__title"
      @click="onClickGoBack"
    >
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
  name: 'TitlePage',
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
    onClickGoBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="scss" scoped>
  .title {
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
      cursor: pointer;
      margin-top: $space-top-bot;
      width: 180px;
    }
    &__title {
      cursor: pointer;
      p {
        margin-top: 0px;
      }
      img {
        margin: 15px 0px;
        width: 540px;
      }
    }
  }

  @include extraLargeScreen() {
    .title {
      background-position: top;
      background-size: 100% 1070px;
    }
  }

  @include breakpoint(1279) {
    .title {
      &__title {
        img {
          width: 430px;
        }
      }
    }
  }

  @include breakpoint(500) {
    .title {
      background-repeat: no-repeat;
      background-size: cover;
      height: 545px;
      background-position: bottom;
      &__logo {
        width: 140px;
      }
      &__title {
        p {
          font-size: 12px;
        }
        img {
          width: 260px;
        }
      }
    }
  }
</style>