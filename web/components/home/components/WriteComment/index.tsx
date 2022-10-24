import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useCreateCommentMutation } from '@/apis';

interface Props {
  postId: number;
  replyId?: number;
  parentId?: number;
}

export default function WriteComment(props: Props) {
  const [form] = useForm();
  const [create] = useCreateCommentMutation();
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      create({ ...values, postId: props.postId, parentId: props.parentId, replyId: props.replyId })
        .unwrap()
        .then(() => {
          message.success('提交成功！');
          form.resetFields();
        });
    })
  };
  return (
    <Form form={form} className={styles.write} onFinish={onFinish}>
      <Form.Item name="content" className={styles.inputWrap} rules={[{ required: true, message: '最多1-200字', min: 1, max: 200 }]}>
        <Input.TextArea
          className={styles.input}
          size="small"
          placeholder="发布你的评论！"
          autoSize={{ minRows: 1, maxRows: 5 }}
        ></Input.TextArea>
      </Form.Item>
      <div className={styles.footer}>
        <Button size="small" type="primary" onClick={() => form.submit()}>
          评论
        </Button>
      </div>
    </Form>
  );
}
