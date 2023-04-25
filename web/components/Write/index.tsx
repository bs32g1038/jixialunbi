import React, { useRef } from 'react';
import styles from './index.module.scss';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import JEditor from '../JEditor';
import TagGroup from '../TagGroup';
import { useRouter } from 'next/router';
import { useSWR, useSWRMutation } from '@/hooks';
import Layout from '../Layout';
import { PlusOutlined } from '@ant-design/icons';

const Write = (props: { visible: boolean; postId?: number }) => {
  const [form] = useForm();
  const router = useRouter();
  const { data, isLoading } = useSWR({ url: '/api/v1/categories' });
  const { trigger: createPost } = useSWRMutation({ url: '/api/v1/posts' });
  const ref = useRef(null);
  const handleUpload = (info) => {
    if (Array.isArray(info)) {
      return info;
    }
    if (info.file.status === 'done') {
      const fileList =
        info &&
        info.fileList.map((file) => {
          if (file.response) {
            file.url = file.response?.data;
          }
          return file;
        });
      return fileList;
    }

    return info && info.fileList;
  };
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      if (ref.current.getLength() > 3000) {
        return message.error('不能大于3000字');
      }
      console.log(values);
      Object.assign(values, {
        pics: values.pics
          ?.map((item) => {
            return item.url;
          })
          .join(','),
      });
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
        <div style={{ borderTop: '1px solid #f1f1f1', paddingTop: 10 }}>
          <Form.Item name="pics" valuePropName="fileList" getValueFromEvent={handleUpload}>
            <Upload name="file" action="/api/v1/files/upload" listType="picture-card" maxCount={4}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </Layout>
  );
};

export default Write;
