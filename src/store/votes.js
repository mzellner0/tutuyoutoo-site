import VotesService from "../services/VotesService";

export default {
  namespaced: true,

  state: {
    isLoading: true
  },
  mutations: {
    UPDATE_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async addVotePhotoAlbum({ commit }, vote) {
      await VotesService.addVotePhotoAlbum(vote);
      commit('UPDATE_IS_LOADING', false);
    },
  }
};