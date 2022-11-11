<p align="center">
    <a href="http://www.jixialunbi.com" target="_blank" rel="noopener noreferrer">
        <img width="200" src="http://www.jixialunbi.com/_next/static/media/logo.ba0938f6.png" alt="积下论笔" />
    </a>
</p>

<p align="center"><b>积下论笔</b> 是一个简洁清爽的微社区系统，基于nodejs，prisma，ant-design，nextjs开发，具备丰富的社区功能。已在实际中得到应用，你可以使用该系统搭建自己的社区。</p>

<p align="center">
    积下论笔社区: <a href="http://www.jixialunbi.com" target="_blank" rel="noopener noreferrer">www.jixialunbi.com</a>
</p>

![社区首页](https://github.com/bs32g1038/jixialunbi/blob/main/screenshots/home.png?raw=true)

> 注意: 当前处于开发中 - 请勿用于生产环境，预期 2022 年 12 月份，将发布正式版本。

## 项目搭建

> 建议服务器配置至少1核2g内存

### 核心依赖

1. 依赖 mysql 数据库，建议使用 8.0 以上版本；mysql文档：[https://www.mysql.com](https://www.mysql.com)
2. nodejs 版本，建议使用 16.0 以上版本；nodejs文档：[https://nodejs.org/en](https://nodejs.org/en)
3. meilisearch 版本，建议使用 0.28 以上版本；meilisearch文档：[https://docs.meilisearch.com](https://docs.meilisearch.com)

这里推荐使用 docker 对这些依赖进行安装，简单方便快捷。非docker安装请自行网上搜索安装方法。

以系统版本 ubuntu20 为例子：

> 当前由于上传的镜像尚不支持自定义网站配置，建议本地设置好配置后，并且使用compose测试配置进行构建docker-compose.test.yml，后续将简化该过程。

1. 安装 docker ，参照文档：[https://docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu)，按照顺序执行，即可完成。
2. 安装 docker compose，参照文档：[https://docs.docker.com/compose/install/linux/#install-the-plugin-manually](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)
3. 克隆仓库代码 `https://github.com/bs32g1038/jixialunbi`
4. 进入 `jixialunbi` 目录
5. 构建镜像 `docker compose -f docker-compose.test.yml build`
6. 运行 `docker compose -f docker-compose.test.yml up -d`
7. 停止 `docker compose -f docker-compose.test.yml stop`
8. 更多 docker compose 命令请网上查找

## 本地开发调试（核心依赖同上）
### server
1. 安装依赖: `npm install`
2. 创建数据库表: `npx prisma db push`
3. 启动开发服务: `npm run start:dev`

### web
1. 安装依赖: `npm install`
2. 启动开发服务: `npm run dev`
