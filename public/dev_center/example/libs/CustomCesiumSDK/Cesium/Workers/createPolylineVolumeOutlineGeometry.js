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
define(["./defined-841154bc","./Ellipsoid-8c7a76bb","./arrayRemoveDuplicates-4d04dea5","./BoundingRectangle-6aaa8e8b","./Transforms-cbbbb1c6","./Cartesian2-cf084b8e","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./PolylineVolumeGeometryLibrary-2a1277f1","./defaultValue-96fcdfd6","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./IndexDatatype-5150999f","./Math-65e8389d","./PolygonPipeline-7cf6d331","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3","./EllipsoidTangentPlane-1af983dc","./AxisAlignedBoundingBox-9cdeab3c","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./PolylinePipeline-6b6057ff","./EllipsoidGeodesic-91209f0c","./EllipsoidRhumbLine-c9694e61"],(function(e,t,i,n,o,a,r,l,s,p,c,d,u,y,f,g,h,m,b,E,P,_,C,k,L,G,T,D,v,A,R){"use strict";function V(e){const i=(e=p.defaultValue(e,p.defaultValue.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;this._positions=i,this._shape=n,this._ellipsoid=t.Ellipsoid.clone(p.defaultValue(e.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=p.defaultValue(e.cornerType,s.CornerType.ROUNDED),this._granularity=p.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let o=1+i.length*r.Cartesian3.packedLength;o+=1+n.length*a.Cartesian2.packedLength,this.packedLength=o+t.Ellipsoid.packedLength+2}V.pack=function(e,i,n){let o;n=p.defaultValue(n,0);const l=e._positions;let s=l.length;for(i[n++]=s,o=0;o<s;++o,n+=r.Cartesian3.packedLength)r.Cartesian3.pack(l[o],i,n);const c=e._shape;for(s=c.length,i[n++]=s,o=0;o<s;++o,n+=a.Cartesian2.packedLength)a.Cartesian2.pack(c[o],i,n);return t.Ellipsoid.pack(e._ellipsoid,i,n),n+=t.Ellipsoid.packedLength,i[n++]=e._cornerType,i[n]=e._granularity,i};const w=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),B={polylinePositions:void 0,shapePositions:void 0,ellipsoid:w,height:void 0,cornerType:void 0,granularity:void 0};V.unpack=function(i,n,o){let l;n=p.defaultValue(n,0);let s=i[n++];const c=new Array(s);for(l=0;l<s;++l,n+=r.Cartesian3.packedLength)c[l]=r.Cartesian3.unpack(i,n);s=i[n++];const d=new Array(s);for(l=0;l<s;++l,n+=a.Cartesian2.packedLength)d[l]=a.Cartesian2.unpack(i,n);const u=t.Ellipsoid.unpack(i,n,w);n+=t.Ellipsoid.packedLength;const y=i[n++],f=i[n];return e.defined(o)?(o._positions=c,o._shape=d,o._ellipsoid=t.Ellipsoid.clone(u,o._ellipsoid),o._cornerType=y,o._granularity=f,o):(B.polylinePositions=c,B.shapePositions=d,B.cornerType=y,B.granularity=f,new V(B))};const I=new n.BoundingRectangle;return V.createGeometry=function(e){const t=e._positions,a=i.arrayRemoveDuplicates(t,r.Cartesian3.equalsEpsilon);let p=e._shape;if(p=s.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(p),a.length<2||p.length<3)return;g.PolygonPipeline.computeWindingOrder2D(p)===g.WindingOrder.CLOCKWISE&&p.reverse();const f=n.BoundingRectangle.fromPoints(p,I);return function(e,t){const i=new u.GeometryAttributes;i.position=new d.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const n=t.length,a=i.position.values.length/3,r=e.length/3/n,s=y.IndexDatatype.createTypedArray(a,2*n*(r+1));let p,f,g=0;p=0;let h=p*n;for(f=0;f<n-1;f++)s[g++]=f+h,s[g++]=f+h+1;for(s[g++]=n-1+h,s[g++]=h,p=r-1,h=p*n,f=0;f<n-1;f++)s[g++]=f+h,s[g++]=f+h+1;for(s[g++]=n-1+h,s[g++]=h,p=0;p<r-1;p++){const e=n*p,t=e+n;for(f=0;f<n;f++)s[g++]=f+e,s[g++]=f+t}return new c.Geometry({attributes:i,indices:y.IndexDatatype.createTypedArray(a,s),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:c.PrimitiveType.LINES})}(s.PolylineVolumeGeometryLibrary.computePositions(a,p,f,e,!1),p)},function(i,n){return e.defined(n)&&(i=V.unpack(i,n)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),V.createGeometry(i)}}));
