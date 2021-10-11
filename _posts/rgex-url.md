---
title: '[Regex]手把手教你解析一个URL字符串'
excerpt: '本文从如何使用正则去判断一个字符串是不是url地址出发，介绍了正则的相关规则与技巧'
coverImage: '/assets/blog/regex.jpeg'
date: '2021-01-22T22:15:42.712Z'
type: tech
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

## 需求
实现对网页地址链接的匹配；
一些典型的网页链接如下：

- [http://www.baidu.com](http://www.baidu.com)
- [https://www.abc.com/a/b](https://www.abc.com/a/b)
- [http://admin.afin.com:23456](http://admin.afin.com:23456)
- [http://www.vuejs.org/#/home](http://www.vuejs.org/#/home)
- [http:// www.163.com/a?day=1234&night=2345](http://%20www.163.com/a?day=1234&night=2345)

如上所示，需要匹配下面的6个：
### 协议
协议头一般有http、https、ftp等这里写一下匹配的方式：
```javascript
let protocol = /(?:ht|f)tp(?:s)?(?=:\/\/)/
protocol.exec('http://1234')
// ["http", index: 0, input: "http://1234", groups: undefined]
```
解释：

- 使用非捕获组`/(?:ht|f)/`，只对值判断，但是不将结果，也就是(ht|p)看作是一个捕获组；
- 使用正向零宽断言`(?=:\/\/)`,匹配后面的://，只有有此符号才算匹配。
> [正则表达式之捕获组和非捕获组](https://www.jianshu.com/p/2547f0e3e809)

### 域名
对于域名，一般来说有两种情况，一个事数字的ip域名，一种是字符域名。
> IP地址的长度为32位(共有2^32个IP地址)，分为4段，每段8位
> 用十进制数字表示，每段数字范围为0～255，段与段之间用句点隔开。
> [https://www.jianshu.com/p/82886d77440c](https://www.jianshu.com/p/82886d77440c)

1. 对于ip域名：
   1. 数字在0~255之间，`/^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/`
   1. 总共4段： `/^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:(?:\.)(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3,3}$/`
   1. 解释一下，上面的匹配数字的方法避免了001这样的匹配，然后匹配四段后面的`{3,3}`则是保证只能是4段。
> [DNS](http://baike.baidu.com/view/22276.htm)规定，域名中的标号都由英文字母和数字组成，每一个标号不超过63个字符，也不区分大小写字母。标号中除连字符（-）外不能使用其他的标点符号。级别最低的域名写在最左边，而级别最高的域名写在最右边。由多个标号组成的完整域名总共不超过255个字符。
> [https://developer.aliyun.com/article/297853](https://developer.aliyun.com/article/297853)

2. 对于字符的域名：
   1. 按照规则可以写出一个域名： 'test-12.admin.abandon.work'
   1. 匹配它： `/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/`
3. 将两中匹配的规则合并起来：
   1. 首先匹配ip，然后再匹配域名
   1. 将二者合并起来
   1. 参考： [Regular expression to match DNS hostname or IP Address?](https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address)
   1. `/^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:(?:\.)(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3,3}$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/`
```javascript
/^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:(?:\.)(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3,3}$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/.exec("www.abandon.work");
// ["www.abandon.work", undefined, "abandon.", "abandon", "work", index: 0, input: "www.abandon.work", groups: undefined]
```
[在线演示请看这里](https://regexr.com/5gu8v)
这里还可以对捕获组进行一点优化，聪明的小伙伴你看看是怎么搞的。
### 端口号
其实最困难的部分已经过去啦，下面对端口号的匹配就很简单了，匹配的是冒号后面的数字。
```javascript
/(?<=\:)[0-9]+$/.exec('http://www.abandon.wor:8080');
// ["8080", index: 23, input: "http://www.abandon.wor:8080", groups: undefined]
```

- 需要注意的是这里使用了一个[正向后行断言](https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html)，用来判断端口号前面的冒号，这样匹配的捕获组里面就没有冒号啦。
- 当然 不是所有的域名都会把端口号暴露在外面，为了保护自己的底裤，很多的页面是没有端口号显示的，因此在最后拼接正则表达式的时候需要注意这一点。
### 路由
对于路由，如法炮制，注意路由是由一个/开始的，并且这个斜杠的后面一个字符一定不是/：
```javascript
/(\/[0-9a-z#.]+)+|(\/)/.exec('abandon.work/');

// ["/", undefined, "/", index: 12, input: "abandon.work/", groups: undefined]

/(\/[0-9a-z#.]+)+|(\/)/.exec('abandon.work/admin/#/articles/id');

// ["/admin/#/articles/id", "/id", index: 12, input: "abandon.work/admin/#/articles/id", groups: undefined]
```

- 这里我认为还有优化的空间，可以把每一个都匹配出来才是最方便的。**<TODO>**
### query参数
query参数从？开始，中间是&链接，键值对保持key=value形态。
上代码：
```javascript
/(\?[0-9a-z&=]+)/.exec('abandon.work/api?tab=10&date=10-11');

// ["?tab=10&date=10", "?tab=10&date=10", index: 16, input: "abandon.work/api?tab=10&date=10-11", groups: undefined]
```
要是可以直接匹配出键值对就好了。或者匹配出key=value的形式。
```javascript
var url = 'name=ooo&age=10';
var reg = /([^&=]+)=?([^&]*)/g;
// 每执行一次就吐出一堆key&value
reg.exec(url)
["name=ooo", "name", "ooo", index: 0, input: "name=ooo&age=10", groups: undefined]
reg.exec(url)
["age=10", "age", "10", index: 9, input: "name=ooo&age=10", groups: undefined]
```
根据上面的代码可以写出一个很常见的[查询参数的方法](https://www.jianshu.com/p/708c915fb905)：
```javascript
const getParams = (url ,name) => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = url.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  };
  return null;
}
let url = 'https://cn.bing.com/search?q=ip%E5%9C%B0%E5%9D%80+%E8%A7%84%E5%88%99&qs=n&form=QBRE&sp=-1&pq=ip%E5%9C%B0%E5%9D%80+%E8%A7%84%E5%88%99&sc=1-7&sk=&cvid=FC57C982563B4F188629B32CAE541761';
getParams(url, "pq")
// "ip地址+规则"
```
另外， [正则表达式获取url中的所有参数和值](https://www.cnblogs.com/fengshuzi/p/3378957.html)
### 页面hash
页面的hash匹配的是文章阅读的锚点，注意不要和hash路由搞混了。
```javascript
/#([0-9a-zA-Z\-]+)/.exec('abandon.work/api#introduction')

// ["#introduction", "introduction", index: 16, input: "abandon.work/api#introduction", groups: undefined]
```


## 总结
合并上面的正则的时候要注意有时候url中没有某些参数也是正确的。
```javascript
const http = /(?:ht|f)tp(?:s)?(?=:\/\/)/;
const domain = /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:(?:\.)(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3,3}$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
const port = /((?<=\:)[0-9]+)$/;
const route = /(\/[0-9a-z#.]+)+|(\/)/;
const query = /(\?[0-9a-z&=]+)/;
const hash = /#([0-9a-zA-Z\-]+)/;

const url = "https://www.abandon.work:6001/#/blog?startDate=1&endDate=10&promote=false#test";
const regex = /^*$/i; <TODO>
regex.exec(url);
regex.test(url)
```
```javascript
regex.exec(url)
[
  "http://www.abandon.work:6001/#/blog?startDate=1&endDate=10&promote=false#test",
  "http://",
  "www.abandon.work",
  ":6001",
  "/#/blog",
  "?startDate=1&endDate=10&promote=false",
  "#test",
  index: 0,
  input: "http://www.abandon.work:6001/blog?startDate=1&endDate=10&promote=false#test",
  groups: undefined
]
```
大功告成！希望之后你能用正则解决更多的问题。
## Ref
[正则表达式之捕获组和非捕获组](https://www.jianshu.com/p/2547f0e3e809)
[菜鸟教程 Regex](https://www.runoob.com/jsref/jsref-obj-regexp.html)
