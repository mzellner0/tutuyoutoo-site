export default {
  namespaced: true,

  state: {
    loading: false,
    loadingCircleUser: true,
    percentage: 0
  },
  mutations: {
    UPDATE_LOADING(state, loading) {
      state.loading = loading;
    },
    UPDATE_LOADING_CIRCLE_USER(state, loadingCircleUser) {
      state.loadingCircleUser = loadingCircleUser;
    },
    UPDATE_PERCENTAGE(state, percentage) {
      state.percentage = percentage;
    }
  },
  actions: {
    updateLoading({ commit }, loading) {
      commit('UPDATE_LOADING', loading);
    },
    updateLoadingCircleUser({ commit }, loadingCircleUser) {
      commit('UPDATE_LOADING_CIRCLE_USER', loadingCircleUser);
    },
    updatePercentage({ commit }, percentage) {
      commit('UPDATE_PERCENTAGE', percentage);
    }
  }
};