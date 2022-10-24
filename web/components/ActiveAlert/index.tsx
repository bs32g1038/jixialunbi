import { useAppSelector } from '@/hooks';
import { Alert, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

export default function ActiveAlert() {
  const router = useRouter();
  const user = useAppSelector((state) => state.app.user);
  return user && !user?.isActived ? (
    <Alert
      showIcon
      message={
        <Space>
          <span>当前账号尚未激活，激活完成后，才能进行发帖。</span>
          <Button size="small" type="link" onClick={() => router.push('/profile/edit/' + user?.id)}>
            立刻前去激活
          </Button>
        </Space>
      }
      type="warning"
    />
  ) : (
    <div></div>
  );
}
