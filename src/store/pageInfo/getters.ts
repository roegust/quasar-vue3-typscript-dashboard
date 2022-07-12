import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PageInfoInterface } from './state';

const getters: GetterTree<PageInfoInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
