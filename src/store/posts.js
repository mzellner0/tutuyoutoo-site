export default {
  namespaced: true,

  state: {
    posts: [],
    sortSelected: "new",
    offset: 0,
    isStillPosts: true
  },
  mutations: {
    UPDATE_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    UPDATE_POST(state, postToUpdate) {
      state.posts = state.posts.map(post => {
        if(postToUpdate.id === post.id) {
          return {
            ...post,
            content: postToUpdate.content,
            name_category: postToUpdate.name_category,
            categoryId: postToUpdate.categoryId
          };
        } else {
          return post;
        }
      });
    },
    ADD_POSTS(state, posts) {
      posts.map(post => {
        state.posts.push(post);
      });
    },
    DELETE_POST(state, postToDelete) {
      state.posts = state.posts.filter(post => post.id !== postToDelete.id);
    },
    UPDATE_SORT_SELECTED(state, sortSelected) {
      state.sortSelected = sortSelected;
    },
    UPDATE_OFFSET(state, offset) {
      state.offset = offset;
    },
    UPDATE_ISSTILLPOSTS(state, isStillPosts) {
      state.isStillPosts = isStillPosts;
    }
  },
  actions: {
    updatePosts({ commit }, posts) {
      commit('UPDATE_POSTS', posts);
    },
    addPost({ commit }, post) {
      commit('ADD_POST', post);
    },
    updatePost({ commit }, postToUpdate) {
      commit('UPDATE_POST', postToUpdate);
    },
    addPosts({ commit }, posts) {
      commit('ADD_POSTS', posts);
    },
    deletePost({ commit }, postToDelete) {
      commit('DELETE_POST', postToDelete);
    },
    updateSortSelected({ commit }, sortSelected) {
      commit('UPDATE_SORT_SELECTED', sortSelected);
    },
    updateOffset({ commit }, offset) {
      commit('UPDATE_OFFSET', offset);
    },
    updateIsStillPosts({ commit }, isStillPosts) {
      commit('UPDATE_ISSTILLPOSTS', isStillPosts);
    }
  }
};