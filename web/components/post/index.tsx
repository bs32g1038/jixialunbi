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
        <div className={styles.inner}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <h2 className={styles.title}>
              <a href={`/posts/${data.id}`}>{data.title}</a>
              {data?.tags && (
                <div className={styles.tag}>
                  <Tag>{data?.category?.name}</Tag>
                  {data?.tags?.split(',').map((tag: string) => {
                    if (!tag) {
                      return null;
                    }
                    return <Tag key={tag}>{tag}</Tag>;
                  })}
                </div>
              )}
            </h2>
            <Space size={4}>
              <div className={styles.avatarWrap}>
                <img className={styles.avatar} src={data?.author?.image} alt="" />
              </div>
              <div style={{ marginRight: 5 }}>
                <Link href={`/profile/${data?.author?.account}`} className={styles.about}>
                  {data?.author?.username}
                </Link>
              </div>
              <p className={styles.lastEditTime}>{parseTime(data.updatedAt)}</p>
              <FollowButton
                key={data?.author?.followed}
                account={data?.author?.account}
                followed={data?.author?.followed}
              />
            </Space>
            <div
              className="rich-text"
              style={{
                color: '#333',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className={styles.cont}>
              <Space size={4}>
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
