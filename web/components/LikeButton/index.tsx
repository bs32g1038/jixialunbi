import { LikeOutlined } from '@ant-design/icons';
import React from 'react';
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
  const { trigger } = useSWRMutation({ url: '/api/v1/like-post/' + props.postId });
  return (
    <AuthButton
      className={classNames({
        [styles.active]: props.isActive,
      })}
      type="text"
      size="small"
      onClick={() => {
        trigger();
      }}
    >
      <Space size={4}>
        <LikeOutlined />
        <span>{props.count}赞同</span>
      </Space>
    </AuthButton>
  );
}
