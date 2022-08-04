import { MutationTree } from 'vuex';
import { PageInfoInterface, ShiftsInterface, ProductsInterface } from './state';

const mutation: MutationTree<PageInfoInterface> = {
  setProductsOptions(
    state: PageInfoInterface,
    payload: { products: ProductsInterface[] },
  ) {
    state.products = payload.products;
  },

  setShiftsOptions(
    state: PageInfoInterface,
    payload: { shifts: ShiftsInterface[] },
  ) {
    state.shifts = payload.shifts;
  },

  storedPageInfo(state: PageInfoInterface, payload: PageInfoInterface) {
    // your code
    state.name = payload.name;
    state.from = payload.from;
    state.to = payload.to;
  },
  rawDataVisible(state: PageInfoInterface, visible: boolean) {
    state.isRawData = visible;
  },
};

export default mutation;
