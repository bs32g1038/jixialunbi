import axios from 'axios';
import Cookies from 'js-cookie';

let baseUrl = '';
if (typeof window !== 'undefined') {
  baseUrl = '';
} else {
  baseUrl = 'http://127.0.0.1:8000';
}

const instance = axios.create({
  baseURL: baseUrl,
});

instance.defaults.timeout = 5000;

instance.defaults.headers.withCredentials = true;

instance.interceptors.request.use(
  function (c: any) {
    c.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    return c;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const config = response.config as any;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
