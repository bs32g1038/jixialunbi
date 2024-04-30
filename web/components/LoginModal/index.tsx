import React, { useState } from 'react';
import Modal from '../Modal';
import styles from './index.module.scss';
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

export default function LoginModal() {
  const { isShowLoginModal, showLoginModal } = useAppStore();
  const [tab, setTab] = useState(LOGIN_TYPE.login);
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
