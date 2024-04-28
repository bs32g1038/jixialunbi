'use client';

import styles from './index.module.scss';
import Layout from '@/components/Layout';
import TopTip from '../home/components/TopTip';
import CategoryList from '../home/components/CategoryList';
import Link from 'next/link';
import { Avatar, Skeleton } from 'antd';
import FollowButton from '@/components/FollowButton';
import { useSWR } from '@/hooks';

export default function HotAuthors() {
  const { data, isLoading } = useSWR({ url: '/api/v1/hot-users' });
  return (
    <Layout>
      <TopTip></TopTip>
      <CategoryList></CategoryList>
      <div className={styles.content}>
        <div className={styles.inner}>
          <Skeleton loading={isLoading} className={styles.list}>
            {(data?.data?.content ?? []).map((item) => {
              return (
                <div className={styles.item} key={item.id}>
                  <Link href={`/profile/${item?.id}`} className={styles.itemA}>
                    <Avatar className={styles.avatar} src={item.image}></Avatar>
                    <div>
                      <p>{item.username}</p>
                      <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                        {item.postCount} 帖子 • {item.commentCount} 评论 • {item.likeCount} 获赞 • {item.fanCount} 粉丝
                      </span>
                    </div>
                  </Link>
                  <FollowButton userId={item.id} followed={item.followed}></FollowButton>
                </div>
              );
            })}
          </Skeleton>
        </div>
      </div>
    </Layout>
  );
}
