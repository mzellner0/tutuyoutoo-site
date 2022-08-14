<template>
  <div class="home container">
    <LangButton link="open-on-mobile" />
    <TitleTop />
    <WarningOpen class="home__open-on-mobile" />
    <Social :is-last="true" />
  </div>
</template>

<script>
import Social from "@/components/home/Social";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";
import WarningOpen from "../components/openOnMobile/warning.vue";

export default {
  name: 'HomeView',
  components: {
    Social,
    LangButton,
    TitleTop,
    WarningOpen
  }
};
</script>

<style lang="scss" scoped>
  .home {
    margin-bottom: 100px;
    &__open-on-mobile {
      margin-top: 600px;
      max-width: 1000px;
      width: 70%;
      z-index: 1;
    }
  }

  @include breakpoint(1279) {
    .home {
      &__open-on-mobile {
        margin-top: 570px;
        max-width: 600px;
      }
    }
  }

  @include breakpoint(500) {
    .home {
      &__open-on-mobile {
        margin-top: 430px;
      }
    }
  }
</style>
