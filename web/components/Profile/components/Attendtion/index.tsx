import { useSWR } from '@/hooks';
import styles from './index.module.scss';
import { Avatar, Skeleton } from 'antd';
import Link from 'next/link';
import FollowButton from '@/components/FollowButton';
export default function Attendtion() {
  const { data, isLoading } = useSWR({ url: '/api/v1/follow-users' });
  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <Skeleton loading={isLoading} className={styles.list}>
            {(data?.data ?? []).map((item) => {
              return (
                <div className={styles.item} key={item.id}>
                  <Link href={`/profile/${item?.id}`} className={styles.itemA}>
                    <Avatar className={styles.avatar} src={item.image}></Avatar>
                    <div>
                      <p>{item.username}</p>
                      <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                        {item.postCount} 帖子 • {item.commentCount} 评论 • {item.likeCount} 获赞 • {item.fanCount} 粉丝
                      </span>
                      <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>{item.about}</p>
                    </div>
                  </Link>
                  <FollowButton userId={item.id} followed={true}></FollowButton>
                </div>
              );
            })}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
