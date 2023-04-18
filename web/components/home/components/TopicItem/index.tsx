import React, { useState } from 'react';
import Link from 'next/link';
import { parseTime } from '../../../../libs/time';
import styles from './index.module.scss';
import { Avatar, Button, Space, Tag, Popover, Tooltip } from 'antd';
import { AntDesignOutlined, CommentOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import LikeButton from '../../../LikeButton';
import CollectButton from '../../../CollectButton';
import CommentList from '../CommentList';
import EllipsisDropdown from './components/EllipsisDropdown';
import { unionBy } from 'lodash';
import TimeLine from './components/TimeLine';
import dynamic from 'next/dynamic';
const CImage: any = dynamic(() => import('./components/CImage') as any, {
  ssr: false,
});

export default function TopicItem(props: { item: any }) {
  const [open, setOpen] = useState(false);
  const item = props.item;
  const participants = item?.participants;
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
                    <Link href={`/profile/${item?.author?.id}`} className={styles.about}>
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
                <p className={styles.about}>{item?.author?.about}</p>
              </div>
            </div>
            <h2 className={styles.title}>
              <a href={`/posts/${item.id}`}>{item.title}</a>
            </h2>
            {item.content && <p className={styles.summary}>{item.content}</p>}
            {item?.pics && (
              <div className={styles.pics}>
                {item?.pics?.split(',').map((pic) => {
                  return (
                    <div key={pic} className={styles.pic}>
                      <CImage src={pic}></CImage>
                    </div>
                  );
                })}
              </div>
            )}
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <div className={styles.footer}>
                  <Space size={8}>
                    <Button type="text" size="small">
                      <span>
                        <LikeOutlined />
                        <span>赞同0</span>
                      </span>
                    </Button>
                    <Button
                      type="text"
                      size="small"
                      className={classNames(styles.commentClick, { [styles.active]: open })}
                      onClick={() => setOpen(!open)}
                    >
                      <span>
                        <CommentOutlined />
                        <span>{item.commentCount + '条评论'}</span>
                      </span>
                    </Button>
                    <Button type="text" size="small">
                      <span>
                        <StarOutlined />
                        <span>收藏0</span>
                      </span>
                    </Button>
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
                      <Link key={item.id} href={'/profile/' + item?.id}>
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
              {/* <Avatar.Group maxCount={3} size="small">
                <Avatar size="small" src="https://joesch.moe/api/v1/random?key=1" />
                <a href="https://ant.design">
                  <Avatar size="small">K</Avatar>
                </a>
                <Tooltip title="Ant User" placement="top">
                  <Avatar size="small" icon={<UserOutlined />} />
                </Tooltip>
                <Avatar size="small" icon={<AntDesignOutlined />} />
              </Avatar.Group> */}
            </Space>
            {open && <CommentList postId={item.id}></CommentList>}
          </div>
        </div>
      </div>
    </div>
  );
}
