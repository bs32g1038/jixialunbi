import { useFetchPostsQuery } from '@/apis';
import Link from 'next/link';
import styles from './index.module.scss';

export default function PinnedList() {
  const { data } = useFetchPostsQuery({ pinned: true });
  return (
    <div className={styles.top}>
      {data?.items?.map((item) => {
        return (
          <div className={styles.topItem} key={item.id}>
            <div className={styles.topLabel}>置顶</div>
            <Link className={styles.topContent} href={`/category/${item.category.id}?postId=${item.id}`}>
              {item.title.replace(/<[^<>]+>/g, '')}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
