import { api } from 'boot/axios';
import { Notify } from 'quasar';
import {
  ShiftsResInterface,
  ProductsResInterface,
} from '../../store/pageInfo/state';

interface InfoResponse {
  content: {
    products: ProductsResInterface[];
    shifts: ShiftsResInterface[];
  };
}

const info = async () => {
  const data = await api
    .get('/ProcessingReports/PageInfo')
    .then((response) => response.data as InfoResponse)
    .catch(() => {
      Notify.create({
        type: 'negative',
        message: 'Error',
      });
      return {} as InfoResponse;
    });
  return data;
};

const shiftsOptions = async () => {
  const data = await api
    .get('/ProcessingReports/Shifts')
    .then((response) => response.data.content as ShiftsResInterface[])
    .catch(() => {
      Notify.create({
        type: 'negative',
        message: 'Error',
      });
      return [] as ShiftsResInterface[];
    });
  return data;
};

const productsOptions = async () => {
  const data = await api
    .get('/ProcessingReports/Products')
    .then((response) => response.data.content as ProductsResInterface[])
    .catch(() => {
      Notify.create({
        type: 'negative',
        message: 'Error',
      });
      return [] as ProductsResInterface[];
    });
  return data;
};

export { info, shiftsOptions, productsOptions };
