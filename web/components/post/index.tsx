import React, { useState } from 'react';
import styles from './index.module.scss';
import Layout from '../Layout';
import { Avatar, Button, Divider, Space } from 'antd';
import LikeButton from '../LikeButton';
import classNames from 'classnames';
import { CommentOutlined } from '@ant-design/icons';
import CollectButton from '../CollectButton';
import CommentList from '../home/components/CommentList';

const item = {
  id: 10014,
  title: '<p>社区更新日志汇总</p>',
  categoryId: 1001,
  authorId: 1000,
  tags: '',
  pinned: false,
  good: false,
  locked: false,
  commentCount: 0,
  collectCount: 0,
  likeCount: 0,
  type: 0,
  createdAt: '2022-11-03T10:04:05.702Z',
  updatedAt: '2022-11-03T10:04:05.702Z',
  deleted: null,
  pics: '',
  author: {
    id: 1000,
    username: 'bs32g1038@163.com',
    image: 'https://gips0.baidu.com/it/u=4119241526,4042403651&fm=3012&app=3012&autime=1676015615&size=b60,60',
    about: '社区首席运营官',
  },
  category: {
    id: 1001,
    name: '技行天下',
    description: '一技之长行天下，期待你传奇人生',
    order: 0,
    createdAt: '2022-09-24T11:42:43.832Z',
    updatedAt: '2022-09-24T11:42:43.832Z',
  },
  participants: [],
  likes: [],
  collections: [],
  timeLines: [
    {
      id: 10001,
      title: '<p>完成置顶功能</p>',
      deleted: null,
      createdAt: '2022-11-03T10:07:54.331Z',
      updatedAt: '2022-11-09T10:02:54.206Z',
      postId: 10014,
      authorId: 1000,
    },
    {
      id: 10002,
      title: '<p>支持帖子，时间线更新时间显示</p>',
      deleted: null,
      createdAt: '2022-11-04T02:45:45.266Z',
      updatedAt: '2022-11-04T02:45:45.266Z',
      postId: 10014,
      authorId: 1000,
    },
    {
      id: 10003,
      title: '<p>字数限制放宽到400字</p>',
      deleted: null,
      createdAt: '2022-11-04T03:28:55.435Z',
      updatedAt: '2022-11-04T03:28:55.435Z',
      postId: 10014,
      authorId: 1000,
    },
  ],
  title: '白玉兰奖提名推测，《人间间》赢面大，《狂飙》张颂文呼声最高！',
  content:
    '最近在学习 http ，看到 Transfer-Encoding: chunked 这个 header ，感觉和 JavaScript 中的 stream 很像，但又有些搞不明白的地方，想请教下大家。',
  summary:
    '<p>Next.js 13 中包含&nbsp;Turbopack&nbsp;—— Webpack 的新的基于 Rust 的继任者。</p><blockquote><p>在 Next.js 12 中，我们开始过渡到&nbsp;native Rust 驱动的工具。我们首先从 Babel 迁移，这导致转译速度提高了 17 倍。然后，我们替换了 Terser，这使得 minification 提高了 6 倍。</p></blockquote><p>将 Turbopack alpha 与 Next.js 13 一起使用可以：</p><p>更新速度比 Webpack&nbsp;<strong>快 700 倍</strong>更新速度比 Vite&nbsp;<strong>快 10 倍</strong></p><p>cold starts&nbsp;速度比 Webpack&nbsp;<strong>快 4 倍</strong></p>',
  summary:
    '<p>Quark Design 是什么？</p><p>官网：<a target="_blank" rel="noopener noreferrer nofollow" href="https://quark-design.hellobike.com/#/">https://quark-design.hellobike.com</a></p><p>github：<a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/hellof2e/quark-design">https://github.com/hellof2e/quark-design</a></p><p>Quark（夸克） Design 是由哈啰平台 UED 和增长&amp;电商前端团队联合打造的一套面向移动端的<strong>跨框架 UI 组件库</strong>。与业界第三方组件库不一样，Quark Design 底层基于 Web Components 实现，它能做到一套代码，同时运行在各类前端框架中。</p><p>Quark Design 历经一年多的开发时间，已在集团内部大量业务中得到验证，本着“共创、共建、共享”的开源精神，我们于即日起将 Quark 正式对外开源！Github地址：<a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/hellof2e/quark-design">https://github.com/hellof2e/quark-design</a></p>',
};

export default function Post() {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <h2 className={styles.title}>白玉兰奖提名推测，《人间间》赢面大，《狂飙》张颂文呼声最高！</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Space>
                <Avatar src="https://gips0.baidu.com/it/u=4119241526,4042403651&fm=3012&app=3012&autime=1676015615&size=b60,60"></Avatar>
                <div style={{ marginRight: '20px' }}>
                  <div className={styles.author}>上游新闻</div>
                  <div className={styles.authorDes}>2023-03-27 00:05 | 社区运营</div>
                </div>
              </Space>
              <Button size="small">关注</Button>
            </div>
            <div
              className="rich-text"
              style={{
                color: '#333',
                // padding: '0 20px',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.summary }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.footer}>
              <div>
                <LikeButton isActive={item?.likes?.length} postId={item.id} likeCount={item?.likeCount}></LikeButton>
              </div>
              {/* <Divider type="vertical" /> */}
              <Button
                type="text"
                size="small"
                style={{ fontSize: 12 }}
                className={classNames(styles.commentClick, { [styles.active]: open })}
                onClick={() => setOpen(!open)}
              >
                <span>
                  <CommentOutlined />
                  <span>{open ? '收起评论' : item.commentCount + '条评论'}</span>
                </span>
              </Button>
              {/* <Divider type="vertical" /> */}
              <CollectButton
                isActive={item?.collections?.length}
                postId={item.id}
                collectCount={item?.collectCount}
              ></CollectButton>
            </div>
            <div>共计40条评论</div>
            <CommentList postId={0} items={[item]}></CommentList>
          </div>
        </div>
      </div>
    </Layout>
  );
}
