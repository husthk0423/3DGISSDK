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
define(["./defined-841154bc","./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./ComponentDatatype-30c22829","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./Math-65e8389d","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./WebGLConstants-fcb70ee3"],(function(e,t,n,r,a,i,o,c,u,d,b,s,f,y,m,p,G,w,l){"use strict";function C(){this._workerName="createPlaneOutlineGeometry"}C.packedLength=0,C.pack=function(e,t){return t},C.unpack=function(t,n,r){return e.defined(r)?r:new C};const h=new n.Cartesian3(-.5,-.5,0),A=new n.Cartesian3(.5,.5,0);return C.createGeometry=function(){const e=new o.GeometryAttributes,c=new Uint16Array(8),u=new Float64Array(12);return u[0]=h.x,u[1]=h.y,u[2]=h.z,u[3]=A.x,u[4]=h.y,u[5]=h.z,u[6]=A.x,u[7]=A.y,u[8]=h.z,u[9]=h.x,u[10]=A.y,u[11]=h.z,e.position=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),c[0]=0,c[1]=1,c[2]=1,c[3]=2,c[4]=2,c[5]=3,c[6]=3,c[7]=0,new a.Geometry({attributes:e,indices:c,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=C.unpack(t,n)),C.createGeometry(t)}}));
