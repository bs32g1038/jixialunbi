import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Form, message, Select, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import JEditor from '../JEditor';
import TagGroup from '../TagGroup';
import Modal from '../Modal';
import { useAppSelector } from '@/hooks';
import { useDispatch } from 'react-redux';
import { setWriteModalState } from '@/store/app';
import {
  useCreatePostMutation,
  useFetchCategoriesQuery,
  useLazyFetchPostByIdQuery,
  useUpdatePostMutation,
} from '@/apis';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Core = (props: { visible: boolean; postId?: number }) => {
  const { visible, postId } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = useForm();
  const { data = [] } = useFetchCategoriesQuery();
  const [fetchPost, { data: postData }] = useLazyFetchPostByIdQuery();
  useEffect(() => {
    if (postId) {
      fetchPost({ postId });
    }
  }, [fetchPost, postId]);
  const [createPost, { isLoading: createLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();
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
      if (ref.current.getLength() > 400) {
        return message.error('不能大于400字');
      }
      Object.assign(values, {
        pics: values.pics
          ?.map((item) => {
            return item.url;
          })
          .join(','),
      });
      if (postId) {
        return updatePost({ ...values, id: postId })
          .unwrap()
          .then((res) => {
            message.success('更新成功！');
            router.push(`/category/${res.categoryId}?postId=${res.id}`);
          })
          .then(() => {
            dispatch(
              setWriteModalState({
                visible: false,
                postId: '',
              })
            );
          });
      }
      createPost(values)
        .unwrap()
        .then((res) => {
          message.success('发布成功！');
          router.push(`/category/${res.categoryId}?postId=${res.id}`);
        })
        .then(() => {
          dispatch(
            setWriteModalState({
              visible: false,
              postId: '',
            })
          );
        });
    });
  };
  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue({
        ...(postId ? postData : {}),
        categoryId: postData?.categoryId ?? data?.[0]?.id,
        pics: !postData?.pics
          ? []
          : postData?.pics?.split(',').map((item, index) => ({
              uid: index,
              status: 'done',
              url: item,
            })),
      });
    }
  }, [data, form, postData, postId, visible]);
  return (
    <Modal
      title={postId ? '编辑' : '写作'}
      footer={null}
      open={visible}
      onCancel={() => {
        dispatch(
          setWriteModalState({
            visible: false,
            postId: '',
          })
        );
      }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true, message: '内容不能为空！' }]}>
          <JEditor loading={createLoading || updateLoading} ref={ref}></JEditor>
        </Form.Item>
        <div className={styles.footer}>
          <Form.Item name="categoryId" label="分类" style={{ marginBottom: 0 }}>
            <Select bordered={false} style={{ width: 120 }}>
              {data.map((item: { id: any; name: string }) => {
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
  const { visible, postId } = useAppSelector((state) => state.app.writeModalState);
  return visible ? <Core visible={visible} postId={postId}></Core> : <div />;
}

export default Write;
