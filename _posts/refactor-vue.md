---
title: '[Vue]前端项目重构小记'
excerpt: '原有的旧项目原本时前后端不分离的，在开发过程中对前端开发人员需要全项目启动，比较麻烦，同时项目在进行前后端分离之后，前端部分开发使用的时http-server启动服务，不支持HMR，修改完成之后需要手动刷新。另外，原本的项目采用的基于jQuery的传统技术栈，在之后项目的迭代升级中，制约了项目的开发。因此开始了本次的前端项目重构。'
coverImage: '/assets/blog/vue-jquery.jfif'
date: '2021-04-13T16:35:07.322Z'
type: tech
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

## 重构目标
原有的旧项目原本时前后端不分离的，在开发过程中对前端开发人员需要全项目启动，比较麻烦，同时项目在进行前后端分离之后，前端部分开发使用的时http-server启动服务，不支持[HMR](https://www.webpackjs.com/concepts/hot-module-replacement/)，修改完成之后需要手动刷新。另外，原本的项目采用的基于jQuery的传统技术栈，在之后项目的迭代升级中，制约了项目的开发。因此开始了本次的前端项目重构。

重构的目标是将原本组合在一起的官网项目和客户自服务项目按照其功能分成两块。

通过此次重构为之后重构运营管理平台积累经验。

## 项目结构

### 数据层

#### axios封装

数据层原先存在的问题是，ajax请求分布在项目中，例如每进入一个页面都会请求的数据（logUser），事实上是在所有的页面中都重写了一次的逻辑，分散的逻辑不利于后期的维护，以及换人开发的时候上手会比较困难。

![平均一个文件两个请求](/assets/blog/vue-jquery-0.png)



重构的项目中改善了此问题，方法就是统一管理请求，包括请求的处理以及请求方法的位置。基于webpack打包环境，引入axios，并对axios做一定的封装，实现：

1. 在发送请求之前和接收数据的时候统一处理
2. 优化体验加上loading的过度效果，
3. 对于某些需要用户登录权限的接口在拦截器中获取登录的权限并保持住登录状态。
4. 根据环境变量控制请求的接口地址。

这些改进需要配合后端的重构逐步实施，因为现在后台的请求不是完全统一，在后面的重构过程中需要将后台的返回统一化，这样也方便对数据的处理。目前针对此情况，对现有的接口做了一定的分类，按照请求的类型使用不同的axios实例具体可以参考[代码](http://192.168.86.17:8090/afin3/afin-portal-web/-/blob/dev/src/api/config.js), **在拦截器中使用MessageBox的单例模式（伪）参考**[我的笔记本的这个链接](https://www.yuque.com/alfxjx/gihbyq/odw8bw#rwKl0)
```javascript
const baseUrl = NODE_ENV === "development" ? "/api" : `${VUE_APP_PROD_API}`;

const axiosInstance = axios.create({
  baseURL: baseUrl
  // timeout: 30000,
});
// 请求拦截器，在发送之前对数据操作
axiosInstance.interceptors.request.use(function(config) {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    background: "transparent"
  });
  config.headers.authorization = sessionStorage.getItem("token");
  return config;
});
// 响应拦截
axiosInstance.interceptors.response.use(
  res => {
    clearTimeout(clearLoading);
    // 判断失误请求 httpCode=200
    if (res.data.code !== 0) {
      // ...
      loadingInstance.close();
      return;
    }
    // 拦截返回值里面的新的token，用于刷新保持登录态。
    // 大小写敏感
    const newToken = res.headers.authorization;
    // console.log(newToken);
    if (newToken) {
      sessionStorage.setItem("token", newToken);
    }
    loadingInstance.close();
    return res.data;
  },
  err => {
    // ...
    loadingInstance.close();
  }
);
```
重构的项目中使用 axios 对 http 请求进行了封装，默认是json格式的参数对象格式，对于某些未使用json格式对象的，暴露出一个基本axios请求对象实例，另外对于原始项目中较多的 form 请求格式，暴露一个form格式post请求函数。注意此函数需要对参数进行QS.stringfy()。
```javascript
// 对于某些使用form格式接口的适配
function axiosFormRequest(url, data) {
  return axiosBase.post(url, Qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
    }
  });
}
```
#### 请求根据环境变量配置不同的链接
由于开发过程中，在本地启动，所以http请求会跨域，因此需要webpack的devServer对请求做一次转发，解决跨域问题：
```javascript
// axios config.js
// dev环境下统一添加一个前缀/api,用以区分http请求和其他请求。
const { NODE_ENV, VUE_APP_PROD_API } = process.env;
const baseUrl = NODE_ENV === "development" ? "/api" : `${VUE_APP_PROD_API}`;
```
在webpack中，匹配到以/api开头的请求，将这些http请求代理到远程的后台服务。
```javascript
// vue.cofig.js
const { VUE_APP_DEV_API } = process.env;
const webpackConfig = {};
if (process.env.NODE_ENV === "development") {
  webpackConfig.devServer = {
    port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器,
    proxy: {
      "/api": {
        target: VUE_APP_DEV_API, // 这里是代理的目标地址
        changeOrigin: true,
        ws: true,
        // 这里是给请求添加referer,提供来源信息，后台会对此信息进行校验。
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("referer", VUE_APP_DEV_API);
        },
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
}
module.exports = webpackConfig;
```
#### 文件资源调用
文件下载功能封装，目前的项目中主要是有两种情况，一种是直接下载的pdf文件，还有一种是表格数据的导出。将两种方法封装在utils/index.js中。基本的原理就是模拟点击事件。
```javascript
export function clickToDownload(name, url) {
  const aLink = document.createElement("a");
  const evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true,false,window,0,0,0,0,0,false,false,false,false,0,null);
  aLink.download = name;
  aLink.href = url;
  aLink.dispatchEvent(evt);
}

```
### 逻辑层
#### 路由的引入
获取到数据之后，需要控制展示的逻辑，原本的项目中，每一个页面都是单独的文件构成，不便于维护，使用[Vue.js](https://cn.vuejs.org/v2/guide/)框架之后，基于单文件组件搭建项目，使用[vue-router](https://router.vuejs.org/zh/installation.html)对页面的路由进行控制，按照模块组织路由的结构，方便之后做维护，路由按照模块做[懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)。这样在打包之后会把app.js & chunk-vendor.js 按照路由拆成几个子文件，有助于优化首屏的加载速度。
```javascript
// router.js
const routes = [
  {
    path: "/",
    component: Layouts, // 部分的后台需要统一的外框，在这里设置
    children: [
      ...indexRoutes // 内部是子路由
    ]
  },
  ...HomeRoutes, // 其他不需要此layout的放在后面
  { // 错误页面的路由放在最后，因为是通配符
    path: "*",
    name: "404",
    component: ErrorComponent
  }
];
// home.js
export const HomeRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue") // 懒加载
  }
];
```
#### 引入升级
随着模块的增多，需要引入的也会变多，新的方法是使用webpack的[require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)方法，参考[https://www.jianshu.com/p/c894ea00dfec](https://www.jianshu.com/p/c894ea00dfec)。
```javascript
// 有两种情况一种是在布局中的路由，放在了@/router/moudles/layouts中，
// 还有一个就是@/router/moudles
const reqLayout = require.context("./modules/layouts", false, /\.js$/);
const req = require.context("./modules", false, /\.js$/);
const requireAll = requireContext => {
  let arr = [];
  requireContext.keys().forEach(key => {
    arr = arr.concat(requireContext(key).default);
  });
  return arr;
};
const resLayout = requireAll(reqLayout);
const res = requireAll(req);

let routes = [
  {
    path: "/",
    component: Layouts,
    children: resLayout
  },
  ...res
];
```
另外此时的路由表也有调整，原本是命名的导出`export { Route }`，现在为了方便引入都改成了`export default`。
> 另外此方式对于静态资源的引入也是有帮助的

#### 使用
使用路由的过程中可能需要用路由进行传参数，具体可以[参考文档](https://router.vuejs.org/zh/guide/essentials/passing-props.html)，注意解耦的时候，需要在路由中添加对应的配置，解耦之后路由的参数就和组件props同样的方式使用：
```javascript
const routes = [
	{
    path: "/bigdata/order/:id",
    name: "乾坤大数据-查看详情",
    component: BigdataOrderDetail,
    props: true
  },
]
// 使用的时候就是 this.id 否则是 this.$route.params.id
// query参数类似 /a?id=123&time=345
this.$route.query.id === 123
// 此外还有函数模式
{
    path: "/document",
    // name: "文档中心",
    component: Document,
    props: route => {
      return {
        focus: checkRoute(route.path)
      };
    }
}
```
> 本次的重构中推荐使用[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html)，这样路由跳转的时候是按照路由表中的name来跳转比较直观。

#### 使用路由控制权限
在一些后台管理系统中登录人的账号不同，其获得的权限也不同，可以在登录之后根据后台返回的权限信息对路由进行配置。一方面后台会对此进行约束，前端的方式就是使用路由守卫来进行控制。
[参考文档-路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)
```javascript
// 全局前置路由守卫 判断是否已经登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```
通常来说，对后台管理项目来说，可以根据路由表直接生成侧边栏结构，需要在路由的meta中对侧边栏信息进行填写 可以[参考vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)
```javascript
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
  hidden: true, // 不在侧边栏显示
  alwaysShow: true, //一直显示根路由
  meta: { roles: ['admin','editor'] }, //在根路由设置权限,这样它下面所有的子路由都继承了这个权限
  children: [{
    path: 'index',
    component: ()=>import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock', //图标
      roles: ['admin','editor'], //或者你可以给每一个子路由设置自己的权限
      noCache: true // 不会被 <keep-alive> 缓存
    }
  }]
}
```
#### 对可复用逻辑的封装
对一些可能会使用到的逻辑进行封装，方便之后的复用

1. 点击空白部分关闭 [v-clickout](http://192.168.86.17:8090/afin3/afin-portal-web/-/blob/dev/src/directives/clickOut.js), 原本的方式是在每个弹框中进行配置
```javascript
// clickout
$(document).bind("click", function (e) {
    if (
         // 页面点击的时候计算一下离打开弹框和弹框本体的距离，以此判断点是否outside
         $(e.target).closest("#addRoseBox").length > 0 
      || $(e.target).closest("#addhHtyhgl").length > 0 
    ) {
    } else {
        $("#addRoseBox").hide();
    }
})
```
```javascript
export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // inside
      if (el.contains(e.target)) {
        return false;
      }
      // outside call bindings
      if (binding.expression) {
        binding.value.call(this, e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
// main.js
import Clickoutside from "./directives/clickOut.js";
Vue.directive("clickout", Clickoutside);

// use
<div v-clickout="siderShow = false" />
```

2. [组件权限控制](https://www.jianshu.com/p/e50633a9005e)， 逻辑也是读取router.meta中的信息来判断，指令封装的方法参考上面的clickout和[文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
2. 使用的ui库的封装，[按需引入组件库](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)，减少打包的体积
```javascript
// @/components/element.js
// message 等需要在具体位置引入
import Vue from "vue";
import { Button } from "element-ui";
import "@/styles/element-variables.scss"; // 样式

Vue.use(Button);
// main.js 全量import
import "./components/element.js";
```
```css
@import "./var.scss";
/* 改变主题色变量 */
$--color-primary: $__blue;
$--color-warning: $__yellow__button;
/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```
#### 状态管理模块
这里展示一个简单的vuex的store写法，随着需要管理的状态增多可以再对store进行规范化。
```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    example: ""
  },
  mutations: {
    updateExample(state, payload) {
      state.example = payload;
    }
  },
  actions: {
    dispatchExample({ commit }, payload) {
      commit("updateExample", payload);
    }
  },
  modules: {}
});
```
### 展示层
#### 样式处理
为了能够实现样式的复用，这一次的重构选择了scss预处理器来编排项目中单文件组件的样式。 

- 默认的样式使用 scoped 修饰，防止样式污染
```
<style lang="scss" scoped>
```

- 类名称按照bem规则编写，充分利用scss的嵌套编写，这样样式能够成块，方便维护。
```css
.afin-header {
  &-wrapper {} // 这个是包裹在.afin-header之外的，也可以写在这里
  &-title {}
}
```

- 通用的样式设置成mixin，方便复用，颜色等特定变量也抽出。
```css
@mixin hcenter {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

@include hcenter;
```

- 保存上述样式的时候保存在src/styles下，文件名以一个下划线开头的，最后会被合并到index.scss文件中。
- 另外，使用element-ui的时候将自定义的样式等也放在这里的element-variables.scss中。[参考](https://element.eleme.cn/#/zh-CN/component/custom-theme#zai-xiang-mu-zhong-gai-bian-scss-bian-liang)

![image.png](/assets/blog/vue-jquery-1.png)
样式文件夹
#### 修改element-ui的样式
现在我们来说说怎么覆盖 element-ui 样式。由于 element-ui 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能加 scoped，但你又想只覆盖这个页面的 element 样式，你就可在它的父级加一个 class，用命名空间来解决问题。
```css
.article-page {
  /* 你的命名空间 */
  .el-tag {
    /* element-ui 元素*/
    margin-right: 0px;
  }
}
```


当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 来实现：
```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```
`sass` 你可以通过 `/deep/` 来代替 `>>>` 实现想要的效果。
所以你想覆盖某个特定页面 `element` 的 button 的样式，你可以这样做：
```css
/* in scss */
.xxx-container /deep/ .el-button{
  xxxx
}
```


#### 组件化开发
常用的组件除了基于element-ui封装的组件之外，对不同的项目还会封装特定的组件，本次重构中封装了以下几个组件用于复用：

1. 回到顶部组件
1. 带提示功能的输入框，选择框组件
1. 树形组件等

自定义组件都以Afin开头，保持独特性，方便之后汇总。
#### 静态资源引入

- 静态的图片等文件放在@/assets/img下，会被webpack打包，打包时[将小于 4kb 的资源内联](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E4%BB%8E%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E5%AF%BC%E5%85%A5)，而大的静态资源放在public文件夹中的，打包时原样复制进入build的文件中。
- 引入图片资源的时候，需要通过require引入，**类似于将图片看作是一个模块**。因此也可以使用import pic from "path" 的方式。
- 静态文件pdf等，放在/public文件夹里面，打包的时候会原样打包到生产包中。
#### echarts相关的配置

1. 饼图默认高亮其中一个。可以使用echarts实例的dispatchAction方法
```javascript
/**
 * @description 饼图默认高亮一个
 * @author xujx
 * @date 2021-02-04
 * @export
 * @param {*} charts echarts的实例
 * @param {*} dataIndex 高亮第几个
 * @param {number} [seriesIndex=0]
 */
export function defaultHighlight(charts, dataIndex, seriesIndex = 0) {
  // 输入index超过范围就置为0
  const len = charts.getOption().series[seriesIndex].data.length;
  if (dataIndex > len - 1) {
    dataIndex = 0;
  }
  charts.dispatchAction({
    type: "highlight",
    seriesIndex: seriesIndex,
    dataIndex: dataIndex
  });
  // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
  charts.on("mouseover", function(e) {
    charts.dispatchAction({
      type: "downplay",
      seriesIndex: seriesIndex,
      dataIndex: dataIndex
    });
    const index = e.dataIndex;
    if (e.dataIndex !== index) {
      charts.dispatchAction({
        type: "downplay",
        seriesIndex: seriesIndex,
        dataIndex: index
      });
    }
    if (e.dataIndex === 0) {
      charts.dispatchAction({
        type: "highlight",
        seriesIndex: seriesIndex,
        dataIndex: e.dataIndex
      });
    }
  });

  // 当鼠标离开时，把当前项置为选中
  charts.on("mouseout", function(e) {
    charts.dispatchAction({
      type: "downplay",
      seriesIndex: seriesIndex,
      dataIndex: e.dataIndex
    });
  });
}

```


## 代码风格的说明
重构项目使用 eslint 约束代码的格式。关于vuejs的代码风格可以参照[风格指南](https://cn.vuejs.org/v2/style-guide/) 。下面挑几个重点说明。
### 暂时关闭eslint的校验
如果遇到eslint报错但是这里不适合按照推荐修改的情况，可以有两种方法解决：

1. 在eslintrc.js里面，在rules里面添加一个配置关闭报错。
1. 在报错位置添加魔法注释（magic comments）
```javascript
/* eslint-disable */
something with eslint error
/* eslint-enable */
```
### 如何自动按照eslint标准格式化
可以配置编辑器在保存的时候自动格式化，也可以手动格式化，vue cli提供了一个功能 lint 用于格式化代码
```shell
yarn lint // cli 的格式化指令
```
## 编写单元测试
对于一些工具函数有必要编写测试方法，模板中列举了对日期格式化函数的单元测试，具体见 src/utils/formatDate。
```
npm i -D jest // 安装依赖

// package.json
"script": {
   "test": "jest --coverage"
}

// .eslintrc.js
env: {
  jest: true // 避免jest测试的函数报错
},
```
运行 npm run test可以查看代码覆盖率等情况。
```javascript
// const formatDate = require("./formatDate").formatDate;
// or
import { formatDate } from "./formatDate";

test("formatDate", () => {
  expect(formatDate(null, "yyyyMMdd")).toEqual("");
  expect(formatDate(new Date("2020-11-11"), "yyyyMMdd")).toEqual("20201111");
  expect(formatDate(new Date("2020-11-11 10:11:11").getTime(), "yyyyMMdd-hh:mm:ss")).toEqual(
    "20201111-10:11:11"
  );
  expect(
    formatDate(Math.floor(new Date("2020-11-11").getTime() / 1000), "yyyyMMdd")
  ).toEqual("20201111");
});

```
## 项目打包的相关
### 配置不同的环境变量模式
vue/cli中默认设置了development、production等常用的环境变量。有的时候，项目还需要一个测试的环境，或者说项目在A版本的时候需要跳转a链接，但是到了B版本的时候却需要跳转b链接，本项目中使用的是自定义一个mode=test来配置。
```powershell
# .env.test 文件
NODE_ENV = production #表明打包的时候为生产环境
VUE_APP_MODE = test #表明使用的是test变量flag来进行判断
VUE_APP_PORTAL = https://v2.to.io/portal/ #也可以保存些信息
```
这样在打包的时候，可以运行` "build:test": "vue-cli-service build --mode test",`实现按照flag打包。
### vue.config.js
最终是暴露出一个对象，所有的webpack的配置都是在这个对象中去配置的，最后通过vue/cli的merge与基本的配置合并。
```javascript
const webpackConfig = {};
module.exports = webpackConfig;
```
### 开启gzip
```javascript
const CompressionPlugin = require("compression-webpack-plugin");

if (process.env.NODE_ENV === "production") {
  webpackConfig["configureWebpack"] = config => {
     config["plugins"].push(
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: true
      })
    );
  }
}
```
### 图片压缩
```javascript
const customOptions = {
  mozjpeg: {
    progressive: true,
    quality: 50
  },
  optipng: {
    enabled: true
  },
  pngquant: {
    quality: [0.5, 0.65],
    speed: 4
  },
  gifsicle: {
    interlaced: false
  },
  // 不支持WEBP就不要写这一项
  webp: {
    quality: 75
  }
};
if (process.env.NODE_ENV === "production") {
  webpackConfig["chainWebpack"] = config => {
    config.module
      .rule("images")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options(customOptions)
      .end();
  };
}  
```
### 关闭sourceMap
```javascript
const webpackConfig = {
  // 生产环境关闭sourceMap
  productionSourceMap: false
};
```
### 查看打包优化的包体积
```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
if (process.env.NODE_ENV === "production") {
  webpackConfig["configureWebpack"] = config => {
    config["plugins"].push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: `../reports/r-${new Date().getTime()}.html`
      })
    );
  }  
}
// 可以把/reports加入 .gitignore
```
### webpack-devSever
```javascript
const { VUE_APP_DEV_API } = process.env;
if (process.env.NODE_ENV === "development") {
  webpackConfig.devServer = {
    // port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器,
    proxy: {
      "/api": {
        target: VUE_APP_DEV_API,
        changeOrigin: true,
        ws: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("referer", VUE_APP_DEV_API);
        },
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
}
```
## 前端开发脚手架
## 参考文章
[入门前端工程化](https://woai3c.gitee.io/introduction-to-front-end-engineering/03.html#%E9%AB%98%E5%86%85%E8%81%9A-%E4%BD%8E%E8%80%A6%E5%90%88)
[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
