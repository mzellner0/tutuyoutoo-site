<template>
  <div class="home container">
    <LangButton />
    <DownloadButton />
    <TitleTop />
    <Intro class="home__intro" />
    <DownloadApp />
    <Features />
    <Articles />
    <Social />
    <DownloadApp :is-last="true" />
  </div>
</template>

<script>
import Intro from "@/components/home/Intro";
import Features from "@/components/home/Features";
import Story from "@/components/home/Story";
import Social from "@/components/home/Social";
import DownloadApp from "@/components/home/DownloadApp";
import Articles from "@/components/home/Articles";
import DownloadButton from "@/components/elmts/DownloadButton";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";

export default {
  name: 'HomeView',
  components: {
    Intro,
    DownloadApp,
    Features,
    Story,
    Social,
    Articles,
    DownloadButton,
    LangButton,
    TitleTop
  },
  methods: {
    getImageBg() {
      if (this.isOnDesktop) {
        return require('../assets/images/bg-line-1-desktop.png');
      } else if (this.isOnTablet) {
        return require('../assets/images/bg-line-1-tablet.png');
      } else if (this.isOnPhone) {
        return require('../assets/images/bg-line-1-phone.png');
      }
    },
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
    &__help {
      border: none;
      padding-bottom: 0;
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
