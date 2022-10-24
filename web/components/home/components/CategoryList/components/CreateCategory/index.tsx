import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import EditModal from '../EditModal';

export default function CreateCategory() {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.app.user);
  return (
    user?.role === 'SuperAdmin' && (
      <React.Fragment>
        <Button size="small" type="ghost" onClick={() => setOpen(true)}>
          <PlusOutlined></PlusOutlined>添加分类
        </Button>
        {open && <EditModal visible={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}></EditModal>}
      </React.Fragment>
    )
  );
}
