import React from 'react';
import styles from './index.module.scss';
import WriteComment from '../WriteComment';
import { useFetchCommentsQuery } from '@/apis';
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
      {/* <WriteComment postId={postId}></WriteComment> */}
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
          return <CommentItem key={item.id} postId={postId} item={item}></CommentItem>;
        }
      )}
      {items?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}
    </div>
  );
}
