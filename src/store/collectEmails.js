import CollectEmailsService from "@/services/CollectEmailsService";

export default {
  namespaced: true,

  state: {
    listEmails: []
  },
  mutations: {
    UPDATE_LIST_EMAILS(state, listEmails) {
      state.listEmails = listEmails;
    }
  },
  actions: {
    updateListEmails({ commit }) {
        CollectEmailsService.getEmailsList(1).then((response) => {
        commit('UPDATE_LIST_EMAILS', response);
      });
    },
  }
};