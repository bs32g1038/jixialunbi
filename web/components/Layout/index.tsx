'use client';

import { ArrowUpOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import React, { useEffect } from 'react';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import LoginModal from '../LoginModal';
import styles from './index.module.scss';
import useSWR from 'swr';
import { fetcher } from '../home/services';
import { useAppStore } from '@/store';
import RightSide from './RightSide';

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#85a5ff',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

export default function Layout(props: any) {
  const children = props.children;
  const { data } = useSWR('/api/v1/login-user-info', fetcher);
  const { setUser } = useAppStore();
  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);
  return (
    <div style={{ display: 'flex', gap: 10, maxWidth: 660, margin: '0 auto' }}>
      <div className={styles.wrap}>
        <AppHeader></AppHeader>
        {/* <ActiveAlert></ActiveAlert> */}
        {children}
        <AppFooter></AppFooter>
        <LoginModal></LoginModal>
        {/* <Write></Write> */}
        <FloatButton.BackTop>
          <div style={style}>
            <ArrowUpOutlined />
          </div>
        </FloatButton.BackTop>
        {/* </div> */}
      </div>
      {/* <RightSide /> */}
    </div>
  );
}
