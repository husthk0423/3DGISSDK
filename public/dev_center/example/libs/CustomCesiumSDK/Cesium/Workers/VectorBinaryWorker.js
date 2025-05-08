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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./VectorDrawer","./point-da504a2d","./ColorUtil","./ParseBinaryData","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./defer-fe5560c8","./Math-65e8389d","./RuntimeError-5ad5d372","./Buffer","./base64","./ieee754","./isArray","./VarintReader","./snappyJs","./CodeTool","./LayerContentModel","./GisTools"],(function(e,t,r,l,n,i,o,a,f,s,u,c,d,y,h,g,p,k,b,F,w){"use strict";let C,v=512,z={},B={};function S(e,t){if(!e)return{};!function(e,t){for(let r in e){let l=e[r].features;l||(l=e[r].datas);for(let e=0;e<l.length;e++)A(l[e][2],t)}}(e=e.layer?e.layer:e,t.needDecode);let l={},n=new r([e],t.level,l,t.controlVector,t.highLightVector,t.filterLayerId);return C.call({},n,t.level),l}function A(e,t){if("F"!=e[0])if(Array.isArray(e[0])){let r=e.length;for(let l=0;l<r;l++){A(e[l],t)}}else t&&function(e){let t=[e[0],e[1]];for(let r=2;r<e.length;r++){let l=t[0]+e[r],n=t[1]+e[r+1];e[r]=l,e[r+1]=n,t=[l,n],r++}}(e);else e[0]=[.05*-v,.05*-v,1.05*v,.05*-v,1.05*v,1.05*v,.05*-v,1.05*v]}function m(e,t,r){let n=[];for(let r=0;r<e.keyArr.length;r++){let i=e[e.keyArr[r]],o=i.style;if(V(o),i.lineFeatues.length>0){let e=new l.LineBucket({style:o,type:"line",tileSize:v});for(let t of i.lineFeatues){D(t,o);let r=L(t);e.addFeature(r)}e=e.serialize(t),n.push(e)}else if(i.fillFeatures.length>0){let e=new l.FillBucket({style:o,type:"fill",tileSize:v}),r=new l.LineBucket({style:o,type:"line",tileSize:v});for(let t of i.fillFeatures){D(t,o);let l=L(t);e.addFeature(l),o.stroke&&r.addFeature(l)}e=e.serialize(t),n.push(e),o.stroke&&(r=r.serialize(t),n.push(r))}}return n}function D(e,t,r){if(!t.sparsity)return;let n=parseFloat(t.sparsity);for(let t=0;t<e.data.length;t++){let r=e.data[t];null==n&&1==n||(e.data[t]=l.simplify(r,n/4,!0))}}function L(e){let t=256/v*32,r=[];for(let n=0;n<e.data.length;n++){r[n]=[];let i=e.data[n];for(let e=0;e<i.length;e++)if(e%2==0){let o=i[e]*t,a=i[e+1]*t;r[n].push(new l.Point(o,a))}}return r}function V(e){let t=new n;if(e.fillColor){t.fromHex(e.fillColor);let r=[t.rgb[0]/255,t.rgb[1]/255,t.rgb[2]/255,1];e.fillColor=r}if(e.strokeColor){t=new n,t.fromHex(e.strokeColor);let r=[t.rgb[0]/255,t.rgb[1]/255,t.rgb[2]/255,1];e.strokeColor=r}}return e.createTaskProcessorWorker((function(e,r){if(1==e.init)return C=new Function("render","level",e.styleStr),v=e.tileSize,e.return_type,z=e.serverInfo,B=e.layerFieldMap,!0;if(1==e.changeStyle){return m(S(i(e.tileData,B,z),e),r)}var l=e.url,n=new t.Resource({url:l});n.request.throttle=!1,n.request.throttleByServer=!0,n.request.type=1;var o=n.fetchArrayBuffer();return!o||o.then((function(t){return{tileData:t,buckets:m(S(i(t,B,z),e),r)}}))}))}));
