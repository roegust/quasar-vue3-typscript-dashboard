import { MutationTree } from 'vuex';
import { ProductsInterface } from './state';

const mutation: MutationTree<ProductsInterface> = {
  setMockData(state: ProductsInterface, payload: ProductsInterface) {
    // your code
    state.name = payload.name;
    state.date = payload.date;
    state.isAfternoon = payload.isAfternoon;
    state.products = payload.products;
    state.rawData = payload.rawData;
  },
};

export default mutation;
