import AuthService from "@/services/AuthService";

export default {
  namespaced: true,

  state: {
    token: null,
    refreshToken: null,
    // 6000 * 12
    dateExpire: 720000
  },
  getters: {
    token: state => {
      if (state.token) {
        return state.token;
      } else if (localStorage.getItem('jwt')) {
        return localStorage.getItem('jwt');
      } else {
        return null;
      }
    },    
    refreshToken: state => {
      if (state.refreshToken) {
        return state.refreshToken;
      } else if (localStorage.getItem('jwtRefresh')) {
        return localStorage.getItem('jwtRefresh');
      } else {
        return null;
      }
    }
  },
  mutations: {
    UPDATE_TOKEN(state, token) {
      state.token = token;
    },
    UPDATE_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
    }
  },
  actions: {
    updateTokenWithRefreshToken({ commit, getters, dispatch }) {
      return new Promise((resolve, reject) => {
        if (getters.refreshToken) {
          AuthService.getNewToken(getters.refreshToken)
          .then((newToken) => {
            dispatch('updateToken', newToken.token);
            resolve();
          });
        }
      });
    },
    updateToken({ commit, state }, token) {
      localStorage.setItem('jwt', token);
      commit('UPDATE_TOKEN', token);
    },
    updateRefreshToken({ commit }, refreshToken) {
      localStorage.setItem('jwtRefresh', refreshToken);
      commit('UPDATE_REFRESH_TOKEN', refreshToken);
    }
  }
};