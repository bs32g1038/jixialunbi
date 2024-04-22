// 'use client';

import axios from '@/libs/axios';
import Post from './components/Post';

const Index = async (props: { params: any }) => {
  const { id } = props.params;
  const url = '/api/v1/posts/' + id;
  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {});
  return <Post data={data}></Post>;
};
export default Index;
