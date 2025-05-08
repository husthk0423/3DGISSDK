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
define(["./Cartesian3-baad0d89","./defined-841154bc","./EllipseOutlineGeometry-4cb5f799","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./Math-65e8389d","./Transforms-cbbbb1c6","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-566068f5","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-5150999f"],(function(e,t,r,i,a,n,o,c,d,l,b,f,s,u,m,p,y,G,E,C,O,_,x){"use strict";return function(a,n){return t.defined(n)&&(a=r.EllipseOutlineGeometry.unpack(a,n)),a._center=e.Cartesian3.clone(a._center),a._ellipsoid=i.Ellipsoid.clone(a._ellipsoid),r.EllipseOutlineGeometry.createGeometry(a)}}));
