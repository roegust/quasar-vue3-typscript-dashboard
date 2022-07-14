import { MutationTree } from 'vuex';
import { PageInfoInterface, ShiftsInterface } from './state';

const mutation: MutationTree<PageInfoInterface> = {
  setPageOptions(
    state: PageInfoInterface,
    payload: { products: string[]; shifts: ShiftsInterface[] },
  ) {
    state.products = payload.products;
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
