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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./Cartesian3-baad0d89","./ModelPointDrawer","./snappyJs","./ScanLine","./ElevationTool","./Cache","./defer-fe5560c8","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372","./LinkedQueue"],(function(e,t,r,n,l,o,i,a,f,s,h,u,c,g,d){"use strict";let p,y,m,v=512,w="",b={},P={},S=new a(1e5);function x(e){let t=1e3,r=0;for(let n=0;n<e.length;n++){let l=e[n];for(let e=0;e<l.length-1;e++){let n=Math.round(l[e+1]);n<t&&(t=n),n>r&&(r=n),e++}}return{ymax:r,ymin:t}}function A(e,t){let n=t.rectangle;for(var l=[],o=0;o<e.length;o++){var i=C(e[o],e[o+1],n),a=r.Cartesian3.fromDegrees(i[0],i[1]);l.push(a),o++}return l}function C(e,t,r){var n=M(r.west+r.width/v*e),l=M(r.north-r.height/v*t);return[n=Number(n.toFixed(6)),l=Number(l.toFixed(6))]}function M(e){return 180*e/Math.PI}function D(e,t){if(Array.isArray(t[0])){let r=t.length;for(let n=0;n<r;n++){D(e,t[n])}}else e.push(t)}function k(e,t){if("F"!=e[0])if(Array.isArray(e[0])){let r=e.length;for(let n=0;n<r;n++){k(e[n],t)}}else t&&function(e){let t=[e[0],e[1]];for(let r=2;r<e.length;r++){let n=t[0]+e[r],l=t[1]+e[r+1];e[r]=n,e[r+1]=l,t=[n,l],r++}}(e);else e[0]=[.05*-v,.05*-v,1.05*v,.05*-v,1.05*v,1.05*v,.05*-v,1.05*v]}return e.createTaskProcessorWorker((function(e,r){if(1==e.init)return void function(e){p=new Function("drawer","level",e.styleStr),v=e.tileSize,w=e.return_type,b=e,y=e.indexDbNames,m=e.indexDbName,i.getDBMap(y,P)}(e);var a,s=e.url,h=new t.Resource({url:s});if(h.request.throttle=!1,h.request.throttleByServer=!0,h.request.type=1,!(a="stream_snappy"==w?h.fetchArrayBuffer():h.fetchJson()))return!0;let u=[];u.push(a);let c=y.slice(0,y.length-1);u.push(i.getElevation(P,c,e.xyz));let g=f.defer();return Promise.all(u).then((function(t){let r=t[0];if(r||(r={}),"stream_snappy"==w){r=l(r);let e=function(e){let t=[],r=0,n=0;for(;r<e.length;){let l=e[r++];if(l<128)t[n++]=l;else if(l>191&&l<224){let o=e[r++];t[n++]=(31&l)<<6|63&o}else if(l>239&&l<365){let o=((7&l)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=55296+(o>>10),t[n++]=56320+(1023&o)}else{let o=e[r++],i=e[r++];t[n++]=(15&l)<<12|(63&o)<<6|63&i}}let l=[],o=0,i=0,a=0,f=5e4,s=t.length/f-1;for(o=0;o<s;o++)i=o*f,a=(o+1)*f,l.push(String.fromCharCode.apply({},t.slice(i,a)));return i=o*f,a=t.length,l.push(String.fromCharCode.apply({},t.slice(i,a))),l=l.join(""),l}(new Uint8Array(r));r=JSON.parse(e)}let a=function(e,t){if(e){!function(e,t){for(let r in e){let n=e[r].features;n||(n=e[r].datas);for(let e=0;e<n.length;e++)k(n[e][2],t)}}(e,t.needDecode);let r={},l=new n([e],t.level,r,t.controlVector,t.highLightVector,t.filterLayerId);return p.call({},l,t.level),function(e){for(let t in e){let r=e[t];for(let e=0;e<r.length;e++){let t=r[e],n=[];D(n,t.data),delete t.data,t.geometrys=n;let l=0;if(b.hasOwnProperty("heightProperty")){let e=b.heightProperty;l=t.properties[e],b.hasOwnProperty("heightScale")&&(l*=parseFloat(b.heightScale))}t.height=l,t.totalHeight=l}}}(r),r}return{}}(r,e);b.hasTerrain&&function(e,t){var r=1e3,n=0;for(let l in e){let o=e[l];for(let e=0;e<o.length;e++){let l=o[e],i=-2e4,a=S.get(l.properties.id);if(a)i=a;else{for(let e=0;e<l.geometrys.length;e++){let o=l.geometrys[e];for(let e=0;e<o.length-1;e++){let l=Math.round(o[e]),a=Math.round(o[e+1]);if(a<r&&(r=a),a>n&&(n=a),e++,l<0||l>v-1||a<0||a>v-1)continue;let f=a*v+l,s=0;for(let e in t){s+=t[e].data[f]}s>i&&(i=s)}}-2e4==i&&(i=0),S.set(l.properties.id,i)}l.terrainHeight=i,l.totalHeight=i+l.height}}}(a,t[1]);let f=function(e,t){let r=new Int32Array(t*t);for(let n in e){let l=e[n];for(let e=0;e<l.length;e++){let n=l[e],i=x(n.geometrys);o(r,n,t,i.ymax,i.ymin)}}return r}(a,v);!function(e,t){for(let r in e){let n=e[r];for(let e=0;e<n.length;e++){let r=n[e];r.points=[];for(let e=0;e<r.geometrys.length;e++){let n=A(r.geometrys[e],t);r.points.push(n)}delete r.geometrys}}}(a,e),i.updateElevation(P[m],m,e.xyz,f).finally((function(e){g.resolve(a)}))}),(function(e){g.reject(e)})),g.promise}))}));
