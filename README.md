# 关于项目

这是一个点餐系统，包含用户点餐、商家出餐、管理员管理三部分功能
这个项目本来是校内实训，需要用java编写，我负责一部分。但是我不太喜欢用java，且时间足够，就自己独自做了一份，用于学习。
项目的功能和需求是根据前期小组讨论出来的，也基本都是仿饿了么的
各项功能基本都实现了
线上地址：(比较慢)[47.93.254.91:3333](http://47.93.254.91:3333)
源码地址：[chihuobao](https://github.com/ooooevan/chihuobao)

```md
登录账号：
  用户:12345678910
  商家:11112222333
  管理员:admin2
登录密码都是123456
```

## 功能结构

![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/gongneng.png)
![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/0cengsheji.png)

## 调试运行

```node
npm install
npm run dev

cd server                 #打开koa2后台，会开启3333端口
npm install
node bin/www
```

```node
npm run build                #打包
cp dist/* server/public/     #将打包好的文件放到koa2静态目录
```

## 使用的框架、插件等

* 用Vue-cli脚手架、vue-router、vuex
* 用element-ui样式框架
* 用axios发请求
* 用koa2做后台，在node高版本直接用async、await
* 用mongoose连接mongodb数据库

## 包含的功能

* 手机注册，登录，重置密码
* 用户点餐，该商家会收到消息提示有新订单(用轮询实现)
* 用户查看自己的订单，评价、删除等
* 修改自己的信息，申请成为商户等
* 商家管理订单，接单等
* 统计商家订单数，评分等(页面上的月销量是总销量)
* 商家管理菜单、查看评论
* 管理员管理用户、商铺、分类等
* 搜索功能

## 页面截图

 ![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/place.png)
 ![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/order.png)
 ![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/seller.png)
 ![](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/admin.png)

## 目录结构

顶层就是vue-cli的结构，主要看前端src和后台server的结构

``` md
─ src
 ├── common                         #
 │  ├── audio                       #音频
 │  ├── images                      #图片
 │  ├── javascript                  #api接口、cache、config等js文件
 │  ├── style                       #公用style
 ├── components                     #组件
 ├── pages                          #页面，处理业务，主要分为三个模块
 │  ├── admin
 │  ├── seller
 │  ├── user
 │  ├── index.vue
 │  ├── login.vue
 ├── router                         #路由
 │  ├── index.js
 ├── store                          #vuex的store，分了三个模块
 │  ├── admin
 │  ├── seller
 │  ├── user
 │  ├── index.js
 ├── App.vue
 ├── main.js
```

```md
─ server
 ├── app
 ├── ├── common            # 工具
 ├── ├── controllers       # 业务
 ├── ├── models            # 定义数据库模型
 ├── db_vue                # 导出来的数据库数据
 ├── routes                # 路由
 ├── app.js
 ├── config.js             # 短信api的key相关

```

具体可看[博客](https://ooooevan.github.io/2017/12/14/vue-koa2-mongodb%E7%82%B9%E9%A4%90%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BB%93/)
如果有错，望指正，若觉得还可以，可以点个star