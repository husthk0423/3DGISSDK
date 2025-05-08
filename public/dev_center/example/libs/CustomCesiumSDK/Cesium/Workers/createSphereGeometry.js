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
define(["./defined-841154bc","./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./EllipsoidGeometry-30fc233e","./VertexFormat-b8345068","./Math-65e8389d","./Transforms-cbbbb1c6","./Ellipsoid-8c7a76bb","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-5150999f"],(function(e,t,i,r,a,o,n,s,c,d,l,m,u,f,p,y,G,b,k,x,P,E,_){"use strict";function v(e){const a=i.defaultValue(e.radius,1),o={radii:new t.Cartesian3(a,a,a),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new r.EllipsoidGeometry(o),this._workerName="createSphereGeometry"}v.packedLength=r.EllipsoidGeometry.packedLength,v.pack=function(e,t,i){return r.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,i)};const F=new r.EllipsoidGeometry,w={radius:void 0,radii:new t.Cartesian3,vertexFormat:new a.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return v.unpack=function(i,o,n){const s=r.EllipsoidGeometry.unpack(i,o,F);return w.vertexFormat=a.VertexFormat.clone(s._vertexFormat,w.vertexFormat),w.stackPartitions=s._stackPartitions,w.slicePartitions=s._slicePartitions,e.defined(n)?(t.Cartesian3.clone(s._radii,w.radii),n._ellipsoidGeometry=new r.EllipsoidGeometry(w),n):(w.radius=s._radii.x,new v(w))},v.createGeometry=function(e){return r.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,i){return e.defined(i)&&(t=v.unpack(t,i)),v.createGeometry(t)}}));
