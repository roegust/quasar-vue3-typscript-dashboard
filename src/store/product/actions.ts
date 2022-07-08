import { ActionTree } from 'vuex';
import moment from 'moment-timezone';
import { StateInterface } from '../index';
import { ProductsInterface, ProductProcessRecord } from './state';
import data from '../../data/mockData';

const actions: ActionTree<ProductsInterface, StateInterface> = {
  searchData({ commit }, payload: ProductsInterface) {
    // your code
    const filteredData = data.filter(
      (item) => item.name.toLowerCase() === payload.name.toLowerCase(),
    );

    const destructedArr = [] as ProductProcessRecord[];
    filteredData.forEach((product) => {
      const { id } = product;
      const productName = product.name;
      product.machines.forEach((machine) => {
        const { operation, user } = machine;
        const machineName = machine.name;
        machine.processRecords.forEach((record) => {
          const destrucedRecord: ProductProcessRecord = {
            id,
            name: productName,
            sn: record.sn,
            operation,
            operator: user,
            machine: machineName,
            import: moment
              .unix(record.importTime)
              .tz(record.timeZone)
              .format('YYYY-MM-DD HH:mm:ss'),
            export: moment
              .unix(record.exportTime)
              .tz(record.timeZone)
              .format('YYYY-MM-DD HH:mm:ss'),
            start: moment
              .unix(record.startProcessTime)
              .tz(record.timeZone)
              .format('YYYY-MM-DD HH:mm:ss'),
            finished: moment
              .unix(record.finishProcessTime)
              .tz(record.timeZone)
              .format('YYYY-MM-DD HH:mm:ss'),
          };

          destructedArr.push(destrucedRecord);
        });
      });
    });

    payload.products = filteredData;
    payload.rawData = destructedArr;
    commit('setMockData', payload);
  },
};

export default actions;
