import React, { useState } from 'react';
import styles from './index.module.scss';
import { Avatar, Button, Space } from 'antd';
import WriteComment from '../WriteComment';
import { parseTime } from '@/libs/time';
import { CommentOutlined } from '@ant-design/icons';

interface Props {
  key?: React.Key;
  postId: number;
  item: any;
  parentCommentId?: number;
}

export default function CommentItem(props: Props) {
  const { postId, item, parentCommentId } = props;
  const [show, setShow] = useState(false);
  return (
    <div className={styles.commentAreaItem}>
      <Avatar size={28} className={styles.avatar} src={item?.author?.image} alt="" />
      <div className={styles.right}>
        <div className={styles.commentAreaItemHeader}>
          <Space>
            <div className={styles.name}>{item?.author?.username}</div>
            <div className={styles.about}>{item?.author?.about}</div>
            {item.reply && (
              <div className={styles.reply}>
                <span className={styles.replyAuthor}>@{item?.reply?.author?.username}</span>
              </div>
            )}
          </Space>
          {item.reply && <p className={styles.content}>{item.content}</p>}
        </div>
        {!item.reply && <p className={styles.content}>{item.content}</p>}
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
        {item.childrens?.map((item) => {
          return <CommentItem key={item.id} parentCommentId={parentCommentId} postId={postId} item={item} />;
        })}
        <Space direction="vertical" style={{ display: 'flex' }}>
          {item?.comments?.map((replyItem) => {
            return <CommentItem key={item.id} postId={postId} item={replyItem} parentCommentId={item.id}></CommentItem>;
          })}
        </Space>
      </div>
    </div>
  );
}
