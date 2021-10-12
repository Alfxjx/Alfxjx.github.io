---
title: 'Next.js 项目迁移到 create-react-app'
excerpt: '公司的统一登录项目之前部署在私有云上采用的是 `next.js`，虽然存在一些问题但是还能使用。现在统一部署到公司自建的 devops 平台，由于平台只有通用的 `react` 流水线，部署之后是客户端渲染的类型（`CSR`），导致之前的服务端渲染部署上去存在很多问题，调整成 `SSG` 模式部署上去也存在很多问题，例如 `redux` 状态管理问题以及 `router` 跳转问题，针对这些问题，最终决定从 `next.js` 框架切换到 `create- react-app` 的客户端渲染模式。这个需求还是很奇葩的，网上搜了一圈也没这个先例，于是就写了此文记录一下迁移以及都 `CRA` 的一些配置。'
coverImage: '/assets/blog/nextjs.jfif'
date: '2021-09-20T17:10:00.000Z'
type: tech
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

公司的统一登录项目之前部署在私有云上采用的是 `next.js`，虽然存在一些问题但是还能使用。现在统一部署到公司自建的 devops 平台，由于平台只有通用的 `react` 流水线，部署之后是客户端渲染的类型（`CSR`），导致之前的服务端渲染部署上去存在很多问题，调整成 `SSG` 模式部署上去也存在很多问题，例如 `redux` 状态管理问题以及 `router` 跳转问题，针对这些问题，最终决定从 `next.js` 框架切换到 `create- react-app` 的客户端渲染模式。这个需求还是很奇葩的，网上搜了一圈也没这个先例，于是就写了此文记录一下迁移以及都 `CRA` 的一些配置。

## 迁移目标

原有的项目基于 next.js 使用了 next.js 的路由以及一些 [`getStaticProps` (Static Generation)](https://www.nextjs.cn/docs/basic-features/data-fetching#getstaticprops-static-generation) 方法，要对其进行重写，首先是安装 CRA 脚手架，将页面迁移过去，然后再配置 `react-router-dom`, `react-redux-toolkit` 等，最后在配置一下 `typescript` 的开发环境。

## 安装脚手架 create- react-app

```shell
# 在项目的根目录
npx create-react-app my-app --typescript
```

这样就在根目录新建了一个项目，这里可以先把子项目 `/my-app/node_modules` 添加到 `.gitignore`.

后面安装依赖：

```json
{
  "@reduxjs/toolkit": "^1.6.1",
  "react-redux": "^7.2.4",
	"react-router-dom": "^5.2.1",
  "redux": "^4.1.1",
  "@types/react-redux": "^7.1.18",
	"@types/react-router-dom": "^5.1.8",
}
```

### react-router-dom

由于之前的 `next.js` 是约定式路由，改成使用  `react-router-dom`,  加之公司其他的项目都是使用的配置式的路由，所以需要对其进行改造，经过研究，在项目的 `index.tsx`引入路由，在 `App.tsx`中配置路由表。

```shell
npm i -S react-router-dom
npm i -D @types/react-router-dom
```

```tsx
import { HashRouter as Router } from 'react-router-dom';
ReactDOM.render(
		<React.StrictMode>
			<Router>
				<App />
			</Router>
		</React.StrictMode>
  ,
	document.getElementById('root')
);
```

```tsx
import { Route, Switch } from 'react-router-dom';
export default function App() {
  return (
		<div className="App">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/oauth" component={Oauth} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</div>
	);
}
```

> 这里的路由是直接写在里面，也可以配置一个 路由表 然后渲染成组件，这样更加解耦

```tsx
const configRoute = [
  {
    path:'/login', component: Oauth,
    ...
  }
];
return (
    <Switch>
    	{configRoute.map(route)=>(
      	<Route path={route.path}, component={route.component}></Route>
      )}
    </Switch>
    );
```

对于 `next/router` 还有一个 `useRouter`， 可以使用 `useHistory` , `useLocation`来代替：

```tsx
import { useHistory, useLocation } from 'react-router-dom';
function App() {
	const history = useHistory();
  // 获取搜索栏的地址
	const { search } = useLocation();
	useEffect(() => {
		if (search) {
			history.push(`/oauth${search}`);
		} else {
			history.push('/dashboard');
		}
	}, [history, search]);
	return (
		...
	);
}
```

这样一来 `next/router`  的功能就被代替了，下面配置 `react-redux` 进行状态管理。

### react-redux

```shell
npm i -S @reduxjs/toolkit react-redux redux
npm i -D @types/react-redux
```

首先是 `index.tsx`

```tsx
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
```

配置的 store ：

```ts
// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// 按照模块划分需要保存的状态
import userReducer from './modules/userSlice'
export function makeStore() {
  return configureStore({
    reducer: { user: userReducer },
  })
}

const store = makeStore()
// 导出类型
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
export default store

```

user 模块：

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '@/store/store';

export interface UserState {
	userName: string;
}
// 创建一个初始的状态
const initialState: UserState = {
	userName: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
    // 类似于 vuex mutations
		getUserInfo: (state, { payload }: PayloadAction<UserState>) => {
			return payload;
		},
	},
});

