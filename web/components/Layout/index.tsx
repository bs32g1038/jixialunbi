import { useGetLoginUserQuery } from '@/apis';
import { ArrowUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/app';
import ActiveAlert from '../ActiveAlert';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import LoginModal from '../LoginModal';
import Write from '../Write';
import styles from './index.module.scss';

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
  // const { data: user } = useGetLoginUserQuery();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setUser(user));
  // }, [dispatch, user]);
  return (
    // <div className={styles.d}>
    //   <div className={styles.left}>
    //     <div>test</div>
    //   </div>
    <div className={styles.wrap}>
      <AppHeader></AppHeader>
      {/* <ActiveAlert></ActiveAlert> */}
      {children}
      <AppFooter></AppFooter>
      {/* <LoginModal></LoginModal> */}
      {/* <Write></Write> */}
      <BackTop>
        <div style={style}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
      {/* </div> */}
    </div>
  );
}
