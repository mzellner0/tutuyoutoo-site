import VotesService from "../services/VotesService";

export default {
  namespaced: true,

  state: {
    isLoading: true,
    hasAlreadyVote: false
  },
  mutations: {
    UPDATE_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    UPDATE_HAS_ALREADY_VOTE(state, hasAlreadyVote) {
      state.hasAlreadyVote = hasAlreadyVote;
    }
  },
  actions: {
    async addVotePhotoAlbum({ commit }, vote) {
      VotesService.addVotePhotoAlbum(vote)
        .then(() => {
          commit('UPDATE_IS_LOADING', false);
        })
        .catch((err) => {
          if (err.response.data.message === "Tu as déjà voté !") {
            commit('UPDATE_HAS_ALREADY_VOTE', true);
          }
          commit('UPDATE_IS_LOADING', false);
        });
    },
  }
};