import React, { useRef } from 'react';
import styles from './index.module.scss';
import { Button, Form, Input, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import JEditor from '../JEditor';
import TagGroup from '../TagGroup';
import { useRouter } from 'next/router';
import { useSWR, useSWRMutation } from '@/hooks';
import Layout from '../Layout';

const Write = (props: { visible: boolean; postId?: number }) => {
  const [form] = useForm();
  const router = useRouter();
  const { data, isLoading } = useSWR({ url: '/api/v1/categories' });
  const { trigger: createPost } = useSWRMutation({ url: '/api/v1/posts' });
  const ref = useRef(null);
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      if (ref.current.getLength() > 3000) {
        return message.error('不能大于3000字');
      }
      createPost(values).then((res) => {
        message.success('发布成功！');
        router.reload();
      });
    });
  };
  return (
    <Layout>
      <Form form={form} onFinish={onFinish} className={styles.form}>
        <div className={styles.ctrl}>
          <Button onClick={() => form.submit()} type="primary">
            发布
          </Button>
        </div>
        <Form.Item name="title" rules={[{ required: true, message: '标题不能为空！' }]}>
          <Input placeholder="请输入标题"></Input>
        </Form.Item>
        <div className={styles.footer}>
          <Form.Item name="categoryId" label="分类" style={{ marginBottom: 0 }}>
            <Select bordered={false} loading={isLoading} style={{ width: 120 }} placeholder="请选择分类">
              {data?.data?.map((item: { id: any; name: string }) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="" style={{ marginBottom: 0 }}>
            <TagGroup></TagGroup>
          </Form.Item>
        </div>
        <Form.Item name="content" rules={[{ required: true, message: '内容不能为空！' }]}>
          <JEditor loading={false} ref={ref}></JEditor>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Write;
