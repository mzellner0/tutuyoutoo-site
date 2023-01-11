<template>
  <div class="page container">
    <LangButton :link="`vote-goodies/${$route.params.vote}/${$route.params.email}`" />
    <TitleTop />
    <div class="page__content">
      <div
        v-if="!isLoading && !hasAlreadyVote"
        class="page__vote-goodies"
      >
        <div
          v-if="$route.params.vote=='oui' && !updateVoteGoodiesConfirm"
          class="page__vote-goodies__yes"
        >
          <h4>
            {{ $tr[$route.params.lang].voteYesGoodies }}
          </h4>
          <ul>
            <li v-for="(goodie, index) in 11" :key="index" >
              <input
                type="checkbox"
                :id="
                  $tr[$route.params.lang]['voteYesGoodie' + (index + 1)]
                "
                :name="
                  $tr[$route.params.lang]['voteYesGoodie' + (index + 1)]
                "
                :value="
                  $tr[$route.params.lang]['voteYesGoodie' + (index + 1)]
                "
                v-model="checkedAccessories"
              >
              <label
                :for="
                  $tr[$route.params.lang]['voteYesGoodie' + (index + 1)]
                "
              >
                {{
                  $tr[$route.params.lang]['voteYesGoodie' + (index + 1)]
                }}
              </label>
            </li>
            <li class="other">
              <label for="other">
                {{ $tr[$route.params.lang]['voteYesGoodieOther'] }}
              </label>
              <input
                type="text"
                id="other"
                name="other"
                v-model="other"
                :placeholder="$tr[$route.params.lang]['voteYesGoodiesIdeaHere']"
              >
            </li>
          </ul>
          <Button
            :text="$tr[$route.params.lang]['voteYesGoodiesValidate']"
            :on-click="onValidate"
            :large="true"
          />
        </div>
        <Warning
          v-else
          :text="$tr[$route.params.lang].thanksVote"
          :without-border="true"
        />
      </div>
      <Warning
        v-else-if="!isLoading && hasAlreadyVote"
        class="page__vote-goodies"
        :text="$tr[$route.params.lang].youAlreadyVote"
        :without-border="true"
      />
      <div v-else class="page__loader">
        <LoaderCircle />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Social from "@/components/home/Social";
import LangButton from "@/components/elmts/LangButton";
import TitleTop from "../components/elmts/TitleTop.vue";
import Warning from "../components/elmts/warning.vue";
import LoaderCircle from '../components/elmts/LoaderCircle.vue';
import Button from '../components/elmts/Button.vue';

export default {
  name: 'VotePhotoAlbumView',
  data() {
    return {
      checkedAccessories: [],
      other: ""
    }
  },
  components: {
    Social,
    LangButton,
    Button,
    TitleTop,
    Warning,
    LoaderCircle
  },
  computed: {
    ...mapState('votes', {
      isLoading: state => state.isLoading,
      hasAlreadyVote: state => state.hasAlreadyVote,
      updateVoteGoodiesConfirm: state => state.updateVoteGoodiesConfirm
    }),
  },
  async mounted() {
    await this.addVoteGoodies({
      vote: this.$route.params.vote,
      email: this.$route.params.email
    });
  },
  methods: {
    ...mapActions('votes', [
      'addVoteGoodies',
      'updateVoteGoodies'
    ]),
    async onValidate() {
      this.checkedAccessories.push(this.other)
      await this.updateVoteGoodies({
        vote: this.$route.params.vote,
        email: this.$route.params.email,
        accessories: this.checkedAccessories,
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .page {
    &__content {
      position: absolute;
      top: 580px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-bottom: 80px;
    }
    &__vote-goodies {
      width: 100%;
      z-index: 1;
      &__yes {
        @include flex(column, flex-start, center);
        h4 {
          font-size: 20px;
          text-align: center;
        }
        ul {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
          margin-top: 0;
        }
        li {
          margin: 10px 0;
          input {
            margin-right: 10px;
            accent-color: $color-gradient-1;
          }
        }
        .other {
          margin-top: 30px;
          @include flex(column, flex-start, center);
          input {
            margin: 0;
            margin-top: 10px;
            width: calc(100% - 26px);
            background-color: $color-bg;
            border: 3px solid $color-gradient-1;
            border-radius: 30px;
            padding: 10px;
            color: $color-gradient-1;
            &::placeholder {
              color: $color-gradient-1-placeholder;
            }
          }
        }
      }
    }
    &__loader {
      margin-bottom: 60px;
      div {
        top: 0;
      }
    }
  }
  
  footer {
    position: absolute;
  }

  @include breakpoint(1279) {
    .page {
      &__vote-goodies {
        width: 84%;
      }
      &__content {
        top: 570px;
      }
      &__loader {
        margin-bottom: 70px;
      }
    }
  }

  @include breakpoint(500) {
    .page {
      &__content {
        top: 460px;
      }
      &__vote-goodies {
        &__yes {
          h4 {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
