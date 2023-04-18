import { useCreateLikeMutation, useDeleteLikeMutation } from './service';
import { LikeOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import AuthButton from '../AuthButton';
import styles from './index.module.scss';

interface Props {
  isActive: boolean;
  postId: number;
  likeCount: number;
}

export default function LikeButton(props: Props) {
  const [isActive, setIsActive] = useState(props.isActive);
  const [count, setCount] = useState(props.likeCount);
  // const [createApi] = useCreateLikeMutation();
  // const [deleteApi] = useDeleteLikeMutation();
  // useEffect(() => {
  //   setIsActive(props.isActive);
  //   setCount(props.likeCount);
  // }, [props.isActive, props.likeCount]);
  return (
    <div
      className={styles.wrap}
      onClick={async () => {
        if (isActive) {
          // await deleteApi({ postId: props.postId });
          setCount(count - 1);
          setIsActive(false);
        } else {
          // await createApi({ postId: props.postId });
          setCount(count + 1);
          setIsActive(true);
        }
      }}
    >
      <div
        className={classNames(styles.btn, {
          [styles.active]: isActive,
        })}
      >
        <LikeOutlined style={{ fontSize: 24 }} />
      </div>
      <div>{count}</div>
    </div>
  );
}
