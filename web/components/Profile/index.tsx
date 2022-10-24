import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Avatar, Button, Tabs } from 'antd';
import styles from './index.module.scss';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Posts from './components/Posts';
import { useLazyFetchUserByIdQuery } from '@/apis';
import { useAppSelector } from '@/hooks';

export default function Profile() {
  const router = useRouter();
  const id = router.query?.id;
  const user = useAppSelector((state) => state.app.user);
  const [fetchUser, { data = {} }] = useLazyFetchUserByIdQuery();
  useEffect(() => {
    if (id) {
      fetchUser({ userId: Number(id) });
    }
  }, [fetchUser, id]);
  return (
    <Layout>
      <div className={styles.profit}>
        <div className={styles.func}>
          {user?.id === Number(id) && (
            <Button size="small" type="dashed" onClick={() => router.push('/profile/edit/' + data?.id)}>
              <EditOutlined></EditOutlined>账号设置
            </Button>
          )}
        </div>
        <Avatar src={data.image}></Avatar>
        <h3 className={styles.name}>{data.username}</h3>
        <p className={styles.desc}>{data.about ?? '这家伙很懒，什么都没留下'}</p>
      </div>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div>{data?.postCount}</div>
          <div className={styles.metaItemDesc}>帖子</div>
        </div>
        <div className={styles.metaItem}>
          <div>{data?.followersCount}</div>
          <div className={styles.metaItemDesc}>关注者</div>
        </div>
        <div className={styles.metaItem}>
          <div>{data?.followingCount}</div>
          <div className={styles.metaItemDesc}>被关注</div>
        </div>
        <div className={styles.metaItem}>
          <div>{data?.likeCount}</div>
          <div className={styles.metaItemDesc}>获赞</div>
        </div>
        <div className={styles.metaItem}>
          <div>{data?.replyCount ?? 0}</div>
          <div className={styles.metaItemDesc}>回答</div>
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
            children: <Posts></Posts>,
          },
        ]}
      ></Tabs>
    </Layout>
  );
}
