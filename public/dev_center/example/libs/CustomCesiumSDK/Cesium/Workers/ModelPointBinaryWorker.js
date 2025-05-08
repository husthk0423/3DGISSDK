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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./Cartesian3-baad0d89","./ModelPointDrawer","./ParseBinaryData","./ScanLine","./ElevationTool","./Cache","./defer-fe5560c8","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372","./Buffer","./base64","./ieee754","./isArray","./VarintReader","./snappyJs","./CodeTool","./LayerContentModel","./GisTools","./LinkedQueue"],(function(e,t,r,n,l,o,i,a,f,s,u,h,c,d,g,y,p,m,v,b,w,P,M,x){"use strict";let A,D,F,S={},T=512,k={},B={},C={},L=new a(1e5);function E(e,t){if("F"!=e[0])if(Array.isArray(e[0])){let r=e.length;for(let n=0;n<r;n++){E(e[n],t)}}else t&&function(e){let t=[e[0],e[1]];for(let r=2;r<e.length;r++){let n=t[0]+e[r],l=t[1]+e[r+1];e[r]=n,e[r+1]=l,t=[n,l],r++}}(e);else e[0]=[.05*-T,.05*-T,1.05*T,.05*-T,1.05*T,1.05*T,.05*-T,1.05*T]}function I(e){let t=1e3,r=0;for(let n=0;n<e.length;n++){let l=e[n];for(let e=0;e<l.length-1;e++){let n=Math.round(l[e+1]);n<t&&(t=n),n>r&&(r=n),e++}}return{ymax:r,ymin:t}}function N(e,t){if(Array.isArray(t[0])){let r=t.length;for(let n=0;n<r;n++){N(e,t[n])}}else e.push(t)}function R(e,t){let n=t.rectangle;for(var l=[],o=0;o<e.length;o++){var i=V(e[o],e[o+1],n),a=r.Cartesian3.fromDegrees(i[0],i[1]);l.push(a),o++}return l}function V(e,t,r){var n=q(r.west+r.width/T*e),l=q(r.north-r.height/T*t);return[n=Number(n.toFixed(6)),l=Number(l.toFixed(6))]}function q(e){return 180*e/Math.PI}return e.createTaskProcessorWorker((function(e,r){if(1==e.init)return void function(e){F=new Function("render","level",e.styleStr),T=e.tileSize,e.return_type,k=e,A=e.indexDbNames,D=e.indexDbName,B=e.serverInfo,C=e.layerFieldMap,i.getDBMap(A,S)}(e);var a=e.url,s=new t.Resource({url:a});s.request.throttle=!1,s.request.throttleByServer=!0,s.request.type=1;var u=s.fetchArrayBuffer();if(!u)return!0;let h=[];h.push(u);let c=A.slice(0,A.length-1);h.push(i.getElevation(S,c,e.xyz));let d=f.defer();return Promise.all(h).then((function(t){let r=t[0];if(!r)return void d.resolve({});let a=function(e,t){if(e){!function(e,t){for(let r in e){let n=e[r].features;n||(n=e[r].datas);for(let e=0;e<n.length;e++)E(n[e][2],t)}}(e,t.needDecode);let r={},l=new n([e],t.level,r,t.controlVector,t.highLightVector,t.filterLayerId);return F.call({},l,t.level),function(e){for(let t in e){let r=e[t];for(let e=0;e<r.length;e++){let t=r[e],n=[];N(n,t.data),delete t.data,t.geometrys=n;let l=0;if(k.hasOwnProperty("heightProperty")){let e=k.heightProperty;l=t.properties[e],k.hasOwnProperty("heightScale")&&(l*=parseFloat(k.heightScale))}t.height=l,t.totalHeight=l}}}(r),r}return{}}(l(r,C,B),e);k.hasTerrain&&function(e,t){var r=1e3,n=0;for(let l in e){let o=e[l];for(let e=0;e<o.length;e++){let l=o[e],i=-2e4,a=L.get(l.properties.id);if(a)i=a;else{for(let e=0;e<l.geometrys.length;e++){let o=l.geometrys[e];for(let e=0;e<o.length-1;e++){let l=Math.round(o[e]),a=Math.round(o[e+1]);if(a<r&&(r=a),a>n&&(n=a),e++,l<0||l>T-1||a<0||a>T-1)continue;let f=a*T+l,s=0;for(let e in t){s+=t[e].data[f]}s>i&&(i=s)}}-2e4==i&&(i=0),L.set(l.properties.id,i)}l.terrainHeight=i,l.totalHeight=i+l.height}}}(a,t[1]);let f=function(e,t){let r=new Int32Array(t*t);for(let n in e){let l=e[n];for(let e=0;e<l.length;e++){let n=l[e],i=I(n.geometrys);o(r,n,t,i.ymax,i.ymin)}}return r}(a,T);!function(e,t){for(let r in e){let n=e[r];for(let e=0;e<n.length;e++){let r=n[e];r.points=[];for(let e=0;e<r.geometrys.length;e++){let n=R(r.geometrys[e],t);r.points.push(n)}delete r.geometrys}}}(a,e),i.updateElevation(S[D],D,e.xyz,f).finally((function(e){d.resolve(a)}))}),(function(e){d.reject(e)})),d.promise}))}));
