import React from 'react';
import styles from './index.module.scss';
import { Avatar, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useSWRMutation } from '@/hooks';
import { useAppStore } from '@/store';
import AuthButton from '@/components/AuthButton';

interface Props {
  postId: number;
  replyId?: number;
  parentId?: number;
}

export default function WriteComment(props: Props) {
  const [form] = useForm();
  const { user } = useAppStore();
  const { trigger } = useSWRMutation({ url: '/api/v1/comments' });
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      trigger({ ...values, postId: props.postId, parentId: props.parentId, replyId: props.replyId }).then(() => {
        message.success('提交成功！');
        form.resetFields();
      });
    });
  };
  return (
    <div className={styles.write}>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item>
          <Avatar src={user?.image}></Avatar>
        </Form.Item>
        <Form.Item
          name="content"
          className={styles.inputWrap}
          rules={[{ required: true, message: '最多1-200字', min: 1, max: 200 }]}
        >
          <Input.TextArea
            className={styles.input}
            size="small"
            placeholder="发布你的评论！"
            autoSize={{ minRows: 1, maxRows: 5 }}
          ></Input.TextArea>
        </Form.Item>
        <div className={styles.footer}>
          <AuthButton className={styles.footerBtn} onClick={() => form.submit()}>
            发布
          </AuthButton>
        </div>
      </Form>
    </div>
  );
}
