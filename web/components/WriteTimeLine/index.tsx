import React, { useEffect, useRef } from 'react';
import { Form, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import JEditor from '../JEditor';
import Modal from '../Modal';
import { useCreateTimeLineMutation, useLazyFetchTimeLineQuery, useUpdateTimeLineMutation } from './service';

function WriteTimeLine(props: { visible: boolean; id?: number; postId?: number; onCancel: () => void }) {
  const { visible, postId, onCancel, id } = props;
  const [form] = useForm();
  const [fetchTimeLine, { data }] = useLazyFetchTimeLineQuery();
  useEffect(() => {
    if (id) {
      fetchTimeLine({ id });
    }
  }, [fetchTimeLine, id]);
  const [createTimeLine] = useCreateTimeLineMutation();
  const [updateTimeLine] = useUpdateTimeLineMutation();
  const ref = useRef(null);
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      if (ref.current.getLength() > 300) {
        message.error('不能大于300字');
        return;
      }
      if (id) {
        return updateTimeLine({ ...values, id }).then(() => {
          message.success('更新成功！');
        });
      }
      createTimeLine({
        ...values,
        postId,
      })
        .unwrap()
        .then(() => {
          message.success('发布成功！');
        });
    });
  };
  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue(data);
    }
  }, [form, data, postId, visible]);
  return (
    <Modal title={id ? '编辑' : '添加时间线'} footer={null} open={visible} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true, message: '内容不能为空！' }]}>
          <JEditor ref={ref} placeholder={'时间线'}></JEditor>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default WriteTimeLine;
