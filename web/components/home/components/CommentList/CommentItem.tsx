import React, { useState } from 'react';
import styles from './index.module.scss';
import { Avatar, Button, Space } from 'antd';
import WriteComment from '../WriteComment';
import { parseTime, timeAgo } from '@/libs/time';
import LikeButton from '../../../LikeButton';
import { CommentOutlined } from '@ant-design/icons';

interface Props {
  postId: number;
  item: any;
  parentCommentId?: number;
}

export default function CommentItem(props: Props) {
  const { postId, item, parentCommentId } = props;
  const [show, setShow] = useState(false);
  return (
    <div className={styles.commentAreaItem}>
      <Avatar size="large" className={styles.avatar} src={item?.author?.image} alt="" />
      <div className={styles.right}>
        <div className={styles.commentAreaItemHeader}>
          <div>
            <div className={styles.name}>{item?.author?.username}</div>
            <div className={styles.about}>{item?.author?.about}</div>
          </div>
          <Space>
            {/* <LikeButton isActive={false} postId={0} likeCount={0}></LikeButton> */}
            {/* <Button type="text" size="small" onClick={() => setShow(!show)}>
              <span>
                <CommentOutlined></CommentOutlined>
                评论
              </span>
            </Button> */}
          </Space>
        </div>
        {item.replyId && (
          <div className={styles.reply}>
            <span>回复给：@{item?.author?.username}</span>
          </div>
        )}
        <p className={styles.content}>{item.content}</p>
        <Space>
          <span className={styles.time}>{parseTime(item.createdAt)}</span>
          <Button className={styles.replyBtn} type="text" size="small" onClick={() => setShow(!show)}>
            <span>
              <CommentOutlined></CommentOutlined>
              回复
            </span>
          </Button>
        </Space>
        {show && <WriteComment postId={postId} parentId={parentCommentId} replyId={item.id}></WriteComment>}
        <Space direction="vertical" style={{ display: 'flex' }}>
          {item?.comments?.map((replyItem) => {
            return <CommentItem key={item.id} postId={postId} item={replyItem} parentCommentId={item.id}></CommentItem>;
          })}
        </Space>
      </div>
    </div>
  );
}
