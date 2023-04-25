import React from 'react';
import Link from 'next/link';
import { parseTime } from '../../../../libs/time';
import styles from './index.module.scss';
import { Avatar, Button, Space, Tag, Popover, Image } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import LikeButton from '../../../LikeButton';
import EllipsisDropdown from './components/EllipsisDropdown';
import { unionBy } from 'lodash';
import dynamic from 'next/dynamic';
import CollectButton from '@/components/CollectButton';

const CImage: any = dynamic(() => import('./components/CImage') as any, {
  ssr: false,
});

export default function TopicItem(props: { item: any }) {
  const item = props.item;
  const participants = unionBy(item?.participants, 'id');
  return (
    <div key={item.title} className={styles.item}>
      <div className={styles.liner}>
        <div className={styles.details}>
          <div className={styles.avatarWrap}>
            <img className={styles.avatar} src={item?.author?.image} alt="" />
          </div>
          <div className={styles.core}>
            <div className={styles.header}>
              <div style={{ flex: '1 0 auto' }}>
                <div className={styles.byline}>
                  <div>
                    <Link href={`/profile/${item?.author?.account}`} className={styles.about}>
                      {item?.author?.username}
                    </Link>
                  </div>
                  <Space size={4} style={{ fontSize: '12px' }}>
                    <Space size={4}>
                      <p className={styles.lastEditTime}>{parseTime(item.updatedAt)}</p>
                      <span>·</span>
                      <div style={{ fontSize: 12, border: 'none', background: 'none', color: 'rgba(0, 0, 0, 0.45)' }}>
                        {item?.category?.name}
                      </div>
                    </Space>
                    <EllipsisDropdown
                      pinned={item.pinned}
                      authorId={item?.author?.id}
                      postId={item.id}
                      id={0}
                    ></EllipsisDropdown>
                  </Space>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p className={styles.about}>{item?.author?.about}</p>
                </div>
              </div>
            </div>
            <h2 className={styles.title}>
              <a href={`/posts/${item.id}`}>{item.title}</a>
            </h2>
            {item.content && <p className={styles.summary}>{item.content}</p>}
            {item?.pics && (
              <Image.PreviewGroup>
                <div className={styles.pics}>
                  {item?.pics?.split(',').map((pic) => {
                    return (
                      <div key={pic} className={styles.pic}>
                        <CImage src={pic}></CImage>
                      </div>
                    );
                  })}
                </div>
              </Image.PreviewGroup>
            )}
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <div className={styles.footer}>
                  <Space size={5}>
                    <Button type="text" size="small" href={`/posts/${item.id}`}>
                      {item.visitCount} 浏览
                    </Button>
                    <LikeButton isActive={item.liked} postId={item.id} count={item.likeCount}></LikeButton>
                    <Button type="text" size="small" href={`/posts/${item.id}#comment`}>
                      <Space size={4}>
                        <CommentOutlined />
                        <span>{item.commentCount + '条评论'}</span>
                      </Space>
                    </Button>
                    <CollectButton isActive={item.collected} postId={item.id} count={item.collectionCount} />
                  </Space>
                </div>
              </Space>
              {participants?.length > 0 && (
                <Avatar.Group
                  maxCount={3}
                  size="small"
                  maxStyle={{ color: 'rgba(0, 0, 0, 0.45)', backgroundColor: 'rgb(246, 246, 246)' }}
                >
                  {participants?.map((item: any) => {
                    return (
                      <Link key={item.id} href={'/profile/' + item?.account}>
                        <Popover
                          placement="bottom"
                          title={item?.username}
                          content={<span style={{ fontSize: 12 }}>{item?.about ?? '这家伙很懒，什么都没留下'}</span>}
                          trigger="hover"
                        >
                          <Avatar size="small" src={item?.image} style={{ cursor: 'pointer' }} alt="" />
                        </Popover>
                      </Link>
                    );
                  })}
                </Avatar.Group>
              )}
            </Space>
            {item?.tags && (
              <div className={styles.tag}>
                {item?.tags?.split(',').map((tag: string) => {
                  if (!tag) {
                    return null;
                  }
                  return <Tag key={tag}>{tag}</Tag>;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
