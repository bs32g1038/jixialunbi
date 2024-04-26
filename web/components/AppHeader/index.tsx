import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { Avatar, Badge, Button, Drawer, Dropdown, Space } from 'antd';
import {
  BellOutlined,
  DownOutlined,
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import logo from './logo.png';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import AuthButton from '../AuthButton';
import { useAppStore } from '@/store';
import Search from './components/Search';

const NotificationIcon = () => {
  const router = useRouter();
  return (
    <Button
      type="text"
      size="small"
      onClick={() => {
        router.push('/notifications');
      }}
    >
      <Badge size="small">
        <BellOutlined style={{ fontSize: '18px' }} />
      </Badge>
    </Button>
  );
};

export default function AppHeader() {
  const router = useRouter();
  const { showLoginModal, user } = useAppStore();
  return (
    <header className={styles.header}>
      <div className={styles.headerleft}>
        <span className={styles.headerlinks}>
          <Link href="/" passHref={true} className={styles.title}>
            <img className={styles.logo} src={logo.src} alt="" />
            <h1 title="积下社区">积下社区</h1>
          </Link>
        </span>
      </div>
      <div className={styles.headerRight}>
        <Link href="/" passHref={true}>
          <Button size="small" type="text">
            <HomeOutlined></HomeOutlined>首页
          </Button>
        </Link>
        <AuthButton
          size="small"
          type="text"
          onClick={() => {
            router.push('/write');
          }}
        >
          <EditOutlined /> 写作
        </AuthButton>
        <span className={styles.headerlinks}>
          {user ? (
            <React.Fragment>
              <NotificationIcon></NotificationIcon>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <Space size={4}>
                          <UserOutlined></UserOutlined>
                          <span>个人信息</span>
                        </Space>
                      ),
                      key: 'userInfo',
                    },
                    {
                      label: (
                        <div
                          onClick={() => {
                            Cookies.remove('token');
                            router.refresh();
                          }}
                        >
                          <Space size={4}>
                            <LogoutOutlined />
                            <span>退出登录</span>
                          </Space>
                        </div>
                      ),
                      key: 'logout',
                    },
                  ],
                  onClick: ({ key }) => {
                    if (key === 'userInfo') {
                      router.push('/profile/' + user.id);
                    }
                    if (key === 'logout') {
                      Cookies.remove('token');
                      window.location.reload();
                    }
                  },
                }}
                trigger={['click']}
              >
                <Button size="small" type="text" style={{ lineHeight: 1 }}>
                  <Space className={styles.user} align="center">
                    <Avatar size="small" src={user.image} style={{ width: '18px', height: '18px' }}></Avatar>
                    <div className={styles.inputWrap}>{user.username}</div>
                    <div
                      className={classNames(styles.sign, {
                        [styles.green]: true,
                      })}
                    ></div>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </React.Fragment>
          ) : (
            <Button
              onClick={() => {
                showLoginModal(true);
              }}
              type="text"
              size="small"
            >
              <LoginOutlined />
              注册/登录
            </Button>
          )}
        </span>
        <span>
          <Button
            size="small"
            type="text"
            onClick={() => {
              router.push('/setting');
            }}
          >
            <SettingOutlined></SettingOutlined>
          </Button>
        </span>
      </div>
    </header>
  );
}
