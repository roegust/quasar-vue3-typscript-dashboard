import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SocketInterface } from './state';

const getters: GetterTree<SocketInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
