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
        <Link href={'/last'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: false,
            })}
          >
            <Space style={{ paddingBottom: 3 }} size={2}>
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="14898"
                width="18"
                height="18"
              >
                <path d="M363.57 734.627v-8.212a45.967 45.967 0 0 0 0 8.212z" p-id="14899"></path>
                <path
                  d="M792.541 158.546H220.582c-39.484 0-71.495 32.012-71.495 71.495v500.464c0 39.484 32.012 71.497 71.495 71.497h195.387l57.994 57.923c17.889 17.868 46.89 17.868 64.776 0l57.994-57.923h195.808c39.484 0 71.491-32.013 71.491-71.497V230.042c0.005-39.483-32.006-71.496-71.491-71.496z m19.121 560.872c0 18.722-15.178 33.903-33.9 33.903H587.667l-58.217 58.147c-12.723 12.709-33.349 12.709-46.072 0l-58.217-58.147h-189.8c-18.726 0-33.902-15.181-33.902-33.903V244.817c0-18.721 15.176-33.898 33.902-33.898h542.401c18.722 0 33.9 15.177 33.9 33.898v474.601z"
                  p-id="14900"
                ></path>
                <path
                  d="M558.287 371.182h49v250.951h-52.494L452.238 442.932l-0.7 179.201h-49V371.182l55.388-0.049 99.663 174.852 0.698-174.803z"
                  p-id="14901"
                ></path>
              </svg>
              最新
            </Space>
          </Button>
        </Link>
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
