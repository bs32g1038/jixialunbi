import { useCreateCollectionMutation, useDeleteCollectionMutation } from '@/apis';
import { StarOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showLoginModal } from '../../store/app';
import AuthButton from '../AuthButton';
import styles from './index.module.scss';

interface Props {
  isActive: boolean;
  postId: number;
  collectCount: number;
}

export default function CollectButton(props: Props) {
  const [isActive, setIsActive] = useState(props.isActive);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(props.collectCount);
  const [createApi] = useCreateCollectionMutation();
  const [deleteApi] = useDeleteCollectionMutation();
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    setIsActive(props.isActive);
    setCount(props.collectCount);
  }, [props.isActive, props.collectCount]);
  return (
    <AuthButton
      type="text"
      className={classNames(styles.btn, {
        [styles.active]: isActive,
      })}
      onClick={async () => {
        if (!user) {
          dispatch(showLoginModal(true));
        }
        if (isActive) {
          await deleteApi({ postId: props.postId });
          setCount(count - 1);
        } else {
          await createApi({ postId: props.postId });
          setCount(count + 1);
        }
        setIsActive(!isActive);
      }}
    >
      <span>
        <StarOutlined />
        <span>收藏{count}</span>
      </span>
    </AuthButton>
  );
}
