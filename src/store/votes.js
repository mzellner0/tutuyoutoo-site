import VotesService from "../services/VotesService";

export default {
  namespaced: true,

  state: {
    isLoading: true,
    hasAlreadyVote: false,
    updateVoteGoodiesConfirm: false
  },
  mutations: {
    UPDATE_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    UPDATE_HAS_ALREADY_VOTE(state, hasAlreadyVote) {
      state.hasAlreadyVote = hasAlreadyVote;
    },
    UPDATE_VOTE_GOODIES_CONFIRM(state, updateVoteGoodiesConfirm) {
      state.updateVoteGoodiesConfirm = updateVoteGoodiesConfirm;
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
    async addVoteGoodies({ commit }, { vote, email }) {
      if (!localStorage.getItem('hasVoteGoodies')) {
        const response = await VotesService.addVoteGoodies(vote, email, null);
        if (response.status == 201) {
          localStorage.setItem('hasVoteGoodies', 'true');
        }
      } else if (
        vote != "oui" ||
        localStorage.getItem('hasGaveAccessories')
      ) {
        commit('UPDATE_HAS_ALREADY_VOTE', true);
      }
      commit('UPDATE_IS_LOADING', false);
    },
    async updateVoteGoodies({ commit }, { vote, email, accessories }) {
      commit('UPDATE_IS_LOADING', true);
      if (!localStorage.getItem('hasGaveAccessories')) {
        const response =
          await VotesService.addVoteGoodies(vote, email, accessories);
        if (response.status == 201) {
          localStorage.setItem('hasGaveAccessories', 'true');
          commit('UPDATE_VOTE_GOODIES_CONFIRM', true);
        }
      } else {
        commit('UPDATE_HAS_ALREADY_VOTE', true);
      }
      commit('UPDATE_IS_LOADING', false);
    },
  }
};