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
define(["./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./defined-841154bc","./EllipseGeometry-4ba1611f","./Ellipsoid-8c7a76bb","./VertexFormat-b8345068","./Math-65e8389d","./Transforms-cbbbb1c6","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-566068f5","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryInstance-348bb574","./GeometryOffsetAttribute-d3a42805","./GeometryPipeline-bc5af0f1","./AttributeCompression-7121dd0d","./EncodedCartesian3-fbbab2b9","./IndexDatatype-5150999f","./IntersectionTests-3d89883e","./Plane-0b6bf8f9"],(function(e,t,i,r,o,a,n,s,l,d,m,c,u,p,y,_,f,G,b,x,h,g,E,w,A,M,v,C,V,R){"use strict";function F(e){const i=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(o),this._workerName="createCircleGeometry"}F.packedLength=r.EllipseGeometry.packedLength,F.pack=function(e,t,i){return r.EllipseGeometry.pack(e._ellipseGeometry,t,i)};const j=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),P={center:new e.Cartesian3,radius:void 0,ellipsoid:o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new a.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return F.unpack=function(t,n,s){const l=r.EllipseGeometry.unpack(t,n,j);return P.center=e.Cartesian3.clone(l._center,P.center),P.ellipsoid=o.Ellipsoid.clone(l._ellipsoid,P.ellipsoid),P.height=l._height,P.extrudedHeight=l._extrudedHeight,P.granularity=l._granularity,P.vertexFormat=a.VertexFormat.clone(l._vertexFormat,P.vertexFormat),P.stRotation=l._stRotation,P.shadowVolume=l._shadowVolume,i.defined(s)?(P.semiMajorAxis=l._semiMajorAxis,P.semiMinorAxis=l._semiMinorAxis,s._ellipseGeometry=new r.EllipseGeometry(P),s):(P.radius=l._semiMajorAxis,new F(P))},F.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},F.createShadowVolume=function(e,t,i){const r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,n=t(r,o),s=i(r,o);return new F({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:n,height:s,vertexFormat:a.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(F.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,r){return i.defined(r)&&(t=F.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=o.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),F.createGeometry(t)}}));
