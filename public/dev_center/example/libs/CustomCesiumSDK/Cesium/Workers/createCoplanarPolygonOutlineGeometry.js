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
define(["./arrayRemoveDuplicates-4d04dea5","./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./CoplanarPolygonGeometryLibrary-fd7f2126","./defaultValue-96fcdfd6","./defined-841154bc","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryInstance-348bb574","./GeometryPipeline-bc5af0f1","./IndexDatatype-5150999f","./PolygonGeometryLibrary-ec267095","./Ellipsoid-8c7a76bb","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3","./OrientedBoundingBox-536d86cc","./EllipsoidTangentPlane-1af983dc","./AxisAlignedBoundingBox-9cdeab3c","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./AttributeCompression-7121dd0d","./EncodedCartesian3-fbbab2b9","./ArcType-89067bf8","./EllipsoidRhumbLine-c9694e61","./PolygonPipeline-7cf6d331"],(function(e,t,n,o,r,i,a,c,s,y,l,d,u,p,b,f,m,g,h,P,G,C,L,E,T,A,H,k,x,w,I,_,v,B,D){"use strict";function O(e){const t=e.length,n=new Float64Array(3*t),r=u.IndexDatatype.createTypedArray(t,2*t);let i=0,a=0;for(let o=0;o<t;o++){const c=e[o];n[i++]=c.x,n[i++]=c.y,n[i++]=c.z,r[a++]=o,r[a++]=(o+1)%t}const l=new y.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new c.Geometry({attributes:l,indices:r,primitiveType:c.PrimitiveType.LINES})}function V(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=p.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}V.fromPositions=function(e){return new V({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},V.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=p.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const M={polygonHierarchy:{}};return V.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=p.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const c=e[t];return a.defined(o)||(o=new V(M)),o._polygonHierarchy=r,o.packedLength=c,o},V.createGeometry=function(o){const i=o._polygonHierarchy;let a=i.positions;if(a=e.arrayRemoveDuplicates(a,n.Cartesian3.equalsEpsilon,!0),a.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(a))return;const s=p.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===s.length)return;const y=[];for(let e=0;e<s.length;e++){const t=new l.GeometryInstance({geometry:O(s[e])});y.push(t)}const u=d.GeometryPipeline.combineInstances(y)[0],b=t.BoundingSphere.fromPoints(i.positions);return new c.Geometry({attributes:u.attributes,indices:u.indices,primitiveType:u.primitiveType,boundingSphere:b})},function(e,t){return a.defined(t)&&(e=V.unpack(e,t)),e._ellipsoid=b.Ellipsoid.clone(e._ellipsoid),V.createGeometry(e)}}));
