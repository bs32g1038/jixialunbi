import { message } from 'antd';
import { AxiosError } from 'axios';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    const config = response.config as any;
    if (response.data.code !== 200) {
      if (config?.notification) {
        message.error(response.data.message);
      }
      throw new AxiosError(response.data.message, response.data.code);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
