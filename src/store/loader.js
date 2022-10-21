export default {
  namespaced: true,

  state: {
    loading: false,
    percentage: 0
  },
  mutations: {
    UPDATE_LOADING(state, loading) {
      state.loading = loading;
    },
    UPDATE_PERCENTAGE(state, percentage) {
      state.percentage = percentage;
    }
  },
  actions: {
    updateLoading({ commit }, loading) {
      commit('UPDATE_LOADING', loading);
    },
    updatePercentage({ commit }, percentage) {
      commit('UPDATE_PERCENTAGE', percentage);
    }
  }
};