import AmbassadorVoteService from "@/services/AmbassadorVoteService";

export default {
  namespaced: true,

  state: {
    listAmbassadorVotesWithEmail: [],
    listAmbassadorVotes: []
  },
  mutations: {
    UPDATE_LIST_AMBASSADOR_VOTES_WITH_EMAIL(state, listAmbassadorVotesWithEmail) {
      state.listAmbassadorVotesWithEmail = listAmbassadorVotesWithEmail;
    },
    UPDATE_LIST_AMBASSADOR_VOTES(state, listAmbassadorVotes) {
      state.listAmbassadorVotes = listAmbassadorVotes;
    }
  },
  actions: {
    updateListAmbassadorVotesWithEmail({ commit }) {
      AmbassadorVoteService.getAmbassadorVotesWithEmail(1).then((response) => {
        console.log(response);
        commit('UPDATE_LIST_AMBASSADOR_VOTES_WITH_EMAIL', response);
      });
    },
    updateListAmbassadorVotes({ commit }) {
      return new Promise((resolve, reject) => {
        AmbassadorVoteService.getAmbassadorVotes().then((response) => {
          commit('UPDATE_LIST_AMBASSADOR_VOTES', response);
          resolve();
        });
      });
    }
  }
};