import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function Search() {
  const router = useRouter();
  const [input, setInput] = useState('');
  useEffect(() => {
    if (router.query.q) {
      setInput(router.query.q as any);
    }
  }, [router.query.q]);
  return (
    <div className={styles.inputSearch}>
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
