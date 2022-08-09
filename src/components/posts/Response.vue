<template>
  <div :class="['response', { 'response--invert': index % 2 !== 0 }]">
    <div class="response__top">
      <div class="response__top__infos">
        <img
          :src="response.imageUrl"
          alt="image utilisateur"
        >
        <h3>{{ response.firstname }} {{ response.lastname }}</h3>
      </div>
      <div class="response__top__right">
        <p>{{ response.date_response }}</p>
        <img
          v-if="userId == response.user_id"
          src="@/assets/images/white-trash.svg"
          alt="supprimer la réponse"
          @click="deleteResponse"
        >
      </div>
    </div>
    <div class="response__content">
      {{ response.content }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostsService from "@/services/PostsService";

export default {
  name: "Response",
  props: {
    response: { type: Object, default: () => {} },
    index: { type: Number, default: null }
  },
  emits: ["get-new-responses"],
  computed: {
    ...mapGetters('user', [
      'userId'
    ])
  },
  methods: {
    deleteResponse() {
      PostsService.deleteResponse(this.userId, this.response.id)
      .then(() => {
        this.$emit("get-new-responses");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .response {
    width: 80%;
    margin-top: 20px;
    @include flex(column, flex-start, center);
    &__top {
      width: 100%;
      @include flex(row, center, space-between);
      p {
        font-size: 12px;
      }
      &__infos {
        @include flex(row, flex-start, flex-start);
        h3 {
          color: $color-gradient-1;
          text-transform: capitalize;
          font-size: 16px;
          margin-left: 10px;
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          object-fit: cover;
          border: 4px solid $color-gradient-1;
        }
      }
      &__right {
        margin-top: -35px;
        @include flex(row, baseline, flex-end);
        img {
          cursor: pointer;
          margin-left: 5px;
          width: 15px;
          height: 15px;
        }
      }
    }
    &__content {
      z-index: 0;
      margin-top: -40px;
      line-break: anywhere;
      padding: 20px;
      margin-left: 95px;
      width: calc(100% - 135px);
      background-color: $color-bg-line-2;
      position: relative;
      min-height: 40px;
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
    &--invert {
      margin-left: 20%;
      .response__top {
        @include flex(row-reverse, center, space-between);
      }
      .response__top__infos {
        @include flex(row-reverse, flex-start, flex-start);
        h3 {
          color: $color-gradient-2;
          margin-right: 10px;
        }
        img {
          border-color: $color-gradient-2;
        }
      }
      .response__top__right {
        @include flex(row-reverse, baseline, flex-end);
        img {
          margin-right: 5px;
        }
      }
      .response__content {
        margin-left: 0px;
        margin-right: 95px;
        &::before {
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent; 
          border-right: 0px solid $color-bg-line-2;
          border-left: 15px solid $color-bg-line-2;

          left: auto;
          right: -15px;
        }
      }
    }
  }

  @include breakpoint(800) {
    .response {
      width: 100%;
      &__top {
        p {
          margin-top: -20px;
          font-size: 10px;
        }
        &__infos {
          h3 {
            font-size: 15px;
            margin-left: 5px;
          }
          img {
            width: 50px;
            height: 50px;
            border-radius: 100%;
          }
        }
      }
      &__content {
        margin-top: -30px;
        padding: 15px;
        margin-left: 70px;
        width: calc(100% - 100px);
        &::before {
          top: 25px;
        }
      }
      &--invert {
        margin-left: 0;
        .response__top__infos {
          h3 {
            margin-right: 5px;
          }
        }
        .response__content {
          margin-left: 0px;
          margin-right: 70px;
        }
      }
    }
  }
</style>