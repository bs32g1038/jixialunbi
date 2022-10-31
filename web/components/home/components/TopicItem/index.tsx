import React, { useState } from 'react';
import Link from 'next/link';
import { parseTime } from '../../../../libs/time';
import styles from './index.module.scss';
import { Avatar, Button, Space, Tag, Popover, Image } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import LikeButton from '../../../LikeButton';
import CollectButton from '../../../CollectButton';
import CommentList from '../CommentList';
import EllipsisDropdown from './components/EllipsisDropdown';
import { unionBy } from 'lodash';
import TimeLine from './components/TimeLine';

export default function TopicItem(props: { item: any }) {
  const [open, setOpen] = useState(false);
  const item = props.item;
  const participants = unionBy(item?.participants, 'author.id');
  return (
    <div key={item.title} className={styles.item}>
      <div className={styles.liner}>
        <div className={styles.details}>
          <div className={styles.avatarWrap}>
            <img className={styles.avatar} src={item?.author.image} alt="" />
          </div>
          <div className={styles.core}>
            <div className={styles.header}>
              <div style={{ flex: '1 0 auto' }}>
                <div className={styles.byline}>
                  <div>
                    <Link href={`/profile/${item.author && item.author.id}`} className={styles.username}>
                      {item?.author?.username}
                    </Link>
                  </div>
                  <Space size={4} style={{ fontSize: '13px' }}>
                    <span title={parseTime(item.createdAt)}>{parseTime(item.createdAt)}</span>
                    <span>·</span>
                    <EllipsisDropdown authorId={item?.author?.id} postId={item.id} id={0}></EllipsisDropdown>
                  </Space>
                </div>
                <p className={styles.about}>{item?.author?.about}</p>
              </div>
            </div>
            <div className={styles.tag}>
              <Tag>
                <span>#</span>
                {item?.category?.name}
              </Tag>
              {item?.tags?.split(',').map((tag: string) => {
                if (!tag) {
                  return null;
                }
                return (
                  <Tag key={tag}>
                    <span>#</span>
                    {tag}
                  </Tag>
                );
              })}
            </div>
            <div className="toastui-editor-contents">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.title,
                }}
              ></div>
            </div>
            {item?.pics && (
              <div className={styles.pics}>
                {item?.pics?.split(',').map((pic) => {
                  return (
                    <div key={pic} className={styles.pic}>
                      <Image width={120} height={80} src={pic} alt="" />
                    </div>
                  );
                })}
              </div>
            )}
            {item?.timeLines?.length > 0 && <TimeLine data={item?.timeLines}></TimeLine>}
            <div className={styles.footer}>
              <Space>
                <div>
                  <LikeButton isActive={item?.likes?.length} postId={item.id} likeCount={item?.likeCount}></LikeButton>
                </div>
                <Button
                  type="text"
                  className={classNames(styles.commentClick, { [styles.active]: open })}
                  onClick={() => setOpen(!open)}
                >
                  <span>
                    <CommentOutlined />
                    <span>{open ? '收起评论' : item.commentCount + '条评论'}</span>
                  </span>
                </Button>
                <CollectButton
                  isActive={item?.collections?.length}
                  postId={item.id}
                  collectCount={item?.collectCount}
                ></CollectButton>
              </Space>
              {participants?.length > 0 && (
                <Avatar.Group
                  maxCount={5}
                  size="small"
                  maxStyle={{ color: 'rgba(0, 0, 0, 0.45)', backgroundColor: 'rgb(246, 246, 246)' }}
                >
                  {participants?.map((item: any) => {
                    return (
                      <Link key={item.id} href={'/profile/' + item?.author?.id}>
                        <Popover
                          placement="bottom"
                          title={item?.author?.username}
                          content={
                            <span style={{ fontSize: 12 }}>{item?.author?.about ?? '这家伙很懒，什么都没留下'}</span>
                          }
                          trigger="hover"
                        >
                          <Avatar size="small" src={item?.author?.image} style={{ cursor: 'pointer' }} alt="" />
                        </Popover>
                      </Link>
                    );
                  })}
                </Avatar.Group>
              )}
            </div>
            {open && <CommentList postId={item.id}></CommentList>}
          </div>
        </div>
      </div>
    </div>
  );
}
