import { FC } from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import '@/styles/global.css';
import '@/styles/style.scss';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import ErrorBound from '@/components/ErrorBound';

const NextApp: FC<AppProps> = ({ Component, ...rest }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>积下论笔_微社区</title>
        <meta name="keywords" content="积下论笔，微社区, bbs, 论坛" />
        <meta
          name="description"
          content="积下论笔是一个简洁清爽的微社区，分享各种有趣内容，你感兴趣的都在这里！"
        ></meta>
      </Head>
      <ErrorBound>
        <Component {...rest.pageProps} />
      </ErrorBound>
    </ConfigProvider>
  );
};

export default NextApp;
