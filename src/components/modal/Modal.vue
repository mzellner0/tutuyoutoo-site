<template>
  <div v-if="modal.open">
    <img
      class="cross"
      src="@/assets/images/cross.svg"
      alt="fermer la fenêtre"
      @click="updateOpen({ open: false })"
    >
    <div class="modal">
      <div class="modal__window">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "Modal",
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    })
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
  }
};
</script>

<style lang="scss" scoped>
  .cross {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 11;
    height: 80px;
    width: 80px;
    transition: 200ms;
    cursor: pointer;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
  .modal {
    margin: 0;
    z-index: 10;
    position: fixed;
    background-image: $gradient-bg-modal;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    &__window {
      overflow: auto;
      padding: 20px 30px;
      width: 600px;
      max-height: 60vh;
      margin: auto;
      margin-top: 20vh;
      background-color: $color-bg-line-1;
      border-radius: 25px;
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: $color-bg;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-gradient-1;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-gradient-2;
      }
    }
  }
  @include breakpoint(1279) {
    .cross {
      top: 15px;
      right: 15px;
      height: 60px;
      width: 60px;
    }
    .modal {
      &__window {
        padding: 20px 30px;
        width: calc(90% - 60px);
        margin-left: 5%;
        max-height: 70vh;
        margin-top: 15vh;
        border-radius: 20px;
      }
    }
  }

  @include breakpoint(800) {
    .modal {
      &__window {
        padding: 20px 15px;
        width: calc(90% - 30px);
      }
    }
  }
</style>