(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{5042:function(e,t,n){"use strict";n.d(t,{H:function(){return a}});var r=n(7294),i=n(4762),o=n(5893),a=function(){var e=r.useRef(),t=r.useContext(i.MyContext),n=(t.themeToggler,t.getNowTheme);return r.useEffect((function(){for(;e.current.firstChild;)e.current.removeChild(e.current.firstChild);var t=document.createElement("script");t.src="https://utteranc.es/client.js",t.async=!0,t.setAttribute("repo","Alfxjx/Alfxjx.github.io"),t.setAttribute("issue-term","title"),t.setAttribute("label","comment :speech_balloon:"),t.setAttribute("theme","github-".concat(n())),t.setAttribute("crossorigin","anonymous"),e.current.appendChild(t)}),[n()]),(0,o.jsx)("div",{ref:e,id:"comments"})}},5716:function(e,t,n){"use strict";n.d(t,{I:function(){return f}});var r=n(7294),i=n(1565),o=n(7239),a=n(8589),c=n(3548),l=n(2404),s=n(4762),u=n(5893),f=function(e){var t=e.title,n=e.children,i=(0,r.useContext)(s.MyContext),f=i.themeToggler,p=i.getNowTheme,m=(0,r.useState)(""),h=m[0],g=m[1];return(0,r.useEffect)((function(){var e=p();g("light"===e?"L":"D")}),[p()]),(0,r.useEffect)((function(){document.title=t}),[t]),(0,u.jsxs)(d,{children:[(0,u.jsx)(o.h,{}),(0,u.jsx)("div",{className:"btn-wrapper",children:(0,u.jsx)(a.Z,{toggleTheme:function(){return f()},children:(0,u.jsx)(l.m,{type:h})})}),(0,u.jsx)("div",{className:"main",children:n}),(0,u.jsx)("div",{className:"footer-wrapper",children:(0,u.jsx)(c.$,{showLink:!0})})]})},d=i.ZP.div.withConfig({displayName:"base__LayoutWrapper",componentId:"sc-1coxw13-0"})(["position:relative;width:100%;min-height:100vh;background:",";color:",";display:flex;flex-direction:column;.btn-wrapper{position:fixed;right:1rem;top:0.25rem;z-index:100;button{margin:0 2px;}}.main{flex:1;margin:0 4rem;@media (max-width:600px){margin:0 10px;}}.footer-wrapper{flex:0;display:flex;justify-content:center;padding:0.25rem 0;}"],(function(e){return e.theme.background}),(function(e){return e.theme.text}))},125:function(e,t,n){"use strict";n.d(t,{S:function(){return r}});var r=n(1565).ZP.div.withConfig({displayName:"Post",componentId:"sc-1u8x57o-0"})(["blockquote{border-left:5px solid ",";padding-left:5px;margin:10px 0 10px 3px;line-height:1.5rem;}pre{font-family:consolas,sans-serif;letter-spacing:0.2px;}h1{font-size:1.5rem;line-height:2rem;font-weight:700;margin:10px 0;}h2{font-size:1.25rem;line-height:1.75rem;font-weight:700;margin:10px 0;}h3{font-size:1.125rem;line-height:1.5rem;font-weight:700;margin:10px 0;}h4{font-size:1.125rem;line-height:1.5rem;font-weight:500;margin:3px 0;}p{margin:10px 0;line-height:1.5rem;position:relative;}img{max-width:75%;position:relative;top:0;left:50%;transform:translateX(-50%);margin:20px 0;}pre{margin:5px 0;padding:10px;overflow-x:scroll;span{line-height:1.5rem;}::-webkit-scrollbar{display:none;}}pre > code{-moz-tab-size:2;tab-size:2;}a{color:",";margin:0 2px;&:hover{color:",";}}ol{line-height:1.5rem;list-style:lower-roman;padding:0 0 0 1.5rem;@media (max-width:600px){padding:0 0 0 0.5rem;}}ul{line-height:1.5rem;list-style:circle;padding:0 0 0 1.5rem;@media (max-width:600px){padding:0 0 0 0.5rem;}}li{margin:5px 0;}strong{font-weight:700;color:",";}em{font-style:italic;text-decoration:underline;text-decoration-color:",";}"],(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.textHover}),(function(e){return e.theme.themeColor}),(function(e){return e.theme.themeColor}))},2167:function(e,t,n){"use strict";var r=n(3848);t.default=void 0;var i,o=(i=n(7294))&&i.__esModule?i:{default:i},a=n(1063),c=n(4651),l=n(7426);var s={};function u(e,t,n,r){if(e&&a.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var i=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[t+"%"+n+(i?"%"+i:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,i=c.useRouter(),f=o.default.useMemo((function(){var t=a.resolveHref(i,e.href,!0),n=r(t,2),o=n[0],c=n[1];return{href:o,as:e.as?a.resolveHref(i,e.as):c||o}}),[i,e.href,e.as]),d=f.href,p=f.as,m=e.children,h=e.replace,g=e.shallow,x=e.scroll,v=e.locale;"string"===typeof m&&(m=o.default.createElement("a",null,m));var b=(t=o.default.Children.only(m))&&"object"===typeof t&&t.ref,w=l.useIntersection({rootMargin:"200px"}),y=r(w,2),_=y[0],C=y[1],j=o.default.useCallback((function(e){_(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,_]);o.default.useEffect((function(){var e=C&&n&&a.isLocalURL(d),t="undefined"!==typeof v?v:i&&i.locale,r=s[d+"%"+p+(t?"%"+t:"")];e&&!r&&u(i,d,p,{locale:t})}),[p,d,C,v,n,i]);var E={ref:j,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,i,o,c,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&a.isLocalURL(n))&&(e.preventDefault(),null==c&&r.indexOf("#")>=0&&(c=!1),t[i?"replace":"push"](n,r,{shallow:o,locale:l,scroll:c}))}(e,i,d,p,h,g,x,v)},onMouseEnter:function(e){a.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(i,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var k="undefined"!==typeof v?v:i&&i.locale,L=i&&i.isLocaleDomain&&a.getDomainLocale(p,k,i&&i.locales,i&&i.domainLocales);E.href=L||a.addBasePath(a.addLocale(p,k,i&&i.defaultLocale))}return o.default.cloneElement(t,E)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,l=i.useRef(),s=i.useState(!1),u=r(s,2),f=u[0],d=u[1],p=i.useCallback((function(e){l.current&&(l.current(),l.current=void 0),n||f||e&&e.tagName&&(l.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:i,elements:r}),n}(n),i=r.id,o=r.observer,a=r.elements;return a.set(e,t),o.observe(e),function(){a.delete(e),o.unobserve(e),0===a.size&&(o.disconnect(),c.delete(i))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return i.useEffect((function(){if(!a&&!f){var e=o.requestIdleCallback((function(){return d(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[f]),[p,f]};var i=n(7294),o=n(3447),a="undefined"!==typeof IntersectionObserver;var c=new Map},5655:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return s}});n(7294);var r=n(1565),i=n(5716),o=n(125),a=n(5042),c=n(5893),l=(0,r.ZP)(o.S).withConfig({displayName:"about__AboutWrapper",componentId:"sc-19i97pe-0"})(["display:flex;width:100%;flex-direction:column;align-items:center;margin-top:2rem;.card{width:80%;padding:3rem 2rem;border-radius:6px;box-shadow:rgba(17,17,26,0.1) 0px 0px 16px;background:",";color:",";@media (max-width:600px){width:90%;}}"],(function(e){return e.theme.backgroundLight}),(function(e){return e.theme.text})),s=!0;t.default=function(e){var t=e.post;return(0,c.jsx)(i.I,{title:"About",children:(0,c.jsx)(l,{children:(0,c.jsxs)("div",{className:"card",children:[(0,c.jsx)("h1",{children:t.title}),(0,c.jsx)("div",{className:"post",dangerouslySetInnerHTML:{__html:t.content}}),(0,c.jsx)(a.H,{})]})})})}},4613:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(5655)}])},1664:function(e,t,n){e.exports=n(2167)},1163:function(e,t,n){e.exports=n(4651)}},function(e){e.O(0,[700,774,888,179],(function(){return t=4613,e(e.s=t);var t}));var t=e.O();_N_E=t}]);