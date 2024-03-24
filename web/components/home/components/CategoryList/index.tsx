import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import Link from 'next/link';
import classNames from 'classnames';
import Search from '@/components/AppHeader/components/Search';
import { useParams } from 'next/navigation';

export default function CategoryList() {
  const { categoryId } = useParams();
  return (
    <div className={styles.wrap}>
      <div className={styles.switch}>
        <Link href={'/'} passHref={true}>
          <Button
            size="small"
            type="text"
            className={classNames(styles.switchItem, {
              [styles.active]: !categoryId,
            })}
          >
            <div style={{ paddingBottom: 3 }}>推荐</div>
          </Button>
        </Link>
      </div>
      <div>
        <Search></Search>
      </div>
    </div>
  );
}
