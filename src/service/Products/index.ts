import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { ProductInterface } from '../../store/product/state';
import { PageInfoInterface } from '../../store/pageInfo/state';

interface ProductsResponse {
  content: {
    products: ProductInterface[];
  };
}

// interface PageInfo {
//   context: {
//     products: string[];
//     shifts: [
//       {
//         id: number;
//         name: string;
//         from: string;
//         to: string;
//       },
//     ];
//   };
// }

const Products = async (
  payload: PageInfoInterface,
): Promise<ProductsResponse> => {
  const data = await api
    .get(`/api/ProcessingReports?start=${payload.from}&end=${payload.to}`)
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

export default Products;
