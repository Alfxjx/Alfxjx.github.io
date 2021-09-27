---
title: "CSS 的 RGB 颜色覆盖"
excerpt: "浅薄的研究了一下，希望可以和我讨论"
date: "2020-09-27T08:18:39.741Z"
coverImage: "/assets/blog/css-rgb.jpeg"
type: posts
author:
  name: Alfxjx
  picture: "/assets/blog/authors/alfxjx.jpeg"
---


> 最近逛论坛，看到一个[帖子](https://www.v2ex.com/t/653679#reply73)，里面有一个回复很有意思：
>
> 举一个刁钻的例子
> 背景：
> CSS 也算是 GUI 开发里应用最广泛的“语言”，讲到 GUI 就可以深入到计算机图形学，取 CSS 里最常见的颜色部分
> 问题：
> 两层元素 底层 (c1=rgb) 上层 (c2=rgba) 叠加之后，呈现为什么颜色？

自己[试验](https://codepen.io/alfxjx/pen/KKpevpQ)了一下，查了一下相关的[笔记](https://www.cnblogs.com/xiyanhuakai/p/20200102_1625.html)，还有关于图形学的[知识](https://www.jianshu.com/p/6d9a3f39bb53)

**总结：**

1. 只有底色为不透明（rgb 或者 rgba 的透明度为 1）、覆盖层半透明时，会有颜色变化
2. 都是不透明，不会出现色彩叠加的问题
3. 都是透明也不会（这就有点难理解...

叠加的方法和上面的[笔记](https://www.cnblogs.com/xiyanhuakai/p/20200102_1625.html)里面说的差不多：

1. 底色的 rgb 记为`r1,g1,b1`
2. 覆盖色 rgba 记为`r2,g2,b2,alpha`
3. 则覆盖处计算得到的最终显示 rgba 可以表示为：

```css
background-color: rgba(
	r1 * (1-alpha) + r2 * alpha,
	g1 * (1-alpha) + g2 * alpha,
	b1 * (1-alpha) + b2 * alpha,
	1
);
```

~~浅薄的研究了一下，希望可以和我讨论~~
