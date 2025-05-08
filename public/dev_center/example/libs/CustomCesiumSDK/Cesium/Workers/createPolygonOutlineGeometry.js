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
define(["./defined-841154bc","./Ellipsoid-8c7a76bb","./PolygonOutlineGeometry-9dd09ec5","./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./Math-65e8389d","./ArcType-89067bf8","./Transforms-cbbbb1c6","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./EllipsoidTangentPlane-1af983dc","./AxisAlignedBoundingBox-9cdeab3c","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryInstance-348bb574","./GeometryOffsetAttribute-d3a42805","./GeometryPipeline-bc5af0f1","./AttributeCompression-7121dd0d","./EncodedCartesian3-fbbab2b9","./IndexDatatype-5150999f","./PolygonGeometryLibrary-ec267095","./arrayRemoveDuplicates-4d04dea5","./EllipsoidRhumbLine-c9694e61","./PolygonPipeline-7cf6d331"],(function(e,t,n,o,i,a,r,d,c,b,l,f,s,y,u,m,p,G,P,g,A,C,E,x,O,R,T,h,D,I,L,M,B,_,j){"use strict";return function(o,i){return e.defined(i)&&(o=n.PolygonOutlineGeometry.unpack(o,i)),o._ellipsoid=t.Ellipsoid.clone(o._ellipsoid),n.PolygonOutlineGeometry.createGeometry(o)}}));
