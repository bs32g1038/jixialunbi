import React from 'react';
import Link from 'next/link';
import { parseTime } from '../../../../libs/time';
import styles from './index.module.scss';
import { Avatar, Button, Space, Tag, Popover, Image } from 'antd';
import { CommentOutlined, EyeOutlined, FlagOutlined, TagOutlined } from '@ant-design/icons';
import LikeButton from '../../../LikeButton';
import { unionBy } from 'lodash';
import dynamic from 'next/dynamic';
import CollectButton from '@/components/CollectButton';
import EllipsisDropdown from './components/EllipsisDropdown';

const CImage: any = dynamic(() => import('./components/CImage') as any, {
  ssr: false,
});

export default function TopicItem(props: { item: any }) {
  const item = props.item;
  console.log(item);
  const participants = unionBy(item?.participants, 'id');
  return (
    <div key={item.title} className={styles.item}>
      <div className={styles.liner}>
        <div className={styles.details}>
          <Link href={`/profile/${item?.author?.id}`}>
            <div className={styles.avatarWrap}>
              <Avatar className={styles.avatar} src={item?.author?.image} />
            </div>
          </Link>
          <div className={styles.core}>
            <h2 className={styles.title}>
              <a href={`/posts/${item.id}`}>{item.title}</a>
              {/* {item?.tags && (
                <div className={styles.tag}>
                  <Tag color="magenta">{item?.category?.name}</Tag>
                  {item?.tags?.split(',').map((tag: string, index) => {
                    if (!tag) {
                      return null;
                    }
                    return (
                      <Tag key={tag} color={['volcano', 'geekblue', 'gold'][index]}>
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              )} */}
            </h2>
            {/* <p>
              {item?.tags && (
                <div className={styles.tag}>
                  <Tag color="magenta">{item?.category?.name}</Tag>
                  {item?.tags?.split(',').map((tag: string, index) => {
                    if (!tag) {
                      return null;
                    }
                    return (
                      <Tag key={tag} color={['volcano', 'geekblue', 'gold'][index]}>
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              )}
            </p> */}
            <Space style={{ marginBottom: 8 }}>
              <Link href={`/profile/${item?.author?.id}`} className={styles.about}>
                {item?.author?.username}
              </Link>
              <span>·</span>
              <p className={styles.lastEditTime}>{parseTime(item.updatedAt)}</p>
            </Space>
            {item.content && (
              <p
                className={styles.summary}
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              ></p>
            )}
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
            <Space style={{ display: 'flex' }}>
              <Space className={styles.footer} size={3}>
                <TagOutlined />
                {item.tags?.map((item) => {
                  return (
                    <span style={{ paddingRight: 2 }} key={item.id}>
                      {item.name}
                    </span>
                  );
                })}
              </Space>
              <Space size={4} style={{ display: 'flex' }}>
                <Space>
                  <div className={styles.footer}>
                    <Space size={4}>
                      {/* <Button type="text" size="small" href={`/posts/${item.id}`}>
                        {item.visitCount}浏览
                      </Button> */}
                      <LikeButton isActive={item.liked} postId={item.id} count={item.likeCount}></LikeButton>
                      <Button type="text" size="small" href={`/posts/${item.id}#comment`}>
                        <Space size={3}>
                          <CommentOutlined />
                          <span>{item.commentCount + '条评论'}</span>
                        </Space>
                      </Button>
                      <CollectButton isActive={item.collected} postId={item.id} count={item.collectionCount} />
                      <EllipsisDropdown
                        pinned={item.pinned}
                        authorId={item?.author?.id}
                        postId={item.id}
                        id={0}
                      ></EllipsisDropdown>
                    </Space>
                  </div>
                </Space>
                <div>
                  {participants?.length > 0 && (
                    <Avatar.Group
                      maxCount={3}
                      size="small"
                      maxStyle={{ color: 'rgba(0, 0, 0, 0.45)', backgroundColor: 'rgb(246, 246, 246)' }}
                    >
                      {participants?.map((item: any) => {
                        return (
                          <Link key={item.id} href={'/profile/' + item?.id}>
                            <Popover
                              placement="bottom"
                              title={item?.username}
                              content={
                                <span style={{ fontSize: 12 }}>{item?.about ?? '这家伙很懒，什么都没留下'}</span>
                              }
                              trigger="hover"
                            >
                              <Avatar size="small" src={item?.image} style={{ cursor: 'pointer' }} alt="" />
                            </Popover>
                          </Link>
                        );
                      })}
                    </Avatar.Group>
                  )}
                </div>
              </Space>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}
