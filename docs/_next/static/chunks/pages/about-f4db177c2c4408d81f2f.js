(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{1435:function(e,t,n){"use strict";n.d(t,{H:function(){return a}});var r=n(7712),i=n(9301),o=n(763),a=function(){var e=i.useRef(),t=i.useContext(o.MyContext),n=(t.themeToggler,t.getNowTheme);return i.useEffect((function(){for(;e.current.firstChild;)e.current.removeChild(e.current.firstChild);var t=document.createElement("script");t.src="https://utteranc.es/client.js",t.async=!0,t.setAttribute("repo","Alfxjx/Alfxjx.github.io"),t.setAttribute("issue-term","title"),t.setAttribute("label","comment :speech_balloon:"),t.setAttribute("theme","github-".concat(n())),t.setAttribute("crossorigin","anonymous"),e.current.appendChild(t)}),[n()]),(0,r.jsx)("div",{ref:e,id:"comments"})}},4133:function(e,t,n){"use strict";n.d(t,{I:function(){return f}});var r=n(7712),i=n(9301),o=n(3888),a=n(1550),c=n(797),l=n(2554),s=n(422),u=n(763),f=function(e){var t=e.title,n=e.children,o=(0,i.useContext)(u.MyContext),f=o.themeToggler,p=o.getNowTheme,h=(0,i.useState)(""),m=h[0],g=h[1];return(0,i.useEffect)((function(){var e=p();g("light"===e?"L":"D")}),[p()]),(0,i.useEffect)((function(){document.title=t}),[t]),(0,r.jsxs)(d,{children:[(0,r.jsx)(a.h,{}),(0,r.jsx)("div",{className:"btn-wrapper",children:(0,r.jsx)(c.Z,{toggleTheme:function(){return f()},children:(0,r.jsx)(s.m,{type:m})})}),(0,r.jsx)("div",{className:"main",children:n}),(0,r.jsx)("div",{className:"footer-wrapper",children:(0,r.jsx)(l.$,{showLink:!0})})]})},d=o.ZP.div.withConfig({displayName:"base__LayoutWrapper",componentId:"sc-1coxw13-0"})(["position:relative;width:100%;min-height:100vh;background:",";color:",";display:flex;flex-direction:column;.btn-wrapper{position:fixed;right:1rem;top:0.25rem;z-index:100;button{margin:0 2px;}}.main{flex:1;margin:0 4rem;@media (max-width:600px){margin:0 10px;}}.footer-wrapper{flex:0;display:flex;justify-content:center;padding:0.25rem 0;}"],(function(e){return e.theme.background}),(function(e){return e.theme.text}))},8741:function(e,t,n){"use strict";n.d(t,{S:function(){return r}});var r=n(3888).ZP.div.withConfig({displayName:"Post",componentId:"sc-1u8x57o-0"})(["blockquote{border-left:5px solid ",";padding-left:5px;margin:10px 0 10px 3px;line-height:1.5rem;}pre{font-family:consolas,sans-serif;letter-spacing:0.2px;}h1{font-size:1.5rem;line-height:2rem;font-weight:700;margin:10px 0;}h2{font-size:1.25rem;line-height:1.75rem;font-weight:700;margin:10px 0;}h3{font-size:1.125rem;line-height:1.5rem;font-weight:700;margin:10px 0;}h4{font-size:1.125rem;line-height:1.5rem;font-weight:500;margin:3px 0;}p{margin:10px 0;line-height:1.5rem;position:relative;}img{max-width:75%;position:relative;top:0;left:50%;transform:translateX(-50%);margin:20px 0;}pre{margin:5px 0;padding:10px;overflow-x:scroll;span{line-height:1.5rem;}::-webkit-scrollbar{display:none;}}a{color:",";margin:0 2px;&:hover{color:",";}}ol{line-height:1.5rem;list-style:lower-roman;padding:0 0 0 1.5rem;@media (max-width:600px){padding:0 0 0 0.5rem;}}ul{line-height:1.5rem;list-style:circle;padding:0 0 0 1.5rem;@media (max-width:600px){padding:0 0 0 0.5rem;}}li{margin:5px 0;}strong{font-weight:700;color:",";}em{font-style:italic;text-decoration:underline;text-decoration-color:",";}"],(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.textHover}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor}))},6122:function(e,t,n){"use strict";var r=n(7999),i=n(2839);t.default=void 0;var o=i(n(9301)),a=n(4223),c=n(5067),l=n(1396),s={};function u(e,t,n,r){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var i=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[t+"%"+n+(i?"%"+i:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,i=(0,c.useRouter)(),f=o.default.useMemo((function(){var t=(0,a.resolveHref)(i,e.href,!0),n=r(t,2),o=n[0],c=n[1];return{href:o,as:e.as?(0,a.resolveHref)(i,e.as):c||o}}),[i,e.href,e.as]),d=f.href,p=f.as,h=e.children,m=e.replace,g=e.shallow,x=e.scroll,v=e.locale;"string"===typeof h&&(h=o.default.createElement("a",null,h));var b=(t=o.Children.only(h))&&"object"===typeof t&&t.ref,w=(0,l.useIntersection)({rootMargin:"200px"}),y=r(w,2),C=y[0],_=y[1],j=o.default.useCallback((function(e){C(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,C]);(0,o.useEffect)((function(){var e=_&&n&&(0,a.isLocalURL)(d),t="undefined"!==typeof v?v:i&&i.locale,r=s[d+"%"+p+(t?"%"+t:"")];e&&!r&&u(i,d,p,{locale:t})}),[p,d,_,v,n,i]);var E={ref:j,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,i,o,c,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==c&&r.indexOf("#")>=0&&(c=!1),t[i?"replace":"push"](n,r,{shallow:o,locale:l,scroll:c}))}(e,i,d,p,m,g,x,v)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(i,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var k="undefined"!==typeof v?v:i&&i.locale,L=i&&i.isLocaleDomain&&(0,a.getDomainLocale)(p,k,i&&i.locales,i&&i.domainLocales);E.href=L||(0,a.addBasePath)((0,a.addLocale)(p,k,i&&i.defaultLocale))}return o.default.cloneElement(t,E)};t.default=f},1396:function(e,t,n){"use strict";var r=n(7999);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,l=(0,i.useRef)(),s=(0,i.useState)(!1),u=r(s,2),f=u[0],d=u[1],p=(0,i.useCallback)((function(e){l.current&&(l.current(),l.current=void 0),n||f||e&&e.tagName&&(l.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:i,elements:r}),n}(n),i=r.id,o=r.observer,a=r.elements;return a.set(e,t),o.observe(e),function(){a.delete(e),o.unobserve(e),0===a.size&&(o.disconnect(),c.delete(i))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return(0,i.useEffect)((function(){if(!a&&!f){var e=(0,o.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[p,f]};var i=n(9301),o=n(7330),a="undefined"!==typeof IntersectionObserver;var c=new Map},4851:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return s}});var r=n(7712),i=(n(9301),n(3888)),o=n(4133),a=n(8741),c=n(1435),l=(0,i.ZP)(a.S).withConfig({displayName:"about__AboutWrapper",componentId:"sc-19i97pe-0"})(["display:flex;width:100%;flex-direction:column;align-items:center;margin-top:2rem;.card{width:80%;padding:3rem 2rem;border-radius:6px;box-shadow:rgba(17,17,26,0.1) 0px 0px 16px;background:",";color:",";@media (max-width:600px){width:90%;}}"],(function(e){return e.theme.backgroundLight}),(function(e){return e.theme.text})),s=!0;t.default=function(e){var t=e.post;return(0,r.jsx)(o.I,{title:"About",children:(0,r.jsx)(l,{children:(0,r.jsxs)("div",{className:"card",children:[(0,r.jsx)("h1",{children:t.title}),(0,r.jsx)("div",{className:"post",dangerouslySetInnerHTML:{__html:t.content}}),(0,r.jsx)(c.H,{})]})})})}},3199:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(4851)}])},3431:function(e,t,n){e.exports=n(6122)},8824:function(e,t,n){e.exports=n(5067)}},function(e){e.O(0,[797,888,179],(function(){return t=3199,e(e.s=t);var t}));var t=e.O();_N_E=t}]);