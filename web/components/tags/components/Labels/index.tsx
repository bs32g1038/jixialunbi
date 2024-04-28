import { useSWR, useSWRMutation } from '@/hooks';
import styles from './index.module.scss';
import { DeleteOutlined, EditOutlined, NumberOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import EditModal from '@/components/setting/components/EditModal';

export default function Labels() {
  const { data, isLoading, mutate } = useSWR({ url: '/api/v1/tags' });
  const tags = data?.data ?? [];
  const { trigger: deleteTag, isMutating: delIsMutating } = useSWRMutation({ url: '/api/v1/delete-tag' });
  const [editData, setEditData] = useState({ visible: false, data: {} });
  return (
    <div className={styles.wrap}>
      {tags.map((item) => {
        return (
          <div key={item.id} className={styles.item}>
            <Space className={styles.name}>
              <Link href={'/tags/' + item.id} passHref={true}>
                <h3 className={styles.name}>
                  <NumberOutlined /> {item.name}
                </h3>
              </Link>
              <Space size={4}>
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
            </Space>
            <Link href={'/tags/' + item.id} passHref={true}>
              <p className={styles.desc}>{item.description}</p>
            </Link>
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
  );
}
