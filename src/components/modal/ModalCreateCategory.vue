<template>
  <Modal class="modal__create">
    <h3>Créer une catégorie</h3>
    <form>
      <input
        v-model="nameCategory"
        type="text"
        placeholder="nom de la catégorie"
      >
      <ErrorMessage
        :errors="errors"
      />
      <Button
        class="modal__button"
        :text="'Créer la catégorie'"
        :on-click="submit"
        :large="true"
      />
    </form>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import Button from "@/components/elmts/Button";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import { mapGetters, mapActions, mapState } from 'vuex';
import CategoriesService from "@/services/CategoriesService";

export default {
  name: "ModalCreateCategory",
  components: {
    Modal,
    Button,
    ErrorMessage
  },
  props: {
    type: { type: String, default: null }
  },
  data() {
    return {
      errors: [],
      nameCategory: ""
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId',
      'userId'
    ])
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('categories', [
      'updateCategoriesPost',
      'updateCategoriesContact'
    ]),
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if (this.nameCategory !== "") {
        CategoriesService.createCategory(this.nameCategory, this.type, this.groupId, this.userId).then(() => {
          if (this.type === "post") {
            CategoriesService.getCategoriesPosts(this.groupId).then(response => {
              this.updateCategoriesPost(response);
              this.nameCategory = "";
            });
          } else if (this.type === "contact") {
            CategoriesService.getCategoriesContact(this.groupId).then(response => {
              this.updateCategoriesContact(response);
              this.nameCategory = "";

            });
          }
          this.updateOpen({ open: false });
        }).catch((err) => {
          this.errors.push(err.response.data.message);
        });
      } else {
        this.errors.push("Tous les champs doivent être complétés");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .modal {
    &__create {
      h3 {
        border-bottom: 2px solid;
        padding-bottom: 10px;
        font-weight: bold;
      }
    }
    &__button {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
  form {
    @include flex(column, center, center);
    margin-top: 30px;
  }
  input {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 10px 20px;
    border-radius: 60px;
    margin: 5px 10px;
    font-family: $police-1;
    outline: none;
    font-size: 18px;
    width: 300px;
    &::placeholder {
      color: $color-gradient-1-placeholder;
      font-family: $police-1;
    }
  }

  @include breakpoint(1279) {
    .modal {
      &__create {
        h3 {
          text-align: center;
        }
      }
      &__button {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
    form {
      margin-top: 20px;
    }
  }

  @include breakpoint(500) {
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>