import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SocketInterface } from './state';

const actions: ActionTree<SocketInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
