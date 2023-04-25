import React, { useState } from 'react';
import styles from './index.module.scss';
import Layout from '../Layout';
import { Avatar, Button, Space, Image } from 'antd';
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

const CImage: any = dynamic(() => import('../home/components/TopicItem/components/CImage') as any, {
  ssr: false,
});

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
              <FollowButton
                key={data?.author?.followed}
                account={data?.author?.account}
                followed={data?.author?.followed}
              />
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
            <div className={styles.cont}>
              <Space size={8}>
                <div>{data.visitCount}人阅读</div>
                <LikeButton isActive={data.liked} postId={data.id} count={data.likeCount} />
                <Button
                  type="text"
                  size="small"
                  className={classNames(styles.commentClick, { [styles.active]: open })}
                  onClick={() => setOpen(!open)}
                >
                  <Space size={4}>
                    <CommentOutlined />
                    <span>{data.commentCount + '条评论'}</span>
                  </Space>
                </Button>
                <CollectButton isActive={data.collected} postId={data.id} count={data.collectionCount} />
              </Space>
            </div>
            {data?.pics && (
              <Image.PreviewGroup>
                <div className={styles.pics}>
                  {data?.pics?.split(',').map((pic) => {
                    return (
                      <div key={pic} className={styles.pic}>
                        <CImage src={pic}></CImage>
                      </div>
                    );
                  })}
                </div>
              </Image.PreviewGroup>
            )}
            <h2 className={styles.commentBase} id="comment">
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
