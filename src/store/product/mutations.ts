import { MutationTree } from 'vuex';
import { ProductsInterface } from './state';

const mutation: MutationTree<ProductsInterface> = {
  setMockData(state: ProductsInterface, payload: ProductsInterface) {
    // your code
    state.products = payload.products;
    state.rawData = payload.rawData;
  },
};

export default mutation;
