<template>
  <div class="vote container">
    <div class="vote__menu">
      <router-link
        :to="`/${$route.params.lang === 'fr' ? 'en' : 'fr'}/ambassador-vote`"
      >
        {{ $route.params.lang === "fr" ? "en" : "fr" }}
      </router-link>
    </div>
    <TitlePage />
    <AmbassadorVote
      class="vote__vote"
      :button-is-visible="true"
    />
  </div>
</template>

<script>
import AmbassadorVote from "@/components/home/AmbassadorVote";
import TitlePage from "@/components/elmts/TitlePage";

export default {
  name: 'AmbassadorVoteView',
  components: {
    AmbassadorVote,
    TitlePage
  }
};
</script>

<style lang="scss" scoped>
  .vote {
    &__menu {
      position: fixed;
      top: 30px;
      right: 20px;
      z-index: 10;
      a {
        background-color: $color-bg;
        border: 2px solid $color-police-main;
        color: $color-police-main;
        padding: 10px;
        border-radius: 10px;
        font-size: 15px;
        cursor: pointer;
        width: 20px;
      }
    }
    &__vote {
      margin-top: 510px;
      z-index: 1;
      border: none;
    }
  }

  @include breakpoint(1279) {
    .vote {
      &__vote {
        margin-top: 532px;
      }
    }
  }

  @include breakpoint(500) {
    .vote {
      &__vote {
        margin-top: 374px;
      }
    }
  }
</style>
