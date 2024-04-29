import { useParams } from 'next/navigation';
import React from 'react';
import TopicItem from '../../../home/components/TopicItem';
import { useSWR } from '@/hooks';
import { Empty } from 'antd';
import styles from './index.module.scss';

export default function CollectionPosts() {
  const { id } = useParams();
  const { data } = useSWR({ url: '/api/v1/collection/posts?id=' + id });
  const posts = data?.data;
  return (
    <div className={styles.wrap}>
      {posts?.items?.map((item: any) => <TopicItem item={item?.post} key={item?.post?.id}></TopicItem>)}
      {posts?.items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
    </div>
  );
}
