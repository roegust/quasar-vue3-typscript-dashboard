import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { ProductInterface } from '../../store/product/state';
import { PageInfoInterface } from '../../store/pageInfo/state';

interface ProductsResponse {
  content: {
    products: ProductInterface[];
  };
}

// interface ProductsRequest {
//   start: string;
//   end: string;
//   from: string;
//   to: string;
//   productNos: string[];
// }

const records = async (
  payload: PageInfoInterface,
): Promise<ProductsResponse> => {
  const data = await api // .post('/ProcessingReports', {});
    .post('/ProcessingReports', {
      start: payload.from,
      end: payload.to,
      from: payload.shiftSelected.from,
      to: payload.shiftSelected.to,
      productNos: payload.name,
    })
    .then((response) => response.data as ProductsResponse)
    .catch(() => {
      Notify.create({
        type: 'negative',
        message: 'Error',
      });
      return {} as ProductsResponse;
    });
  return data;
};

export default records;
