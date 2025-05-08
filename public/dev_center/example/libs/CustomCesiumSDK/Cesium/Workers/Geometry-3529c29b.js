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
define(["exports","./Cartesian2-cf084b8e","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./defined-841154bc","./Matrix2-6acef2ae","./Matrix3-d40b977d","./WebGLConstants-fcb70ee3","./Transforms-cbbbb1c6"],(function(t,e,n,a,i,r,s,o,u,I){"use strict";var N=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3});const c={POINTS:u.WebGLConstants.POINTS,LINES:u.WebGLConstants.LINES,LINE_LOOP:u.WebGLConstants.LINE_LOOP,LINE_STRIP:u.WebGLConstants.LINE_STRIP,TRIANGLES:u.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:u.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:u.WebGLConstants.TRIANGLE_FAN,isLines:function(t){return t===c.LINES||t===c.LINE_LOOP||t===c.LINE_STRIP},isTriangles:function(t){return t===c.TRIANGLES||t===c.TRIANGLE_STRIP||t===c.TRIANGLE_FAN},validate:function(t){return t===c.POINTS||t===c.LINES||t===c.LINE_LOOP||t===c.LINE_STRIP||t===c.TRIANGLES||t===c.TRIANGLE_STRIP||t===c.TRIANGLE_FAN}};var T=Object.freeze(c);function L(t){t=i.defaultValue(t,i.defaultValue.EMPTY_OBJECT),this.attributes=t.attributes,this.indices=t.indices,this.primitiveType=i.defaultValue(t.primitiveType,T.TRIANGLES),this.boundingSphere=t.boundingSphere,this.geometryType=i.defaultValue(t.geometryType,N.NONE),this.boundingSphereCV=t.boundingSphereCV,this.offsetAttribute=t.offsetAttribute}L.computeNumberOfVertices=function(t){let e=-1;for(const n in t.attributes)if(t.attributes.hasOwnProperty(n)&&r.defined(t.attributes[n])&&r.defined(t.attributes[n].values)){const a=t.attributes[n];e=a.values.length/a.componentsPerAttribute}return e};const b=new a.Cartographic,E=new n.Cartesian3,f=new s.Matrix4,l=[new a.Cartographic,new a.Cartographic,new a.Cartographic],d=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],C=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],y=new n.Cartesian3,p=new I.Quaternion,x=new s.Matrix4,S=new s.Matrix2;L._textureCoordinateRotationPoints=function(t,i,r,u){let N;const c=e.Rectangle.center(u,b),T=a.Cartographic.toCartesian(c,r,E),L=I.Transforms.eastNorthUpToFixedFrame(T,r,f),h=s.Matrix4.inverse(L,f),m=d,A=l;A[0].longitude=u.west,A[0].latitude=u.south,A[1].longitude=u.west,A[1].latitude=u.north,A[2].longitude=u.east,A[2].latitude=u.south;let G=y;for(N=0;N<3;N++)a.Cartographic.toCartesian(A[N],r,G),G=s.Matrix4.multiplyByPointAsVector(h,G,G),m[N].x=G.x,m[N].y=G.y;const P=I.Quaternion.fromAxisAngle(n.Cartesian3.UNIT_Z,-i,p),R=o.Matrix3.fromQuaternion(P,x),_=t.length;let O=Number.POSITIVE_INFINITY,g=Number.POSITIVE_INFINITY,w=Number.NEGATIVE_INFINITY,M=Number.NEGATIVE_INFINITY;for(N=0;N<_;N++)G=s.Matrix4.multiplyByPointAsVector(h,t[N],G),G=o.Matrix3.multiplyByVector(R,G,G),O=Math.min(O,G.x),g=Math.min(g,G.y),w=Math.max(w,G.x),M=Math.max(M,G.y);const V=s.Matrix2.fromRotation(i,S),F=C;F[0].x=O,F[0].y=g,F[1].x=O,F[1].y=M,F[2].x=w,F[2].y=g;const v=m[0],W=m[2].x-v.x,Y=m[1].y-v.y;for(N=0;N<3;N++){const t=F[N];s.Matrix2.multiplyByVector(V,t,t),t.x=(t.x-v.x)/W,t.y=(t.y-v.y)/Y}const B=F[0],k=F[1],Q=F[2],j=new Array(6);return e.Cartesian2.pack(B,j),e.Cartesian2.pack(k,j,2),e.Cartesian2.pack(Q,j,4),j},t.Geometry=L,t.GeometryType=N,t.PrimitiveType=T}));
