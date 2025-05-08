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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./VectorDrawer","./snappyJs","./point-da504a2d","./ColorUtil","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./defer-fe5560c8","./Math-65e8389d","./RuntimeError-5ad5d372"],(function(e,t,r,l,n,i,o,a,f,s,u,c){"use strict";let h,d=512,y="";function p(e){let t=[],r=0,l=0;for(;r<e.length;){let n=e[r++];if(n<128)t[l++]=n;else if(n>191&&n<224){let i=e[r++];t[l++]=(31&n)<<6|63&i}else if(n>239&&n<365){let i=((7&n)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[l++]=55296+(i>>10),t[l++]=56320+(1023&i)}else{let i=e[r++],o=e[r++];t[l++]=(15&n)<<12|(63&i)<<6|63&o}}let n=[],i=0,o=0,a=0,f=5e4,s=t.length/f-1;for(i=0;i<s;i++)o=i*f,a=(i+1)*f,n.push(String.fromCharCode.apply({},t.slice(o,a)));return o=i*f,a=t.length,n.push(String.fromCharCode.apply({},t.slice(o,a))),n=n.join(""),n}function g(e,t){if(e&&e.layer){(function(e,t){for(let r in e){let l=e[r].features;l||(l=e[r].datas);for(let e=0;e<l.length;e++)k(l[e][2],t)}})(e=e.layer,t.needDecode);let l={},n=new r([e],t.level,l,t.controlVector,t.highLightVector,t.filterLayerId);return h.call({},n,t.level),l}return{}}function k(e,t){if("F"!=e[0])if(Array.isArray(e[0])){let r=e.length;for(let l=0;l<r;l++){k(e[l],t)}}else t&&function(e){let t=[e[0],e[1]];for(let r=2;r<e.length;r++){let l=t[0]+e[r],n=t[1]+e[r+1];e[r]=l,e[r+1]=n,t=[l,n],r++}}(e);else e[0]=[.05*-d,.05*-d,1.05*d,.05*-d,1.05*d,1.05*d,.05*-d,1.05*d]}function w(e,t){let r=[];for(let l=0;l<e.keyArr.length;l++){let i=e[e.keyArr[l]],o=i.style;if(F(o),i.lineFeatues.length>0){let e=new n.LineBucket({style:o,type:"line",tileSize:d});for(let t of i.lineFeatues){b(t,o);let r=C(t);e.addFeature(r)}e=e.serialize(t),r.push(e)}else if(i.fillFeatures.length>0){let e=new n.FillBucket({style:o,type:"fill",tileSize:d}),l=new n.LineBucket({style:o,type:"line",tileSize:d});for(let t of i.fillFeatures){b(t,o);let r=C(t);e.addFeature(r),o.stroke&&l.addFeature(r)}e=e.serialize(t),r.push(e),o.stroke&&(l=l.serialize(t),r.push(l))}}return r}function b(e,t,r){if(!t.sparsity)return;let l=parseFloat(t.sparsity);for(let t=0;t<e.data.length;t++){let r=e.data[t];null==l&&1==l||(e.data[t]=n.simplify(r,l/4,!0))}}function C(e){let t=256/d*32,r=[];for(let l=0;l<e.data.length;l++){r[l]=[];let i=e.data[l];for(let e=0;e<i.length;e++)if(e%2==0){let o=i[e]*t,a=i[e+1]*t;r[l].push(new n.Point(o,a))}}return r}function F(e){let t=new i;if(e.fillColor){t.fromHex(e.fillColor);let r=[t.rgb[0]/255,t.rgb[1]/255,t.rgb[2]/255,1];e.fillColor=r}if(e.strokeColor){t=new i,t.fromHex(e.strokeColor);let r=[t.rgb[0]/255,t.rgb[1]/255,t.rgb[2]/255,1];e.strokeColor=r}}return e.createTaskProcessorWorker((function(e,r){if(1==e.init)return h=new Function("drawer","level",e.styleStr),d=e.tileSize,y=e.return_type,!0;if(1==e.changeStyle){let t=p(new Uint8Array(e.tileData));return w(g(JSON.parse(t),e),r)}var n,i=e.url,o=new t.Resource({url:i});return o.request.throttle=!1,o.request.throttleByServer=!0,o.request.type=1,!(n="stream_snappy"==y?o.fetchArrayBuffer():o.fetchJson())||n.then((function(t){let n=null;if("stream_snappy"==y){t=l(t),r.push(t);let e=new Uint8Array(t);n=e.buffer;let i=p(e);t=JSON.parse(i)}return{tileData:n,buckets:w(g(t,e),r)}}))}))}));
