import { FC } from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@/styles/global.css';
import '@/styles/style.scss';
import zhCN from 'antd/lib/locale/zh_CN';
import { wrapper } from '../store';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import ErrorBound from '@/components/ErrorBound';
import { Provider } from 'react-redux';

const NextApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
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
          <Component {...props.pageProps} />
        </ErrorBound>
      </ConfigProvider>
    </Provider>
  );
};

export default NextApp;
