import React from 'react';
import styles from './index.module.scss';
import CommentItem from './CommentItem';
import { Empty } from 'antd';

interface Props {
  postId: number;
  items: any[];
}

export default function CommentList(props: Props) {
  const { postId, items = [] } = props;
  return (
    <div className={styles.commentArea}>
      {items.map(
        (item: {
          createdAt: string;
          id: number;
          author: {
            about: string;
            image: string;
            username: string;
          };
          content: string;
        }) => {
          return <CommentItem key={item.id} parentCommentId={item.id} postId={postId} item={item}></CommentItem>;
        }
      )}
      {items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
    </div>
  );
}
