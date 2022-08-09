<template>
  <div class="post">
    <div :class="['post__top', { 'post__top--invert': index % 2 === 0 }]">
      <div class="post__top__infos">
        <img
          :src="post.imageUrl"
          alt="image utilisateur"
        >
        <div class="post__top__infos__user">
          <h3>{{ post.firstname }} {{ post.lastname }}</h3>
          <p>{{ post.phrase_description }}</p>
        </div>
      </div>
      <div class="post__top__right">
        <p>{{ post.date_post }} -</p>
        <p class="post__top__category">
          {{ post.name_category }}
        </p>
      </div>
    </div>
    <div
      v-if="checkSecure"
      class="post__content"
      v-html="post.content"
    />
    <div class="post__bottom">
      <div class="post__bottom__left">
        <Button
          :text="'Répondre'"
          :on-click="answer"
          :large="false"
          :small="true"
          :img="require('@/assets/images/answer.svg')"
        />
        <div
          class="post__bottom__answers"
          @click="toggleResponses"
        >
          <p v-if="responses">
            {{ responses.length }}
          </p>
          <p v-else>
            0
          </p>
          <img
            src="@/assets/images/answers.svg"
            alt="voir les réponses"
          >
        </div>
      </div>
      <div class="post__bottom__right">
        <img
          v-if="post.userId == userId"
          src="@/assets/images/edit.svg"
          alt="modifier le poste"
          @click="openUpdatePost"
        >
        <img
          v-if="post.userId == userId"
          src="@/assets/images/trash.svg"
          alt="supprimer le poste"
          @click="tryToDelete"
        >
        <div
          class="post__bottom__like"
          @click="like"
        >
          <p :class="[{ 'is-pink': isUserAlreadyLikeThePost }]">
            {{ nbLikeUpdate }}
          </p>
          <img
            v-if="!isUserAlreadyLikeThePost"
            :class="[{ 'block-button': isChangingLike }]"
            src="@/assets/images/like-blue.svg"
            alt="voter pour"
          >
          <img
            v-else
            :class="[{ 'block-button': isChangingLike }]"
            src="@/assets/images/like-pink.svg"
            alt="enlever son vote"
          >
        </div>
      </div>
    </div>
    <p
      v-if="showWarningResponse"
      class="post__warning-message-response"
    >
      Une réponse est faite pour réagir au post. Si vous souhaitez copier un lien, une image ou une vidéo pour proposer une nouvelle idée, créer un nouveau post. 
    </p>
    <textarea
      v-if="showResponseInput"
      v-model="responseContent"
      placeholder="Répondre..."
      @paste="onPaste"
      @keyup.delete="onDelete"
    />
    <div
      v-if="responses && responses.length > 0 && showResponses"
      class="post__responses"
    >
      <Response
        v-for="(response, indexRes) in responses"
        :key="response.id"
        :response="response"
        :index="indexRes"
        @get-new-responses="getReponses"
      />
    </div>
    <ModalWarning
      v-if="modal.type === 'warning' + post.id"
      :warning="'Voulez-vous vraiment supprimer le post ?'"
      @continue="deletePostOneValidate"
    />
    <ModalCreateUpdatePost
      v-if="modal.type === 'update-post' + post.id"
      :categories="categoriesPost"
      :old-post="post"
    />
  </div>
</template>

<script>
import ModalWarning from "@/components/modal/ModalWarning";
import { mapState, mapGetters, mapActions } from 'vuex';
import PostsService from "@/services/PostsService";
import Button from "@/components/elmts/Button";
import Response from "@/components/posts/Response";
import ModalCreateUpdatePost from "@/components/modal/ModalCreateUpdatePost";

