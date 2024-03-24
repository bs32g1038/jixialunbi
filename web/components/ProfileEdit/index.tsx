'use client';

import React from 'react';
import Layout from '../Layout';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store';
import { useSWR, useSWRMutation } from '@/hooks';
import { message } from 'antd';
import styles from './index.module.scss';

const EditableInput: any = dynamic(() => import('../EditableInput') as any, {
  ssr: false,
});

export default function ProfileEdit() {
  const { account } = useParams();
  const user = useAppStore((state) => state.user);
  const { data: _data, isLoading } = useSWR({ url: '/api/v1/user-info/' + account });
  const data = _data?.data ?? {};
  const { trigger } = useSWRMutation({ url: '/api/v1/user/update' });
  const onFinish = (values) => {
    trigger(values).then(() => {
      message.success('提交成功！');
    });
  };
  return (
    <Layout>
      <div className={styles.wrap}>
        <EditableInput
          type="upload"
          value={data.image}
          label="头像"
          name="image"
          loading={isLoading}
          onFinish={onFinish}
        ></EditableInput>
        <EditableInput
          value={data?.username}
          label="用户名"
          name="username"
          placeholder="用户名"
          loading={isLoading}
          onFinish={onFinish}
          rules={[{ required: true, type: 'string', min: 1, max: 18, message: '请输入用户名，字数1-18位之间!' }]}
        ></EditableInput>
        <EditableInput
          value={data?.email}
          type="email"
          label="邮箱"
          name="email"
          extra={user?.actived ? '当前邮箱已通过验证' : '当前邮箱尚未验证'}
          placeholder="邮箱"
          loading={isLoading}
          onFinish={onFinish}
        ></EditableInput>
        <EditableInput
          value={data?.about}
          type="textarea"
          label="关于"
          name="about"
          placeholder="这家伙很懒，什么都没留下"
          loading={isLoading}
          onFinish={onFinish}
        ></EditableInput>
        <EditableInput
          value={''}
          type="password"
          label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
          name="username"
          placeholder="密码已设置"
          loading={isLoading}
          onFinish={onFinish}
        ></EditableInput>
      </div>
    </Layout>
  );
}
