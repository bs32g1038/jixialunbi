import React, { useState } from 'react';
import Modal from '../Modal';
import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'antd/lib/form/Form';
import Cookies from 'js-cookie';
import styles from './index.module.scss';
import { omit } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { useAppStore } from '@/store';
import Login from './components/Login';
import Register from './components/Register';

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
          message.success('登录成功！');
          Cookies.set('token', token);
          setUser(res.data?.data);
          router.refresh();
          showLoginModal(false);
        });
        return;
      }
      if (values.repeatPassword !== values.password) {
        return message.error('两次输入的密码不一致！');
      }
      register(omit(values, 'repeatPassword')).then((res: any) => {
        message.success('注册成功！');
        Cookies.set('token', res.token);
        axios.defaults.headers.common = { Authorization: `bearer ${res.token}` };
        setUser(res.user);
        // router.reload();
      });
    });
  };
  return isShowLoginModal ? (
    <Modal
      wrapClassName={styles.modal}
      title="积下社区"
      footer={null}
      width={330}
      centered
      open={isShowLoginModal}
      maskClosable={false}
      onCancel={() => {
        showLoginModal(false);
      }}
    >
      {tab === LOGIN_TYPE.login && <Login jumpRegister={() => setTab(LOGIN_TYPE.register)}></Login>}
      {tab === LOGIN_TYPE.register && <Register jumpLogin={() => setTab(LOGIN_TYPE.login)}></Register>}
    </Modal>
  ) : (
    <div></div>
  );
}
