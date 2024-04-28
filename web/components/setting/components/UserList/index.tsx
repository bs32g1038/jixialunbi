import { Button, Table, Tag } from 'antd';
import styles from './index.module.scss';

export default function UserList() {
  return (
    <div>
      <div className={styles.title}>用户管理</div>
      <Table
        size="small"
        columns={[
          {
            title: '用户id',
            dataIndex: 'id',
          },
          {
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '状态',
            dataIndex: 'status',
            render(text) {
              return <Tag>{text}</Tag>;
            },
          },
          {
            title: '操作',
            dataIndex: 'username',
            render() {
              return (
                <Button size="small" type="link">
                  禁用
                </Button>
              );
            },
          },
        ]}
        dataSource={[
          {
            id: 1111111,
            email: 'bs32g1038@163.com',
            username: '上海新闻',
            status: '启用',
          },
        ]}
      ></Table>
    </div>
  );
}
