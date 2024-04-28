import React from 'react';
import styles from './index.module.scss';
import { Button, Space } from 'antd';
import Link from 'next/link';
import classNames from 'classnames';
import Search from '@/components/AppHeader/components/Search';
import { usePathname } from 'next/navigation';
import { FireOutlined, TagsOutlined, UserAddOutlined } from '@ant-design/icons';

export default function CategoryList() {
  const pathname = usePathname();
  const isTag = pathname === '/tags';
  const isHot = pathname === '/';
  const isAuthor = pathname === '/authors';
  return (
    <div className={styles.wrap}>
      <div className={styles.switch}>
        <Link href={'/'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: isHot,
            })}
          >
            <Space style={{ paddingBottom: 3 }} size={2}>
              <FireOutlined />
              推荐
            </Space>
          </Button>
        </Link>
        {/* <Link href={'/'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: false,
            })}
          >
            <Space style={{ paddingBottom: 3 }} size={2}>
              <UserAddOutlined />
              最新
            </Space>
          </Button>
        </Link> */}
        <Link href={'/authors'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: isAuthor,
            })}
          >
            <Space style={{ paddingBottom: 3 }} size={2}>
              <UserAddOutlined />
              作者榜
            </Space>
          </Button>
        </Link>
        <Link href={'/tags'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: isTag,
            })}
          >
            <Space style={{ paddingBottom: 3 }} size={2}>
              <TagsOutlined />
              标签
            </Space>
          </Button>
        </Link>
        {/* <Link href={'/'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: false,
            })}
          >
            <div style={{ paddingBottom: 3 }}>视频</div>
          </Button>
        </Link> */}
      </div>
      <div>
        <Search></Search>
      </div>
    </div>
  );
}
