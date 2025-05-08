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
define(["./defined-841154bc","./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./EllipsoidOutlineGeometry-a4e82a1f","./Math-65e8389d","./Transforms-cbbbb1c6","./Ellipsoid-8c7a76bb","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-5150999f"],(function(e,i,t,r,n,o,a,s,d,c,l,u,b,f,m,p,y,G,k,P,E,O){"use strict";function _(e){const n=t.defaultValue(e.radius,1),o={radii:new i.Cartesian3(n,n,n),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,subdivisions:e.subdivisions};this._ellipsoidGeometry=new r.EllipsoidOutlineGeometry(o),this._workerName="createSphereOutlineGeometry"}_.packedLength=r.EllipsoidOutlineGeometry.packedLength,_.pack=function(e,i,t){return r.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,t)};const v=new r.EllipsoidOutlineGeometry,h={radius:void 0,radii:new i.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return _.unpack=function(t,n,o){const a=r.EllipsoidOutlineGeometry.unpack(t,n,v);return h.stackPartitions=a._stackPartitions,h.slicePartitions=a._slicePartitions,h.subdivisions=a._subdivisions,e.defined(o)?(i.Cartesian3.clone(a._radii,h.radii),o._ellipsoidGeometry=new r.EllipsoidOutlineGeometry(h),o):(h.radius=a._radii.x,new _(h))},_.createGeometry=function(e){return r.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=_.unpack(i,t)),_.createGeometry(i)}}));
