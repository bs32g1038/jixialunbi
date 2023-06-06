import React, { useState } from 'react';
import Layout from '../Layout';
import { Avatar, Tabs } from 'antd';
import styles from './index.module.scss';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useSWR } from '@/hooks';
import Posts from './components/Posts';
import CollectionPosts from './components/CollectionPosts';
import AuthButton from '../AuthButton';
import FollowButton from '../FollowButton';

const TABS = {
  post: '帖子',
  collection: '收藏',
  // attendtion: '关注',
};

export default function Profile() {
  const router = useRouter();
  const [tab, setTab] = useState(TABS.post);
  const account = router.query.account as string;
  const { data: _data } = useSWR({ url: '/api/v1/user-info/' + account });
  const user = _data?.data ?? {};
  const data = _data?.data ?? {};
  return (
    <Layout>
      <div className={styles.profit}>
        <Avatar size="large" src={data.image}></Avatar>
        <div className={styles.info}>
          <div style={{ display: 'flex', flex: '1 0 auto', alignItems: 'flex-end', gap: 10 }}>
            <div>
              <h3 className={styles.name}>{data.username}</h3>
              <p className={styles.desc}>{data.about ?? '这家伙很懒，什么都没留下'}</p>
            </div>
            <div className={styles.control}>
              <FollowButton key={user?.followed} account={account} followed={user?.followed} />
              <div className={styles.func}>
                {user?.account === account && (
                  <AuthButton size="small" type="dashed" onClick={() => router.push('/profile/edit/' + data?.account)}>
                    <EditOutlined></EditOutlined>账号设置
                  </AuthButton>
                )}
              </div>
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
    </Layout>
  );
}
