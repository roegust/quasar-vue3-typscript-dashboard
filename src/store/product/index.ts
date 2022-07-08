import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ProductsInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const productsModule: Module<ProductsInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default productsModule;
