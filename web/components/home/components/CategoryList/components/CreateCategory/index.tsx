import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import EditModal from '../EditModal';
import { useAppStore } from '@/store';

export default function CreateCategory() {
  const [open, setOpen] = useState(false);
  const user = useAppStore((state) => state.user);
  return (
    user?.role === 'SuperAdmin' && (
      <React.Fragment>
        <Button size="small" onClick={() => setOpen(true)}>
          <PlusOutlined></PlusOutlined>添加分类
        </Button>
        {open && <EditModal visible={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}></EditModal>}
      </React.Fragment>
    )
  );
}
