(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5716:function(e,t,n){"use strict";n.d(t,{I:function(){return f}});var r=n(5893),i=n(7294),o=n(1565),a=n(4057),c=n(8589),s=n(8540),l=n(9468),u=n(4762),f=function(e){var t=e.title,n=e.children,o=(0,i.useContext)(u.MyContext),f=o.themeToggler,p=o.getNowTheme,h=(0,i.useState)(""),m=h[0],g=h[1];return(0,i.useEffect)((function(){var e=p();g("light"===e?"L":"D")}),[p()]),(0,i.useEffect)((function(){document.title=t}),[t]),(0,r.jsxs)(d,{children:[(0,r.jsx)(a.h,{}),(0,r.jsx)("div",{className:"btn-wrapper",children:(0,r.jsx)(c.Z,{toggleTheme:function(){return f()},children:(0,r.jsx)(l.m,{type:m})})}),(0,r.jsx)("div",{className:"main",children:n}),(0,r.jsx)("div",{className:"footer-wrapper",children:(0,r.jsx)(s.$,{showLink:!0})})]})},d=o.ZP.div.withConfig({displayName:"base__LayoutWrapper",componentId:"sc-1coxw13-0"})(["position:relative;width:100%;min-height:100vh;background:",";color:",";display:flex;flex-direction:column;.btn-wrapper{position:fixed;right:1rem;top:0.25rem;z-index:100;button{margin:0 2px;}}.main{flex:1;margin:0 4rem;@media (max-width:600px){margin:0 10px;}}.footer-wrapper{flex:0;display:flex;justify-content:center;padding:0.25rem 0;}"],(function(e){return e.theme.background}),(function(e){return e.theme.text}))},367:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(5893),i=(n(7294),n(1565).ZP.span.withConfig({displayName:"Tag__TagWrapper",componentId:"sc-1y8nlms-0"})(["border:"," 1px solid;color:",";border-radius:6px;padding:0px 6px;margin:0 5px;"],(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor})));function o(e){var t=e.children;return(0,r.jsx)(i,{children:t})}},2167:function(e,t,n){"use strict";var r=n(3848),i=n(9448);t.default=void 0;var o=i(n(7294)),a=n(9414),c=n(4651),s=n(7426),l={};function u(e,t,n,r){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var i=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(i?"%"+i:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,i=(0,c.useRouter)(),f=o.default.useMemo((function(){var t=(0,a.resolveHref)(i,e.href,!0),n=r(t,2),o=n[0],c=n[1];return{href:o,as:e.as?(0,a.resolveHref)(i,e.as):c||o}}),[i,e.href,e.as]),d=f.href,p=f.as,h=e.children,m=e.replace,g=e.shallow,v=e.scroll,x=e.locale;"string"===typeof h&&(h=o.default.createElement("a",null,h));var y=(t=o.Children.only(h))&&"object"===typeof t&&t.ref,w=(0,s.useIntersection)({rootMargin:"200px"}),b=r(w,2),j=b[0],_=b[1],k=o.default.useCallback((function(e){j(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,j]);(0,o.useEffect)((function(){var e=_&&n&&(0,a.isLocalURL)(d),t="undefined"!==typeof x?x:i&&i.locale,r=l[d+"%"+p+(t?"%"+t:"")];e&&!r&&u(i,d,p,{locale:t})}),[p,d,_,x,n,i]);var L={ref:k,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,i,o,c,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==c&&r.indexOf("#")>=0&&(c=!1),t[i?"replace":"push"](n,r,{shallow:o,locale:s,scroll:c}))}(e,i,d,p,m,g,v,x)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(i,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof x?x:i&&i.locale,N=i&&i.isLocaleDomain&&(0,a.getDomainLocale)(p,C,i&&i.locales,i&&i.domainLocales);L.href=N||(0,a.addBasePath)((0,a.addLocale)(p,C,i&&i.defaultLocale))}return o.default.cloneElement(t,L)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,s=(0,i.useRef)(),l=(0,i.useState)(!1),u=r(l,2),f=u[0],d=u[1],p=(0,i.useCallback)((function(e){s.current&&(s.current(),s.current=void 0),n||f||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:i,elements:r}),n}(n),i=r.id,o=r.observer,a=r.elements;return a.set(e,t),o.observe(e),function(){a.delete(e),o.unobserve(e),0===a.size&&(o.disconnect(),c.delete(i))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return(0,i.useEffect)((function(){if(!a&&!f){var e=(0,o.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[p,f]};var i=n(7294),o=n(3447),a="undefined"!==typeof IntersectionObserver;var c=new Map},9216:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return f},default:function(){return d}});var r=n(5893),i=n(7294),o=n(1565),a=n(1664),c=n(5716),s=n(4841),l=n(367),u=n(5396),f=!0;function d(e){var t=e.posts,n=e.allPosts,o=e.allBlogs,f=(0,i.useState)("primary"),d=f[0],h=f[1],m=(0,i.useState)("primary"),g=m[0],v=m[1],x=function(e){"Life"===e?(h("ghost"),v("primary")):"Tech"===e?(h("primary"),v("ghost")):"All"===e&&(h("primary"),v("primary"))},y=(0,i.useState)(t),w=y[0],b=y[1];return(0,i.useEffect)((function(){b("primary"===d&&"ghost"===g?o:"primary"===g&&"ghost"===d?n:t)}),[d,g]),(0,r.jsx)(c.I,{title:"Archive",children:(0,r.jsx)(p,{children:(0,r.jsxs)("div",{className:"card",children:[(0,r.jsxs)("div",{className:"switch",children:[(0,r.jsxs)(s.z,{btnType:d,onClick:function(){x("Life")},children:["Life ","primary"===d?"x":""]}),(0,r.jsxs)(s.z,{btnType:g,onClick:function(){x("Tech")},style:{marginLeft:"5px"},children:["Tech ","primary"===g?"x":""]}),(0,r.jsx)(s.A,{showUnderLine:!0,onClick:function(){x("All")},style:{marginLeft:"5px"},children:"All"})]}),w.map((function(e){return(0,r.jsx)("div",{className:"post-item",children:(0,r.jsxs)("a",{className:"link",children:[(0,r.jsx)("span",{className:"date",children:(0,u.p)(new Date(e.date),"yyyy-MM-dd")}),(0,r.jsx)("span",{className:"type",children:e.type}),(0,r.jsx)(a.default,{as:"/".concat(e.type,"/").concat(e.slug),href:"/".concat(e.type,"/[slug]"),children:(0,r.jsx)("span",{className:"title",children:e.title})}),e.tag.map((function(e){return(0,r.jsx)(l.V,{children:e},e)}))]})},e.slug)}))]})})})}var p=o.ZP.div.withConfig({displayName:"archive__ArchiveWrapper",componentId:"sc-9b627x-0"})(["display:flex;width:100%;flex-direction:column;align-items:center;margin-top:2rem;.card{width:80%;padding:3rem 2rem;border-radius:6px;box-shadow:rgba(17,17,26,0.1) 0px 0px 16px;background:",";color:",";@media (max-width:600px){width:90%;}.switch{margin-bottom:0.5rem;}.post-item{display:flex;width:100%;align-items:center;.link{width:100%;margin:0.25rem 0;line-height:2rem;font-size:1rem;text-decoration:none;color:",";font-weight:500;&:hover{color:",";}.type{border-radius:6px;background:",";color:",";padding:2px 6px;margin:0 5px 0 10px;font-family:consolas,sans-serif;}.date{margin:0 10px 0 0;color:",";font-size:0.875rem;}.title{font-weight:400;cursor:pointer;}}}}"],(function(e){return e.theme.backgroundLight}),(function(e){return e.theme.text}),(function(e){return e.theme.text}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.textReverse}),(function(e){return e.theme.textGray}))},5396:function(e,t,n){"use strict";function r(e){var t=e.toString();return t.length>1?t:"0".concat(t)}function i(e,t){var n;if("number"===typeof e)switch(String(e).length){case 10:n=new Date(1e3*e);break;default:n=new Date(e)}else n=e;for(var i=n.getFullYear(),o=n.getMonth()+1,a=n.getDate(),c=n.getHours(),s=n.getMinutes(),l=n.getSeconds(),u=t,f=0,d=[{reg:"yyyy",value:i},{reg:"MM",value:r(o)},{reg:"M",value:o},{reg:"dd",value:r(a)},{reg:"d",value:a},{reg:"hh",value:r(c)},{reg:"h",value:c},{reg:"mm",value:r(s)},{reg:"m",value:s},{reg:"ss",value:r(l)},{reg:"s",value:l}];f<d.length;f++){var p=d[f];u=u.replace(p.reg,p.value.toString())}return u}n.d(t,{p:function(){return i}})},5230:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/archive",function(){return n(9216)}])},1664:function(e,t,n){e.exports=n(2167)},1163:function(e,t,n){e.exports=n(4651)}},function(e){e.O(0,[164,774,888,179],(function(){return t=5230,e(e.s=t);var t}));var t=e.O();_N_E=t}]);