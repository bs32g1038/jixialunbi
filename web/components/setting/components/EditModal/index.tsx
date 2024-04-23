import { Form, Input, InputNumber, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { noop } from 'lodash';
import React, { useEffect } from 'react';
import Modal from '@/components/Modal';
import { useSWRMutation } from '@/hooks';

interface Props {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  data?: any;
}

export default function EditModal(props: Props) {
  const { visible, onOk = noop, onCancel, data } = props;
  const [form] = useForm();
  const { trigger: createCategory, isMutating: createIsMutating } = useSWRMutation({ url: '/api/v1/tags/create' });
  const { trigger: updateCategory } = useSWRMutation({ url: '/api/v1/tags/update' });
  const onFinish = (values: any) => {
    form.validateFields().then(async () => {
      if (data) {
        await updateCategory({ ...data, ...values }).then(() => {
          message.success('更新成功');
        });
      } else {
        await createCategory({ ...values, order: 0 }).then(() => {
          message.success('提交成功');
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
      title={data ? '编辑标签' : '添加标签'}
      open={visible}
      width={420}
      confirmLoading={createIsMutating}
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
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="顺序" name="order">
          <InputNumber placeholder="请输入" min={0} max={50} />
        </Form.Item>
        <Form.Item label="描述" name="description" rules={[{ message: '请输入' }]} style={{ marginBottom: 0 }}>
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
