import { ActionTree } from 'vuex';
import moment from 'moment-timezone';
import { StateInterface } from '../index';
import {
  ProductInterface,
  ProductsInterface,
  ProductProcessRecord,
} from './state';
import { PageInfoInterface } from '../pageInfo/state';

// import data from '../../data/mockData';

import Products from '../../service/Products';

const actions: ActionTree<ProductsInterface, StateInterface> = {
  async searchData({ commit }, payload: PageInfoInterface) {
    // your code

    // const filteredData = data.filter(
    //   (item) => item.name.toLowerCase() === payload.name.toLowerCase(),
    // );

    let filteredData = [] as ProductInterface[];

    await Products.records(payload).then((res) => {
      filteredData = res.content.products;
    });

    // console.log(filteredData);

    const destructedArr = [] as ProductProcessRecord[];

    filteredData.forEach((product) => {
      const { id } = product;
      const productName = product.name;
      product.machines.forEach((machine) => {
        const { operation, user } = machine;
        const machineName = machine.name;
        machine.processRecords.forEach((record) => {
          const tz = record.timeZone ?? 'Asia/Taipei';
          const destrucedRecord: ProductProcessRecord = {
            id,
            name: productName,
            sn: record.sn,
            operation,
            operator: user,
            machine: machineName,
            import: moment
              .unix(record.importTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            export: moment
              .unix(record.exportTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            start: moment
              .unix(record.startProcessTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            finished: moment
              .unix(record.finishProcessTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
          };

          destructedArr.push(destrucedRecord);
        });
      });
    });

    commit('setData', { products: filteredData, rawData: destructedArr });
  },

  refreshData({ commit }) {
    commit('setData', { products: [], rawData: [] });
  },
};

export default actions;
