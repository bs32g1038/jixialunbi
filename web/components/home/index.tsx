import { useState } from 'react';
import Layout from '../../components/Layout';
import { Empty, Pagination } from 'antd';
import styles from './index.module.scss';
import TopicItem from './components/TopicItem';
import CategoryList from './components/CategoryList';
import { isUndefined, omitBy } from 'lodash';
import { useRouter } from 'next/router';
import PinnedList from './components/PinnedList';
import axios from '@/libs/axios';
import TopTip from './components/TopTip';

const Home = (props: { data: any }) => {
  const router = useRouter();
  const { type, page } = router.query;
  const { items = [], count = 0 } = props.data?.data ?? {};
  return (
    <Layout>
      <TopTip></TopTip>
      {/* <PinnedList></PinnedList> */}
      {type !== 'search' && <CategoryList></CategoryList>}
      <div className={styles.content}>
        <div className={styles.inner}>
          {items.map((item: any) => (
            <TopicItem item={item} key={item.id}></TopicItem>
          ))}
          {items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
        </div>
        {count > 10 && (
          <Pagination
            className={styles.pagination}
            current={Number(page ?? 1)}
            pageSize={10}
            total={count}
            showSizeChanger={false}
            onChange={(p) => {
              router.push({
                query: {
                  page: p,
                },
              });
            }}
          />
        )}
      </div>
    </Layout>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const { query } = context;
  const { categoryId, sort, type, q, page = 1 } = query;
  const reqParams = omitBy(
    {
      categoryId,
      isHot: sort === 'hot',
      type,
      query: q,
      page: page - 1,
    },
    isUndefined
  );
  const url = '/api/v1/posts';
  const res = await axios.get(url, { params: reqParams }).then((res) => res.data);
  return {
    props: {
      data: res,
    },
  };
}
