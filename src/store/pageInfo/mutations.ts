import { MutationTree } from 'vuex';
import { PageInfoInterface } from './state';

const mutation: MutationTree<PageInfoInterface> = {
  storedPageInfo(state: PageInfoInterface, payload: PageInfoInterface) {
    // your code
    state.name = payload.name;
    state.from = payload.from;
    state.to = payload.to;
    state.isAfternoon = payload.isAfternoon;
    // state.isRawData = payload.isRawData;
  },
  rawDataVisible(state: PageInfoInterface, visible: boolean) {
    state.isRawData = visible;
  },
};

export default mutation;
