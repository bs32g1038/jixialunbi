import { useRouter } from 'next/router';
import React from 'react';
import TopicItem from '../../../home/components/TopicItem';
import { useSWR } from '@/hooks';

export default function Posts() {
  const router = useRouter();
  const id = router.query.id;
  const { data } = useSWR({ url: '/api/v1/posts' });
  const posts = data?.data;
  return (
    <div>
      {posts?.items?.map((item: any) => (
        <TopicItem item={item} key={item.id}></TopicItem>
      ))}
    </div>
  );
}
