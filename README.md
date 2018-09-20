# port-server

Port 网关 Node 中转服务器

## 下载 Node 安装包

下载地址：<https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x86.tar.xz>

## 打包本地文件

将项目根目录除去 `node_modules` 和 `logs` 文件夹全部打包为 ZIP 文件。

## 部署步骤

1. 上传本文件夹的两个文件：
  - Node 安装包到目录： `/opt`
  - Node 服务源码压缩包到目录： `/home`
2. 解压到 /opt 目录下即可，按照正常操作来目录应该是 `/opt/node-v8.12.0-linux-x86/bin`
3. 使用 export 命令将其加入到系统变量中： `export PATH=/opt/node-v8.12.0-linux-x86/bin:$PATH`
4. 安装必要的全局包：`npm i -g yarn pm2 --registry=http://registry.npm.taobao.org`
5. 安装 PM2 的子进程通讯插件：`pm2 install pm2-intercom`
6. 解压 Node 服务源码： `mkdir -p /home/port-server && cd /home/port-server && unzip ../port-server.zip`
7. 后台运行 Node 服务： `npm run prod`

## 更新部署

1. 首先停止正在运行的进程： `npm run stop`
2. 重新启动 Node 服务： `npm run prod`
