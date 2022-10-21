import { createStore } from 'vuex';
import votes from './votes';
import loader from './loader';
import storage from './storage';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    votes,
    storage,
    loader
  },
});
