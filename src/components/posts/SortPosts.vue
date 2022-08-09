<template>
  <div class="sort-posts">
    <p>Trier par :</p>
    <div>
      <input
        id="new"
        v-model="sortValue"
        type="radio"
        value="new"
        name="sort"
        checked
        @change="getNewPosstList"
      >
      <label for="new">Nouveautés</label>
    </div>
    <div>
      <input
        id="votes"
        v-model="sortValue"
        type="radio"
        value="votes"
        name="sort"
        @change="getNewPosstList"
      >
      <label for="votes">Votes</label>
    </div>
    <div>
      <input
        id="my-votes"
        v-model="sortValue"
        type="radio"
        value="my-votes"
        name="sort"
        @change="getNewPosstList"
      >
      <label for="my-votes">Mes votes</label>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "SortPosts",
  data() {
    return {
      sortValue: ""
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId',
      'userId'
    ]),
    ...mapState('posts', {
      offset: state => state.offset,
      isStillPosts: state => state.isStillPosts
    })
  },
  methods: {
    ...mapActions('posts', [
      'updatePosts',
      'updateSortSelected',
      'updateOffset',
      'updateIsStillPosts'
    ]),
    getNewPosstList() {
      this.updateOffset(0);
      this.updateIsStillPosts(true);
      switch(this.sortValue) {
        case "my-votes":
          this.updateSortSelected("my-votes");
          PostsService.getPostsOrderByVotesFromUser(this.groupId, this.userId, this.offset).then(response => {
            this.updatePosts(response);
          })
          .catch(() => {
            this.updatePosts([]);
          });
          break;
        case "votes":
          this.updateSortSelected("votes");
          PostsService.getPostsOrderByVotes(this.groupId, this.offset).then(response => {
            this.updatePosts(response);
          })
          .catch(() => {
            this.updatePosts([]);
          });
          break;
        case "new":
        default :
          this.updateSortSelected("new");
          PostsService.getPosts(this.groupId, this.offset).then(response => {
            this.updatePosts(response);
          })
          .catch(() => {
            this.updatePosts([]);
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .sort-posts {
    @include flex(row, center, flex-start);
    width: 100%;
    text-transform: uppercase;
    p {
      margin: 0;
    }
    input {
      margin-left: 25px;
      cursor: pointer;
    }
    label {
      margin-left: 5px;
      cursor: pointer;
    }
  }
  @include breakpoint(800) {
    .sort-posts {
      @include flex(column, flex-start, flex-start);
      input {
        margin-left: 0px;
      }
      p {
        margin-bottom: 10px;
      }
    }
  }
</style>