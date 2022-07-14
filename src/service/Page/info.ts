import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { ShiftsResInterface } from '../../store/pageInfo/state';

interface InfoResponse {
  content: {
    products: string[];
    shifts: ShiftsResInterface[];
  };
}

const info = async () => {
  const data = await api
    .get('/api/ProcessingReports/PageInfo')
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

export default info;
