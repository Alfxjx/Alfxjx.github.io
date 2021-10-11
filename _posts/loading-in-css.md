---
title: '[CSS]矩形进度条的两种实现'
excerpt: '最近开发接到一个需求，前端展示付款的验证码，验证码时效 10 分钟，到期过期，同时在二维码的外侧有一个倒计时条，原本的实现方式是通过 JS 来控制，设置左上，左下，右上，右下四个矩形，每个矩形只显示一个折角的边框，从而模拟整个外框。'
coverImage: '/assets/blog/css-loading.png'
date: '2020-07-19T20:35:07.322Z'
type: tech
author:
  name: Alfxjx
  picture: '/assets/authors/alfxjx.jpg'
---

最近开发接到一个需求，前端展示付款的验证码，验证码时效 10 分钟，到期过期，同时在二维码的外侧有一个倒计时条，原本的实现方式是通过 JS 来控制，设置左上，左下，右上，右下四个矩形，每个矩形只显示一个折角的边框，从而模拟整个外框。

根据倒计时的时间轮询计算比例，分别控制四个矩形的宽高，从而实现倒计时的 `CountDown` 效果。这样的实现方式有几个问题：

1. 使用4个元素来模拟，导致加入了很多不必要的数据
2. js 轮询操作，代码很冗长。

本文主要介绍两种非 js 控制的矩形倒计时条的实现方法。

## CSS 实现

css 实现方法的原理是：

1. 设置四个`background`，使用`linear-gradient` 形成纯色的图片背景。
2. 设置background的 `size` & `position`，使他们分布在元素的四周。
3. 设置一个动画，均分成 4 个阶段，每个阶段将背景的位置按照顺时针平移。

具体可以看代码

```css
.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--height);
  width: var(--width);
  border-radius: calc(var(--line) / 2);
  background: 
    linear-gradient(to right, var(--green) 99.99%, var(--blue))
    calc(-1 * var(--width)) 0rem 
    / 100% var(--line),
    linear-gradient(to bottom, var(--green) 99.99%, var(--blue))
    calc(var(--width) - var(--line)) calc(-1 * var(--height)) 
    / var(--line) 100%,
    linear-gradient(to right, var(--green) 99.99%, var(--blue)) 
    var(--width) calc(var(--height) - var(--line)) 
    / 100% var(--line),
    linear-gradient(to top, var(--green), 99.99%, var(--blue)) 
    0rem var(--height) 
    / var(--line) 100%;
  background-repeat: no-repeat;
  animation: progress var(--time) linear forwards infinite;
}

@keyframes progress {
  0% {
    background-position: 
      calc(-1 * var(--width)) 0rem,
      calc(var(--width) - var(--line)) calc(-1 * var(--height)),
      var(--width) calc(var(--height) - var(--line)), 
      0rem var(--height);
  }
  25% {
    background-position: 
      0rem 0rem,
      calc(var(--width) - var(--line)) calc(-1 * var(--height)),
      var(--width) calc(var(--height) - var(--line)), 
      0rem var(--height);
  }
  50% {
    background-position: 
      0rem 0rem, 
      calc(var(--width) - var(--line)) 0rem,
      var(--width) calc(var(--height) - var(--line)), 
      0rem var(--height);
  }
  75% {
    background-position: 
      0rem 0rem, 
      calc(var(--width) - var(--line)) 0rem,
      0rem calc(var(--height) - var(--line)), 
      0rem var(--height);
  }
  100% {
    background-position: 
      0rem 0rem, 
      calc(var(--width) - var(--line)) 0rem,
      0rem calc(var(--height) - var(--line)), 
      0rem 0rem;
  }
}

```

## SVG 实现

`svg`的实现则是hack了`stroke-dasharray`利用这个属性造出间断线来模拟倒计时，只要这个线足够长那么从视觉来看就是可以形成从全满变成全空的效果，这里的代码是这样的：

```html
<div class="father">
  <svg class="progressSvg" style={{'--speed': speed, '--progress': progress}} viewBox="0 0 120 120">
    <rect width="100" height="100" x="10" y="10" rx="10" ry="10" />
  </svg>
  <span class="son">{props.svg}</span>
</div>
```



主要看rect部分，设置了一个圆角，所以矩形的起始位置设置成了`x="10" y="10"`，并且由于设置了矩形的尺寸，为了能放下，所以 `svg` 标签的 `viewBox="0 0 120 120"` 从而放下这个圆角矩形。

这样以来，矩形的周长就是 400，所以设置`stroke-dasharray` 只要大于 400 即可，为了保险设置成 1000长度的实线，1000长度的虚线。

```css
.progressSvg rect {
  fill: none;
  stroke: blue;
  stroke-width: 4; // 控制边框的宽度
  /* 	stroke-linecap: round; */
  stroke-dasharray: 1000 1000;
  stroke-dashoffset: 0;
  animation: spin 60s infinite linear;
}

```



