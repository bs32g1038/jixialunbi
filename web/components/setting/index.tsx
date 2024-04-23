'use client';

import { Button, Spin, Space, Popconfirm } from 'antd';
import Layout from '../Layout';
import styles from './index.module.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSWR, useSWRMutation } from '@/hooks';
import EditModal from './components/EditModal';
import { useState } from 'react';

export default function Setting() {
  const { data, isLoading, mutate } = useSWR({ url: '/api/v1/tags' });
  const { trigger: deleteTag, isMutating: delIsMutating } = useSWRMutation({ url: '/api/v1/delete-tag' });
  const tags = data?.data ?? [];
  const [editData, setEditData] = useState({ visible: false, data: {} });
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.title}>标签管理</div>
        <Spin tip="Loading" size="small" spinning={isLoading}>
          <div className={styles.labels}>
            {tags.map((item) => {
              return (
                <div className={styles.labelsItem} key={item.id}>
                  <div>{item.name}</div>
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setEditData({
                          visible: true,
                          data: item,
                        });
                      }}
                    >
                      <EditOutlined></EditOutlined>
                      编辑
                    </Button>
                    <Popconfirm
                      title="是否删除该标签？"
                      onConfirm={async () => {
                        await deleteTag({ id: item.id } as any).then(() => {
                          mutate();
                        });
                      }}
                    >
                      <Button type="link" danger loading={delIsMutating}>
                        <DeleteOutlined></DeleteOutlined>
                        删除
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>
              );
            })}
            <Button
              type="link"
              size="small"
              onClick={() =>
                setEditData({
                  visible: true,
                  data: null,
                })
              }
            >
              <PlusOutlined></PlusOutlined>添加标签
            </Button>
            {editData.visible && (
              <EditModal
                visible={editData.visible}
                data={editData.data}
                onCancel={() => {
                  setEditData({
                    visible: false,
                    data: null,
                  });
                }}
                onOk={() => {
                  mutate();
                  setEditData({
                    visible: false,
                    data: null,
                  });
                }}
              ></EditModal>
            )}
          </div>
        </Spin>
      </div>
    </Layout>
  );
}
