import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setWriteModalState, showLoginModal } from '@/store/app';
import { useDeletePostMutation } from '@/apis';

interface Props {
  authorId: number;
  postId: number;
}

export default function EllipsisDropdown(props: Props) {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const [deletePost] = useDeletePostMutation();
  return (
    <React.Fragment>
      <Dropdown
        overlay={
          <Menu
            onClick={({ key }) => {
              if (key === '举报' && !user) {
                return dispatch(showLoginModal(true));
              }
              if (key == '编辑') {
                return dispatch(
                  setWriteModalState({
                    visible: true,
                    postId: props.postId,
                  })
                );
              }
              if (key === '删除') {
                deletePost({ postId: props.postId })
                  .unwrap()
                  .then(() => {
                    message.success('删除成功!');
                  });
              }
            }}
            items={[
              ...(user?.id !== props.authorId
                ? [
                    {
                      label: (
                        <Space>
                          <EyeFilled></EyeFilled>举报
                        </Space>
                      ),
                      key: '举报',
                    },
                  ]
                : []),
              ...(user?.id === props.authorId
                ? [
                    {
                      label: (
                        <Space>
                          <EditOutlined></EditOutlined>编辑
                        </Space>
                      ),
                      key: '编辑',
                    },
                    {
                      label: (
                        <Space style={{ color: '#ff7875' }}>
                          <DeleteOutlined></DeleteOutlined>删除
                        </Space>
                      ),
                      key: '删除',
                    },
                  ]
                : []),
            ]}
          />
        }
        trigger={['click']}
      >
        <Button icon={<EllipsisOutlined />} type="text" size="small"></Button>
      </Dropdown>
    </React.Fragment>
  );
}
