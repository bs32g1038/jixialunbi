import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { Avatar, Badge, Button, Dropdown, List, Menu, message, Space } from 'antd';
import { BellOutlined, DownOutlined, HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import logo from './logo.png';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setWriteModalState, showLoginModal } from '../../store/app';
import WriteSvg from './WriteSvg';
import AuthButton from '../AuthButton';
import { useFetchNotificationsQuery, useUpdateNotificationsMutation } from '@/apis';

const NotificationIcon = () => {
  const user = useAppSelector((state) => state.app.user);
  const { data, refetch } = useFetchNotificationsQuery({ receiverId: user?.id ?? 0 }, { skip: !user?.id });
  const [update] = useUpdateNotificationsMutation();
  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={(val) => {
        if (val) {
          refetch();
        }
      }}
      dropdownRender={() => (
        <List
          className={styles.noticeList}
          style={{
            width: 300,
            backgroundColor: '#fff',
            boxShadow:
              '0 6px 16px -8px rgb(0 0 0 / 8%), 0 9px 28px 0 rgb(0 0 0 / 5%), 0 12px 48px 16px rgb(0 0 0 / 3%)',
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>{item.title}</div>
                    <Button
                      size="small"
                      type="ghost"
                      onClick={() => {
                        update({ id: item.id })
                          .unwrap()
                          .then(() => {
                            message.success('已经标记为已读！');
                            refetch();
                          });
                      }}
                    >
                      标记为已读
                    </Button>
                  </div>
                }
                description={<p>{item.content}</p>}
              />
            </List.Item>
          )}
        />
      )}
    >
      <Button type="text" size="small">
        <Badge count={data?.length ?? 0} size="small">
          <BellOutlined style={{ fontSize: '18px' }} />
        </Badge>
      </Button>
    </Dropdown>
  );
};

export default function AppHeader() {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const user = useAppSelector((state) => state.app.user);
  return (
    <header className={styles.header}>
      <div className={styles.headerleft}>
        <span className={styles.headerlinks}>
          <Link href="/" passHref={true} className={styles.title}>
            <img className={styles.logo} src={logo.src} alt="" />
            <h1 title="积下论笔社区">积下论笔社区</h1>
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
          onClick={
            () => {}
            // dispatch(
            //   setWriteModalState({
            //     visible: true,
            //   })
            // )
          }
        >
          <Space>
            <WriteSvg></WriteSvg>写作
          </Space>
        </AuthButton>
        {/* <span className={styles.headerlinks}>
          {user ? (
            <React.Fragment>
              <NotificationIcon></NotificationIcon>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: <Link href={'/profile/' + user.id}>个人信息</Link>,
                      key: '0',
                    },
                  ],
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
              <Button
                onClick={() => {
                  Cookies.remove('token');
                  router.reload();
                }}
                type="text"
                size="small"
              >
                <LogoutOutlined />
                注销
              </Button>
            </React.Fragment>
          ) : (
            <Button
              onClick={() => {
                dispatch(showLoginModal(true));
              }}
              type="text"
              size="small"
            >
              <LoginOutlined />
              注册/登录
            </Button>
          )}
        </span> */}
        <Button
          onClick={() => {
            // dispatch(showLoginModal(true));
          }}
          type="text"
          size="small"
        >
          <LoginOutlined />
          注册/登录
        </Button>
      </div>
    </header>
  );
}
