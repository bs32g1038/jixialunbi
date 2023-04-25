import { useState } from 'react';
import Layout from '../../components/Layout';
import { Empty, Pagination } from 'antd';
import styles from './index.module.scss';
import TopicItem from './components/TopicItem';
import CategoryList from './components/CategoryList';
import { isUndefined, omitBy } from 'lodash';
import { useRouter } from 'next/router';
import PinnedList from './components/PinnedList';
import { useSWR } from '@/hooks';

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
      page: page - 1,
    },
    isUndefined
  );
  const { data } = useSWR({ url: '/api/v1/posts', params: reqParams });
  const { items = [], count = 0 } = data?.data ?? {};
  return (
    <Layout>
      <PinnedList></PinnedList>
      {type !== 'search' && <CategoryList></CategoryList>}
      <div className={styles.content}>
        <div className={styles.inner}>
          {items.map((item: any) => (
            <TopicItem item={item} key={item.id}></TopicItem>
          ))}
          {items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
        </div>
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
    </Layout>
  );
};
export default Home;
