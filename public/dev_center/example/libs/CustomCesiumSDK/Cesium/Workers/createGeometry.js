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
define(["./defined-841154bc","./PrimitivePipeline-34b08853","./createTaskProcessorWorker-86855e0c","./Transforms-cbbbb1c6","./Cartesian3-baad0d89","./defaultValue-96fcdfd6","./Math-65e8389d","./Ellipsoid-8c7a76bb","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./RuntimeError-5ad5d372","./Cartesian2-cf084b8e","./Resource-6497b328","./combine-43f74aba","./defer-fe5560c8","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryAttributes-b872d70e","./GeometryPipeline-bc5af0f1","./AttributeCompression-7121dd0d","./EncodedCartesian3-fbbab2b9","./IndexDatatype-5150999f","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./WebMercatorProjection-7a46be18"],(function(e,t,r,o,n,a,i,c,s,b,f,d,u,l,m,p,P,y,k,C,G,W,T,h,x,A,M,g){"use strict";const j={};function E(t){let r=j[t];return e.defined(r)||("object"==typeof exports?j[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,j[r]=e}))),r}return r.createTaskProcessorWorker((function(r,o){const n=r.subTasks,a=n.length,i=new Array(a);for(let t=0;t<a;t++){const r=n[t],o=r.geometry,a=r.moduleName;if(e.defined(a)){const e=E(a);i[t]=e(o,r.offset)}else i[t]=o}return Promise.all(i).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,o)}))}))}));
