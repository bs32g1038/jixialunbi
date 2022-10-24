import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/apis';
import { Form, Input, InputNumber, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { noop } from 'lodash';
import React, { useEffect } from 'react';
import Modal from '@/components/Modal';

interface Props {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  data?: any;
}

export default function EditModal(props: Props) {
  const { visible, onOk = noop, onCancel, data } = props;
  const [form] = useForm();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const onFinish = (values: any) => {
    form.validateFields().then(async () => {
      if (data) {
        await updateCategory({ ...data, ...values }).then(() => {
          message.success('更新成功！');
        });
      } else {
        await createCategory({ ...values, order: 0 }).then(() => {
          message.success('提交成功！');
        });
      }
      await onOk();
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (data && form) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  return (
    <Modal
      title={data ? '编辑分类' : '添加分类'}
      open={visible}
      width={420}
      onOk={() => {
        form.submit();
        onOk();
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="顺序" name="order">
          <InputNumber min={0} max={50} />
        </Form.Item>
        <Form.Item label="描述" name="description" rules={[{ message: '请输入描述！' }]} style={{ marginBottom: 0 }}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
