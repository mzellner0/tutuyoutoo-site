import StorageService from "../services/StorageService";

export default {
  namespaced: true,

  state: {
    sizeLeft: 0
  },
  mutations: {
    UPDATE_SIZE(state, sizeLeft) {
      state.sizeLeft = sizeLeft;
    }
  },
  actions: {
    async uploadFiles(
      { commit }, { files, thumbnails, groupId, userId }
    ) {
      const response = await StorageService.importImagePost(
        files,
        thumbnails,
        groupId,
        userId
      );
    },
    async getSizeLeft({ commit }, { userId }) {
      const response = await StorageService.getSize(
        userId
      );
      const sizeLeft = (1000000000 - response.size) * 0.000001 // byte to mo;
      commit('UPDATE_SIZE', sizeLeft);
    },
  }
};