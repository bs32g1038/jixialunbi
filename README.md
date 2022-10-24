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

## server

### 安装

1. 安装依赖: `npm install`
2. 创建数据库表: `npx prisma db push`
3. 启动开发服务: `npm run start:dev`

### 依赖

1. 依赖 mysql 数据库，建议使用 8.0 以上版本
2. nodejs 版本，建议使用 16.0 以上版本
3. meilisearch 版本，建议使用 0.28 以上版本

## web

### 安装

1. 安装依赖: `npm install`
2. 启动开发服务: `npm run dev`
