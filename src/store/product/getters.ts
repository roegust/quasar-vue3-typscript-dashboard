import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductsInterface } from './state';

const getters: GetterTree<ProductsInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
