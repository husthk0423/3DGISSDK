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
define(["./Color-39aac1ad","./GeometryInstance-348bb574","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./ComponentDatatype-30c22829","./Ellipsoid-8c7a76bb","./Transforms-cbbbb1c6","./defaultValue-96fcdfd6","./defined-841154bc","./Math-65e8389d","./Matrix2-6acef2ae","./Cartesian3-baad0d89","./Matrix3-d40b977d","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./WebGLConstants-fcb70ee3","./GeographicProjection-48a1ce64","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8"],(function(t,e,s,i,o,r,n,a,h,c,p,l,u,m,d,y,b,f,g,A){"use strict";return class{constructor(e){this.positions=null,this.normals=null,this.sts=null,this.indices=null,this.geometrys=e.positions,this.color=e.color,this.u_tcolor=e.u_tcolor||t.Color.YELLOW,this.height=e.height||500,this.speed=e.speed||600,this.direction=e.direction||-1,this.translucent=e.translucent||!1,this.type=e.type||1}createGeometryInstances(){let t=[];for(let s=0;s<this.geometrys.length;s++){let i=this.geometrys[s],o=this.computePositions_dws(i,this.height);this.positions=o.pos,this.normals=o.normals,this.sts=o.sts,this.indices=o.indices;let r=this.createGeometry(this.positions,this.normals,this.sts,this.indices),n=new e.GeometryInstance({id:Math.random(),geometry:r});t.push(n)}return t}createGeometry(t,e,r,a){let h=new Float64Array(t),c=new Float32Array(e),p=new Float32Array(r),l=new Uint16Array(a);return new s.Geometry({attributes:{position:new i.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),normal:new i.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:c}),st:new i.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:p})},indices:l,primitiveType:s.PrimitiveType.TRIANGLES,boundingSphere:n.BoundingSphere.fromVertices(h)})}computePositions_dws(t,e){let s=t.length,i=[];for(let s in t)i.push(this.addHeight(t[s],e));let o=[],r=[],n=[],a=[];for(let e=0;e<s-1;e++){let s=e+1;o.push(t[e].x,t[e].y,t[e].z),o.push(t[s].x,t[s].y,t[s].z),o.push(i[s].x,i[s].y,i[s].z),o.push(i[e].x,i[e].y,i[e].z),a.push(0,0,1),a.push(0,0,1),a.push(0,0,1),a.push(0,0,1),r.push(0,0,1,0,1,1,0,1);let h=4*e,c=h+1,p=h+2,l=h+3;n.push(h,c,p,p,l,h)}return{pos:o,normals:a,sts:r,indices:n}}addHeight(t,e){let s=e||0;if(t.hasOwnProperty("height"))return t.height+=s,t;{let e=r.Cartographic.fromCartesian(t);return e.height+=s,r.Cartographic.toCartesian(e)}}}}));
