'use client';

import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import TopTip from '../home/components/TopTip';
import CategoryList from '../home/components/CategoryList';
import Labels from './components/Labels';

export default function Articles({ data, searchParams }) {
  const { page } = searchParams;
  const router = useRouter();
  const { items = [], count = 0 } = data?.data ?? [];
  return (
    <Layout>
      <TopTip></TopTip>
      <CategoryList></CategoryList>
      <div className={styles.content}>
        <div className={styles.inner}>
          <Labels></Labels>
        </div>
      </div>
    </Layout>
  );
}
