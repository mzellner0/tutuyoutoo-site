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
      if (!localStorage.getItem('hasVote')) {
        const response = await VotesService.addVotePhotoAlbum(vote);
        if (response.status == 201) {
          localStorage.setItem('hasVote', 'true');
        }
        commit('UPDATE_IS_LOADING', false);
      } else {
        commit('UPDATE_HAS_ALREADY_VOTE', true);
        commit('UPDATE_IS_LOADING', false);
      }
    },
  }
};