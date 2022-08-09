export default {
  namespaced: true,

  state: {
    contacts: []
  },
  mutations: {
    UPDATE_CONTACTS(state, contacts) {
      state.contacts = contacts;
    }
  },
  actions: {
    updateContacts({ commit }, contacts) {
      commit('UPDATE_CONTACTS', contacts);
    }
  }
};