import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PageInfoInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const pageInfoModule: Module<PageInfoInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default pageInfoModule;
