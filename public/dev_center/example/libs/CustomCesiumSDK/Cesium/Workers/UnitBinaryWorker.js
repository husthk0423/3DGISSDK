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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./Cartesian3-baad0d89","./HouseDrawer","./ParseBinaryData","./GetPrimitiveData","./Cache","./defer-fe5560c8","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372","./Buffer","./base64","./ieee754","./isArray","./VarintReader","./snappyJs","./CodeTool","./LayerContentModel","./GisTools","./Color-39aac1ad","./Transforms-cbbbb1c6","./Ellipsoid-8c7a76bb","./GeographicProjection-48a1ce64","./Matrix3-d40b977d","./Matrix2-6acef2ae","./Cartesian2-cf084b8e","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./GeometryInstance-348bb574","./PolygonGeometry-c3591b26","./ArcType-89067bf8","./BoundingRectangle-6aaa8e8b","./EllipsoidGeodesic-91209f0c","./EllipsoidTangentPlane-1af983dc","./AxisAlignedBoundingBox-9cdeab3c","./IntersectionTests-3d89883e","./Plane-0b6bf8f9","./Geometry-3529c29b","./GeometryAttribute-a5282d07","./GeometryOffsetAttribute-d3a42805","./GeometryPipeline-bc5af0f1","./AttributeCompression-7121dd0d","./EncodedCartesian3-fbbab2b9","./IndexDatatype-5150999f","./PolygonGeometryLibrary-ec267095","./arrayRemoveDuplicates-4d04dea5","./EllipsoidRhumbLine-c9694e61","./GeometryAttributes-b872d70e","./PolygonPipeline-7cf6d331","./VertexFormat-b8345068","./PolygonOutlineGeometry-9dd09ec5","./Texture-f938bd48","./PixelFormat-b58cbd11","./PrimitivePipeline-34b08853","./WebMercatorProjection-7a46be18","./GetRidingLanternGeometry","./LinkedQueue"],(function(e,t,r,o,n,i,a,l,s,c,f,d,u,b,y,h,g,p,m,P,v,G,A,C,x,w,T,D,F,L,R,B,M,E,I,k,S,V,O,W,j,q,H,N,z,J,Q,_,K,U,X,Y,Z,$,ee,te,re,oe,ne,ie){"use strict";let ae,le=512,se={},ce={},fe={};function de(e,t){if("F"!=e[0])if(Array.isArray(e[0])){let r=e.length;for(let o=0;o<r;o++){de(e[o],t)}}else t&&function(e){let t=[e[0],e[1]];for(let r=2;r<e.length;r++){let o=t[0]+e[r],n=t[1]+e[r+1];e[r]=o,e[r+1]=n,t=[o,n],r++}}(e);else e[0]=[.05*-le,.05*-le,1.05*le,.05*-le,1.05*le,1.05*le,.05*-le,1.05*le]}function ue(e,t){if(Array.isArray(t[0])){let r=t.length;for(let o=0;o<r;o++){ue(e,t[o])}}else e.push(t)}function be(e,t){let o=t.rectangle;for(var n=[],i=0;i<e.length;i++){var a=ye(e[i],e[i+1],o),l=r.Cartesian3.fromDegrees(a[0],a[1]);n.push(l),i++}return n}function ye(e,t,r){var o=he(r.west+r.width/le*e),n=he(r.north-r.height/le*t);return[o=Number(o.toFixed(6)),n=Number(n.toFixed(6))]}function he(e){return 180*e/Math.PI}return new a(1e5),e.createTaskProcessorWorker((function(e,r){if(1==e.init)return void function(e){ae=new Function("render","level",e.styleStr),le=e.tileSize,e.return_type,se=e,ce=e.serverInfo,fe=e.layerFieldMap;let t=l.defer();t.resolve(!0)}(e);var a=e.url,s=new t.Resource({url:a});s.request.throttle=!1,s.request.throttleByServer=!0,s.request.type=1;var c=s.fetchArrayBuffer();if(!c)return!0;let f=[];f.push(c);let d=l.defer();return Promise.all(f).then((function(t){let a=t[0];if(!a)return void d.resolve({});let l=function(e,t){if(e){!function(e,t){for(let r in e){let o=e[r].features;o||(o=e[r].datas);for(let e=0;e<o.length;e++)de(o[e][2],t)}}(e,t.needDecode);let r={},n=new o([e],t.level,r,t.controlVector,t.highLightVector,t.filterLayerId);return ae.call({},n,t.level),function(e){for(let t in e){let r=e[t];for(let e=0;e<r.length;e++){let t=r[e],o=[];ue(o,t.data),delete t.data,t.geometrys=o;let n=0;if(se.hasOwnProperty("heightProperty")){let e=se.heightProperty;n=t.properties[e],se.hasOwnProperty("heightScale")&&(n*=parseFloat(se.heightScale))}t.height=n,t.totalHeight=n}}}(r),r}return{}}(n(a,fe,ce),e);!function(e,t){for(let r in e){let o=e[r];for(let e=0;e<o.length;e++){let r=o[e];r.polygons=[];for(let e=0;e<r.geometrys.length;e++){let o=be(r.geometrys[e],t);r.polygons.push(o)}delete r.geometrys}}}(l,e);let s=i(l,e.level,se,r);d.resolve(s)}),(function(e){d.reject(e)})),d.promise}))}));
