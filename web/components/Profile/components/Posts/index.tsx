import { useRouter } from 'next/router';
import React from 'react';
import TopicItem from '../../../home/components/TopicItem';
import { useSWR } from '@/hooks';
import { Empty } from 'antd';

export default function Posts() {
  const router = useRouter();
  const account = router.query?.account;
  const { data } = useSWR({ url: '/api/v1/posts?account=' + account });
  const posts = data?.data;
  return (
    <div>
      {posts?.items?.map((item: any) => (
        <TopicItem item={item} key={item.id}></TopicItem>
      ))}
      {posts?.items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
    </div>
  );
}
