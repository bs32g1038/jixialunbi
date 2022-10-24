import { useLazyFetchPostsQuery } from '@/apis';
import { useAppSelector } from '@/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TopicItem from '../../../home/components/TopicItem';

export default function Posts() {
  const router = useRouter();
  const id = router.query.id;
  const user = useAppSelector((state) => state.app.user);
  const [fetchList, { data: posts = {} }] = useLazyFetchPostsQuery();
  useEffect(() => {
    if (id) {
      fetchList({ authorId: id as any });
    }
  }, [fetchList, id, user]);
  return (
    <div>
      {posts?.items?.map((item: any) => (
        <TopicItem item={item} key={item.id}></TopicItem>
      ))}
    </div>
  );
}
