<template>
  <div class="landing container">
    <LangButton link="landing" />
    <DownloadButton :is-on-landing="true" />
    <TitleTop />
    <Story class="landing__story" />
    <Features :is-title="false" />
    <StoryEnd />
    <DownloadApp :is-on-landing="true" />
    <Articles />
    <Social />
    <DownloadApp
      :is-on-landing="true"
      :is-last="true"
    />
  </div>
</template>

<script>
import Features from "@/components/home/Features";
import Story from "@/components/home/Story";
import StoryEnd from "@/components/home/StoryEnd";
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
    StoryEnd,
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
      &__story {
        margin-top: 360px;
      }
    }
  }
</style>