接着就是让它动起来，这里使用的是控制`stroke-offset`来控制，就从0（完全是边框）转到 -400（旋转了所有的边框），因为实线的前面是虚线，只要开始设置负的 `offset` 那么就会是类似于被吃掉的效果。

```css
@keyframes spin {
  to {
    stroke-dashoffset: -400;
  }
}
```

这样我们就实现了最简单的二维码倒计时进度条了。[在线演示 codepen.io](https://codepen.io/alfxjx/pen/jOBPeqX?editors=0010) 

## 组件化 基于 React

样式基本不需要修改，修改一下js 文件，主要通过 css 变量来对倒计时时间，进度进行控制。

这里根据需求：

1. 页面在加载的时候会给出过期时间，例如总共支付时间10分钟的话，当进度条走了 60% 之后，进度条颜色变成红色。
2. 根据给出的过期时间，页面刷新的时候，保持当前的进度。

```jsx
const CountedDown = (props) => {
  const [color, setColor] = React.useState("green");
  const [speed, setSpeed] = React.useState('100s');
  const [progress] = React.useState('0.75');
  return (
    <div>
      <div class="flex" style={{ "--bg": color, "--time": speed }}>
        <div class="countdown">
          <div class="progress">
            <div class="inner">
              {props.css}
            </div>
          </div>
        </div>
      </div>
      <div class="father">
        <svg class="progressSvg" style={{'--speed': speed, '--progress': progress}} viewBox="0 0 120 120">
          <rect width="100" height="100" x="10" y="10" rx="10" ry="10" />
        </svg>
        <span class="son">{props.svg}</span>
      </div>
    </div>
  );
}  
```

从上面的代码中，可以看出我们给 `css` 传入了 `--bg` 控制进度条的颜色，`--time`控制倒计时，读者可以自行查看在线演示代码。由于css版本的拐角存在问题，主要介绍svg版本。

在 svg 版本中， 传入了 `--speed` 控制速度，`--progress`控制进度，对应的 css :

```css
.progressSvg rect {
  fill: none;
  stroke: blue;
  stroke-width: 4;
  /* 	stroke-linecap: round; */
  stroke-dasharray: 1000 1000;
  - stroke-dashoffset: 0;
  - animation: spin 60s infinite linear;
  + stroke-dashoffset: calc((1 - var(--progress)) * (-400));
  + animation: spin var(--speed) infinite linear;
}
```

`--speed`很好理解，主要解释`--progress`，上文中，我们知道使用动画就是让 `stroke-offset`按照逆时针旋转到 -400， 那么保存进度就是保存这个 offset 值，当我们认为现在的百分比进度是0.75的话，就需要提前 **手动spin** `(1-0.75)*(-400)` 。

可以用于生产的 React 组件 可以参考下面的代码：

```css
/* CountDown.module.css */
.father {
  position: relative;
}
.son {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
  width: 100%;
  height: 100%;
}

@keyframes spin {
  to {
    stroke-dashoffset: -400;
  }
}

.progress rect {
  fill: none;
  stroke: var(--color);
  stroke-width: 4;
  /* 	stroke-linecap: round; */
  stroke-dasharray: 1000 1000;
  stroke-dashoffset: calc(-400 * var(--rate));
  animation: spin 600s infinite linear;
  /*   animation-direction: alternate; */
}
```

```tsx
import React from 'react';

import styles from './CountDown.module.css';

interface MyCSSProperties extends React.CSSProperties {
  '--color': string;
  '--rate': string;
}

const CountDown = ({
  color,
  timer,
  children,
}: {
  color: string;
  timer: number;
  children: React.ReactNode;
}) => {
  const style: MyCSSProperties = {
    // Add a CSS Custom Property
    '--color': color,
    '--rate': `${1 - timer / (600 * 1000)}`,
  };

  return (
    <div className={styles.father}>
      <svg className={styles.progress} viewBox="0 0 120 120">
        <rect style={style} width="100" height="100" x="10" y="10" rx="6" ry="6" />
      </svg>
      <span className={styles.son}>{children}</span>
    </div>
  );
};

export { CountDown };

```

```tsx
/* usage */
import { useCountDown } from 'ahooks';
import React, { useEffect, useState } from 'react';

const Index = ()=>{
  const [barColor, setBarColor] = useState('blue'); // red
  const [expiryTimer, setTargetDate, formattedRes] = useCountDown({
    targetDate: dataRes.expiredAt,
    onEnd,
  });
  useEffect(() => {
    if (timer !== 0 && timer < 600 * 0.35 * 1000) {
      setBarColor('red');
    }
  }, [expiryTimer]);
  return (
  <CountDown color={barColor} timer={timer}>
    <div
      className={classNames({
        hidden: show,
      })}
      id="qrcode"
      ref={qrcodeRef}
      />
  </CountDown>
  )
}
```

