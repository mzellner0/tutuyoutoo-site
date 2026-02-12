<template>
  <div class="home container">
    <LangButton />
    <TitleTop />
    <Intro class="home__intro" />
    <Features />
    <Articles />
    <Social />
  </div>
</template>

<script>
import Intro from "@/components/home/Intro";
import Features from "@/components/home/Features";
import Social from "@/components/home/Social";
import Articles from "@/components/home/Articles";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";

export default {
  name: 'HomeView',
  components: {
    Intro,
    Features,
    Social,
    Articles,
    LangButton,
    TitleTop
  }
};
</script>

<style lang="scss" scoped>
  .home {
    margin-bottom: 100px;
    &__intro {
      margin-top: 360px;
      z-index: 1;
    }
  }

  @include breakpoint(1279) {
    .home {
      &__intro {
        margin-top: 340px;
      }
    }
  }

  @include breakpoint(500) {
    .home {
      &__intro {
        margin-top: 360px;
      }
    }
  }
</style>
