import React from 'react';
import { DeleteOutlined, EllipsisOutlined, EyeFilled, PushpinOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import { useSWRMutation } from '@/hooks';
import { useAppStore } from '@/store';

interface Props {
  authorId: string;
  pinned: boolean;
  postId: number;
  id: number;
}

export default function EllipsisDropdown(props: Props) {
  // const user = useAppSelector((state) => state.app.user);
  // const dispatch = useAppDispatch();
  const user = useAppStore((state) => state.user);
  const { trigger: deletePost } = useSWRMutation({ url: '/api/v1/delete-post' });
  // const [deletePost] = useDeletePostMutation();
  // const [pinPost] = usePinPostMutation();
  return (
    <React.Fragment>
      <Dropdown
        menu={{
          onClick: ({ key }) => {
            //   if (key === '举报' && !user) {
            //     return dispatch(showLoginModal(true));
            //   }
            //   if (key == '编辑') {
            //     return dispatch(
            //       setWriteModalState({
            //         visible: true,
            //         postId: props.postId,
            //         type: 'write',
            //       })
            //     );
            //   }
            //   if (key == '时间线') {
            //     return setTimeLine({
            //       visible: true,
            //       id: props.id,
            //     });
            //   }
            if (key === '删除') {
              deletePost({ id: props.postId } as any).then(() => {
                message.success('删除成功!');
              });
            }
            //   if (key === '置顶') {
            //     pinPost({ id: props.postId, pinned: !props.pinned })
            //       .unwrap()
            //       .then(() => {
            //         message.success(props.pinned ? '已取消置顶!' : '置顶成功！');
            //       });
            //   }
          },
          items: [
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
            ...(user && user.role === 'SuperAdmin'
              ? [
                  {
                    label: (
                      <Space>
                        <PushpinOutlined />
                        {props.pinned ? '取消置顶' : '置顶'}
                      </Space>
                    ),
                    key: '置顶',
                  },
                ]
              : []),
            ...(user?.id === props.authorId
              ? [
                  // {
                  //   label: (
                  //     <Space>
                  //       <EditOutlined></EditOutlined>编辑
                  //     </Space>
                  //   ),
                  //   key: '编辑',
                  // },
                  // {
                  //   label: (
                  //     <Space>
                  //       <PlusCircleOutlined></PlusCircleOutlined>时间线
                  //     </Space>
                  //   ),
                  //   key: '时间线',
                  // },
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
          ],
        }}
        trigger={['click']}
      >
        <Button icon={<EllipsisOutlined />} type="text" size="small"></Button>
      </Dropdown>
    </React.Fragment>
  );
}
