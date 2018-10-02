# port-server

Port 网关 Node 中转服务器。

> 服务器要预先安装 `yarn`、`pm2` 两个全局包，并且使用 `pm2 install pm2-intercom` 命令安装子进程通讯插件保证 `log4js` 组件可以正常记录日志。

## 服务器初始化

由于需要在服务器预先安装一些软件，所以这一步骤不可跳过。服务器初始化安装后，即可进行后续的一键部署操作。

### 下载 Node 安装包

这里使用了 LTS 版本的 Node.js，下载地址为：<https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x86.tar.xz>。

### 安装 Node.js 以及一些必要的初始操作

1. 解压到 /opt 目录下即可，按照正常操作来目录应该是 `/opt/node-v8.12.0-linux-x86`。
2. 使用 export 命令将其加入到系统变量中： `export PATH=/opt/node-v8.12.0-linux-x86/bin:$PATH`，即添加到 ~/.bashrc 文件的最后。
3. 安装必要的第三方包：`npm i -g yarn pm2 --registry=http://registry.npm.taobao.org`。
4. 安装 PM2 的子进程通讯插件：`pm2 install pm2-intercom`。

## 打包本地文件

将项目根目录除去 `node_modules` 和 `logs` 两个文件夹之外的其他资源打包为 ZIP 文件。

> 稍后会把部署工作交给 `pm2` 完成，只需要一键操作即可。

## 部署步骤

1. 上传源码压缩包到目录： `/home`。
2. 解压 Node 服务源码： `mkdir -p /home/port-server && cd /home/port-server && unzip ../port-server.zip`。
3. 启动 Node 服务： `npm run prod`。

## 更新部署

1. 首先停止正在运行的进程： `npm run stop`
2. 重新启动 Node 服务： `npm run prod`
