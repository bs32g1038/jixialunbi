import React, { useEffect } from 'react';
import Layout from '../Layout';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useForm } from 'antd/lib/form/Form';
import { useLazyGetUserByIdQuery, useUpdateUserMutation } from '@/apis';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/hooks';

const EditableInput: any = dynamic(() => import('../EditableInput') as any, {
  ssr: false,
});

export default function ProfileEdit() {
  const router = useRouter();
  const [form] = useForm();
  const id = router.query.id;
  const user = useAppSelector((state) => state.app.user);
  const [fetchUser, { data = {} }] = useLazyGetUserByIdQuery();
  useEffect(() => {
    if (id) {
      fetchUser({ id });
    }
  }, [fetchUser, id]);
  const [update, { isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    form.setFieldsValue({
      username: data?.username,
      about: data?.about,
      image: data?.image,
      email: data?.email,
    });
  }, [data, form]);
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      update({ ...values, id: Number(id) })
    });
  };
  return (
    <Layout>
      <div>
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
          extra={user?.isActived ? '当前邮箱已通过验证' : '当前邮箱尚未验证'}
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
