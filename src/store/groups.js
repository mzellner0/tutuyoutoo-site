export default {
  namespaced: true,

  state: {
    groups: [],
    usersInGroup: []
  },
  mutations: {
    UPDATE_GROUPS(state, groups) {
      state.groups = groups;
    },
    UPDATE_USERS_IN_GROUP(state, usersInGroup) {
      state.usersInGroup = usersInGroup;
    }
  },
  actions: {
    updateGroups({ commit }, groups) {
      commit('UPDATE_GROUPS', groups);
    },
    updateUsersInGroup({ commit }, usersInGroup) {
      commit('UPDATE_USERS_IN_GROUP', usersInGroup);
    }
  }
};