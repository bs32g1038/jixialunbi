'use server'

import axios from '@/libs/axios';
import { AxiosRequestConfig } from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {
  url: string;
  config?: AxiosRequestConfig<any>;
  Component: React.FC<any>;
}

export default async function LoadAsyncMore(props: Props) {
  const { url, config, Component } = props;
  const data = await axios.get(url, config).then((res) => res.data);
  return <Component data={data}></Component>;
}
