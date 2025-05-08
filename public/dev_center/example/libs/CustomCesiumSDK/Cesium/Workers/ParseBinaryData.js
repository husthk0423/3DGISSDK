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
define(["./Buffer","./VarintReader","./base64","./ieee754","./isArray","./snappyJs","./CodeTool","./LayerContentModel","./GisTools"],(function(e,t,n,r,o,s,i,l,a){"use strict";return function(n,r,o){let s=function(t){for(var n=new e(t.byteLength),r=new Uint8Array(t),o=0;o<n.length;++o)n[o]=r[o];return n}(n),i=new t(s,4,r),l=i.getAllLayerNames(),a={};for(let e=0;e<l.length;e++){let t=l[e];a[t]={features:[],fieldsConfig:o[t]?o[t].fieldsConfig:{},type:1};let n=i.getGeometryType(t),r=i.getLayerPro(t);if("point"==n.toLowerCase()?a[t].type=1:"line"!=n.toLowerCase()&&"linestring"!=n.toLowerCase()&&"multilinestring"!=n.toLowerCase()||(a[t].type=2),r&&r.length>0)for(let e=0;e<r.length;e++){let o=[];o.push(n),o.push(r[e]),o.push(i.getCoordinatesByIndex(t,e,10)),a[t].features.push(o)}}return a}}));
