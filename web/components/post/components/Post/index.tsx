'use client';

import React from 'react';
import styles from '../../index.module.scss';
import Layout from '../../../Layout';
import CommentList from '../CommentList';
import WriteComment from '../WriteComment';
import { useSWR } from '@/hooks';
import TopTip from '../../../home/components/TopTip';
import TopicItem from '../TopicItem';
import { useParams } from 'next/navigation';

export default function Post({ data }) {
  const { id } = useParams();
  const _data = data?.data;
  const resPostData = useSWR({
    url: '/api/v1/post-comments',
    params: {
      postId: id,
    },
  });
  return (
    <Layout>
      <div className={styles.wrap}>
        <TopTip></TopTip>
        {_data && <TopicItem item={_data}></TopicItem>}
        <div className={styles.inner}>
          <WriteComment postId={Number(id)}></WriteComment>
          <CommentList postId={Number(id)} items={resPostData?.data?.data ?? []}></CommentList>
        </div>
      </div>
    </Layout>
  );
}
