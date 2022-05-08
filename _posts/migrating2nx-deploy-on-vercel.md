---
title: "Migrating to Nx & Deploy on Vercel"
excerpt: "将手头的一个 nest.js 项目添加到一个基于 Nx 的 monorepo , 添加一个 angular 的前端加入到 repo 中，使用 GitHub Actions 和 Vercel 进行自动化的部署。"
coverImage: "/assets/blog/nx-ng-nest.png"
date: "2022-05-08T18:06:00.000Z"
type: tech
tag: ["Nx", "Nest.js", "Angular", "Vercel"]
author:
  name: Alfxjx
  picture: "/assets/authors/alfxjx.jpg"
---

最近发现 mongodb 有一个白嫖的云数据库可以用，准备开发一个统一的后台，用来承接一下个人的项目，并且给这个后台配置一个单独的管理后台。技术选型的时候，首先选择了之前比较熟悉的、使用了类似 Spring 的 Nest.js 来开发。也因此前端的选型选择了 Angular ，然后再部署到 vercel 上面，为了能够方便的部署和开发管理，选择了 GitHub Actions 和 Nx.
因此，本文的目标：将手头的一个 nest.js 项目添加到一个基于 Nx 的 monorepo , 添加一个 angular 的前端加入到 repo 中，使用 GitHub Actions 和 Vercel 进行自动化的部署。

