// 'use client';

import axios from '@/libs/axios';
import Articles from './components/Articles';

const Home = async (props: { searchParams: any }) => {
  const { page = 1 } = props.searchParams;
  const data = await axios
    .get('/api/v1/posts', {
      params: { page: Number(page) - 1 },
    })
    .then((res) => res.data);
  return <Articles data={data} searchParams={props.searchParams}></Articles>;
};
export default Home;
