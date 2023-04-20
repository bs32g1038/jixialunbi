import Link from 'next/link';
import styles from './index.module.scss';
import useSWR from 'swr';
import { fetcher } from '../../services';

export default function PinnedList() {
  const { data } = useSWR('/api/v1/pinned-posts', fetcher);
  return (
    data?.data?.length > 0 && (
      <div className={styles.top}>
        {data?.data?.map((item) => {
          return (
            <div className={styles.topItem} key={item.id}>
              <div className={styles.topLabel}>置顶</div>
              <Link className={styles.topContent} href={`/posts/${item.id}`}>
                {item.title.replace(/<[^<>]+>/g, '')}
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
}
