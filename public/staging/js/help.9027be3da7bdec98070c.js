!function(e){function t(t){for(var n,o,u=t[0],i=t[1],s=t[2],c=0,f=[];c<u.length;c++)o=u[c],l[o]&&f.push(l[o][0]),l[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(p&&p(t);f.length;)f.shift()();return a.push.apply(a,s||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,u=1;u<r.length;u++){var i=r[u];0!==l[i]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},l={38:0},a=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[],r=l[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise(function(t,n){r=l[e]=[t,n]});t.push(r[2]=n);var a,u=document.getElementsByTagName("head")[0],i=document.createElement("script");i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.src=function(e){return o.p+"js/"+({}[e]||e)+"."+{1:"8c19b8628517b12914fd",2:"a309520dbe95db592db0"}[e]+".js?"}(e),a=function(t){i.onerror=i.onload=null,clearTimeout(s);var r=l[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+n+": "+a+")");o.type=n,o.request=a,r[1](o)}l[e]=void 0}};var s=setTimeout(function(){a({type:"timeout",target:i})},12e4);i.onerror=i.onload=a,u.appendChild(i)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var p=i;a.push([36,24]),r()}({36:function(e,t,r){r("j1ja"),e.exports=r("68aP")},"68aP":function(e,t,r){"use strict";var n,l=v(r("Zx67")),a=v(r("Zrlr")),o=v(r("wxAW")),u=v(r("zwoO")),i=v(r("Pf15")),s=r("GiK3"),p=v(s),c=v(r("O27J")),f=v(r("Bz2A")),d=r("Mn8c"),g=m(r("i+v7")),_=v(r("wtYP"));r("L52G");var h=m(r("zr9E"));function m(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function v(e){return e&&e.__esModule?e:{default:e}}var j=(0,d.inject)("pageinitStore")(n=(0,d.observer)(n=function(e){function t(e){(0,a.default)(this,t);var r=(0,u.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));r.state={staticPaths:{1:{zh:"/rule/aboutus1.jpg",en:"/rule/aboutus1_en.jpg",title:"About Us"},2:{zh:"/rule/opt_post2.jpg",en:"/rule/opt_post2_en.jpg",title:"How does the article get into the essence"},3:{zh:"/rule/gold3.jpg",en:"/rule/gold3_en.jpg",title:"Rules of gold COINS"},4:{zh:"/rule/integral4.jpg",en:"/rule/integral4_en.jpg",title:"Integral rules"},5:{zh:"/rule/sen_post5.jpg",en:"/rule/sen_post5_en.jpg",title:"Publish an article course"},6:{zh:"/rule/user_protocol6.jpg",en:"/rule/user_protocol6_en.jpg",title:"User agreement"},7:{zh:"/rule/get_out7.jpg",en:"/rule/get_out7_en.jpg",title:"Illegal instructions"},8:{zh:"/rule/aboutus1.jpg",en:"/rule/aboutus1_en.jpg",title:"About Us"},9:{zh:"/rule/wallet_user_agreement.jpg",en:"/rule/wallet_user_agreement_en.jpg",title:"Istore wallet user agreement"},10:{zh:"/rule/wallet_operation_manual.jpg",en:"/rule/wallet_operation_manual_en.jpg",title:"Wallet operation manual"},11:{zh:"/red.jpg",en:"/red-en.jpg",title:"A red envelope rules"}}};var n=t.getTransitionLan(h.getUrlParam("lang"));return e.pageinitStore.setI18nMessagesInfoHandle(n.indexOf("en")>-1?"en":"zh"),r}return(0,i.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=h.getUrlParam("type"),t=this.props.pageinitStore.intl.locale;return h.changeDocumentTitleHandle(this.state.staticPaths[e].title,this.props.pageinitStore.intl.locale),p.default.createElement("div",{className:"help-wrap"},p.default.createElement("img",{className:"help-wrap-img",src:g.map_route_api.API_GET_GetStaticImage+this.state.staticPaths[e][t],alt:""}))}}],[{key:"getTransitionLan",value:function(e){switch(e){case"zh-Hans":case"zh-Hans-CN":case"cn":return"zh";default:return e}}}]),t}(s.Component))||n)||n;c.default.render(p.default.createElement(d.Provider,f.default,p.default.createElement(_.default,null,p.default.createElement(j,null))),document.getElementById("istore-app"))},Bz2A:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l={pageinitStore:((n=r("Zuiv"))&&n.__esModule?n:{default:n}).default};window._____APP_STATE_____=l,t.default=l},L52G:function(e,t,r){}});