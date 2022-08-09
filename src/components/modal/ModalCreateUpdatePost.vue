<template>
  <Modal class="modal__create">
    <h3 v-if="!oldPost">
      Créer un post
    </h3>
    <h3 v-else>
      Modifier un post
    </h3>
    <p class="modal__advice">
      <span>Conseil :</span> Un post doit contenir seulement une catégorie et un sujet !
      <br>Exemple : une propostion de logement classée dans la catégorie logement.
      <br>Essayez de rester organisé !
    </p>
    <form>
      <select
        v-model="categoryId"
        name="categories"
        class="modal__categories"
        @change="getCategoryId"
      >
        <option
          hidden
          disabled
          selected
          value="null"
        >
          Choisissez une categorie
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <RichTextEditor
        :old-post="oldPost"
        @get-content="getContent"
      />
      <ErrorMessage
        :errors="errors"
      />
      <Button
        class="modal__button"
        :text="textButton"
        :on-click="submit"
        :large="true"
      />
    </form>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import Button from "@/components/elmts/Button";
import RichTextEditor from "@/components/elmts/RichTextEditor";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import { mapGetters, mapActions, mapState } from 'vuex';
import PostsService from "@/services/PostsService";

export default {
  name: "ModalCreateUpdatePost",
  components: {
    Modal,
    Button,
    ErrorMessage,
    RichTextEditor
  },
  props: {
    categories: { type: Array, default: null },
    oldPost: { type: Object, default: null }
  },
  data() {
    return {
      errors: [],
      content: "",
      categoryId: null
    };
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'groupId'
    ]),
    ...mapState('posts', {
      offset: state => state.offset
    }),
    ...mapState('user', {
      user: state => state.user
    }),
    textButton() {
      if (this.oldPost) {
        return "Modifier le post";
      } else {
        return "Créer le post";
      }
    }
  },
  watch: {
    oldPost() {
      if (this.oldPost) {
        this.content = this.oldPost.content;
        this.categoryId = this.oldPost.categoryId;
      }
    }
  },
  mounted() {
    this.content = "";
    this.categoryId = null;
    if (this.oldPost) {
      this.content = this.oldPost.content;
      this.categoryId = this.oldPost.categoryId;
    }
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('posts', [
      'addPost',
      'updatePost'
    ]),
    getCategoryId(event) {
      this.categoryId = event.target.value;
    },
    getContent(payload) {
      this.errors = [];
      if (
        payload.includes("script") ||
        payload.includes("<script>") ||
        payload.includes("<\/script>")
      ) {
        this.content = "";
      } else {
        this.content = payload;
      }
    },
    afterCreatePost(response) {
      const category = this.categories.filter(category => this.categoryId == category.id)[0].name;
      let date = new Date();
      date = `${date.getHours()}:${date.getMinutes()} ${date.toLocaleDateString()}`;
      this.addPost({
        content: this.content,
        date_post: date,
        firstname: this.user.firstname,
        id: response.id,
        imageUrl: this.user.imageUrl,
        lastname: this.user.lastname,
        name_category: category,
        categoryId: this.categoryId,
        phrase_description: this.user.phraseDescription,
        userId: this.userId
      });
      this.content = "";
      this.categoryId = null;
      window.scrollTo(0, 0);
      this.updateOpen({ open: false });
    },
    afterUpdatePost() {
      const category = this.categories.filter(category => this.categoryId == category.id)[0].name;
      this.updatePost({
        id: this.oldPost.id,
        content: this.content,
        name_category: category,
        categoryId: this.categoryId
      });
      this.content = "";
      this.categoryId = null;
      window.scrollTo(0, 0);
      this.updateOpen({ open: false });
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];
      if (this.content !== "" && this.categoryId) {
        if (this.oldPost) {
          PostsService.updatePost(this.content, this.userId, this.categoryId, this.oldPost.id)
          .then(() => {
            this.afterUpdatePost();
          })
          .catch((err) => {
            this.errors.push(err.response.data.message);
          });
        } else {
          PostsService.createPost(this.content, this.userId, this.categoryId, this.groupId)
          .then((response) => {
            this.afterCreatePost(response);
          })
          .catch((err) => {
            this.errors.push(err.response.data.message);
          });
        }
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
    &__categories {
      background-color: $color-bg-line-1;
      outline: none;
      font-family: $police-1;
      color: $color-gradient-2;
      border: 2px solid;
      padding: 8px;
      border-radius: 15px;
      margin-bottom: 25px;
      cursor: pointer;
    }
    &__advice {
      font-size: 13px;
      color: $color-gradient-1;
      span {
        text-decoration: underline;
        font-weight: bold;
      }
    }
  }
  form {
    @include flex(column, center, center);
    margin-top: 30px;
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
</style>