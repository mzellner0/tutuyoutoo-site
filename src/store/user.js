export default {
  namespaced: true,

  state: {
    user: {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      phraseDescription: null,
      birthday: null,
      imageUrl: null,
      groupActif: null
    }
  },
  getters: {
    userId: state => {
      if (state.user.id) {
        return state.user.id;
      } else if (localStorage.getItem('userId')) {
        return localStorage.getItem('userId');
      } else {
        return null;
      }
    },    
    groupId: state => {
      if (state.user.groupActif) {
        return state.user.groupActif;
      } else if (localStorage.getItem('groupId')) {
        return localStorage.getItem('groupId');
      } else {
        return null;
      }
    }
  },
  mutations: {
    UPDATE_USER(state, user) {
      const { id, firstname, lastname, email, phraseDescription, birthday, imageUrl, groupActif } = user;
      state.user.id = id;
      state.user.firstname = firstname;
      state.user.lastname = lastname;
      state.user.email = email;
      state.user.phraseDescription = phraseDescription;
      state.user.birthday = birthday;
      state.user.imageUrl = imageUrl;
      state.user.groupActif = groupActif;
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user);
    }
  }
};