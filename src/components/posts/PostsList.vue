<template>
  <div class="posts-list">
    <div v-if="getPostsWithCategoryActive.length > 0">
      <Post
        v-for="(post, index) in getPostsWithCategoryActive"
        :key="post.id"
        :post="post"
        :index="index"
        class="posts-list__post"
      />
    </div>
    <p v-else-if="posts.length > 0">
      Aucun post sur ce groupe avec cette catégorie !
    </p>
    <p v-else>
      {{ sentenceListEmpty }}
    </p>
  </div>
</template>

<script>
import Post from "@/components/posts/Post";
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: "PostsList",
  components: {
    Post
  },
  emits: ["get-posts-list-updated"],
  computed: {
    ...mapState('posts', {
      posts: state => state.posts,
      sortSelected: state => state.sortSelected
    }),
    ...mapState('categories', {
      categoryActivePost: state => state.categoryActivePost
    }),
    getPostsWithCategoryActive() {
      if (this.categoryActivePost.name === "Tout") {
        return this.posts;
      } else {
        return this.posts.filter(post => post.name_category === this.categoryActivePost.name);
      }
    },
    sentenceListEmpty() {
      switch(this.sortSelected) {
        case "my-votes":
          return "Vous n'avez voté pour aucun post !";
        case "new":
        case "votes":
        default :
          return "Aucun post sur ce groupe !";
      }
    }
  },
  updated() {
    this.$emit("get-posts-list-updated");
  }
};
</script>

<style lang="scss" scoped>
  .posts-list {
    width: 100%;
    &__post {
      margin: 60px 0px;
    }
  }
</style>