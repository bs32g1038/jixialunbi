import React, { useRef } from 'react';
import styles from './index.module.scss';
import { Form, Input, Select, Upload, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import JEditor from '../JEditor';
import TagGroup from '../TagGroup';
import Modal from '../Modal';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppStore } from '@/store';
import { useSWR, useSWRMutation } from '@/hooks';

const Core = (props: { visible: boolean; postId?: number }) => {
  const { showWriteModal } = useAppStore();
  const { visible, postId } = props;
  const [form] = useForm();
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR({ url: '/api/v1/categories', params: { a: 1 } });
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
            file.url = file.response?.data?.url;
          }
          return file;
        });
      return fileList;
    }

    return info && info.fileList;
  };
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      if (ref.current.getLength() > 2000) {
        return message.error('不能大于2000字');
      }
      createPost(values).then((res) => {
        message.success('发布成功！');
        router.reload();
      });
    });
  };
  return (
    <Modal
      title={postId ? '编辑' : '写作'}
      footer={null}
      open={visible}
      onCancel={() => {
        showWriteModal(null, false);
      }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true, message: '标题不能为空！' }]}>
          <Input placeholder="请输入标题"></Input>
        </Form.Item>
        <Form.Item name="content" rules={[{ required: true, message: '内容不能为空！' }]}>
          <JEditor loading={false} ref={ref}></JEditor>
        </Form.Item>
        <div className={styles.footer}>
          <Form.Item name="categoryId" label="分类" style={{ marginBottom: 0 }}>
            <Select bordered={false} loading={isLoading} style={{ width: 120 }}>
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
        <Form.Item name="pics" valuePropName="fileList" getValueFromEvent={handleUpload}>
          <Upload name="file" action="/api/files/upload" listType="picture-card" maxCount={4}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function Write() {
  const { visible, postId } = useAppStore((root) => root.isShowWriteModal);
  return visible ? <Core visible={visible} postId={postId}></Core> : <div />;
}

export default Write;
