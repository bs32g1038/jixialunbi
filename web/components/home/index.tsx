import { useState } from 'react';
import Layout from '../../components/Layout';
import TopTip from './components/TopTip';
import { Empty, Pagination } from 'antd';
import styles from './index.module.scss';
import TopicItem from './components/TopicItem';
import CategoryList from './components/CategoryList';
import { isEmpty, isUndefined, omitBy } from 'lodash';
import { fetchCategories, fetchPosts, useFetchPostsQuery } from '../../apis';
import Search from './components/Search';
import { wrapper } from '@/store';
import { useRouter } from 'next/router';
import PinnedList from './components/PinnedList';

const Home = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { categoryId, sort, postId, type, q } = router.query;
  const reqParams = omitBy(
    {
      categoryId,
      isHot: sort === 'hot',
      id: postId,
      type,
      query: q,
      page,
    },
    isUndefined
  );
  const { data: { items = [], count = 0 } = {} } = useFetchPostsQuery(reqParams);
  return (
    <Layout>
      <TopTip></TopTip>
      <Search></Search>
      <PinnedList></PinnedList>
      {type !== 'search' && <CategoryList></CategoryList>}
      {isEmpty(items) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className={styles.topicList}>
          {items.map((item: any) => (
            <TopicItem item={item} key={item.id}></TopicItem>
          ))}
          {count > 20 && (
            <Pagination
              className={styles.pagination}
              size="small"
              current={page}
              pageSize={20}
              total={count}
              showSizeChanger={false}
              onChange={(p) => {
                setPage(p);
              }}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (data) => {
  const { query } = data;
  const { type, categoryId, postId, q, sort, page } = query as any;
  const reqParams = omitBy(
    {
      categoryId,
      isHot: sort === 'hot',
      id: postId,
      type,
      query: q,
      page: page ?? 1,
    },
    isUndefined
  );
  await store.dispatch(fetchCategories.initiate());
  await store.dispatch(fetchPosts.initiate(reqParams));
  await store.dispatch(fetchPosts.initiate({ pinned: true }));
  return {
    props: {},
  };
});

export default Home;
