---
title: "类型计算 & Typescript"
excerpt: "高质量的类型可以提高项目的可维护性并避免一些潜在的漏洞。"
coverImage: "/assets/blog/leetcode.jpeg"
date: "2022-07-30T15:42:22.712Z"
type: tech
tag: ["Typescript"]
author:
  name: Alfxjx
  picture: "/assets/authors/alfxjx.jpg"
---

## 引言

> 高质量的类型可以提高项目的可维护性并避免一些潜在的漏洞。
> via: [type-challenges](https://github.com/type-challenges/type-challenges)

前端开发的潮流之一就是使用 Typescript 进行开发，可以说 Typescript 让大型项目的前端开发体验上了一个台阶，不知读者们有无开发过大型的基于 Javascript 的前端系统的经验，一开始的时候 JS 带来的流畅的体验和效率让人很兴奋，但是随着维护时间的增加，以及业务逻辑随着时间推移不可避免的锈化，很多时候在工作时会对正在操作的对象产生怀疑：这个属性存在吗，是什么意思的来着？
从我的角度来看，在使用 JS 进行开发的时候，需要开发者自己去维护一套上下文模型，以应对返回的数据，和需要保存的状态等等。当项目扩大，参与人员增多的时候，多人开发无法快速互相沟通的问题，也会导致开发进度的受阻。所以如果可以的话，使用 TypeScript 吧！这篇文章不是布道，也不是关于 TS 的教程，网上资料很多，本文主要是想分享一下我在开发大型长期维护项目的过程中，对于类型计算和 TypeScript 的一些理解，以及 TypeScript 是如何服务于领域驱动设计和开发者的心智模型的。

## 类型化的 JS 的前世今生

JavaScript 是一门使用广泛并且很容易入门的语言，但是这种易用性导致了很大的不稳定性，相比于 Java，Rust 等我用过的静态类型语言来说，JavaScript 的超高自由度可以让我在一天里撸出一个前后端简单点单系统，但是也可以让我在后续的重构中痛不欲生——如果你在里面不能很规范的书写你的代码的话。
易书写，难梳理是我对 JavaScript 的开发的一个总结，为了解决这个问题，除 TypeScript 之外也有许多解决方案：

1. 首先是 [JSDoc](https://jsdoc.app/)，使用注释来给 JavaScript 方法等添加类型，结合编辑器可以实现一定的类型推断功能，详细大家都不陌生。
2. [Flow](https://github.com/facebook/flow) 可以说是一个很重要的 JavaScript 静态类型检查工具了。如果你读过 vue.js 的源码，应该对 Flow 有印象，有点类似于 Eslint，Flow 会在文件开头添加特殊注释打开检查功能，添加的类型注解会计算获得的类型，这和 TypeScript 也很类似。

关于 Flow 为什么没能竞争过 TypeScript ，可以去看看[这篇文章](https://jan.varwig.org/2017/02/15/flow-vs-typescript.html)，但总的来说就是使用起来不够方便，所以下面我们就看看，如何可以在项目中使用 TypeScript ，并且最大限度的利用 TS 的类型计算功能，辅助开发的流程。

## 如何在开发中最大限度利用 TypeScript

TypeScript 是 JavaScript 的超集，也就是说：

> 所谓超集是**集合论的术语**，A ⊇ B，则 A 集是 B 的超集，也就是说 B 的所有元素 A 里都有，但 A 里的元素 B 就未必有。 int i = 0; 合乎 C 语言语法，在 C++ 里也是合法的。

可以通过直接修改文件后缀名的方式，把 `.js` 代码直接转换为 `.ts`的代码。这种渐进式的引入我认为是可以快速传播的关键之一，配合 [ts-node](https://www.npmjs.com/package/ts-node) 可以很快的进行测试使用。
当然如果是新建的项目，主流的脚手架目前都支持拉取 ts 的模板，入门门槛已经很低了，网上的“第一天教程”也是满天飞。
那接下来应该怎么办呢，很多时候当我们开始真正写代码的时候，就会对 TS 有点手足无措了，也许我应该给我声明的变量设置一个类型，但是如果是接口返回的数据应该如何做？一些工具方法，例如 parse 结构的方法，应该如何最好的设置类型？对于使用的组件库/轮子，如何使用提供的`d.ts`文件？可能需要后续的学习了。这里不是很想赘述很多“[第二天教程](https://zhuanlan.zhihu.com/p/75906177)”，还是结合一些我最近写 ng 的体验来说说我是如何在开发中最大限度利用 TypeScript 的。

### 例子

考虑一个对象数组`{id:number,name:string}[]`，如果知道了 id 想去查询对应的 name，应该还是很容易的：

```javascript
function findObjByKey(objArr, key, value) {
  const res = {};
  objArr.forEach((x) => {
    if (x[key] === value) {
      Object.assign(res, x);
    }
  });
  return res;
}

const source = [
  {
    id: 1,
    name: "zhangsan",
  },
  {
    id: 2,
    name: "alfxjx",
  },
];
const id = 1;
const targetName = findObjByKey(source, "id", id)["name"];
// 'zhangsan'
```

但如果真的在编辑器里面手敲这段代码，就会发现并没有任何的推断，vscode 可以计算出一定的类型，但这对我们的意义不是很重要：毕竟业务中可能返回的不是基本类型而是一个领域模型的话，简单的推导就无能为力了。

![image.png](/assets/blog/ts-1.png)

考虑这么一种情况：

```javascript
const source = [
  {
    id: 1,
    userInfo: {
      userId: 12345,
      userName: "zhangsan",
      email: {
        value: "zhangsan@abandon.work",
        domain: "abandon.work",
      },
    },
  },
];
```

那么计算得出的结果，后续的属性获取就无法计算了，对于领域模型来说这是不可接受的。
如果我们使用了 TS，并且辅助以良好的类型计算：

```typescript
type User = {
  id: number;
  userInfo: {
    userId: number;
    userName: string;
    email: Email;
  };
};
type Email = {
  value: string;
  domain: string;
};

const source: User[] = [
  {
    id: 1,
    userInfo: {
      userId: 12345,
      userName: "zhangsan",
      email: {
        value: "zhangsan@abandon.work",
        domain: "abandon.work",
      },
    },
  },
];

function findObjByKey<T>(objArr: T[], key: keyof T, value: T[keyof T]): T {
  const res = {} as T;
  objArr.forEach((x) => {
    if (x[key] === value) {
      Object.assign(res, x);
    }
  });
  return res;
}
// 尝试输入这一行
const email = findObjByKey(source, "id", 1)["userInfo"].email["value"];
```

使用的时候是这样的：

![image.png](/assets/blog/ts-2.png)

此时已经可以满足常规的业务开发的需求了，当然我们回头再看看上面的类型，可以发现对于此方法我们的主要目的就是

1. 对于一个已知类型的数组（`T[]`）
2. 根据其中的一个键名（`keyof T`）
3. 传对应的键值（`T[keyofT]`）
4. 查出对象（`T`）

通过一些高级类型和泛型，我们可以做到在类型声明时的计算，从而获得更好的类型支持。

### 另一个例子

参考上面的例子中的 `Email` 类型，对于`Email.value`来说，事实上不是一个简单的基本字符串类型，而是一个有一定的规则的字符串，那么如何能够判断呢？
我们知道在 JS 中有很多方式，一个比较常用的方法就是使用正则表达式来判断。考虑一个最简的情况，一个邮箱地址分成三部分：邮箱名称 + @ + 域名（组织名称+.后缀），或许用 TS 也可以很好的描述

```javascript
const _isValidEmail: (email: string) => boolean = (email) => {
  const isEmailRegex = new RegExp(/.+\@.+\..+/);
  return isEmailRegex.test(email);
};
```

但是这样一来返回的是 Boolean，那如果我想知道在开发阶段就知道输入的邮箱是否正确的话（虽然这个没啥意义。）可以借助 TS 来实现：

```typescript
type ParseEmail<T extends string> = T extends `${infer P}@${infer A}.${infer Rest}` ? true : false;
const rightEmail = "xujianxiang@abandon.work";

const valid = _isValidEmail(rightEmail); // const valid: true
const noValid = _isValidEmail(""); // const noValid: false
```

这里使用了一个 infer 关键字，和 extends 关键字配合可以发挥出类似于解构赋值的功能。简单来说就是我推断传入的类型 T 是一个基于 string 扩展的类型，对于这个类型，判断其字符串内部的格式是否为 `aaa@bb.cc` 的格式，返回一个 Boolean。
另外的，考虑上一个例子里面的场景，用户提交用户信息的时候，需要在提交邮箱地址之外，另外传一个域名提供商信息：

```typescript
type ParseEmailString<T extends string> = T extends `${infer P}@${infer A}.${infer Rest}` ? T : unknown;
type ParseEmailProvider<T extends string> = T extends `${infer P}@${infer A}.${infer Rest}` ? `${A}.${Rest}` : unknown;

type EmailObj<Email extends string> = {
  email: ParseEmailString<Email>;
  provider: ParseEmailProvider<Email>;
};

function getEmailObj<T extends string>(email: T): EmailObj<T> {
  return {
    email: email,
    provider: email.split("@")[1],
  } as any;
}

const emailValidation = getEmailObj(rightEmail);
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/502233/1659084854354-c776fb54-638b-4ab3-8959-84e849ddeaea.png#clientId=u76d8de48-2fae-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=110&id=uadbae47f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=110&originWidth=510&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13114&status=done&style=none&taskId=u1562886f-cc72-4bb9-b1c0-f5a57156908&title=&width=510)

### Vuex Actions 类型推断

通过这个例子可以做什么呢？似乎在日常的开发中也不会硬编码一个邮箱，然后去判断它是不是正确的格式。比如使用 vuex 的时候，我们会使用 dispatch 发布改动的时候，会大量的使用字符串模板，可以用这样的方式去给不同的 Dispatch Type 标记类型：

```typescript
type VuexOptions<M, N> = {
  namespace?: N;
  mutations: M;
};

type Action<M, N> = N extends string ? `${N}/${keyof M & string}` : keyof M;

type Store<M, N> = {
  dispatch(action: Action<M, N>): void;
};

declare function Vuex<M, N>(options: VuexOptions<M, N>): Store<M, N>;

const store = Vuex({
  // 这里提示编译器，N泛型即为字符串'cart',无需对他进行推断了
  namespace: "cart" as const,
  mutations: {
    // 简写，实际是 add: function(){}
    add() {},
    remove() {},
  },
});

store.dispatch("cart/add");
store.dispatch("cart/remove");
```

原文章的地址在这里：

### 解析 UrlParams

另外一个很有用的地方就是对于`/purchase/[shopid]/[itemid]/args/[...args]`这样的 nodejs 请求地址，可以通过上面的类型计算去推到请求里面的`shopid`,`itemid`以及`args`等:

> 这里预设了地址栏里面的 id 是 number 类型，而后续的 ...args 是一个 string[]

```typescript
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;
type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key;
type Params<Path> = {
  [Key in FilteredParts<Path> as RemovePrefixDots<Key>]: ParamValue<Key>;
};
type CallbackFn<Path> = (req: { params: Params<Path> }) => void;

function get<Path extends string>(path: Path, callback: CallbackFn<Path>) {
  // TODO: implement
}

app.get("/purchase/[shopid]/[itemid]/args/[...args]", () => {
  const { params } = req;
  // params: {
  //  shopid: number;
  //  itemid: number;
  //  args: string[];
  //  }
});
```

上面的这个例子来自最近的一期 JavaScript Weekly 中的一篇：

## 领域驱动设计

从上面的两个例子可以看出类型计算的魅力，即从基础的类型出发，通过计算和推导即可得到后续的类型。TS 将开发者开发时的上下文记录了下来，帮助我们能够更好的编写健壮的代码。
TS 另外一个优势是它很有利于 DDD (领域驱动设计)，如果你喜欢，可以看看这个代码 ，这是一个基于 TS 的领域驱动设计实例，Readme 里面有很详细的说明，这方面我也需要继续学习，后续会出这个方面的文章。

## 写在最后

最后非常推荐大家去读 [TypeScript 类型体操通关秘籍](https://s.juejin.cn/ds/2gs3ckQ/) 这本小册，里面说是类型体操，读完之后你的 TS 水平一定会有所提高。另外有几个 github repo 也值得关注：

1. [type-challenges 类型体操题库](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md) 有时间可以上去做做练习，ts 的 leetcode
2. [ts-toolbelt](https://github.com/millsp/ts-toolbelt)，[utility-types](https://github.com/piotrwitek/utility-types)，[SimplyTyped](https://github.com/andnp/SimplyTyped) 等 TS 的工具类型库。
