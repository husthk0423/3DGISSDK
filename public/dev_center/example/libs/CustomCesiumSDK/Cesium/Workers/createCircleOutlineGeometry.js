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
define(["./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./defined-841154bc","./EllipseOutlineGeometry-4cb5f799","./Ellipsoid-8c7a76bb","./Math-65e8389d","./Transforms-cbbbb1c6","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-566068f5","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-5150999f"],(function(e,i,t,r,n,l,o,s,a,d,c,u,m,p,y,f,b,G,_,h,x,E,g){"use strict";function O(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,n={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new r.EllipseOutlineGeometry(n),this._workerName="createCircleOutlineGeometry"}O.packedLength=r.EllipseOutlineGeometry.packedLength,O.pack=function(e,i,t){return r.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};const M=new r.EllipseOutlineGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),A={center:new e.Cartesian3,radius:void 0,ellipsoid:n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return O.unpack=function(i,l,o){const s=r.EllipseOutlineGeometry.unpack(i,l,M);return A.center=e.Cartesian3.clone(s._center,A.center),A.ellipsoid=n.Ellipsoid.clone(s._ellipsoid,A.ellipsoid),A.height=s._height,A.extrudedHeight=s._extrudedHeight,A.granularity=s._granularity,A.numberOfVerticalLines=s._numberOfVerticalLines,t.defined(o)?(A.semiMajorAxis=s._semiMajorAxis,A.semiMinorAxis=s._semiMinorAxis,o._ellipseGeometry=new r.EllipseOutlineGeometry(A),o):(A.radius=s._semiMajorAxis,new O(A))},O.createGeometry=function(e){return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(i,r){return t.defined(r)&&(i=O.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=n.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),O.createGeometry(i)}}));
