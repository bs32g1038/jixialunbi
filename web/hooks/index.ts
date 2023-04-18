import axios from '@/libs/axios';
import mutation from 'swr/mutation';
import swr from 'swr';
import { AxiosRequestConfig } from 'axios';

export const useSWR = (params: { url: string; params?: AxiosRequestConfig['params'] }) => {
  return swr(params, async (d) => {
    try {
      return await axios.get(d.url, { params: d.params }).then((res) => res.data);
    } catch (error) {}
  });
};

export const useSWRMutation = (params: { url: string; params?: AxiosRequestConfig['params'] }) => {
  return mutation(params, (d, { arg }) => {
    return axios.post(d.url, arg, { params: d.params });
  });
};
