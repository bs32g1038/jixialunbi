import Link from 'next/link';
import styles from './index.module.scss';
import useSWR from 'swr';
import { fetcher } from '../../services';
import { Avatar } from 'antd';
import { timeAgo } from '@/libs/time';

export default function PinnedList() {
  const { data } = useSWR('/api/v1/pinned-posts', fetcher);
  return (
    data?.data?.length > 0 && (
      <div className={styles.top}>
        {data?.data?.map((item) => {
          return (
            <div className={styles.topItem} key={item.id}>
              <div className={styles.topLabel}>置顶</div>
              <Link href={'/profile/' + item?.author?.account} className={styles.link}>
                <Avatar size="small" src={item?.author?.image} style={{ cursor: 'pointer' }} alt="" />
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', whiteSpace: 'nowrap' }}>
                  {item?.author?.username}
                </div>
              </Link>
              <Link className={styles.topContent} href={`/posts/${item.id}`}>
                {item.title.replace(/<[^<>]+>/g, '')}
              </Link>
              <div className={styles.time}>{timeAgo(item.createdAt)}</div>
            </div>
          );
        })}
      </div>
    )
  );
}
