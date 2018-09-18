# port-server

Port 网关 Node 中转服务器

## 下载 Node 安装包

下载地址：<https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x86.tar.xz>

## 打包本地文件

将项目根目录除去 `node_modules` 和 `logs` 文件夹全部打包为 ZIP 文件。

## 部署步骤

1. 上传本文件夹的两个文件：
  - Node 安装包到目录：`/opt`
  - Node 服务源码到目录：`/home`
2. 解压到 /opt 目录下即可，按照正常操作来目录应该是 `/opt/node-v8.12.0-linux-x86/bin`。
3. 使用 export 命令将其加入到系统变量中：`export PATH=/opt/node-v8.12.0-linux-x86/bin:$PATH`。
4. 全局安装 yarn 组件：`npm i -g yarn --registry=http://registry.npm.taobao.org`。
5. 解压 Node 服务源码：`mkdir -p /home/port-server && unzip ../port-server.zip`。
6. 安装第三方 NPM 包：`yarn`。
7. 后台运行 Node 服务：`npm start`。
