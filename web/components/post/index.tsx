import React, { useState } from 'react';
import styles from './index.module.scss';
import Layout from '../Layout';
import { Avatar, Button, Divider, Space } from 'antd';
import LikeButton from '../LikeButton';
import classNames from 'classnames';
import { CommentOutlined } from '@ant-design/icons';
import CollectButton from '../CollectButton';
import CommentList from '../home/components/CommentList';
import { fetcher } from '../home/services';
import { useRouter } from 'next/router';
import WriteComment from '../home/components/WriteComment';
import { useSWR } from '@/hooks';

export default function Post() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const postId = router.query.id as unknown as number;
  const { data: { data = {} } = {} } = useSWR({
    url: '/api/v1/posts/' + postId,
  });
  const resPostData = useSWR({
    url: '/api/v1/post-comments',
    params: {
      postId,
    },
  });
  console.log(resPostData?.data);
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <h2 className={styles.title}>{data.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <Space>
                <Avatar src={data?.author?.image}></Avatar>
                <div style={{ marginRight: '20px' }}>
                  <div className={styles.author}>{data?.author?.username}</div>
                  <div className={styles.authorDes}>
                    {data?.updatedAt} | {data?.author?.about}
                  </div>
                </div>
              </Space>
              <Button size="small">关注</Button>
            </div>
            <div
              className="rich-text"
              style={{
                color: '#333',
                // padding: '0 20px',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <h2 className={styles.commentBase}>
              <span className={styles.commentSign}>评论</span>
              <span className={styles.commentNumber}>{data?.commentCount}</span>
            </h2>
            <WriteComment postId={postId}></WriteComment>
            <CommentList postId={postId} items={resPostData?.data?.data ?? []}></CommentList>
          </div>
        </div>
      </div>
    </Layout>
  );
}
