import { MutationTree } from 'vuex';
import { SocketInterface, Details, Frequency } from './state';

const mutation: MutationTree<SocketInterface> = {
  setRealtimeData(state: SocketInterface, payload: Details[]) {
    state.cards = new Map();

    const keys = payload.map(
      (item) =>
        `${item.productID} / ${item.productName}${
          item.carft ? ` - (${item.carft})` : ''
        }`,
    );

    keys.sort((a, b) => (a > b ? 1 : -1));

    keys.forEach((key) => {
      state.cards.set(key, []);
    });

    payload.forEach((item) => {
      const records =
        state.cards.get(
          `${item.productID} / ${item.productName}${
            item.carft ? ` - (${item.carft})` : ''
          }`,
        ) ?? [];

      records.push(item);

      records.sort((a, b) => (a.operation > b.operation ? 1 : -1));

      state.cards.set(
        `${item.productID} / ${item.productName}${
          item.carft ? ` - (${item.carft})` : ''
        }`,
        records,
      );
    });
  },
  initialCards(state: SocketInterface) {
    state.cards = new Map();
  },
  storedState(
    state: SocketInterface,
    payload: {
      products: string[];
      frequency: Frequency;
    },
  ) {
    state.products = payload.products;
    state.frequency = payload.frequency;
  },
};

export default mutation;
