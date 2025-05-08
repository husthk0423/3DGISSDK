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
define(["exports","./Cartesian2-cf084b8e","./Cartesian3-baad0d89","./Matrix3-d40b977d","./OrientedBoundingBox-536d86cc"],(function(n,t,e,r,a){"use strict";const i={},o=new e.Cartesian3,u=new e.Cartesian3,s=new e.Cartesian3,c=new e.Cartesian3,C=new a.OrientedBoundingBox;function d(n,r,a,i,u){const s=e.Cartesian3.subtract(n,r,o),c=e.Cartesian3.dot(a,s),C=e.Cartesian3.dot(i,s);return t.Cartesian2.fromElements(c,C,u)}i.validOutline=function(n){const t=a.OrientedBoundingBox.fromPoints(n,C).halfAxes,i=r.Matrix3.getColumn(t,0,u),o=r.Matrix3.getColumn(t,1,s),d=r.Matrix3.getColumn(t,2,c),m=e.Cartesian3.magnitude(i),g=e.Cartesian3.magnitude(o),l=e.Cartesian3.magnitude(d);return!(0===m&&(0===g||0===l)||0===g&&0===l)},i.computeProjectTo2DArguments=function(n,t,i,o){const d=a.OrientedBoundingBox.fromPoints(n,C),m=d.halfAxes,g=r.Matrix3.getColumn(m,0,u),l=r.Matrix3.getColumn(m,1,s),f=r.Matrix3.getColumn(m,2,c),x=e.Cartesian3.magnitude(g),B=e.Cartesian3.magnitude(l),M=e.Cartesian3.magnitude(f),P=Math.min(x,B,M);if(0===x&&(0===B||0===M)||0===B&&0===M)return!1;let w,b;return P!==B&&P!==M||(w=g),P===x?w=l:P===M&&(b=l),P!==x&&P!==B||(b=f),e.Cartesian3.normalize(w,i),e.Cartesian3.normalize(b,o),e.Cartesian3.clone(d.center,t),!0},i.createProjectPointsTo2DFunction=function(n,t,e){return function(r){const a=new Array(r.length);for(let i=0;i<r.length;i++)a[i]=d(r[i],n,t,e);return a}},i.createProjectPointTo2DFunction=function(n,t,e){return function(r,a){return d(r,n,t,e,a)}};var m=i;n.CoplanarPolygonGeometryLibrary=m}));
