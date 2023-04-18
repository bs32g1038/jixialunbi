import { LikeOutlined } from '@ant-design/icons';
import React from 'react';
import AuthButton from '../AuthButton';
import { useSWRMutation } from '@/hooks';

interface Props {
  isActive: boolean;
  postId: number;
  likeCount: number;
}

export default function LikeButton(props: Props) {
  const { trigger } = useSWRMutation({ url: '/api/v1/like-post/' + props.postId });
  return (
    <AuthButton
      type="text"
      size="small"
      onClick={() => {
        trigger();
      }}
    >
      <span>
        <LikeOutlined />
        <span>赞同{props.likeCount}</span>
      </span>
    </AuthButton>
  );
}
