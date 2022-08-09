<template>
  <Modal class="modal__delete">
    <h3>Supprimer des catégories</h3>
    <p>Attention si vous supprimez une catégorie les posts associés seront supprimés</p>
    <ul>
      <li
        v-for="(categorie, index) in categories"
        :key="index"
      >
        {{ categorie.name }}
        <img
          src="@/assets/images/white-trash.svg"
          alt="supprimer une catégorie"
          @click="tryToDelete(categorie.id)"
        >
      </li>
    </ul>
    <ErrorMessage
      :errors="errors"
    />
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import { mapGetters, mapActions, mapState } from 'vuex';
import CategoriesService from "@/services/CategoriesService";

export default {
  name: "ModalDeleteCategory",
  components: {
    Modal,
    ErrorMessage
  },
  props: {
    categories: { type: Array, default: null },
    type: { type: String, default: null },
    deletingCategory: { type: Number, default: null }
  },
  emits: ["get-deleting-category"],
  data() {
    return {
      errors: []
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapGetters('user', [
      'userId',
      'groupId'
    ])
  },
  mounted() {
    if (this.deletingCategory) {
      this.deleteCategory();
    }
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('categories', [
      'updateCategoriesPost',
      'updateCategoriesContact'
    ]),
    tryToDelete(id) {
      this.$emit("get-deleting-category", { id: id });
      this.updateOpen({ open: true, type: "warning-category" });
    },
    deleteCategory() {
      this.errors = [];

      CategoriesService.deleteCategories(this.userId, this.deletingCategory)
      .then(() => {
        if (this.type === "post") {
          CategoriesService.getCategoriesPosts(this.groupId).then(response => {
            this.updateCategoriesPost(response);
            this.$emit("get-deleting-category", null);
          });
        } else if (this.type === "contact") {
          CategoriesService.getCategoriesContact(this.groupId).then(response => {
            this.updateCategoriesContact(response);
            this.$emit("get-deleting-category", null);
          });
        }
      }).catch((err) => {
        this.errors.push(err.response.data.message);
        this.$emit("get-deleting-category", null);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .modal {
    &__delete {
      h3 {
        border-bottom: 2px solid;
        padding-bottom: 10px;
        font-weight: bold;
      }
      ul {
        list-style: none;
        padding: 8px 0px;
        width: 100%;
        margin: 0;
        margin-top: 10px;
      }
      li {
        background-color: $color-bg-line-2;
        @include flex(row, center, space-between);
        padding: 8px 20px;
        margin: 0;
        &:nth-of-type(2n) {
          background-color: $color-bg-line-3;
        }
        &:first-of-type {
          border-radius: 10px 10px 0px 0px;
        }
        &:last-of-type {
          border-radius: 0px 0px 10px 10px;
        }
        img {
          cursor: pointer;
          width: 25px;
          height: 25px;
          object-fit: contain;
        }
      }
      p {
        color: $color-gradient-1;
      }
    }
  }

  @include breakpoint(1279) {
    .modal {
      &__delete {
        h3 {
          text-align: center;
        }
      }
    }
  }
</style>