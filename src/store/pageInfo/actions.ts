import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PageInfoInterface } from './state';
import Page from '../../service/Page';

const actions: ActionTree<PageInfoInterface, StateInterface> = {
  async collect({ commit }) {
    const { products, shifts } = await Page.info().then((res) => res.content);

    const newShifts = shifts
      .sort((a, b) => a.id - b.id)
      .map((item) => ({
        label: item.name,
        value: { from: item.from, to: item.to },
        slot: item.id.toString(),
      }));
    commit('setPageOptions', { products, shifts: newShifts });
  },
  submit({ commit }, payload: PageInfoInterface) {
    // your code

    this.dispatch('productsModule/searchData', payload);
    commit('storedPageInfo', payload);
  },
};

export default actions;