> 1. 项目地址： [Alfxjx/home-admin](https://github.com/Alfxjx/home-admin)
> 1. 在线演示： [home-admin](https://home-admin.abandon.work/)

## 简介

首先是基于原本的脚手架，搭起了一个 nest.js 的项目，参考[这个文章](https://juejin.cn/post/7023690214803505166)进行了部署。再进一步开发的时候发现了一些问题。因为选择了 mono-repo 的形式来管理前后端，需要对目前的项目进行一个迁移，并且迁移之后还是需要保持原本的 GitHub Actions。

## Migration 迁移

### Create an Nx repo

第一步是新建一个 Nx 的项目。可以参考文档，这里我们就直接新建一个空白的项目。

```shell
# create an empty workspace set up for building applications
npx create-nx-workspace --preset=apps
```

可以得到一个基本的模版，如下所示：

```shell
myorg/
├── apps/ # 存放项目的应用
├── libs/ # 存放自定义的库文件
├── tools/ # 自定义的一些脚本，类似数据库脚本。
├── workspace.json
├── nx.json
├── package.json
└── tsconfig.base.json
```

使用 VScode 开发，推荐安装 [Nx 的官方扩展](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)可以很方便的对项目进行配置。

> nrwl.angular-console 看来原本是为了 ng 设计的

使用这个扩展可以唤起一个配置表单用来配置 serve / build 的配置参数，当然自己想在 CLI 里面输入也是可以的。

```shell
npx nx build <app-name>
```

### Migrate the nest.js

框架搭好，之后需要做的就是把已经开发的项目迁移过来，参考[文档](https://nx.dev/migration/manual)，需要按照 Nx 的要求将之前的项目的文件迁移过来。有几个需要注意的：

1. 首先把原本单体项目中的代码复制到新的项目的 /app/<your-app> 下
1. 删掉之前的 package.json，但是把依赖复制到根目录的 package.json 下， 处理一下依赖的冲突，还可以顺便升级一下 deprecated 的依赖。
1. 对于 nest.js 的项目需要一个 src/assets 目录，否则启动或者打包的时候会报错。
1. 之前的 import 如果有使用绝对路径的需要进行修改。
1. 配置文件，由于现在是一个子 app ，需要对 tsconfig.json, eslintrc.json 等文件进行修改，因为目前的 mono-repo 中， 主 repo 的根目录下有总的 config 文件，sub-app 需要在它的基础上进行修改：
1. 需要新增一个 nx 的配置文件 [project.json](https://github.com/Alfxjx/home-admin/blob/master/apps/home-admin-server/project.json)，添加一些 nx 的配置，例如开发模式，文件替换，输出位置，使用什么配置文件等。

迁移的过程中，按照功能点进行迁移验证，发现 Nx 对依赖的版本要求比较严格，下面的几个版本是绑定的，如果遇到一些问题的话，可以去看一下对应版本的 eslint-plugin-nx 的 peerDependency。除此之外，迁移的问题不是很大。

```json
{
	"@nrwl/eslint-plugin-nx": "14.0.5",
	"@typescript-eslint/eslint-plugin": "~5.18.0",
	"@typescript-eslint/parser": "~5.18.0"
}
```

在 /app 里面的迁移做完之后，需要在 monorepo 中 注册一下，因为我们的项目是手动导入的，所以需要改一下 根目录下的 workspace.json，添加一个项目名称和路径的对应关系。

> 之前的 project.json 的配置也可以一股脑的放在最外层的 workspace.json 里面

迁移完成之后，运行一下来看看项目还能否正常使用：

```shell
# 除了指定端口之外，需要设置 inspect=false 这样就是原本的 http://localhost:3000 了
# inspect 参考 https://nodejs.org/en/docs/guides/debugging-getting-started/
npx nx serve <your-app-name> --port=3001 --inspect=false
```

### Add new ng repo

添加一个新的项目就比较简单了，以[添加一个 ng 项目为例](https://nx.dev/packages/angular)：

1. 首先安装依赖 `npm install -D @nrwl/angular`
1. 类似于 ng generate , `nx g @nrwl/angular:app <appName>`
1. 事实上也没事别的需要做的，框架完成了接下来的任务。

### Add utils / libs

使用 mono repo 的模式，一个很大的优点就是可以把通用的库文件拆分出来进行管理，并且又不会出现 multi repo 模式管理时，繁琐的发包任务。这里我们以一个通用的组件库和一个工具方法集合为例。

#### lib 组件库模式

创建一个 ng-lib : `nx g @nrwl/angular:lib components`，新增一个名为 components 的组件库，然后在 src 下可以添加组件，记得在 src/index.ts 进行导出：

```typescript
export { Button } from "./libs/Button/index";
export type { ButtonProps } from "./libs/Button/index";
```

在 workspace.json 中，发现新增对应的配置。

```json
"components": {
  "root": "libs/components",
  "sourceRoot": "libs/components/src",
  "projectType": "library",
  "tags": [],
  "targets": {
    "lint": {
      "executor": "@nrwl/linter:eslint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["libs/components/**/*.{ts,tsx,js,jsx}"]
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "outputs": ["coverage/libs/components"],
      "options": {
        "jestConfig": "libs/components/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
},
```

在 tscofig.json 里面则是加入了对 path 的别名：

```json
    "paths": {
      "@home-mono/utils": ["./libs/utils/src/index.ts"],
      "@home-mono/components": ["./libs/components/src/index.ts"]
    }
```

这样在 app/home-admin-web 的项目中引用的时候就可以：

```tsx
import { Button } from "@home-mono/components";
```

#### utils 工具函数库

和上面的组件类似，不过是一个纯 ts lib :

```shell
npx create-nx-workspace <utils> --preset=ts
```

其他的工作和 上面的 components lib 类似。

## Deploy 部署

至此，我们已经完成迁移的工作，可以本地尝试一下 build， 应该是可以的。后面就是完成部署的工作。

### GitHub Actions

原本的 nest.js 的项目是通过 GitHub actions 部署到 vercel 。这里需要对 GitHub actions 的配置进行一点小修改即可。注意这里 nest.js 是需要配置 [vercel.json](https://github.com/Alfxjx/home-admin/blob/master/vercel.json)， 指明文件的目录的。和参考的文章 1 中配置一致。

```yaml
- run: npm ci
- run: npx nx build home-admin-server --if-present
- name: Deploy to Vercel
  run: npx vercel --token ${VERCEL_TOKEN} --prod
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

### Vercel git web hooks

前端的项目部署起来就比较简单，这里以 angular 的为例，参考一下 [Nx 官网](https://nx.dev/guides/deploy-nextjs-to-vercel#deploying-nextjs-applications-to-vercel) 的 next.js 的例子，发现需要在推送分支的时候，覆盖一下 vercel 的默认配置。

```shell
# BUILD COMMAND
nx run home-admin-web:build:production
# OUTPUT DIRECTORY
dist/apps/home-admin-web
```

看起来很简单，但是真的 push 才发现，由于我们的 mono repo 是一个项目，前端的项目会由于后端项目的 vercel.json ，使得刚才的配置不生效，为了解决这个问题，新建了一个 release-ng 的分支，删除了 master 上的 vercel.json。这样就可以正常部署了。记得修改一下 vercel 上的 [production branch](https://vercel.com/docs/concepts/git#production-branch)。

> 另外，可以使用 GitHub actions 来自动对 release-ng 进行 rebase, 减少发布的手动流程。

---

## More 其他

### Route rewrites

一个和本文关系不是很大的技巧，vercel 上面绑定自己的域名时，把一个二级域名用于多个项目是通过 cname 子域名来做的，如果想使用二级域名，可以在 mono repo 里面新建一个 next.js 的 Gateway 项目，利用 [path rewrite ](https://nextjs.org/docs/api-reference/next.config.js/rewrites)进行转发实现。

> 参考了 [https://notes.ljl.li/portfolio-redesign/](https://notes.ljl.li/portfolio-redesign/)

```javascript
module.exports = {
	async rewrites() {
		return [
			{
				source: "/blog/:slug",
				destination: "https://example.com/blog/:slug",
			},
		];
	},
};
```

## 结论

总之就可以将原本的多个项目整合到一个 mono repo 里面来管理与开发，对于 MEAN/MERN 架构的项目来说还是很方便的。
希望你喜欢。

## References

1. [基于 Vercel+Github Action 部署 Nest.js 项目](https://juejin.cn/post/7023690214803505166)
1. [https://nx.dev/](https://nx.dev/)
1. [如何使用 Nx、Next.js 和 TypeScript 构建 Monorepo](https://cloud.tencent.com/developer/article/1876571)
1. [Deploying Next.js applications to Vercel](https://nx.dev/guides/deploy-nextjs-to-vercel#deploying-nextjs-applications-to-vercel)
1. [Customizing the Production Branch](https://vercel.com/docs/concepts/git#production-branch)
1. [Rewrites - Next.js](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
1. [https://notes.ljl.li/portfolio-redesign/](https://notes.ljl.li/portfolio-redesign/)
