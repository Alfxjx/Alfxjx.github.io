---
title: "Fighting with LeetCode -- 刷题记录一点思考"
excerpt: "刷题记录长期更新，最新的更新是快速排序"
coverImage: "/assets/blog/leetcode.jpeg"
date: "2022-03-16T15:42:22.712Z"
type: tech
tag: ["Leetcode"]
author:
  name: Alfxjx
  picture: "/assets/authors/alfxjx.jpg"
---

## 关于快速排序

今天学习了快速排序，读了[阮一峰老师的博客](https://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html),但是这个预设了数组是不重复的； 对于[这个题目来说](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)，有点不够用。后面又看了文章评论下面的讨论，对递归的快速排序改造了一下：

```javascript
function sortArr(arr) {
	if (arr.length <= 1) return arr;
	let mid = Math.floor(arr.length / 2);
	// 这里没有使用splice方法去改变原数组，原因是 mid 是存在重复的情况。
	let left = [];
	let right = [];
	let mids = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < arr[mid]) {
			left.push(arr[i]);
		} else if (arr[i] > arr[mid]) {
			right.push(arr[i]);
		} else {
			// 对于有重复的情况，需要把重复的放到一起
			mids.push(arr[i]);
		}
	}
	// 其他和原文是一样的
	return [...sortArr(left), ...mids, ...sortArr(right)];
}
```
