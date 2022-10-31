import { Button, message, Timeline } from 'antd';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import classNames from 'classnames';
import { parseTime } from '@/libs/time';
import WriteTimeLine from '@/components/WriteTimeLine';
import { useState } from 'react';
import { useDeleteTimeLineMutation } from '@/components/WriteTimeLine/service';
import { useAppSelector } from '@/hooks';

interface Props {
  data: any;
}

export default function TimeLine(props: Props) {
  const { data } = props;
  const [timeLine, setTimeLine] = useState({
    visible: false,
    id: 0,
  });
  const user = useAppSelector((state) => state.app.user);
  const [deleteTimeLine] = useDeleteTimeLineMutation();
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineTitle}>
        <ClockCircleOutlined></ClockCircleOutlined>
        时间线
      </div>
      <Timeline mode="left">
        {data?.map((item) => {
          return (
            <Timeline.Item color="#df542f" key={item.id}>
              <div className={styles.timelineTime}>{parseTime(item.createdAt, 'YYYY年MM月DD日 hh:mm')}</div>
              <div
                className={classNames(styles.timelineItemContent, 'toastui-editor-contents')}
                dangerouslySetInnerHTML={{
                  __html: item.title,
                }}
              ></div>
              {user?.id === item.authorId && (
                <div>
                  <Button
                    type="text"
                    onClick={() => {
                      setTimeLine({
                        visible: true,
                        id: item.id,
                      });
                    }}
                  >
                    <EditOutlined></EditOutlined>编辑
                  </Button>
                  <Button
                    type="text"
                    danger
                    className={styles.delete}
                    onClick={() => {
                      deleteTimeLine({
                        id: item.id,
                      })
                        .unwrap()
                        .then(() => {
                          message.success('删除成功！');
                        });
                    }}
                  >
                    <DeleteOutlined></DeleteOutlined>删除
                  </Button>
                </div>
              )}
            </Timeline.Item>
          );
        })}
        <Timeline.Item color="#df542f" key="暂无更多" dot={<div></div>}></Timeline.Item>
      </Timeline>
      {timeLine.visible && (
        <WriteTimeLine
          visible={timeLine.visible}
          id={timeLine.id}
          onCancel={() => {
            setTimeLine((v) => ({ ...v, visible: false }));
          }}
        ></WriteTimeLine>
      )}
    </div>
  );
}
