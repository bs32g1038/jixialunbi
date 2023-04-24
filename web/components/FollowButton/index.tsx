import React, { useState } from 'react';
import AuthButton from '../AuthButton';
import { PlusOutlined } from '@ant-design/icons';
import { useSWRMutation } from '@/hooks';

interface Props {
  account: string;
  followed: boolean;
}

export default function FollowButton(props: Props) {
  const { account } = props;
  const [followed, setFollowed] = useState(props.followed);
  const { trigger, isMutating } = useSWRMutation({ url: '/api/v1/follow-user/' + account });
  return (
    <AuthButton
      size="small"
      type="primary"
      icon={<PlusOutlined></PlusOutlined>}
      loading={isMutating}
      style={
        followed
          ? {
              backgroundColor: '#f2f3f5',
              color: '#8a919f',
            }
          : {}
      }
      onClick={() => {
        trigger().then(() => {
          setFollowed(!followed);
        });
      }}
    >
      {followed ? '已关注' : '关注'}
    </AuthButton>
  );
}