export default {
  name: "Post",
  components: {
    ModalWarning,
    Button,
    Response,
    ModalCreateUpdatePost
  },
  props: {
    post: { type: Object, default: null },
    index: { type: Number, default: null }
  },
  data() {
    return {
      nbLikeUpdate: null,
      oldChangeLike: null,
      isChangingLike: false,
      likes: null,
      responses: null,
      showResponses: false,
      showResponseInput: false,
      responseContent: "",
      showWarningResponse: false
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapGetters('user', [
      'userId',
      'groupId'
    ]),
    ...mapState('categories', {
      categoriesPost: state => state.categoriesPost,
    }),
    ...mapState('posts', {
      offset: state => state.offset
    }),
    checkSecure() {
      return !this.post.content.includes("script");
    },
    isUserAlreadyLikeThePost() {
      if (this.likes) {
        const isIDUserInLikes = this.likes.filter(like => like.user_id == this.userId);
        if (this.oldChangeLike !== null) {
          return this.oldChangeLike == 0 ? false : true;
        } else {
          return isIDUserInLikes.length > 0 ? true : false;
        }
      } else {
        return false;
      }
    }
  },
  mounted() {
    PostsService.getLikes(this.post.id)
      .then((response) => {
        this.likes = response;
        this.nbLikeUpdate = response.length;
      })
      .catch(() => {
        this.likes = [];
        this.nbLikeUpdate = 0;
      });
    this.getReponses();
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('posts', [
      'deletePost'
    ]),
    openUpdatePost() {
      this.updateOpen({ open: true, type: "update-post" + this.post.id });
    },
    tryToDelete() {
      this.updateOpen({ open: true, type: "warning" + this.post.id });
    },
    onPaste() {
      this.showWarningResponse = true;
    },
    onDelete() {
      this.showWarningResponse = false;
    },
    getReponses() {
      PostsService.getResponses(this.post.id)
        .then((response) => {
          this.responses = response;
        })
        .catch(() => {
          this.responses = [];
        });
    },
    answer() {
      this.showResponseInput = !this.showResponseInput;
      this.showWarningResponse = false;

      if (this.responseContent !== "") {
        PostsService.createResponse(this.responseContent, this.userId, this.post.id, this.groupId)
          .then(() => {
            this.getReponses();
            this.showResponses = true;
            this.responseContent = "";
          })
          .catch(() => {
            this.responseContent = "";
          });
      }
    },
    toggleResponses() {
      this.showResponses = !this.showResponses;
    },
    like() {
      this.isChangingLike = true;
      const isIDUserInLikes = this.likes.filter(like => like.user_id == this.userId);

      let like;
      if (this.oldChangeLike !== null) {
        like = this.oldChangeLike == 0 ? 1 : 0;
        this.oldChangeLike = like;
      } else {
        like = isIDUserInLikes.length > 0 ? 0 : 1;
        this.oldChangeLike = like;
      }

      if (like == 0) {
        this.nbLikeUpdate -= 1;
      } else {
        this.nbLikeUpdate += 1;
      }

      PostsService.addRemoveLike(this.userId, this.post.id, like)
      .then(() => {
        this.isChangingLike = false;
      });
    },
    deletePostOneValidate(payload) {
      if (payload === true) {
        PostsService.deletePost(this.post.userId, this.post.id)
        .then(() => {
          this.updateOpen({ open: false });
          this.deletePost(this.post);
        });
      }
    }
  },
};
</script>

<style lang="scss">
  .post {
    width: 100%;
    @include flex(column, flex-start, center);
    &__top {
      width: 100%;
      @include flex(row, center, space-between);
      &__right {
        margin-bottom: 22px;
        @include flex(row, baseline, flex-end);
        p {
          margin: 0;
          font-size: 12px;
        }
      }
      &__category {
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 18px !important;
        margin-left: 5px !important;
      }
      &__infos {
        @include flex(row, flex-start, flex-start);
        &__user {
          @include flex(column, flex-start, center);
          margin-left: 15px;
          h3 {
            color: $color-gradient-2;
            text-transform: capitalize;
            margin: 0;
          }
          p {
            color: $color-gradient-1;
            margin: 0;
          }
        }
        img {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          object-fit: cover;
          border: 4px solid $color-gradient-2;
        }
      }
      &--invert {
        .post__top__infos {
          &__user {
            h3 {
              color: $color-gradient-1;
            }
            p {
              color: $color-gradient-2;
            }
          }
          img {
            border-color: $color-gradient-1;
          }
        }
      }
    }
    &__responses {
      margin-top: 25px;
      width: calc(100% - 105px);
      margin-left: 105px;
      border-top: 2px solid $color-gradient-2;
      border-bottom: 2px solid $color-gradient-2;
      padding-bottom: 20px;
    }
    &__content {
      z-index: 0;
      margin-top: -38px;
      line-break: anywhere;
      padding: 20px;
      margin-left: 105px;
      width: calc(100% - 145px);
      background-color: $color-bg-line-2;
      position: relative;
      min-height: 60px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.438);
      &::before {
        content: "";
        position: absolute;
        width: 0; 
        height: 0; 
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent; 
        
        border-right: 15px solid $color-bg-line-2;

        top: 20px;
        left: -15px;
      }
      a {
        color: $color-gradient-2;
      }
      p {
        margin: 0;
      }
      img {
        max-width: 320px !important;
      }
      iframe {
        max-width: 320px !important;
      }
    }
    &__bottom {
      margin-left: 105px;
      width: calc(100% - 105px);
      @include flex(row, center, space-between);
      margin-top: 10px;
      img {
        cursor: pointer;
        width: 40px;
        height: 40px;
        object-fit: contain
      }
      &__left {
        @include flex(row, center, flex-start);
      }
      &__right {
        @include flex(row, center, flex-end);
        img {
          margin-left: 5px;
          &:first-of-type {
            width: 44px;
            height: 44px;
          }
        }
      }
      &__like {
        cursor: pointer;
        @include flex(column, center, center);
        position: relative;
        p {
          font-size: 20px;
          margin: 0px;
          position: absolute;
          top: 10px;
          left: 27px;
          color: $color-gradient-2;
          user-select: none;
        }
        .is-pink {
          color: $color-gradient-1 !important;
        }
        img {
          &:first-of-type {
            margin-left: 10px;
            width: 45px;
            height: 45px;
          }
        }
      }
      &__answers {
        cursor: pointer;
        @include flex(column, center, center);
        position: relative;
        p {
          font-size: 20px;
          margin: 0px;
          top: 8.5px;
          left: 27.5px;
          position: absolute;
          color: $color-gradient-2;
          user-select: none;
        }
        img {
          margin-left: 10px;
          width: 45px;
          height: 45px;
        }
      }
    }
    textarea {
      resize: none;
      margin-left: 105px;
      height: 60px;
      width: calc(100% - 145px);
      margin-top: 20px;
      background-color: transparent;
      color: $color-gradient-1;
      border: solid 3px;
      padding: 10px 20px;
      border-radius: 20px;
      font-family: $police-1;
      outline: none;
      font-size: 16px;
      &::placeholder {
        color: $color-gradient-1-placeholder;
        font-family: $police-1;
      }
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-gradient-2;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-gradient-1;
      }
    }
    &__warning-message-response {
      color: $color-gradient-1;
      margin: 0;
      margin-left: 105px;
      margin-top: 20px;
    }
  }

  @include breakpoint(800) {
    .post {
      &__top {
        @include flex(column, revert, flex-start);
        &__right {
          margin-bottom: 5px;
          margin-top: 0px;
          margin-right: 10px;
        }
        &__category {
          font-size: 14px !important;
          margin-left: 5px !important;
        }
      }
      &__content {
        margin-top: 0px;
        padding: 20px;
        margin-left: 0px;
        width: calc(100% - 40px);
        &::before {
          content: "";
          border-right: 10px solid transparent;
          border-left: 10px solid transparent; 
          
          border-bottom: 15px solid $color-bg-line-2;

          top: -24px;
          left: 35px;
        }
      }
      &__bottom {
        width: calc(100% - 10px);
        margin-left: 0;
      }
      &__responses {
        margin-top: 20px;
        width: 100%;
        margin-left: 0px;
      }
      textarea {
        margin-left: 0px;
        width: calc(100% - 40px);
      }
      &__warning-message-response {
        margin-left: 0px;
      }
    }
  }

  @include breakpoint(450) {
    .post {
      &__content {
        img {
          max-width: 100% !important;
        }
        iframe {
          max-width: 100% !important;
        }
      }
      &__bottom {
        img {
          width: 26px;
          height: 26px;
        }
        &__right {
          img {
            margin-left: 5px;
            &:first-of-type {
              width: 30px;
              height: 30px;
            }
          }
        }
        &__like {
          p {
            top: 6.5px;
            left: 17px;
            font-size: 16px;
          }
          img {
            &:first-of-type {
              margin-left: 5px;
              width: 33px;
              height: 33px;
            }
          }
        }
        &__answers {
          p {
            font-size: 16px;
            top: 7px;
            left: 23px;
          }
          img {
            width: 35px;
            height: 35px;
          }
        }
      }
      textarea {
        margin-left: 0px;
        width: calc(100% - 45px);
      }
    }
  }

    @include breakpoint(360) {
    .post {
      &__bottom {
        @include flex(column-reverse, flex-start, center);
        &__right {
          margin-bottom: 10px;
          img {
            width: 32px;
            height: 32px;
            margin-left: 5px;
            &:first-of-type {
              width: 36px;
              height: 36px;
            }
          }
        }
        &__like {
          p {
            top: 10px;
            left: 19px;
          }
          img {
            &:first-of-type {
              width: 37px;
              height: 37px;
            }
          }
        }
      }
    }
  }
</style>