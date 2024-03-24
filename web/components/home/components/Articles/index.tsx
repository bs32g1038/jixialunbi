'use client';

import { Empty, Pagination } from 'antd';
import styles from '../../index.module.scss';
import TopicItem from '../TopicItem';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import TopTip from '../TopTip';
import CategoryList from '../CategoryList';

export default function Articles({ data, searchParams }) {
  const { page } = searchParams;
  const router = useRouter();
  const { items = [], count = 0 } = data?.data ?? [];
  return (
    <Layout>
      <TopTip></TopTip>
      <CategoryList></CategoryList>
      <div className={styles.content}>
        <div className={styles.inner}>
          {items.map((item: any) => (
            <TopicItem item={item} key={item.id}></TopicItem>
          ))}
          {items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
        </div>
        <Pagination
          className={styles.pagination}
          current={Number(page ?? 1)}
          pageSize={10}
          total={count}
          showSizeChanger={false}
          onChange={(p) => {
            router.push('/?page=' + p);
          }}
        />
      </div>
    </Layout>
  );
}
