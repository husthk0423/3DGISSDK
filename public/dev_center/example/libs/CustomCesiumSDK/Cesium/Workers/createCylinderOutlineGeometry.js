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
define(["./Transforms-cbbbb1c6","./Cartesian2-cf084b8e","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./CylinderGeometryLibrary-71011b17","./defaultValue-96fcdfd6","./defined-841154bc","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-5150999f","./Ellipsoid-8c7a76bb","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3"],(function(t,e,i,n,o,r,a,s,u,f,d,c,b,l,m,p,y,_,h,A,G,R){"use strict";const O=new e.Cartesian2;function V(t){const e=(t=r.defaultValue(t,r.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,n=t.bottomRadius,o=r.defaultValue(t.slices,128),a=Math.max(r.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=n,this._slices=o,this._numberOfVerticalLines=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}V.packedLength=6,V.pack=function(t,e,i){return i=r.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=r.defaultValue(t._offsetAttribute,-1),e};const g={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return V.unpack=function(t,e,i){e=r.defaultValue(e,0);const n=t[e++],o=t[e++],s=t[e++],u=t[e++],f=t[e++],d=t[e];return a.defined(i)?(i._length=n,i._topRadius=o,i._bottomRadius=s,i._slices=u,i._numberOfVerticalLines=f,i._offsetAttribute=-1===d?void 0:d,i):(g.length=n,g.topRadius=o,g.bottomRadius=s,g.slices=u,g.numberOfVerticalLines=f,g.offsetAttribute=-1===d?void 0:d,new V(g))},V.createGeometry=function(r){let b=r._length;const l=r._topRadius,m=r._bottomRadius,p=r._slices,y=r._numberOfVerticalLines;if(b<=0||l<0||m<0||0===l&&0===m)return;const _=2*p,h=o.CylinderGeometryLibrary.computePositions(b,l,m,p,!1);let A,G=2*p;if(y>0){const t=Math.min(y,p);A=Math.round(p/t),G+=t}const R=c.IndexDatatype.createTypedArray(_,2*G);let V,g=0;for(V=0;V<p-1;V++)R[g++]=V,R[g++]=V+1,R[g++]=V+p,R[g++]=V+1+p;if(R[g++]=p-1,R[g++]=0,R[g++]=p+p-1,R[g++]=p,y>0)for(V=0;V<p;V+=A)R[g++]=V,R[g++]=V+p;const C=new f.GeometryAttributes;C.position=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),O.x=.5*b,O.y=Math.max(m,l);const L=new t.BoundingSphere(i.Cartesian3.ZERO,e.Cartesian2.magnitude(O));if(a.defined(r._offsetAttribute)){b=h.length;const t=r._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1,e=new Uint8Array(b/3).fill(t);C.applyOffset=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}return new s.Geometry({attributes:C,indices:R,primitiveType:s.PrimitiveType.LINES,boundingSphere:L,offsetAttribute:r._offsetAttribute})},function(t,e){return a.defined(e)&&(t=V.unpack(t,e)),V.createGeometry(t)}}));
