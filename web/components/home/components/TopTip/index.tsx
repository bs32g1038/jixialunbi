import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Space, Statistic, Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';
import { useSWR } from '@/hooks';

export default function TopTip() {
  const { data } = useSWR({ url: '/api/v1/recent-users' });
  const { data: statistic, isLoading } = useSWR({ url: '/api/v1/statistic' });
  const statisticData = statistic?.data ?? {};
  return (
    <div className={styles.TopTip}>
      <div className={styles.body}>
        <div>
          <div className={styles.header}>
            <Space>
              <NotificationOutlined />
              <p>一个开放、自由、创意、热爱，多元化的交流社区</p>
            </Space>
          </div>
          <div className={styles.footer}>
            {data?.data?.content?.map((item) => {
              return (
                <Tooltip title={item.username} placement="top" key={item.id}>
                  <Link href={`/profile/${item?.account}`}>
                    <Avatar src={item?.image} />
                  </Link>
                </Tooltip>
              );
            })}
          </div>
        </div>
        <Space size={20}>
          <Statistic loading={isLoading} title="主题数" value={statisticData.postCount} valueStyle={{ fontSize: 14 }} />
          <Statistic
            loading={isLoading}
            title="评论数"
            value={statisticData.commentCount}
            valueStyle={{ fontSize: 14 }}
          />
          <Statistic loading={isLoading} title="用户数" value={statisticData.userCount} valueStyle={{ fontSize: 14 }} />
        </Space>
      </div>
    </div>
  );
}
