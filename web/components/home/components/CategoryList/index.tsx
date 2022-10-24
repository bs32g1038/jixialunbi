import React, { useState } from 'react';
import styles from './index.module.scss';
import { Button, Select, Space, Spin } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import HotSvg from '../../../AppHeader/Hot';
import classNames from 'classnames';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks';
import { useFetchCategoriesQuery } from '@/apis';
import EditModal from './components/EditModal';
import { omit } from 'lodash';
import queryString from 'query-string';
const CreateCategory = dynamic(
  () => import('@/components/home/components/CategoryList/components/CreateCategory') as any,
  {
    ssr: false,
  }
);
const { Option } = Select;

const CategoryItem = (props: { item: any; isActive: boolean; isAdmin?: boolean; refetch: () => void }) => {
  const { item, isActive, isAdmin, refetch } = props;
  const [open, setOpen] = useState(false);
  const node = (
    <Link key={item.id} href={'/category/' + item.id} passHref={true}>
      <Button
        size="small"
        type="text"
        className={classNames(styles.switchItem, {
          [styles.active]: isActive,
        })}
      >
        <Space>{item.name}</Space>
      </Button>
    </Link>
  );
  if (!isAdmin) {
    return node;
  }
  return (
    <Space size={2}>
      {node}
      <Button
        size="small"
        type="text"
        icon={<EditOutlined></EditOutlined>}
        style={{ color: '#ff7875' }}
        onClick={() => setOpen(true)}
      ></Button>
      {open && (
        <EditModal
          visible={open}
          onCancel={() => setOpen(false)}
          data={item}
          onOk={async () => {
            setOpen(false);
            refetch();
          }}
        ></EditModal>
      )}
    </Space>
  );
};

export default function CategoryList() {
  const { data = [], refetch, isLoading } = useFetchCategoriesQuery();
  const router = useRouter();
  const [select, setSelect] = useState(router.query.sort ?? 'default');
  const description = data?.find((item) => item.id === Number(router.query.id))?.description;
  const user = useAppSelector((state) => state.app.user);
  const isAdmin = user?.role === 'SuperAdmin';
  return (
    <Spin spinning={isLoading}>
      <div className={styles.wrap}>
        <div className={styles.switch}>
          <Link href={'/'} passHref={true}>
            <Button
              size="small"
              type="text"
              className={classNames(styles.switchItem, {
                [styles.active]: !router.query.categoryId,
              })}
            >
              <Space>全站</Space>
            </Button>
          </Link>
          {data.map((item: { name: string; id: number }) => {
            return (
              <CategoryItem
                key={item.id}
                item={item}
                isActive={parseInt(router.query.categoryId as string) === item.id}
                isAdmin={isAdmin}
                refetch={refetch}
              ></CategoryItem>
            );
          })}
          <CreateCategory></CreateCategory>
        </div>
        <div>
          <Select
            value={select}
            style={{ width: 100 }}
            bordered={false}
            onChange={async (value) => {
              setSelect(value);
              const res = queryString.parseUrl(router.asPath);
              if (value === 'hot') {
                Object.assign(res.query, { sort: value });
              } else {
                Object.assign(res, {
                  query: omit(res.query, 'sort'),
                });
              }
              router.push(queryString.stringifyUrl(res));
            }}
          >
            <Option value="default">默认排序</Option>
            <Option value="hot">
              <Space>
                <HotSvg></HotSvg>热门
              </Space>
            </Option>
          </Select>
        </div>
      </div>
      {/* <p className={styles.description}>
        <span>{'"'}</span>
        {description || '一览众山小'}
        <span>{'"'}</span>
      </p> */}
    </Spin>
  );
}
