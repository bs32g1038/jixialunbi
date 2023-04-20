import { useFetchPostsQuery } from '@/apis';
import Link from 'next/link';
import styles from './index.module.scss';
import useSWR from 'swr';
import { fetcher } from '../../services';
import { Spin } from 'antd';

const data = {
  data: {
    items: [
      {
        id: 10001,
        title: '全面降准正式落地！6000亿资金入市，影响多大？',
        categoryId: 1001,
        authorId: 1000,
        tags: '积下论笔',
        pinned: true,
        good: false,
        locked: false,
        commentCount: 1,
        collectCount: 0,
        likeCount: 0,
        type: 0,
        createdAt: '2022-09-24T11:43:07.464Z',
        updatedAt: '2022-11-09T10:01:42.555Z',
        deleted: null,
        pics: '',
        author: {
          id: 1000,
          username: 'bs32g1038@163.com',
          image: '/static/upload/2022/ab3f78ef29905caa9d56f6a88fcd2414.jpeg',
          about: '社区首席运营官',
        },
        category: {
          id: 1001,
          name: '技行天下',
          description: '一技之长行天下，期待你传奇人生',
          order: 0,
          createdAt: '2022-09-24T11:42:43.832Z',
          updatedAt: '2022-09-24T11:42:43.832Z',
        },
        participants: [
          {
            id: 1000,
            postId: 10001,
            authorId: 1006,
            createdAt: '2022-10-23T04:10:12.754Z',
            updatedAt: '2022-10-23T04:10:12.754Z',
            author: {
              id: 1006,
              username: '积下论笔',
              image: '/static/upload/2022/c708946dfabac540a2d58fae189ae5f5.png',
              about: '社区运营专员',
            },
          },
        ],
        likes: [],
        collections: [],
        timeLines: [],
      },
      {
        id: '中国制造业规模连续13年全球第一',
        title: '中国制造业规模连续13年全球第一',
        category: {
          id: 1001,
          name: '技行天下',
          description: '一技之长行天下，期待你传奇人生',
          order: 0,
          createdAt: '2022-09-24T11:42:43.832Z',
          updatedAt: '2022-09-24T11:42:43.832Z',
        },
      },
    ],
    count: 1,
  },
  code: 200,
  message: '请求成功',
};

export default function PinnedList() {
  const { data } = useSWR('/api/v1/pinned-posts', fetcher);
  return (
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
  );
}
