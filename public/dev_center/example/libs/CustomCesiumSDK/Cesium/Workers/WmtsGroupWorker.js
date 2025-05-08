/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.99
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./createCallBackWorker","./Resource-6497b328","./UPNG","./JPG","./colorBlend","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./defer-fe5560c8","./Math-65e8389d","./RuntimeError-5ad5d372"],(function(e,t,r,n,l,u,f,i,o,a,h){"use strict";const c=l.normal;function g(e,l){var u=new t.Resource({url:e});u.request.throttle=!1,u.request.throttleByServer=!1,u.request.type=1,u.fetchArrayBuffer().then((function(e){if(!e)return void l(null);let t,u=new Uint8Array(e);if(r.isPNG(u)){let n=r.decode(e);t=r.toRGBA8(n)[0],t=new Uint8Array(t)}else{let e=new n;e.parse(u),t=e.getData(e.width,e.height).buffer,t=new Uint8Array(t),t=function(e){let t=new Uint8Array(4*e.length/3),r=0;for(let n=0;n<e.length;n++)t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2],t[r+3]=255,n+=2,r+=4;return t}(t)}l(t)}),(function(e){l(null)}))}return e((function(e,t,r){let n=[],l=function(e,l){n[e]=l;let u=function(e){let t=[];for(let r=0;r<e.length;r++){let n=e[r];n&&t.push(n)}if(0==t.length)return null;let r=t[0],n=new Uint8Array(r.length);for(let e=0;e<r.length;e++)n[e]=r[e];if(1==t.length)return n;let l=n;for(let e=1;e<t.length;e++){let r=t[e];for(let e=0;e<l.length;e++){let t={r:l[e],g:l[e+1],b:l[e+2],a:l[e+3]/255},n={r:r[e],g:r[e+1],b:r[e+2],a:r[e+3]/255},u=c(t,n);l[e]=u.r,l[e+1]=u.g,l[e+2]=u.b,l[e+3]=255*u.a,e+=3}}e.length==t.length&&(e=[]);return l}(n);if(u){let e=u.buffer;t.push(e),r(e)}else r({})};for(let t=0;t<e.urls.length;t++){n[t]=null,g(e.urls[t],l.bind(this,t))}return r}))}));
