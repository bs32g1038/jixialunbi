import { Affix, Avatar, Skeleton } from 'antd';
import styles from './index.module.scss';
import { useSWR } from '@/hooks';
import Link from 'next/link';

export default function RightSide() {
  const { data, isLoading: getUserLoading } = useSWR({ url: '/api/v1/recent-users' });
  return (
    <Affix
      offsetTop={0}
      style={{
        fontFamily: 'inherit',
      }}
    >
      <div style={{ width: '240px' }}>
        <div className={styles.section}>
          <h3 className={styles.title}>作者榜</h3>
          <Skeleton loading={getUserLoading} className={styles.list}>
            {(data?.data?.content ?? []).map((item) => {
              return (
                <Link href={`/profile/${item?.account}`} className={styles.item} key={item.id}>
                  <Avatar className={styles.avatar} src={item.image}></Avatar>
                  <div>
                    <p>{item.username}</p>
                    <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                      {item.postCount} 帖子 • {item.commentCount} 评论
                    </span>
                  </div>
                </Link>
              );
            })}
          </Skeleton>
        </div>
      </div>
    </Affix>
  );
}
