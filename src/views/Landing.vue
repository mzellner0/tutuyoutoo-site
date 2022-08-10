<template>
  <div class="landing container">
    <LangButton link="landing" />
    <DownloadButton />
    <router-link :to="`/${$route.params.lang}`" class="landing__link">
      <TitleTop />
    </router-link>
    <Story class="landing__story" />
    <Features :is-title="false" />
    <DownloadApp />
    <Articles />
    <Social />
    <DownloadApp :is-last="true" />
  </div>
</template>

<script>
import Features from "@/components/home/Features";
import Story from "@/components/home/Story";
import Social from "@/components/home/Social";
import DownloadApp from "@/components/home/DownloadApp";
import Articles from "@/components/home/Articles";
import DownloadButton from "@/components/elmts/DownloadButton";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";

export default {
  name: 'LandingView',
  components: {
    DownloadApp,
    Features,
    Story,
    Social,
    Articles,
    DownloadButton,
    LangButton,
    TitleTop
  }
};
</script>

<style lang="scss" scoped>
  .landing {
    margin-bottom: 100px;
    &__story {
      margin-top: 500px;
    }
    &__link {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: 460px;
      width: 100%;
    }
  }

  @include breakpoint(1279) {
    .landing {
      &__story {
        margin-top: 530px;
      }
    }
  }

  @include breakpoint(500) {
    .landing {
      &__link {
        height: 380px;
      }
      &__story {
        margin-top: 360px;
      }
    }
  }
</style>
