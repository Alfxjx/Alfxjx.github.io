(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{1771:function(e,t,r){var n=r(2640);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6002:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},1346:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},7523:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},4960:function(e,t,r){var n=r(1771),o=r(1346),a=r(8393),i=r(7523);e.exports=function(e){return n(e)||o(e)||a(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},9957:function(e,t,r){"use strict";var n;t.__esModule=!0,t.AmpStateContext=void 0;var o=((n=r(9301))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=o},7521:function(e,t,r){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var n,o=(n=r(9301))&&n.__esModule?n:{default:n},a=r(9957);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,o=void 0!==n&&n,a=e.hasQuery,i=void 0!==a&&a;return r||o&&i}},6518:function(e,t,r){"use strict";var n=r(6002);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}t.__esModule=!0,t.defaultHead=f,t.default=void 0;var a,i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=n?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(r,o,a):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(r(9301)),s=(a=r(2121))&&a.__esModule?a:{default:a},u=r(9957),c=r(5406),p=r(7521);function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var h=["name","httpEquiv","charSet","itemProp"];function m(e,t){return e.reduce((function(e,t){var r=i.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(d,[]).reverse().concat(f(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(o){var a=!0,i=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){i=!0;var s=o.key.slice(o.key.indexOf("$")+1);e.has(s)?a=!1:e.add(s)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var u=0,c=h.length;u<c;u++){var p=h[u];if(o.props.hasOwnProperty(p))if("charSet"===p)r.has(p)?a=!1:r.add(p);else{var l=o.props[p],f=n[p]||new Set;"name"===p&&i||!f.has(l)?(f.add(l),n[p]=f):a=!1}}}return a}}()).reverse().map((function(e,r){var a=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var s=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return s["data-href"]=s.href,s.href=void 0,s["data-optimized-fonts"]=!0,i.default.cloneElement(e,s)}return i.default.cloneElement(e,{key:a})}))}var y=function(e){var t=e.children,r=(0,i.useContext)(u.AmpStateContext),n=(0,i.useContext)(c.HeadManagerContext);return i.default.createElement(s.default,{reduceComponentsToState:m,headManager:n,inAmpMode:(0,p.isInAmpMode)(r)},t)};t.default=y},2121:function(e,t,r){"use strict";var n=r(4960),o=r(6522),a=r(8683),i=(r(2601),r(3525)),s=r(532),u=r(5032);function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=u(e);if(t){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}t.__esModule=!0,t.default=void 0;var p=r(9301),l=function(e){i(r,e);var t=c(r);function r(e){var a;return o(this,r),(a=t.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(n(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(p.Component);t.default=l},3601:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(7712),o=r(1062),a=r(8824),i=r(9301),s=r(3888),u=r(2554),c=r(1445);function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){(0,c.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=s.ZP.button.withConfig({displayName:"Button__InsideButton",componentId:"sc-19071w6-0"})(["border:1px solid ",";background:",";color:",";padding:0.5rem 1rem;text-align:center;border-radius:0.25rem;cursor:pointer;"],(function(e){return e.primary?"white":"#447bdb"}),(function(e){return e.primary?"#447bdb":"white"}),(function(e){return e.primary?"white":"#447bdb"}));function h(e){var t=e.children,r=e.btnType,o=p(e,["children","btnType"]);return(0,n.jsx)(d,f(f({primary:"primary"===r},o),{},{children:t}))}function m(){return(0,i.useEffect)((function(){console.log("hello nextjs")}),[]),(0,n.jsxs)("div",{children:[(0,n.jsxs)(o.default,{children:[(0,n.jsx)("title",{children:"Jianxiang's Page"}),(0,n.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)(g,{children:[(0,n.jsx)(b,{src:"/Patrick.jpg",alt:"avatar"}),(0,n.jsx)(y,{}),(0,n.jsx)(u.$,{showLink:!0})]})]})}var y=function(){var e=(0,a.useRouter)();return(0,n.jsxs)(v,{children:[(0,n.jsx)("p",{className:"green-home title main",children:"Hello, World."}),(0,n.jsx)("p",{className:"green-home title",children:'I\'m Xu "Alfred" Jianxiang,'}),(0,n.jsx)("p",{className:"green-home title",children:"a frontend developer who work for his passion"}),(0,n.jsxs)(x,{children:[(0,n.jsx)(h,{onClick:function(){e.push("/blogs/loading-in-css")},children:"Latest"}),(0,n.jsx)(h,{onClick:function(){e.push("/docs")},btnType:"primary",children:"Blogs"})]})]})},g=s.ZP.div.withConfig({displayName:"pages__FullPage",componentId:"sc-5opz4-0"})(["width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;"]),v=s.ZP.div.withConfig({displayName:"pages__FullPageMain",componentId:"sc-5opz4-1"})(["flex:1 1 auto;width:100vw;height:100%;display:flex;flex-direction:column;align-items:center;p{&.title{margin-top:1rem;font-size:1.5rem;letter-spacing:2px;}&.main{margin-top:3rem;}}"]),b=s.ZP.img.withConfig({displayName:"pages__Avatar",componentId:"sc-5opz4-2"})(["border-radius:50%;width:10rem;height:10rem;margin-top:5.4rem;box-shadow:rgba(0,0,0,0.09) 0px 3px 12px;"]),x=s.ZP.div.withConfig({displayName:"pages__Buttons",componentId:"sc-5opz4-3"})(["display:flex;justify-content:space-between;align-items:center;button{margin:3rem 1rem;width:6rem;}"])},3409:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3601)}])},1062:function(e,t,r){e.exports=r(6518)}},function(e){e.O(0,[732,888,179],(function(){return t=3409,e(e.s=t);var t}));var t=e.O();_N_E=t}]);