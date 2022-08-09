export default {
  namespaced: true,

  state: {
    categoriesContact: [],
    categoriesPost: [],
    categoryActivePost: { index: -1, name: "Tout" },
    categoryActiveContact: { index: -1, name: "Tout" }
  },
  mutations: {
    UPDATE_CATEGORIES_POST(state, categoriesPost) {
      state.categoriesPost = categoriesPost;
    },
    UPDATE_CATEGORIES_CONTACT(state, categoriesContact) {
      state.categoriesContact = categoriesContact;
    },
    UPDATE_CATEGORY_POST(state, categoryActivePost) {
      state.categoryActivePost = categoryActivePost;
    },
    UPDATE_CATEGORY_CONTACT(state, categoryActiveContact) {
      state.categoryActiveContact = categoryActiveContact;
    }
  },
  actions: {
    updateCategoriesPost({ commit }, categoriesPost) {
      commit('UPDATE_CATEGORIES_POST', categoriesPost);
    },
    updateCategoriesContact({ commit }, categoriesContact) {
      commit('UPDATE_CATEGORIES_CONTACT', categoriesContact);
    },
    updateCategoryPost({ commit }, categoryActivePost) {
      commit('UPDATE_CATEGORY_POST', categoryActivePost);
    },
    updateCategoryContact({ commit }, categoryActiveContact) {
      commit('UPDATE_CATEGORY_CONTACT', categoryActiveContact);
    }
  }
};