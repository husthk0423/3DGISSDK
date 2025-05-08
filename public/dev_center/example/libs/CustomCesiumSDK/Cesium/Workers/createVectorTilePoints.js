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
define(["./AttributeCompression-7121dd0d","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./Math-65e8389d","./Cartesian2-cf084b8e","./createTaskProcessorWorker-86855e0c","./ComponentDatatype-30c22829","./defaultValue-96fcdfd6","./defined-841154bc","./WebGLConstants-fcb70ee3","./Matrix2-6acef2ae","./Matrix3-d40b977d","./RuntimeError-5ad5d372"],(function(e,a,t,r,n,i,o,s,c,d,u,l,p){"use strict";const f=32767,b=new t.Cartographic,m=new a.Cartesian3,C=new n.Rectangle,h=new t.Ellipsoid,g={min:void 0,max:void 0};return i.createTaskProcessorWorker((function(i,o){const s=new Uint16Array(i.positions);!function(e){e=new Float64Array(e);let a=0;g.min=e[a++],g.max=e[a++],n.Rectangle.unpack(e,a,C),a+=n.Rectangle.packedLength,t.Ellipsoid.unpack(e,a,h)}(i.packedBuffer);const c=C,d=h,u=g.min,l=g.max,p=s.length/3,k=s.subarray(0,p),w=s.subarray(p,2*p),y=s.subarray(2*p,3*p);e.AttributeCompression.zigZagDeltaDecode(k,w,y);const M=new Float64Array(s.length);for(let e=0;e<p;++e){const n=k[e],i=w[e],o=y[e],s=r.CesiumMath.lerp(c.west,c.east,n/f),p=r.CesiumMath.lerp(c.south,c.north,i/f),C=r.CesiumMath.lerp(u,l,o/f),h=t.Cartographic.fromRadians(s,p,C,b),g=d.cartographicToCartesian(h,m);a.Cartesian3.pack(g,M,3*e)}return o.push(M.buffer),{positions:M.buffer}}))}));
