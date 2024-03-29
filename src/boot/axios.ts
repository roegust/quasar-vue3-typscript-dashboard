import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// api server 8888
// const api = axios.create({ baseURL: 'https://localhost:8888/api/report/' });
// const api = axios.create({ baseURL: 'https://localhost:5001/api/report/' });
const api = axios.create({ baseURL: 'http://localhost:5000/api/report/' });
// const api = axios.create({ baseURL: 'https://smart-dev.syntecclub.com:8080/api/report/' });
// const api = axios.create({ baseURL: 'https://10.10.40.173:8888/api/report/' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
