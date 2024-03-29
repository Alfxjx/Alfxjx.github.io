---
title: '[Puppeteer]我是如何做到写EXCEL时速3k行的'
excerpt: '之所以有了这篇文，完全就是前两天，老师又给大家派了一个好麻烦的项目统计某某期刊的信息。粗粗看了一下14个人的群里，有我这样延毕的老狗 同学，也有正当主力的研一研二的同学，貌似还有大四一直跟着老师做项目，美其名曰本科阶段就进入实验室的小朋友（当然还是蛮好的），好是很好啦，但是一看要我复制粘贴的文章有650+，顿时有点难顶，还好聪明的小徐同学很快想出了办法：'
coverImage: '/assets/blog/puppeteer.jfif'
date: '2020-05-03T16:35:07.322Z'
type: tech
tag: ['puppeteer','node.js']
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

## 起因


之所以有了这篇文，完全就是前两天，老师又给大家派了一个好麻烦的项目


统计某某期刊的信息。


粗粗看了一下14个人的群里，有我这样延毕的~~老狗~~ 同学，也有正当主力的研一研二的同学，貌似还有大四一直跟着老师做项目，美其名曰本科阶段就进入实验室的小朋友（当然还是蛮好的），好是很好啦，但是一看要我复制粘贴的文章有650+，顿时有点难顶，还好聪明的小徐同学很快想出了办法：


**CODING**!!!


## 开干吧


首先确定技术栈，因为主攻前端不懂就问，所以选择node作为主要的开发语言，加之要做的是统计文章的信息，稍微想了一下，这个需求不就是~~爬虫~~CV嘛。


