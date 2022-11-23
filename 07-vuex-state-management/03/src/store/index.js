import { createStore } from 'vuex';
import axios from 'axios';

import filterProducts from '../products/filter-products';

const store = createStore({
  state() {
    return {
      user: null,
      products: null,
    };
  },
  getters: {
    getFilteredProducts(state) {
      return (filter) => filterProducts(filter, state.products);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      axios.get('/api/products')
        .then((result) => commit('setProducts', result.data));
    },
    registerUser({ commit }, user) {
      return axios.post('/api/register', user)
        .then((result) => commit('setUser', result.data));
    },
    signIn({ commit }, userLogin) {
      return axios.post('/api/sign-in', userLogin)
        .then((result) => commit('setUser', result.data));
    },
  },
});

export default store;
