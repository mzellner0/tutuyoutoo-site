export default {
  namespaced: true,

  state: {
    expenses: [],
    balancedList: [],
    refundList: []
  },
  mutations: {
    UPDATE_EXPENSES(state, expenses) {
      state.expenses = expenses;
    },
    UPDATE_BALANCEDLIST(state, balancedList) {
      state.balancedList = balancedList;
    },
    UPDATE_REFUNDLIST(state, refundList) {
      state.refundList = refundList;
    }
  },
  actions: {
    updateExpenses({ commit, state }, expenses) {
      commit('UPDATE_EXPENSES', expenses);
    },
    updateBalancedList({ commit }, balancedList) {
      balancedList.sort((a, b) => {
        const firstA = a.firstname.toUpperCase();
        const firstB = b.firstname.toUpperCase();
        const lastA = a.lastname.toUpperCase();
        const lastB = b.lastname.toUpperCase();
        if (new Intl.Collator('fr').compare(firstA, firstB) === 0) {
          return new Intl.Collator('fr').compare(lastA, lastB);
        } else {
          return new Intl.Collator('fr').compare(firstA, firstB);
        }
      });
      commit('UPDATE_BALANCEDLIST', balancedList);
    },
    updateRefundList({ commit }, refundList) {
      commit('UPDATE_REFUNDLIST', refundList);
    }
  }
};