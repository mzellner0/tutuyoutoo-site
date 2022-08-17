<template>
  <div class="page container">
    <LangButton :link="`vote-photo-album/${$route.params.vote}`" />
    <TitleTop />
    <Warning
      v-if="!isLoading && !hasAlreadyVote"
      class="page__vote-photo-album"
      :text="$tr[$route.params.lang].thanksVote"
    />
    <Warning
      v-else-if="!isLoading && hasAlreadyVote"
      class="page__vote-photo-album"
      :text="$tr[$route.params.lang].youAlreadyVote"
    />
    <div v-else class="page__loader">
      <LoaderCircle />
    </div>
    <Social :is-last="true" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Social from "@/components/home/Social";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";
import Warning from "../components/elmts/warning.vue";
import LoaderCircle from '../components/elmts/LoaderCircle.vue';

export default {
  name: 'VotePhotoAlbumView',
  components: {
    Social,
    LangButton,
    TitleTop,
    Warning,
    LoaderCircle
},
  computed: {
    ...mapState('votes', {
      isLoading: state => state.isLoading,
      hasAlreadyVote: state => state.hasAlreadyVote
    }),
  },
  async mounted() {
    await this.addVotePhotoAlbum(this.$route.params.vote);
  },
  methods: {
    ...mapActions('votes', [
      'addVotePhotoAlbum'
    ]),
  }
};
</script>

<style lang="scss" scoped>
  .page {
    margin-bottom: 100px;
    &__vote-photo-album {
      margin-top: 580px;
      max-width: 1000px;
      width: 70%;
      z-index: 1;
    }
    &__loader {
      margin-top: 380px;
      margin-bottom: 200px;
      div {
        position: relative;
      }
    }
  }

  @include breakpoint(1279) {
    .page {
      &__vote-photo-album {
        margin-top: 550px;
        max-width: 600px;
      }
    }
  }

  @include breakpoint(500) {
    .page {
      &__vote-photo-album {
        margin-top: 410px;
      }
      &__loader {
        margin-top: 300px;
      }
    }
  }
</style>
