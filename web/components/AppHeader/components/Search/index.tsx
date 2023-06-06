import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useAppStore } from '@/store';

export default function Search() {
  const router = useRouter();
  const { user } = useAppStore();
  const [input, setInput] = useState('');
  useEffect(() => {
    if (router.query.q) {
      setInput(router.query.q as any);
    }
  }, [router.query.q]);
  return user ? (
    <Button size="small" type="text">
      <SearchOutlined />搜索
    </Button>
  ) : (
    <div className={styles.inputSearch} style={{ width: 250 }}>
      <Input
        placeholder="搜索你想要的..."
        className={styles.input}
        size="small"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onPressEnter={() => {
          if (!input) {
            return router.push('');
          }
          router.push('?type=search&&q=' + input);
        }}
      ></Input>
      <SearchOutlined />
    </div>
  );
}
