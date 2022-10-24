import { NotificationOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

export default function TopTip() {
  return (
    <div className={styles.TopTip}>
      <Space>
        <NotificationOutlined />
        <p>
          社区论坛由众多爱好者共同维护，在您书写前，请务必阅读{' '}
          <Link href="/category/1000?postId=10000&&expand=true">
            <a>社区准则</a>
          </Link>
        </p>
      </Space>
    </div>
  );
}
