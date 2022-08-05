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
    // console.log(payload);
    await Products.records(payload).then((res) => {
      filteredData = res.content.products;
    });

    // filteredData.forEach(item => {
    //   item.machines.push(...Array.from(item.machines))
    // })
    // console.log(filteredData);

    const destructedArr = [] as ProductProcessRecord[];

    filteredData.forEach((product) => {
      const { id } = product;
      const productName = product.name;
      product.machines.forEach((machine) => {
        const { operation, user, estimatedProcessingTime } = machine;
        const machineName = machine.name;
        let count = 0;
        let sum = 0;

        machine.processRecords.forEach((record) => {
          const tz = record.timeZone ?? 'Asia/Taipei';
          const processSec =
            (record.finishProcessTime - record.startProcessTime) / 1000;
          const operationSec =
            (record.exportTime - record.importTime) / 1000 - processSec;

          count += 1;
          sum += operationSec + processSec;

          const destrucedRecord: ProductProcessRecord = {
            序號: record.sn,
            操作員: user,
            產品料號: id,
            產品名稱: productName,
            工序: operation,
            設備: machineName,
            標準工時: `${Math.trunc(
              estimatedProcessingTime / 1000 / 60,
            )} 分 ${Math.trunc((estimatedProcessingTime / 100) % 60)} 秒`,
            上下料時間: `${Math.trunc(operationSec / 60)} 分 ${Math.trunc(
              operationSec % 60,
            )} 秒`,
            單件加工時間: `${Math.trunc(processSec / 60)} 分 ${Math.trunc(
              processSec % 60,
            )} 秒`,
            進站時間: moment
              .unix(record.importTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            加工開始時間: moment
              .unix(record.startProcessTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            加工結束時間: moment
              .unix(record.finishProcessTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
            出站時間: moment
              .unix(record.exportTime / 1000)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss'),
          };

          machine.avgProcessingTime = sum / count;

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
