---
title: "Angular 配置代理的方法"
excerpt: "参考官方的文档，类似于 webpack 的配置模式，看起来比较容易懂，不过在实际的应用中，还是有一些需要注意的。"
coverImage: "/assets/blog/proxy-ng.png"
date: "2022-10-29T16:05:00.000Z"
type: tech
tag: ["Angular"]
author:
  name: Alfxjx
  picture: "/assets/authors/alfxjx.jpg"
---

参考官方的文档，类似于 webpack 的配置模式，看起来比较容易懂，不过在实际的应用中，还是有一些需要注意的。

## 当前的网络模式

![](https://cdn.nlark.com/yuque/0/2022/jpeg/502233/1667027866512-ebea1172-7a11-4194-8404-4d97bf78a093.jpeg)

下面以一个数据源为例子：

```typescript
@NgModule({
	providers: [
		{
			provide: NG_APP_HOST,
			useFactory: () => {
				if (environment.production) {
					return `http://${window.location.host}`;
				} else {
					return `/local-dev`;
				}
			},
		},
	],
})
export class AppModule {}
```

在 app.module.ts 中使用了一个令牌 provider，会根据是否是生产环境返回不同的前缀，由于生产环境是部署在同源的，但是可能会出现多地部署的情况，所以生产环境返回的是

> window.location.host (http://192.168.1.100:4200)

这里在部署的时候会在 nginx 做配置 这里先不多做讨论。

注入的令牌保存在 api.token.ts

```typescript
import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const NG_APP_HOST = new InjectionToken<string>("ng-app-host");
```

通过这个令牌 将配置的不同环境的前缀注入到 api.service 中；

```typescript
@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(
		@Optional() @Inject(NG_APP_HOST) public host: BehaviorSubject<string>
	) {}

	private wrap(api: string): string {
		let url = "";
		if (api.startsWith("/v1/common")) {
			url = `${this.host}${api}`;
		}
		return url;
	}
}
```

通过这样的配置可以在不同的环境添加不同的前缀，在本文的例子中，在本地开发的时候前缀就是

> /local-dev/xxxx-api

对于这样的 API，ng dev-server 会进一步进行转发，配置 proxy.conf.json:

```json
{
	"/local-dev/*": {
		"target": "http://192.168.1.110:4200",
		"secure": false,
		"pathRewrite": {
			"^/local-dev": ""
		}
	}
}
```

在 angular.json 里面配置一下

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "cari.scada.products.people.orientation.ui:build",
    "proxyConfig": "src/proxy.conf.js"
  },
}
```

这样就实现了开发环境的 api 转发。记录一下防止后面又晕了