export const { getUserInfo } = userSlice.actions;

export const selectUserName = (state: AppState) => state.user.userName;

export default userSlice.reducer;

```

另外 `react-redux` 还提供了几个hook 用于使用：

```tsx
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, AppState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
```

使用方法可以看这个例子：

```tsx
import { useAppDispatch } from '@/store/hooks';
import { getUserInfo } from '@/store/modules/userSlice';
const App = ()=>{
  const dispatch = useAppDispatch();
  const handleClick = (data)=>{
    dispatch(getUserInfo({ userInfo: data }));
  }
}
```

> 对于 异步 actions 回头再研究研究

### eject? customize-cra?

上面的配置完成之后，对于之前使用的一些 alias， proxy 等还需要继续配置，这里有两种情况

1. 运行 `npm run eject` 弹出隐藏的 `webpack` 配置，在其中配置参数；
2. 使用 `customize-cra` + `react-app-rewired` 进行个性化配置

本次迁移中一开始选择使用第二种方法，`customize-cra` + `react-app-rewired` ，

```js
const { useBabelRc, override } = require('customize-cra');
const { alias, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.path.json')

console.log(__dirname);
const config = override(
	// eslint-disable-next-line
	useBabelRc(),
	alias(aliasMap)
);

module.exports = config;
```

但是后面发现每次配置的时候都需要去查对应的封装的包，有点麻烦于是索性 `eject` ，自由配置 `webpack ` . `eject` 之后主要配置项就在 `/config` 目录下了，这里的配置大同小异，不会的小朋友可以去看看 《深入浅出webpack》.

`eject`还带来了一个目录 `/scripts` 里面写了打包编译的脚本文件，一般不用动，有时间可以看下，在启动项目和打包的时候 `create-react-app`到底做了什么工作。

## 去除 next.js 依赖

脚手架安装完成之后就是对项目进行迁移，并把`next.js`相关的 类似于 `next/link`，`next/router`等依赖切换成对应的 `react-router-dom`的方法和包。

## 配置 create-react-app 成为 react 开发环境

1. 在 `.env` 文件里 以 `REACT_APP_` 开头配置地址等文件

2. 创建 `/src/types/index.d.ts`  声明一些静态文件的类型

 ```typescript
   declare module '*.svg';
   declare module '*.png';
   declare module '*.jpg';
   declare module '*.jpeg';
   declare module '*.gif';
 ```

3. 设置别名和 `baseUrl`

   - 一个是在`webpack `里面设置，用于打包的时候，不过这里`create-react-app`的配置已经处理了，会读取项目中的`t/jsconfig.json` 文件里面的配置。

   - 还有一个是在 `tsconfig.json` 设置，用于开发的时候在 ide 里面解析

   ```json
   "baseUrl": "./",
   "paths": {
   	"@/*": ["./src/*"]
   }
   ```

 ## 后记

这个文章告诉我们的道理是，技术选型首先要慎重，根据项目的场景选择最合适的技术栈；其次是要选择熟悉的技术，否则后面的维护会受到影响；还有就是一旦遇到问题，当发现技术确实与现有的业务不匹配的时候，抓紧时间进行切换，减少沉默成本。