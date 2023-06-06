import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import AuthButton from '../AuthButton';
import { useSWRMutation } from '@/hooks';
import classNames from 'classnames';
import styles from './index.module.scss';
import { Space } from 'antd';

interface Props {
  isActive: boolean;
  postId: number;
  count: number;
}

export default function LikeButton(props: Props) {
  const { trigger, isMutating } = useSWRMutation({ url: '/api/v1/like-post/' + props.postId });
  const [isActive, setIsActive] = useState(props.isActive);
  const [count, setCount] = useState(props.count);
  useEffect(() => {
    setIsActive(props.isActive);
    setCount(props.count);
  }, [props.isActive, props.count]);
  return (
    <AuthButton
      className={classNames({
        [styles.active]: isActive,
      })}
      type="text"
      size="small"
      loading={isMutating}
      onClick={() => {
        trigger().then(() => {
          if (isActive) {
            setCount(count - 1);
          } else {
            setCount(count + 1);
          }
          setIsActive(!isActive);
        });
      }}
    >
      <Space size={4}>
        {isActive ? <LikeFilled /> : <LikeOutlined />}
        <span>{count}赞同</span>
      </Space>
    </AuthButton>
  );
}
