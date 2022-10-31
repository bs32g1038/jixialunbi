import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setWriteModalState, showLoginModal } from '@/store/app';
import { useDeletePostMutation } from '@/apis';
import WriteTimeLine from '@/components/WriteTimeLine';

interface Props {
  authorId: number;
  postId: number;
  id: number;
}

export default function EllipsisDropdown(props: Props) {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const [timeLine, setTimeLine] = useState({
    visible: false,
    id: props.id ?? 0,
  });
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
                    type: 'write',
                  })
                );
              }
              if (key == '时间线') {
                return setTimeLine({
                  visible: true,
                  id: props.id,
                });
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
                        <Space>
                          <PlusCircleOutlined></PlusCircleOutlined>时间线
                        </Space>
                      ),
                      key: '时间线',
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
      {timeLine.visible && (
        <WriteTimeLine
          visible={timeLine.visible}
          postId={props.postId}
          id={props.id}
          onCancel={() => {
            setTimeLine((v) => ({ ...v, visible: false }));
          }}
        ></WriteTimeLine>
      )}
    </React.Fragment>
  );
}
