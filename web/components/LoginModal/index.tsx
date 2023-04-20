import React, { useState } from 'react';
import Modal from '../Modal';
import { Form, Input, Button, message, Space, Image, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'antd/lib/form/Form';
import Cookies from 'js-cookie';
import styles from './index.module.scss';
import CaptchaSvg from './components/CaptchaSvg';
import { omit } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { useAppStore } from '@/store';

export const LOGIN_TYPE = {
  login: 'login',
  register: 'register',
};

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  type: string;
  key: string;
}

async function sendRequest(url, { arg }) {
  return axios.post(url, arg);
}

export default function LoginModal() {
  const { isShowLoginModal, setUser, showLoginModal } = useAppStore();
  const [form] = useForm();
  const [tab, setTab] = useState(LOGIN_TYPE.login);
  const router = useRouter();
  const { trigger: login } = useSWRMutation('/api/v1/auth/login', sendRequest);
  const { trigger: register } = useSWRMutation('/api/v1/auth/signup', sendRequest);
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      if (tab === LOGIN_TYPE.login) {
        login(values).then((res) => {
          const token = res.data?.data?.token;
          console.log(res);
          message.success('登录成功！');
          Cookies.set('token', token);
          setUser(res.data?.data);
          router.reload();
        });
        return;
      }
      if (values.repeatPassword !== values.password) {
        return message.error('两次输入的密码不一致！');
      }
      register(omit(values, 'repeatPassword')).then((res) => {
        message.success('注册成功！');
        Cookies.set('token', res.token);
        axios.defaults.headers.common = { Authorization: `bearer ${res.token}` };
        setUser(res.user);
        router.reload();
      });
    });
  };
  return isShowLoginModal ? (
    <Modal
      style={{ top: 40 }}
      footer={null}
      width={330}
      open={isShowLoginModal}
      onCancel={() => {
        showLoginModal(false);
      }}
    >
      <div className={styles.wrap}>
        <h3>注册/登录</h3>
        <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="account"
            rules={[
              tab === LOGIN_TYPE.register
                ? { required: true, type: 'string', min: 6, max: 20, message: '请输入账号，位数6-20位之间!' }
                : {
                    required: true,
                    message: '请输入账号!',
                  },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
          </Form.Item>
          {tab === LOGIN_TYPE.register && (
            <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
            </Form.Item>
          )}
          <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
          </Form.Item>
          {tab === LOGIN_TYPE.register && (
            <Form.Item name="repeatPassword" rules={[{ required: true, message: '请再次输入你的密码!' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请再次输入你的密码"
              />
            </Form.Item>
          )}
          <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
            <Space>
              <Input prefix={<CaptchaSvg />} placeholder="请输入验证码" />
              <Image
                src="/api/v1/auth/captcha"
                alt=""
                preview={false}
                onClick={(e: any) => {
                  if (e.target?.nodeName?.toLocaleLowerCase() === 'img') {
                    e.target?.setAttribute('src', '/api/v1/auth/captcha?' + new Date().getTime());
                  }
                }}
              ></Image>
            </Space>
          </Form.Item>
          <Form.Item>
            <div className={styles.loginDescription}>
              <Space align="end" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>积下论笔社区</div>
                {tab === LOGIN_TYPE.register && (
                  <Button
                    size="small"
                    type="default"
                    className={styles.switchRegisterButton}
                    onClick={() => setTab(LOGIN_TYPE.login)}
                  >
                    登录
                  </Button>
                )}
                {tab === LOGIN_TYPE.login && (
                  <Button
                    size="small"
                    type="default"
                    className={styles.switchRegisterButton}
                    onClick={() => setTab(LOGIN_TYPE.register)}
                  >
                    注册
                  </Button>
                )}
              </Space>
              <div>
                <Space className={styles.desc}>
                  <Form.Item valuePropName="checked" noStyle>
                    <Checkbox checked={true}></Checkbox>
                  </Form.Item>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              {tab === LOGIN_TYPE.register ? '注册' : '登录'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  ) : (
    <div></div>
  );
}
