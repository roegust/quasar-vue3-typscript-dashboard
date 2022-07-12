import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PageInfoInterface } from './state';

const actions: ActionTree<PageInfoInterface, StateInterface> = {
  submit({ commit }, payload: PageInfoInterface) {
    // your code

    this.dispatch('productsModule/searchData', payload);
    commit('storedPageInfo', payload);
  },
};

export default actions;
