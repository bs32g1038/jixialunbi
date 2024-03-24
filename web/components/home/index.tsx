// 'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { Empty, Pagination } from 'antd';
import styles from './index.module.scss';
import TopicItem from './components/TopicItem';
import CategoryList from './components/CategoryList';
import { isUndefined, omitBy } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import PinnedList from './components/PinnedList';
import axios from '@/libs/axios';
import TopTip from './components/TopTip';
import LoadAsyncMore from '../LoadAsyncMore';
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

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const { categoryId, sort, type, q, page = 1 } = query;
//   console.log("categoryId", categoryId, 'sadsdssss', query)
//   const reqParams = omitBy(
//     {
//       // categoryId,
//       isHot: categoryId === 'hot',
//       type,
//       query: q,
//       page: page - 1,
//     },
//     isUndefined
//   );
//   const url = '/api/v1/posts';
//   const res = await axios.get(url, { params: reqParams }).then((res) => res.data);
//   return {
//     props: {
//       data: res,
//     },
//   };
// }
