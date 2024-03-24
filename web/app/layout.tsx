import 'antd/dist/reset.css';
import '@/styles/global.css';
import '@/styles/style.scss';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <title>积下_微社区</title>
      <meta name="keywords" content="积下微社区, bbs, 论坛" />
      <meta name="description" content="积下是一个简洁清爽的微社区，分享各种有趣内容，你感兴趣的都在这里！"></meta>
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
