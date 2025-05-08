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
define(["./defined-841154bc","./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./defaultValue-96fcdfd6","./FrustumGeometry-a9195d84","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./Ellipsoid-8c7a76bb","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3","./Plane-0b6bf8f9","./VertexFormat-b8345068"],(function(e,t,r,n,a,i,u,o,c,s,p,m,d,f,h,l,g,_,b,k,y,F){"use strict";function P(e){const n=e.frustum,u=e.orientation,o=e.origin,c=a.defaultValue(e._drawNearPlane,!0);let s,p;n instanceof i.PerspectiveFrustum?(s=0,p=i.PerspectiveFrustum.packedLength):n instanceof i.OrthographicFrustum&&(s=1,p=i.OrthographicFrustum.packedLength),this._frustumType=s,this._frustum=n.clone(),this._origin=r.Cartesian3.clone(o),this._orientation=t.Quaternion.clone(u),this._drawNearPlane=c,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+p+r.Cartesian3.packedLength+t.Quaternion.packedLength}P.pack=function(e,n,u){u=a.defaultValue(u,0);const o=e._frustumType,c=e._frustum;return n[u++]=o,0===o?(i.PerspectiveFrustum.pack(c,n,u),u+=i.PerspectiveFrustum.packedLength):(i.OrthographicFrustum.pack(c,n,u),u+=i.OrthographicFrustum.packedLength),r.Cartesian3.pack(e._origin,n,u),u+=r.Cartesian3.packedLength,t.Quaternion.pack(e._orientation,n,u),n[u+=t.Quaternion.packedLength]=e._drawNearPlane?1:0,n};const w=new i.PerspectiveFrustum,L=new i.OrthographicFrustum,C=new t.Quaternion,G=new r.Cartesian3;return P.unpack=function(n,u,o){u=a.defaultValue(u,0);const c=n[u++];let s;0===c?(s=i.PerspectiveFrustum.unpack(n,u,w),u+=i.PerspectiveFrustum.packedLength):(s=i.OrthographicFrustum.unpack(n,u,L),u+=i.OrthographicFrustum.packedLength);const p=r.Cartesian3.unpack(n,u,G);u+=r.Cartesian3.packedLength;const m=t.Quaternion.unpack(n,u,C),d=1===n[u+=t.Quaternion.packedLength];if(!e.defined(o))return new P({frustum:s,origin:p,orientation:m,_drawNearPlane:d});const f=c===o._frustumType?o._frustum:void 0;return o._frustum=s.clone(f),o._frustumType=c,o._origin=r.Cartesian3.clone(p,o._origin),o._orientation=t.Quaternion.clone(m,o._orientation),o._drawNearPlane=d,o},P.createGeometry=function(e){const r=e._frustumType,a=e._frustum,s=e._origin,p=e._orientation,m=e._drawNearPlane,d=new Float64Array(24);i.FrustumGeometry._computeNearFarPlanes(s,p,r,a,d);const f=new c.GeometryAttributes({position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})});let h,l;const g=m?2:1,_=new Uint16Array(8*(g+1));let b=m?0:1;for(;b<2;++b)h=m?8*b:0,l=4*b,_[h]=l,_[h+1]=l+1,_[h+2]=l+1,_[h+3]=l+2,_[h+4]=l+2,_[h+5]=l+3,_[h+6]=l+3,_[h+7]=l;for(b=0;b<2;++b)h=8*(g+b),l=4*b,_[h]=l,_[h+1]=l+4,_[h+2]=l+1,_[h+3]=l+5,_[h+4]=l+2,_[h+5]=l+6,_[h+6]=l+3,_[h+7]=l+7;return new u.Geometry({attributes:f,indices:_,primitiveType:u.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(d)})},function(t,r){return e.defined(r)&&(t=P.unpack(t,r)),P.createGeometry(t)}}));
