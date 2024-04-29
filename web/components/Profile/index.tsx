'use client';

import React, { useState } from 'react';
import Layout from '../Layout';
import { Avatar, Tabs } from 'antd';
import styles from './index.module.scss';
import { EditOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { useSWR } from '@/hooks';
import Posts from './components/Posts';
import CollectionPosts from './components/CollectionPosts';
import Attendtion from './components/Attendtion';
import AuthButton from '../AuthButton';
import FollowButton from '../FollowButton';
import { useAppStore } from '@/store';

const TABS = {
  post: '帖子',
  collection: '收藏',
  attendtion: '关注',
};

export default function Profile() {
  const router = useRouter();
  const { id } = useParams();
  const { user: currentUser } = useAppStore();
  const [tab, setTab] = useState(TABS.post);
  const { data: _data } = useSWR({ url: '/api/v1/user-info/' + id });
  const user = _data?.data ?? {};
  const data = _data?.data ?? {};
  return (
    <Layout>
      <div className={styles.profit}>
        <Avatar size="large" src={data.image}></Avatar>
        <div className={styles.info}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: '1 0 auto', alignItems: 'flex-end', gap: 10 }}>
              <div>
                <h3 className={styles.name}>{data.username}</h3>
                <p className={styles.desc}>{data.about ?? '这家伙很懒，什么都没留下'}</p>
              </div>
              {id !== currentUser?.id && (
                <div className={styles.control}>
                  <FollowButton key={user?.followed} userId={user.id} followed={user?.followed} />
                </div>
              )}
            </div>
            <div className={styles.func}>
              {currentUser?.id === id && (
                <AuthButton size="small" type="dashed" onClick={() => router.push('/profile/edit/' + data?.id)}>
                  <EditOutlined></EditOutlined>账号设置
                </AuthButton>
              )}
            </div>
          </div>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div>{data?.postCount}</div>
              <div className={styles.metaItemDesc}>帖子</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.fanCount ?? '0'}</div>
              <div className={styles.metaItemDesc}>粉丝</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.followCount ?? '0'}</div>
              <div className={styles.metaItemDesc}>关注</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.likeCount}</div>
              <div className={styles.metaItemDesc}>获赞</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.commentCount ?? 0}</div>
              <div className={styles.metaItemDesc}>回答</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.collectionCount ?? 0}</div>
              <div className={styles.metaItemDesc}>收藏</div>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        className={styles.tabs}
        defaultActiveKey="1"
        size="small"
        activeKey={tab}
        onChange={setTab}
        items={Object.values(TABS).map((v) => {
          return {
            key: v,
            label: v,
          };
        })}
      ></Tabs>
      {tab == TABS.post && <Posts></Posts>}
      {tab == TABS.collection && <CollectionPosts></CollectionPosts>}
      {tab == TABS.attendtion && <Attendtion></Attendtion>}
    </Layout>
  );
}
