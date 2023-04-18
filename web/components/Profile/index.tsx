import React from 'react';
import Layout from '../Layout';
import { Avatar, Button, Tabs } from 'antd';
import styles from './index.module.scss';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useSWR } from '@/hooks';
import Posts from './components/Posts';

export default function Profile() {
  const router = useRouter();
  const account = router.query?.account;
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
              <Button size="small" type="primary" icon={<PlusOutlined></PlusOutlined>}>
                关注
              </Button>
              <div className={styles.func}>
                {user?.account === id && (
                  <Button size="small" type="dashed" onClick={() => router.push('/profile/edit/' + data?.account)}>
                    <EditOutlined></EditOutlined>账号设置
                  </Button>
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
              <div>{data?.followersCount ?? '0'}</div>
              <div className={styles.metaItemDesc}>关注者</div>
            </div>
            <div className={styles.metaItem}>
              <div>{data?.followingCount ?? '0'}</div>
              <div className={styles.metaItemDesc}>被关注</div>
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
        items={[
          {
            label: '帖子',
            key: '1',
          },
          {
            label: '收藏',
            key: '2',
          },
          {
            label: '关注',
            key: '3',
          },
        ]}
      ></Tabs>
      <Posts></Posts>
    </Layout>
  );
}
