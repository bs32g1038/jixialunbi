import React, { useState } from 'react';
import styles from './index.module.scss';
import Layout from '../Layout';
import { Button, Space, Image, Tag } from 'antd';
import CommentList from './components/CommentList';
import { useRouter } from 'next/router';
import WriteComment from './components/WriteComment';
import { useSWR } from '@/hooks';
import LikeButton from '../LikeButton';
import classNames from 'classnames';
import { CommentOutlined } from '@ant-design/icons';
import CollectButton from '../CollectButton';
import FollowButton from '../FollowButton';
import dynamic from 'next/dynamic';
import axios from '@/libs/axios';
import Link from 'next/link';
import { parseTime } from '@/libs/time';
import TopTip from '../home/components/TopTip';
import PinnedList from '../home/components/PinnedList';
import CategoryList from '../home/components/CategoryList';
import TopicItem from './components/TopicItem';

const CImage: any = dynamic(() => import('../home/components/TopicItem/components/CImage') as any, {
  ssr: false,
});

export default function Post(props) {
  const { data = {} } = props.data;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const postId = router.query.id as unknown as number;
  const resPostData = useSWR({
    url: '/api/v1/post-comments',
    params: {
      postId,
    },
  });
  return (
    <Layout>
      <div className={styles.wrap}>
        <TopTip></TopTip>
        {/* <PinnedList></PinnedList> */}
        {/* <CategoryList></CategoryList> */}
        <TopicItem item={data} key={data.id}></TopicItem>
        <div className={styles.inner}>
          <WriteComment postId={postId}></WriteComment>
          <CommentList postId={postId} items={resPostData?.data?.data ?? []}></CommentList>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query as any;
  const url = '/api/v1/posts/' + id;
  const post = await axios.get(url).then((res) => res.data);
  return {
    props: {
      data: post,
    },
  };
}
