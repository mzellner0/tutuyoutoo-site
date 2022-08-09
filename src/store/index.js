import { createStore } from 'vuex';
import user from './user';
import loader from './loader';
import groups from './groups';
import modal from './modal';
import categories from './categories';
import posts from './posts';
import expenses from './expenses';
import contacts from './contacts';
import tokens from './tokens';
import poll from './poll';
import collectEmails from './collectEmails';
import ambassadorVote from './ambassadorVote';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    loader,
    groups,
    modal,
    categories,
    posts,
    expenses,
    contacts,
    tokens,
    poll,
    collectEmails,
    ambassadorVote
  },
});
