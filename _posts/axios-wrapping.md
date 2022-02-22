---
title: 'On Axios Requests & Wrapping'
excerpt: '前后端交互最常见的就是 `http` 请求，为了提高效率，需要对 `http` 请求进行封装，目前的现代开发过程中，可以使用 Axios，一种对于 `http` 请求的封装，或者是`fetch`，全新的异步请求`api`，本文主要是介绍我们项目中是如何根据后端返回的类型，对请求进行封装。'
coverImage: '/assets/blog/axios.jpg'
date: '2022-02-22T14:22:22.712Z'
type: tech
tag: ['Axios','Next.js', 'TypeScript']
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

## why axios？

前后端交互最常见的就是 `http` 请求，为了提高效率，需要对 `http` 请求进行封装，目前的现代开发过程中，可以使用 Axios，一种对于 `http` 请求的封装，或者是`fetch`，全新的异步请求`api`，本文主要是介绍我们项目中是如何根据后端返回的类型，对请求进行封装。

[Axios](https://www.axios-http.cn/) 是一个基于 promise 的网络请求库，可以用于浏览器和 `node.js`。`api` 简单，返回一个 `Promise` 对象，以供异步的处理。
[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 提供了一个 JavaScript 接口，用于访问和操纵 `HTTP` 管道的一些具体部分，例如请求和响应。它还提供了一个全局 [fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。
事实上两种都可以，相信你看了这篇文章之后也可以自己封装一下 `fetch`，甚至可以使用适配器模式去一统两种 api。那下面就看看是怎么对 `axios` 进行封装的。

## Requests

首先先看看实际生产中，`axios` 需要做什么工作:

### 拦截器，错误处理

`axios` 在使用的过程中需要生成一个 `axiosBase` 实例，从开始发送请求到收到响应可以分成以下几个过程：

1. 发起请求 `axiosInstance.get()`
1. 进入请求拦截器 `axiosBase.interceptors.request.use(...requestIntercepter);`
1. (server) 服务端进行响应
1. 进入响应拦截器 `axiosBase.interceptors.response.use(responseIntercepter);`
1. 返回响应，在业务中进行使用。

可以看出除了请求和响应之外，`axios` 提供的最多的配置就是请求拦截和响应拦截，程序设计的目的就是写出可维护并且能复用的代码，因此在两个拦截器中类似管道做通用的处理。

### 请求和响应

1. 业务中常见的有 `GET/POST/PUT` 请求，`post` 请求又会根据 `content-type` 分成两种，针对这些变化的量，锚定住代码中不变的量，需要进行设计。
2. 在常见的业务中，可能会是使用 `access-token` 的方式进行鉴权，在请求的拦截器中，可以拿到 `config` 参数，可以添加认证信息
3. 对于返回的响应报文，由于一般的返回报文是一样的，在响应拦截器中对响应进行第一步的通用处理，减少业务端的重复代码。

### 业务异常 VS Http 异常

响应拦截中，最常见的就是对异常情况进行处理，由于 `axios` 返回的是一个 `Promise`对象，因此要对返回的结果进行处理判断，之后返回 `Promise.reject` / `Promise.resolve`; 对于 `http` 的异常来说，由于本身就是一个 error，一般会放在 `Promise.catch` 里面去处理。

## Wrapping

### 生成实例

一般来说 baseURL 是不太会改变的,如果项目如果是比较稳定的话，可以把全局的设置也写上，如： `withCredentials`

```typescript
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
const baseURL = NODE_ENV === "development" ? "/api" : VUE_APP_PROD_API;

// 基本的axios实例
const axiosBase = axios.create({
	baseURL: baseURL,
});
```
如果项目中依赖多个api，那么这里可以生成多个实例，配置不同的 baseURL (开发中需要配置对于的proxies).

```typescript
// next.js 之类的 jamstack，可以自己生成 api routes 的，具有不同的 backend
const axioRoutes = axios.create({
  baseURL: "/api-routes"
});
```
### 拦截器

拦截器的主要功能就是对请求和响应进行处理，包装，最常见的就是附带token进行鉴权的操作：

```typescript
axiosBase.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = sessionStorage.getItem("token");
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
axiosBase.interceptors.response.use(
	(res: AxiosResponse<IResponse<any>>) => {
		if (!res) {
			return false;
		}
		if (Object.prototype.hasOwnProperty.call(res.data, "token")) {
			sessionStorage.setItem("token", res.data.token as string);
		}
		return res;
	},
	(err: AxiosError<{ errorMessage: string; success: boolean }>) =>
		Promise.reject(err)
);

```

## 处理异常

请求一个很重复的操作就是处理异常，一般来说异常都很有规律性，可分成业务操作错误导致的业务异常和由于请求失败导致的HTTP异常。
### 业务异常

`AxiosInstance` 会返回一个 `Promise`，对于业务异常都是在http returnCode 为200的时候。以 POST 请求为例子：

定义一个 标准的返回体： 

```typescript
export interface IResponse<T> {
	data: T;
	errorMessage: string;
	success: boolean;
	token?: string;
}
```
当返回success为false的时候，表示出现了业务异常。 由于是Promise.then，可以在拦截器里面进行处理，也可以在实例返回中进行处理，这个地方如果不同的请求方法处理方式不同，就放到对应请求的实例里面去处理，反之就存在拦截器就可以。一般来说不同的请求方式返回的应是一致的：

```typescript
axiosBase.interceptors.response.use(
	(res: AxiosResponse<IResponse<any>>) => {
		if (!res) {
			return false;
		}
    if (!res.data.success) {
			notify.warning(res.data.errorMessage);
		}
    // token...
	},
	(err: AxiosError<{ errorMessage: string; success: boolean }>) =>
		Promise.reject(err)
);

```

### http error

对于 http 的异常，为了能够在封装中对其进行统一处理，需要对实例返回的Promise进行二次封装，还是以POST请求为例：

```typescript
const httpFuncs = {
  post<T>(
			url: string,
			data: any,
			config?: AxiosRequestConfig
		): Promise<AxiosResponse<IResponse<T>>> {
			return new Promise((resolve, reject) => {
				axiosInstance
					.post(url, data, config)
					.then((res: AxiosResponse<IResponse<T>>) => resolve(res))
          // http error
					.catch((err: AxiosError<IErrorProps>) => {
						notify.error(err.response?.data.errorMessage as string);
						if (
							err.response?.status === 401 &&
							isNoAuth(window.location.pathname)
						) {
							setTimeout(() => {
								window.location.href = "/person/login";
							}, 1000);
						}
						return reject(err);
					});
			});
		}
}
```

在 `Promise.catch`中，处理返回的http error， 主要是401 和其他的500错误，这样就无需在具体的业务中关心这些异常的处理了。
## More

到此，基本就是完成了对 `axios` 等请求库的常规封装。

### 设计模式？

或许可以使用一个httpFactory来对http请求进行统一的管理，这样就不会在从mock升级到正式的情况都时候，要到每一个实例里面去修改了。

```typescript
enum enumType {
	BASE,
	MOCK
}

export class HttpFactory {
  public static getHttp(type:enumType){
    switch (type) {
      case enumType.BASE:
        return http
      case enumType.MOCK:
        return httpMock
      default:
        return http
    }
  }
}

```

使用的时候就直接使用 `HttpFactory.getHttp(enumType.MOCK).post<IUserInfo>('/userinfo')`, 这样升级的时候，直接把枚举修改一下即可。

实际生产中，可以使用配置文件来写这个枚举，这样就可以做到统一的管理。

## End

[在线演示]()

总的来说最适合应用的才是最好的，本文只是介绍了我们在改造为 ts + axios  + next.js 时候的经验，事实上对于 next.js，可以使用 [useSWR](https://swr.vercel.app) 等库，也进行了很好的封装。

## References

1. [比较 fetch()和 Axios](https://segmentfault.com/a/1190000021071492)
2. [完整的 Axios 封装-单独 API 管理层、参数序列化、取消重复请求、Loading、状态码...](https://juejin.cn/post/6968630178163458084)
3. [封装 Axios 只看这一篇文章就行了](https://juejin.cn/post/7053471988752318472)
4. [错误处理 - 最后的完善](https://juejin.cn/post/6969070102868131853#heading-4)
5. [vue+ts下对axios的封装](https://segmentfault.com/a/1190000021769678)
6. [TS 泛型接口](https://www.cnblogs.com/double-W/p/12875623.html)
7. [如何使用装饰器模式极大地增强fetch()](https://markdowner.net/article/153598623580815360)