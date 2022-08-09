<template>
  <LoaderCircle v-if="postsAreLoading" />
  <div
    v-else-if="user.groupActif"
    class="posts container"
  >
    <div class="posts__actions">
      <div class="posts__action">
        <img
          v-if="isOnDesktop"
          src="@/assets/images/blue-plus.svg"
          alt="plus"
          @click="openModal('post')"
        >
        <img
          v-else
          src="@/assets/images/white-plus.svg"
          alt="plus"
          @click="openModal('post')"
        >
        <p
          v-if="isOnDesktop"
          @click="openModal('post')"
        >
          Créer un post
        </p>
      </div>
    </div>
    <Categories
      class="posts__categories"
      :categories="categoriesPost"
      :active-category="categoryActivePost"
      :type="'post'"
      @get-active-category="getActiveCategory"
    />
    <SortPosts class="posts__sort" />
    <PostsList @get-posts-list-updated="getPostsListUpdated" />
    <ModalCreateUpdatePost
      v-if="modal.type === 'post'"
      :categories="categoriesPost"
    />
  </div>
  <p
    v-else
    class="warning-no-group"
  >
    Vous devez séléctionner un groupe pour accéder à cette section
  </p>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ModalCreateUpdatePost from "@/components/modal/ModalCreateUpdatePost";
import PostsList from "@/components/posts/PostsList";
import SortPosts from "@/components/posts/SortPosts";
import Categories from "@/components/elmts/Categories";
import LoaderCircle from "@/components/elmts/LoaderCircle";
import CategoriesService from "@/services/CategoriesService";
import PostsService from "@/services/PostsService";
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: "PostsView",
  components: {
    ModalCreateUpdatePost,
    Categories,
    PostsList,
    LoaderCircle,
    SortPosts
  },
  mixins: [responsiveMixin],
  data() {
    return {
      postsAreLoading: true
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('categories', {
      categoriesPost: state => state.categoriesPost,
      categoryActivePost: state => state.categoryActivePost
    }),
    ...mapState('posts', {
      posts: state => state.posts,
      offset: state => state.offset,
      isStillPosts: state => state.isStillPosts,
      sortSelected: state => state.sortSelected
    }),
    ...mapGetters('user', [
      'groupId',
      'userId'
    ])
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    CategoriesService.getCategoriesPosts(this.groupId).then(response => {
      this.updateCategoriesPost(response);
    })
    .catch(() => {
      this.updateCategoriesPost([]);
    });
    PostsService.getPosts(this.groupId, this.offset).then(response => {
      this.updatePosts(response);
      this.postsAreLoading = false;
    })
    .catch(() => {
      this.updatePosts([]);
      this.postsAreLoading = false;
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    this.updateOffset(0);
    this.updateIsStillPosts(true);
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('categories', [
      'updateCategoriesPost',
      'updateCategoryPost'
    ]),
    ...mapActions('posts', [
      'updatePosts',
      'addPosts',
      'updateOffset',
      'updateIsStillPosts'
    ]),
    onScroll() {
      if (
        document.body.offsetHeight - 200 <=
        window.innerHeight + window.scrollY
      ) {
        this.updatePostWithScroll();
      }
    },
    updatePostWithScroll() {
      if (this.isStillPosts) {
        this.updateOffset(this.offset + 5);
        switch(this.sortSelected) {
          case "my-votes":
            PostsService.getPostsOrderByVotesFromUser(this.groupId, this.userId, this.offset).then(response => {
              this.addPosts(response);
            })
            .catch(() => {
              this.updateIsStillPosts(false);
            });
            break;
          case "votes":
            PostsService.getPostsOrderByVotes(this.groupId, this.offset).then(response => {
              this.addPosts(response);
            })
            .catch(() => {
              this.updateIsStillPosts(false);
            });
            break;
          case "new":
          default :
            PostsService.getPosts(this.groupId, this.offset).then(response => {
              this.addPosts(response);
              })
              .catch(() => {
                this.updateIsStillPosts(false);
              });
            break;
        }
      }
    },
    openModal(type) {
      this.updateOpen({ open: true, type: type });
    },
    getPostsListUpdated() {
      if (
        document.body.offsetHeight <=
        window.innerHeight
      ) {
        this.updatePostWithScroll();
      }
    },
    getActiveCategory(payload) {
      this.updateCategoryPost(payload);
    }
  },
};
</script>

<style lang="scss" scoped>
  .posts {
    width: 800px;
    margin: 120px auto;
    &__actions {
      width: 100%;
    }
    &__action {
      cursor: pointer;
      color: $color-gradient-2;
      @include flex(row, center, flex-start);
      img {
        margin-right: 5px;
      }
      p {
        margin: 8px 0px;
      }
    }
    &__categories {
      margin-top: 20px;
    }
    &__sort {
      margin-top: 10px;
    }
  }
  @include breakpoint(1279) {
    .posts {
      margin: 160px auto;
      margin-bottom: 70px;
      width: 90%;
      &__action {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background: $color-bg-line-1;
        border: 4px solid $color-police-main;
        box-shadow: 0px 0px 10px rgba(24, 22, 27, 0.205);
        @include flex(row, center, center);
        width: 50px;
        height: 50px;
        border-radius: 100%;
        z-index: 3;
        img {
          margin: 0;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
</style>