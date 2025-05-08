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
define(["exports","./AxisAlignedBoundingBox-9cdeab3c","./Cartesian2-cf084b8e","./Cartesian3-baad0d89","./Matrix2-6acef2ae","./defaultValue-96fcdfd6","./defined-841154bc","./Ellipsoid-8c7a76bb","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./Transforms-cbbbb1c6"],(function(t,n,e,i,o,s,r,a,l,c,d){"use strict";const f=new o.Cartesian4;function p(t,n){t=(n=s.defaultValue(n,a.Ellipsoid.WGS84)).scaleToGeodeticSurface(t);const e=d.Transforms.eastNorthUpToFixedFrame(t,n);this._ellipsoid=n,this._origin=t,this._xAxis=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(e,0,f)),this._yAxis=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(e,1,f));const r=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(e,2,f));this._plane=c.Plane.fromPointNormal(t,r)}Object.defineProperties(p.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});const u=new n.AxisAlignedBoundingBox;p.fromPoints=function(t,e){return new p(n.AxisAlignedBoundingBox.fromPoints(t,u).center,e)};const h=new l.Ray,x=new i.Cartesian3;p.prototype.projectPointOntoPlane=function(t,n){const o=h;o.origin=t,i.Cartesian3.normalize(t,o.direction);let s=l.IntersectionTests.rayPlane(o,this._plane,x);if(r.defined(s)||(i.Cartesian3.negate(o.direction,o.direction),s=l.IntersectionTests.rayPlane(o,this._plane,x)),r.defined(s)){const t=i.Cartesian3.subtract(s,this._origin,s),o=i.Cartesian3.dot(this._xAxis,t),a=i.Cartesian3.dot(this._yAxis,t);return r.defined(n)?(n.x=o,n.y=a,n):new e.Cartesian2(o,a)}},p.prototype.projectPointsOntoPlane=function(t,n){r.defined(n)||(n=[]);let e=0;const i=t.length;for(let o=0;o<i;o++){const i=this.projectPointOntoPlane(t[o],n[e]);r.defined(i)&&(n[e]=i,e++)}return n.length=e,n},p.prototype.projectPointToNearestOnPlane=function(t,n){r.defined(n)||(n=new e.Cartesian2);const o=h;o.origin=t,i.Cartesian3.clone(this._plane.normal,o.direction);let s=l.IntersectionTests.rayPlane(o,this._plane,x);r.defined(s)||(i.Cartesian3.negate(o.direction,o.direction),s=l.IntersectionTests.rayPlane(o,this._plane,x));const a=i.Cartesian3.subtract(s,this._origin,s),c=i.Cartesian3.dot(this._xAxis,a),d=i.Cartesian3.dot(this._yAxis,a);return n.x=c,n.y=d,n},p.prototype.projectPointsToNearestOnPlane=function(t,n){r.defined(n)||(n=[]);const e=t.length;n.length=e;for(let i=0;i<e;i++)n[i]=this.projectPointToNearestOnPlane(t[i],n[i]);return n};const g=new i.Cartesian3;p.prototype.projectPointOntoEllipsoid=function(t,n){r.defined(n)||(n=new i.Cartesian3);const e=this._ellipsoid,o=this._origin,s=this._xAxis,a=this._yAxis,l=g;return i.Cartesian3.multiplyByScalar(s,t.x,l),n=i.Cartesian3.add(o,l,n),i.Cartesian3.multiplyByScalar(a,t.y,l),i.Cartesian3.add(n,l,n),e.scaleToGeocentricSurface(n,n),n},p.prototype.projectPointsOntoEllipsoid=function(t,n){const e=t.length;r.defined(n)?n.length=e:n=new Array(e);for(let i=0;i<e;++i)n[i]=this.projectPointOntoEllipsoid(t[i],n[i]);return n},t.EllipsoidTangentPlane=p}));
