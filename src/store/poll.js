import PollService from "@/services/PollService";

export default {
  namespaced: true,

  state: {
    listAnswers: []
  },
  mutations: {
    UPDATE_LIST_ANSWERS(state, listAnswers) {
      state.listAnswers = listAnswers;
    }
  },
  actions: {
    updateListAnswers({ commit }) {
      PollService.getPollList(1).then((response) => {
        commit('UPDATE_LIST_ANSWERS', response);
      });
    },
  }
};