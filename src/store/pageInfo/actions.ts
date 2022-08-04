import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PageInfoInterface } from './state';
import Page from '../../service/Page';

const actions: ActionTree<PageInfoInterface, StateInterface> = {
  async collectProductsOption({ commit }) {
    const products = await Page.productsOptions();

    const productsOption = products
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((item) => ({
        label: `${item.id}  -  ${item.name}`,
        value: item.id,
      }));

    commit('setProductsOptions', { products: productsOption });
  },
  async collectShiftsOption({ commit }) {
    // const { products, shifts } = await Page.info().then((res) => res.content);

    const shifts = await Page.shiftsOptions();

    const newShifts = shifts
      .sort((a, b) => a.id - b.id)
      .map((item) => ({
        label: item.name,
        value: { from: item.from, to: item.to },
        slot: item.id.toString(),
      }));

    commit('setShiftsOptions', { shifts: newShifts });
  },
  submit({ commit }, payload: PageInfoInterface) {
    // your code

    this.dispatch('productsModule/searchData', payload);
    commit('storedPageInfo', payload);
  },
};

export default actions;
