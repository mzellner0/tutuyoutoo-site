<template>
  <Modal class="modal__create">
    <p>{{ warning }}</p>
    <div class="modal__buttons">
      <Button
        class="modal__button"
        :text="'Continuer'"
        :on-click="done"
      />
      <Button
        class="modal__button"
        :text="'Annuler'"
        :on-click="cancel"
      />
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import Button from "@/components/elmts/Button";
import { mapActions } from 'vuex';

export default {
  name: "GroupsView",
  components: {
    Modal,
    Button
  },
  props: {
    warning: { type: String, default: "" }
  },
  emits: ["continue"],
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    cancel() {
      this.updateOpen({ open: false });
    },
    done() {
      this.$emit("continue", true);
    }
  }
};
</script>

<style lang="scss" scoped>
  .modal {
    p {
      text-align: center;
      color: $color-gradient-1;
    }
    &__buttons {
      @include flex(row, center, center);
      margin-top: 30px;
      margin-bottom: 20px;
    }
    &__button {
      margin: 0px 20px;
    }
  }

  @include breakpoint(800) {
    .modal {
      &__buttons {
        @include flex(column, center, center);
        margin-top: 0px;
        margin-bottom: 0px;
      }
      &__button {
        margin: 10px 0px;
      }
    }
  }
</style>