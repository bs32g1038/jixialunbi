import React from 'react';
import styles from './index.module.scss';
import { Avatar, Button, List, Skeleton, Space, Typography } from 'antd';
import { useSWR } from '@/hooks';
import { parseTime, timeAgo } from '@/libs/time';
import Layout from '../Layout';
const { Title } = Typography;
export default function Notifications() {
  const { data, isLoading } = useSWR({ url: '/api/v1/notifications' });
  const items = data?.data ?? [] as any[];
  return (
    <Layout>
      <div className={styles.noticeList}>
        <Title level={4}>消息通知</Title>
        <List
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item: any) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={item.title}
                  description={parseTime(item.createdAt)}
                />
                <div>{item.content}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </Layout>
  );
}
