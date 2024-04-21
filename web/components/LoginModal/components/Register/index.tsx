import React from 'react';
import { Form, Input, Button, message, Space, Image } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { omit } from 'lodash';
import useSWRMutation from 'swr/mutation';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  type: string;
  key: string;
}

async function sendRequest(url, { arg }) {
  return axios.post(url, arg);
}

interface Props {
  jumpLogin: () => void;
}

export default function CLogin(props: Props) {
  const { jumpLogin } = props;
  const [form] = useForm();
  const { trigger: register } = useSWRMutation('/api/v1/auth/signup', sendRequest);
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      console.log(values, values.repeatPassword !== values.password);
      if (values.repeatPassword !== values.password) {
        return message.error('两次输入的密码不一致！');
      }
      register(omit(values, 'repeatPassword')).then((res: any) => {
        message.success('注册成功！');
        jumpLogin?.();
      });
    });
  };
  return (
    <div className={styles.wrap}>
      <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input
            prefix={
              <Space size={3}>
                <MailOutlined className="site-form-item-icon" />
                <span>邮箱</span>
              </Space>
            }
            placeholder="请输入邮箱"
          />
        </Form.Item>
        <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
          <Space style={{ display: 'flex' }}>
            <Input
              prefix={
                <Space size={3}>
                  <CaptchaSvg />
                  <span>验证码</span>
                </Space>
              }
              placeholder="请输入验证码"
              style={{
                width: '100%',
              }}
            />
            <Image
              src="/api/v1/auth/captcha"
              alt=""
              style={{
                height: 40,
              }}
              preview={false}
              onClick={(e: any) => {
                if (e.target?.nodeName?.toLocaleLowerCase() === 'img') {
                  e.target?.setAttribute('src', '/api/v1/auth/captcha?' + new Date().getTime());
                }
              }}
            ></Image>
          </Space>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码' }]}>
          <Input
            autoComplete="new-password"
            prefix={
              <Space size={3}>
                <LockOutlined className="site-form-item-icon" />
                <span>密码</span>
              </Space>
            }
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item name="repeatPassword" rules={[{ required: true, message: '请再次输入你的密码' }]}>
          <Input
            prefix={
              <Space size={3}>
                <LockOutlined className="site-form-item-icon" />
                <span>确认密码</span>
              </Space>
            }
            type="password"
            placeholder="请再次输入你的密码"
          />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className={styles.loginButton}>
            注册
          </Button>
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button size="small" type="text" onClick={() => jumpLogin?.()}>
            已有账号，点击这里去登录{'>>'}
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={styles.loginDescription}>
            <div>
              <Space className={styles.desc}>
                <div className={styles.agreementBox}>
                  注册登录即表示同意
                  <a href="/terms" target="_blank">
                    用户协议
                  </a>
                  、
                  <a href="/privacy" target="_blank">
                    隐私政策
                  </a>
                </div>
              </Space>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
