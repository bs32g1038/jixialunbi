import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.withCredentials = true;

axios.interceptors.request.use(
  function (c: any) {
    c.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    return c;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const config = response.config as any;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;


