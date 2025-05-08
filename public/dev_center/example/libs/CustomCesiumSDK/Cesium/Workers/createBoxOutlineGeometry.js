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
define(["./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./defaultValue-96fcdfd6","./defined-841154bc","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./Ellipsoid-8c7a76bb","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3"],(function(e,t,n,a,i,r,o,u,s,m,f,c,d,b,p,l,y,C,A,x){"use strict";const _=new t.Cartesian3;function w(e){const n=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).minimum,i=e.maximum;this._min=t.Cartesian3.clone(n),this._max=t.Cartesian3.clone(i),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}w.fromDimensions=function(e){const n=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).dimensions,i=t.Cartesian3.multiplyByScalar(n,.5,new t.Cartesian3);return new w({minimum:t.Cartesian3.negate(i,new t.Cartesian3),maximum:i,offsetAttribute:e.offsetAttribute})},w.fromAxisAlignedBoundingBox=function(e){return new w({minimum:e.minimum,maximum:e.maximum})},w.packedLength=2*t.Cartesian3.packedLength+1,w.pack=function(e,n,i){return i=a.defaultValue(i,0),t.Cartesian3.pack(e._min,n,i),t.Cartesian3.pack(e._max,n,i+t.Cartesian3.packedLength),n[i+2*t.Cartesian3.packedLength]=a.defaultValue(e._offsetAttribute,-1),n};const h=new t.Cartesian3,G=new t.Cartesian3,g={minimum:h,maximum:G,offsetAttribute:void 0};return w.unpack=function(e,n,r){n=a.defaultValue(n,0);const o=t.Cartesian3.unpack(e,n,h),u=t.Cartesian3.unpack(e,n+t.Cartesian3.packedLength,G),s=e[n+2*t.Cartesian3.packedLength];return i.defined(r)?(r._min=t.Cartesian3.clone(o,r._min),r._max=t.Cartesian3.clone(u,r._max),r._offsetAttribute=-1===s?void 0:s,r):(g.offsetAttribute=-1===s?void 0:s,new w(g))},w.createGeometry=function(a){const m=a._min,f=a._max;if(t.Cartesian3.equals(m,f))return;const c=new u.GeometryAttributes,d=new Uint16Array(24),b=new Float64Array(24);b[0]=m.x,b[1]=m.y,b[2]=m.z,b[3]=f.x,b[4]=m.y,b[5]=m.z,b[6]=f.x,b[7]=f.y,b[8]=m.z,b[9]=m.x,b[10]=f.y,b[11]=m.z,b[12]=m.x,b[13]=m.y,b[14]=f.z,b[15]=f.x,b[16]=m.y,b[17]=f.z,b[18]=f.x,b[19]=f.y,b[20]=f.z,b[21]=m.x,b[22]=f.y,b[23]=f.z,c.position=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:b}),d[0]=4,d[1]=5,d[2]=5,d[3]=6,d[4]=6,d[5]=7,d[6]=7,d[7]=4,d[8]=0,d[9]=1,d[10]=1,d[11]=2,d[12]=2,d[13]=3,d[14]=3,d[15]=0,d[16]=0,d[17]=4,d[18]=1,d[19]=5,d[20]=2,d[21]=6,d[22]=3,d[23]=7;const p=t.Cartesian3.subtract(f,m,_),l=.5*t.Cartesian3.magnitude(p);if(i.defined(a._offsetAttribute)){const e=b.length,t=a._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1,i=new Uint8Array(e/3).fill(t);c.applyOffset=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}return new r.Geometry({attributes:c,indices:d,primitiveType:r.PrimitiveType.LINES,boundingSphere:new e.BoundingSphere(t.Cartesian3.ZERO,l),offsetAttribute:a._offsetAttribute})},function(e,t){return i.defined(t)&&(e=w.unpack(e,t)),w.createGeometry(e)}}));