`puppeteer`是`nodejs`中一个很好用的自动化工具，都不能说他是爬虫，因为他广泛应用于自动化测试中，可以看看[这篇文章](https://zhuanlan.zhihu.com/p/76237595)。


借鉴一下我朋友的[这个文章](http://www.weidongwei.com/blog/15?title=puppeteer%E7%88%AC%E7%9F%A5%E4%B9%8E)，首先：


```
npm i -S puppeteer
```


这里因为一下众所周知的原因，下载`Chromium`可能有点费劲，我这边之前玩`puppeteer`的时候就装好了，看官可以自行解决一下（搬瓦工啥的）；


`puppeteer` 作为一个自动化测试的库，其实就是自己在操作`Chrome`浏览器在进行一下指令，所以使用这个编写的代码我觉得还是很直观的。


## 观察需求


- 获取2014-2015年焊接学报的所有学术文章的标题，作者与单位，起止页码，摘要关键词等信息
- 作者需要按行分开，作者和单位需要对应上
- 在上面的基础上，其他行需要合并。
  ![](https://cdn.nlark.com/yuque/0/2021/png/502233/1610436480345-841eca98-9523-4f7b-a31c-8c0d14bf5202.png#align=left&display=inline&height=779&margin=%5Bobject%20Object%5D&originHeight=779&originWidth=1440&size=0&status=done&style=none&width=1440)
  [文章列表页](http://navi.cnki.net/KNavi/JournalDetail?pcode=CJFD&pykm=HJXB&Year=&Issue=&Entry=)
  ![](https://cdn.nlark.com/yuque/0/2021/png/502233/1610436480374-000ad5f3-f718-4157-875d-9c4fd4f2134e.png#align=left&display=inline&height=737&margin=%5Bobject%20Object%5D&originHeight=737&originWidth=1440&size=0&status=done&style=none&width=1440)
  [单个文章的示例](http://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&filename=HJXB201401001&dbname=CJFD2014&uid=WEEvREcwSlJHSldRa1FhcEFLUmVhMFE3R2FlMkI4akFIS1N4bGlEUUZtWT0%3D%249A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!)



## 解决方案


- 入口是CNKI的期刊文章列表页，基于ASPX生成。
- 在文章列表页，就可以得到一部分信息
- 摘要，关键词需要进入对应的文章页面去获取
- 作者和单位的对应需要进入pdf查看**（未完成）**
- 完成抓取之后再将数据导出成excel



> 可以看出，信息呈现三层形式保存。



## 爬取所有的首层信息


首先一些准备工作，引入包和规定的格式：


```javascript
const puppeteer = require('puppeteer');
const url = 'https://navi.cnki.net/knavi/JournalDetail?pcode=CJFD&pykm=HJXB';
// 统一设定一个等待时间，防止操作太快被目标认出来
const TIME = 3000;
```


接下来就是主函数：


```javascript
// 一个立即执行的异步函数
(async () => {
    const browser = await puppeteer.launch({
		// headless: false, // false浏览器界面启动
		slowMo: 100, // 放慢浏览器执行速度，方便测试观察
		args: [
			// 启动 Chrome 的参数
			'–no-sandbox',
			// '--window-size=1280,960',
		],
	});
    // 创建新页面
    const page = await browser.newPage();
    // 这一句就是前往目标页面
    await page.goto(url, {
		// 网络空闲说明已加载完毕
		waitUntil: 'networkidle2',
	});
	console.log('page加载完成！');
})()
```


经过上面的描述可以看出，`puppeteer`和`Electron`等有点类似，都是主进程中创建子进程进行操作。


接着就是在列表页选择对应的年份和期数，并且循环执行。


`puppeteer`意为**提线木偶**，所以想让浏览器做什么就发出对应的指令即可：


首先是用到的两个`util`函数：


```javascript
// 因为网页上年份的按钮的id是数字开头，直接S()会出错
// 所以需要把它转换成Unicode
function getID(year) {
	let num = year - 2010;
	return `#\\0032\\0030\\0031\\003${num}\\005f\\0059\\0065\\0061\\0072\\005f\\0049\\0073\\0073\\0075\\0065`;
}

// 选择某一年某一期的id
function getNoDotID(year, num) {
	let _num = num < 10 ? `0${num}` : `${num}`;
	return `#yq${year}${_num}`;
}
```


接下来：


```javascript
// 选择2014年，对每一期进行点击
// 年份点击事件
let yearNum = 2014;
const yearBtn = await page.$(getID(yearNum));
await yearBtn.click();
await page.waitFor(TIME);
let accNum = 1;
// 输出的结果，是一个二维数组。
let output = [];
// 从第一期开始，一个月一期
while (accNum < 13) {
    // 循环选择第几期
    let NoDot = await page.$(getNoDotID(yearNum, accNum));
    NoDot.click();

    // 保存所有的信息
    await page.waitFor(TIME);

    console.log('选择列表...' + accNum);
    const list = await page.$('#CataLogContent');
    const items = await list.?('dd');

    const res = await page.evaluate(list => {
        // ...
    }, list);
    output.push(res);
    accNum++;
}
```


- `page.$(), page.?()`类似于`document.querySelector/querySelectorAll`，返回一个节点元素
- `page.evaluate(function,node)` 是对上面选择到的对应的node节点进行浏览器内操作的方法，在function中实现。，function接受node作为参数。



在`page.evaluate`的内部，我们将文章的信息（标题，起止页码等）以及链接提取出来保存起来。


```javascript
const res = await page.evaluate(list => {
    // 在这里就可以使用browser的对象啦
    const itemList = list.querySelectorAll('dd');
    let arr = [];
    // console.log(itemList);
    for (let item of itemList) {
        // 这里是发现cnki是基于aspx的网页
        // 并且跳转到对应的页面是有规律的，和filename之后的id有关
        // 另外，不同的年份有不同的数据库
        const getPaperId = function(id) {
            let match = /filename=(\w+)&/i.exec(id);
            return match[1];
        }
        let paperID = item.querySelector('.opts > .btn-view >a').href;
        let id = getPaperId(paperID);
        // 最后将2014年某一条的innerText和id保存成一个字符串，留着之后解析
        let content = item.innerText + '&' +id;
        arr.push(content);
    }
    return arr;
}, list);
```


这样运行一下`npm start`，得到的数据就log出来了。目前我就是直接复制了一下，当然也有其他的办法。


最终得到的`data.txt`:


```javascript
[
    ["5052铝合金/镀锌钢涂粉CO2激光熔钎焊工艺特性\n樊丁;蒋锴;余淑荣;张健;\n1-4+113&HJXB201401001","铝合金超声-MIG焊接电弧行为\n范成磊;谢伟峰;杨春利;寇毅;\n5-8+113&HJXB201401002",...],
     ...
 ]
```


## 爬取摘要，关键词等信息


目前是有了部分信息，但是摘要和关键词还需要在第二层里面获取;


### 对数据进行一些预处理


`npm run analysis`


这一部分就是对上面得到的list进行处理，首先把2维数组拍平：


```javascript
const out2014S = require('./output2014');
const out2015S = require('./output2015');
const fs = require('fs');

// 获取引用
let out2014 = out2014S;
let out2015 = out2015S;
// flat
while (out2014.some(Array.isArray)) {
	out2014 = [].concat(...out2014);
}

while (out2015.some(Array.isArray)) {
	out2015 = [].concat(...out2015);
}
```


目前得到的数据示例如下：


```javascript
"5052铝合金/镀锌钢涂粉CO2激光熔钎焊工艺特性\n樊丁;蒋锴;余淑荣;张健;\n1-4+113&HJXB201401001",
    ...

```


需要对这个进行分析，自定义一个split函数：


```javascript
function SecondeSplit(arr, year) {
    // 数据序列化一下，保存下\n用于分割
	let str = JSON.stringify(arr);
	console.log('str' + str);
	let nArr = str.split('\\n');
	console.log('nArr' + nArr);
	// 0 title
	// 1 string authors
	// 2 pages and link
	let res = {};
    // clean
	res.title = nArr[0].replace(/\"/i, '');
	let names = nArr[1].split(';');
	res.name = names.slice(0, names.length - 1);
    // 存在有的文章没有页码和链接等问题
	if (nArr[2]) {
		let linkArr = nArr[2].split('&');
        // clean
		let link = linkArr[1].replace(/\"/i, '');
        // 两年的dbname稍有不同
		if (year === 2014) {
			res.link = `http://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&filename=${link}&dbname=CJFD2014`;
		}
		if (year === 2015) {
			res.link = `http://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&filename=${link}&dbname=CJFDLAST2015`;
		}
		let pages = linkArr[0].split('+');
		let pageArr = pages[0].split('-');
		res.start = pageArr[0];
		res.end = pageArr[1];
	}
	return res;
}

// 对两年的数据进行操作
let ret2014 = [];
out2014.forEach(i => {
	let tmp = SecondeSplit(i, 2014);
	ret2014.push(tmp);
});
// ... 2015一样

let ret = ret2014.concat(ret2015);

let jsonObj = {};
jsonObj.data = ret;
// \t能够保存一个比较美观的json
let wObj = JSON.stringify(jsonObj, '', '\t');
fs.writeFile('data.json', wObj, err => {
	console.log(err);
});

```


### 爬取摘要等


`npm run abstract`


这里的主要思路就是继续操作`puppeteer`，对每一个链接，获取对应摘要，学校和关键词信息


这里的`puppeteer`并没有用基于`async`的写法，用`then`也很方便。


```javascript
const obj = require('../data1.json');
const fs = require('fs');
const puppeteer = require('puppeteer');
// 因为要对obj操作
let data = obj;
const len = data.data.length;
puppeteer
	.launch({
		headless: true,
	})
	.then(async browser => {
		for (let i = 0; i < len; i++) {
			if (data.data[i].link) {
				const res = await getAbstract(i, data.data[i].link, browser);
                // 这里就用keyword来判断是否抓取成功了
				console.log(i + ': ' + res.keywords);
				data.data[i].abstract = res.abstract;
				data.data[i].school = res.school;
				data.data[i].keywords = res.keywords;
			}
		}
	})
	.then(() => {
		console.log('获取信息完成！');
		// console.log(data.data[0].abstract);
    	// 保存到data1.json
		save(data);
	});

```


`getAbstract`是一个获取摘要的函数，需要传browser实例，链接和序号：


```javascript
async function getAbstract(num, link, browser) {
	const page = await browser.newPage();
	await page.goto(link);
	await page.waitFor(3000);
    // 摘要
	let abs = await page.$('#ChDivSummary');
	let abstract = await page.evaluate(abs => {
		return abs.innerText;
	}, abs);
    // 学校
	let schoolDOM = await page.$('.orgn');
	let school = await page.evaluate(schoolDOM => {
		let arr = schoolDOM.querySelectorAll('span > a');
		let res = '';
		arr.forEach(i => {
			res += i.text + ',';
		});
        // 拼接为字符串后就删掉最后一个逗号
		return res.slice(0, res.length - 1);
	}, schoolDOM);
    // 关键词
	let keysDOM = await page.$('#catalog_KEYWORD');
	let keys = await page.evaluate(keysDOM => {
    // let arr = keysDOM.querySelectorAll('p')[2].querySelectorAll('a');
    // 上面的写法并不好，因为有的挂了基金有的没挂，所以不一定是第三个
    // 发现关键词里面一个dom是有id的
    // 所以选用了兄弟节点的方法。
    let arr = keysDOM.parentNode.children;
    let res = '';
    for(let j=1;j<arr.length;j++){
      res += arr[j].text.replace(/ /g, '').replace(/\n/g, '');
    }
		return res;
	}, keysDOM);
	await page.waitFor(3000);
    // 节省内存，每次查询完就关闭页面
	await page.close();
	return {
		abstract: abstract,
		school: school,
		keywords: keys,
	};
}

```


这样就得到了完整的数据：


```json
{
	"data": [
		{
			"title": "5052铝合金/镀锌钢涂粉CO2激光熔钎焊工艺特性",
			"name": [
				"樊丁",
				"蒋锴",
				"余淑荣",
				"张健"
			],
			"link": "http://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&filename=HJXB201401001&dbname=CJFD2014",
			"start": "1",
			"end": "4",
			"abstract": "以5052铝合金和热镀锌ST04Z钢为研究对象,采用预置涂粉CO2激光搭接熔钎焊方法进行工艺试验.利用光学显微镜、扫描电镜和拉伸试验机对熔钎焊接头的微观组织和力学性能进行了研究.结果表明,涂助溶剂和粉末后,焊缝成形明显改善,镀锌层没有烧损;熔—钎焊接头过渡层最大厚度小于10μm,针状Al-Fe金属间化合物没有向熔化的铝侧明显析出;接头具有较高的力学性能,最大机械抗载能力可达到208 MPa,约为5052铝合金母材抗拉强度的95.41%. ",
			"school": "兰州理工大学甘肃省有色金属新材料省部共建国家重点实验室,兰州理工大学有色金属合金及加工教育部重点实验室",
			"keywords": "铝钢;激光焊接;熔钎焊;粉末;"
		},
        ...
    ]
}

```


## 将数据导出到EXCEL


这里就是将数据导出啦，需求里面写的还是很明白的：


![](https://cdn.nlark.com/yuque/0/2021/png/502233/1610436480515-8d1e0e12-02a0-40ca-90ca-173fbd56336f.png#align=left&display=inline&height=362&margin=%5Bobject%20Object%5D&originHeight=362&originWidth=1492&size=0&status=done&style=none&width=1492)


我的想法就是根据每一个item的作者list的长度，首先是写出若干行，然后再将除了作者和单位之外的行进行合并。


```javascript
const Excel = require('exceljs');
const data = require('../data1.json');

// 数据预处理
let input = [];
let obj = data.data;
obj.forEach((item, index) => {
	let len = item.name.length;

	let link = item.link;
	let reg = /HJXB201(4|5)([0-9]{2})/i;

	let year = -1;
	let juan = -1;
	let vol = -1;
	if (link) {
		year = link.substring(link.length - 4, link.length);
        // 2014年是35卷，2015=36卷
		juan = year == 2014 ? 35 : 36;
        // 期数在链接里面就可以查出，是第二个匹配项
		vol = reg.exec(link)[2];
	}

	for (let i = 0; i < len; i++) {
        // 将数据整理成exceljs需要的样子
		input.push({
			index: index + 1,
			title: item.title,
			name: item.name[i],
			lang: '中文',
			school: item.school,
			abstract: item.abstract,
			year: year,
			juan: juan,
			vol: vol,
			keyType: '关键词',
			paperName: '焊接学报',
			keywords: item.keywords,
			start: item.start,
			end: item.end,
		});
	}
});

```


接着使用exceljs来创建工作表：


```javascript
// excel处理
let workbook = new Excel.Workbook();

workbook.creator = 'xujx';

let sheet = workbook.addWorksheet('sheet 1');

sheet.columns = [
	{ header: '序号', key: 'index', width: 10 },
	{ header: '唯一标识类型', key: 'onlykey', width: 10 },
	{ header: '唯一标识', key: 'onlyid', width: 10 },
	{ header: '题名', key: 'title', width: 15 },
	{ header: '正文语种', key: 'lang', width: 10 },
	{ header: '责任者/责任者姓名', key: 'name', width: 15 },
	{ header: '责任者/责任者机构/责任机构名称', key: 'school', width: 15 },
	{ header: '摘要', key: 'abstract', width: 15 },
	{ header: '主题/主题元素类型', key: 'keyType', width: 15 },
	{ header: '主题/主题名称', key: 'keywords', width: 15 },
	{ header: '期刊名称', key: 'paperName', width: 15 },
	{ header: '出版年', key: 'year', width: 15 },
	{ header: '规范期刊URI', key: 'URI', width: 15 },
	{ header: '卷', key: 'juan', width: 15 },
	{ header: '期', key: 'vol', width: 15 },
	{ header: '起始页码', key: 'start', width: 15 },
	{ header: '结束页码', key: 'end', width: 15 },
	{ header: '收录信息/收录类别代码', key: 'typeCode', width: 15 },
];

sheet.addRows(input);

```


在这之后就合并单元格：


```javascript
// 合并单元格
// 首先获取每一项的作者个数，保存在一个array中
let nameLength = [];
obj.forEach(item => {
	if (item.name.length) {
		nameLength.push(item.name.length);
	} else {
		nameLength.push(0);
	}
});

```


合并单元格从第二行开始（第一行是表头）：


```javascript
for (let j = 0; j < ret.length; j += 2) {
	sheet.mergeCells(`A${ret[j]}:A${ret[j + 1]}`);
	sheet.mergeCells(`B${ret[j]}:B${ret[j + 1]}`);
	sheet.mergeCells(`C${ret[j]}:C${ret[j + 1]}`);
	sheet.mergeCells(`D${ret[j]}:D${ret[j + 1]}`);
	sheet.mergeCells(`E${ret[j]}:E${ret[j + 1]}`);
	sheet.mergeCells(`H${ret[j]}:H${ret[j + 1]}`);
	sheet.mergeCells(`I${ret[j]}:I${ret[j + 1]}`);
	sheet.mergeCells(`J${ret[j]}:J${ret[j + 1]}`);
	sheet.mergeCells(`K${ret[j]}:K${ret[j + 1]}`);
	sheet.mergeCells(`L${ret[j]}:L${ret[j + 1]}`);
	sheet.mergeCells(`M${ret[j]}:M${ret[j + 1]}`);
	sheet.mergeCells(`N${ret[j]}:N${ret[j + 1]}`);
	sheet.mergeCells(`O${ret[j]}:O${ret[j + 1]}`);
	sheet.mergeCells(`P${ret[j]}:P${ret[j + 1]}`);
	sheet.mergeCells(`Q${ret[j]}:Q${ret[j + 1]}`);
	sheet.mergeCells(`R${ret[j]}:R${ret[j + 1]}`);
}

workbook.xlsx.writeFile('1.xlsx').then(function() {
	// done
	console.log('done');
});

```


上面的数组`ret`是这样得到的，它保存了合并单元格的起止位置。


```javascript
let ret = [];
// 是从第2行开始
ret.push(2);
// 对于每一个作者长度
for (let i = 0; i < nameLength.length; i++) {
    // 表示尾部的那个节点的位置
	let head = ret[ret.length - 1];
    // 目前数组长度为偶数，说明现在是成对的，因此需要把尾部节点的下一个数加入数组
	if (ret.length % 2 === 0) {
		ret.push(head + 1);
        // 同时，由于这一循环并没有用到nameLength数组，所以不算做循环++
    	i--;
	} else {
        // 如果是奇数，说明需要添加一个步长，来合并单元格
        // 所以需要一个作者个数-1的步长
    	ret.push(head + nameLength[i] - 1);
	}
}

```


这样就完成了99%了！


### 未完成的部分


- 但是需求里面还说需要作者和作者的单位对应，这就需要把文章下载下来分析了。
- 我目前的尝试是`pdf2json`，不过并不成功，时间紧迫就开启人工智能模式 ——手动搞了一下
- 确实有点累。



## 源码地址


[Github 求个star吧555](https://github.com/Alfxjx/CNKI-HJXB-Crawler)


[原文地址](https://juejin.cn/post/6844904083921305614)