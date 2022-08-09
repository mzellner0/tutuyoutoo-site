export default {
  namespaced: true,

  state: {
    modal: {
      open: false,
      type: ""
    }
  },
  mutations: {
    UPDATE_OPEN(state, { open, type }) {
      state.modal.open = open;
      if (type) {
        state.modal.type = type;
      }
    }
  },
  actions: {
    updateOpen({ commit }, modal) {
      commit('UPDATE_OPEN', modal);
    }
  }
};