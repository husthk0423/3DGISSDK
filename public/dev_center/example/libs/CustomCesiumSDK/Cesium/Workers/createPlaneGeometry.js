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
define(["./defined-841154bc","./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./defaultValue-96fcdfd6","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./VertexFormat-b8345068","./Ellipsoid-8c7a76bb","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3"],(function(e,t,n,r,a,o,i,c,m,u,p,s,y,b,d,f,l,A,F,x){"use strict";function w(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT);const t=a.defaultValue(e.vertexFormat,m.VertexFormat.DEFAULT);this._vertexFormat=t,this._workerName="createPlaneGeometry"}w.packedLength=m.VertexFormat.packedLength,w.pack=function(e,t,n){return n=a.defaultValue(n,0),m.VertexFormat.pack(e._vertexFormat,t,n),t};const G=new m.VertexFormat,v={vertexFormat:G};w.unpack=function(t,n,r){n=a.defaultValue(n,0);const o=m.VertexFormat.unpack(t,n,G);return e.defined(r)?(r._vertexFormat=m.VertexFormat.clone(o,r._vertexFormat),r):new w(v)};const C=new n.Cartesian3(-.5,-.5,0),D=new n.Cartesian3(.5,.5,0);return w.createGeometry=function(e){const a=e._vertexFormat,m=new c.GeometryAttributes;let u,p;if(a.position){if(p=new Float64Array(12),p[0]=C.x,p[1]=C.y,p[2]=0,p[3]=D.x,p[4]=C.y,p[5]=0,p[6]=D.x,p[7]=D.y,p[8]=0,p[9]=C.x,p[10]=D.y,p[11]=0,m.position=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p}),a.normal){const e=new Float32Array(12);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=1,e[9]=0,e[10]=0,e[11]=1,m.normal=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(a.st){const e=new Float32Array(8);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=1,e[5]=1,e[6]=0,e[7]=1,m.st=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:e})}if(a.tangent){const e=new Float32Array(12);e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=1,e[7]=0,e[8]=0,e[9]=1,e[10]=0,e[11]=0,m.tangent=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(a.bitangent){const e=new Float32Array(12);e[0]=0,e[1]=1,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=1,e[8]=0,e[9]=0,e[10]=1,e[11]=0,m.bitangent=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}u=new Uint16Array(6),u[0]=0,u[1]=1,u[2]=2,u[3]=0,u[4]=2,u[5]=3}return new o.Geometry({attributes:m,indices:u,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=w.unpack(t,n)),w.createGeometry(t)}}));
