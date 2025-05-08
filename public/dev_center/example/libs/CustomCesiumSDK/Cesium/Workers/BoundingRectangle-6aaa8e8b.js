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
define(["exports","./Cartesian2-cf084b8e","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./defined-841154bc","./GeographicProjection-48a1ce64","./Transforms-cbbbb1c6"],(function(t,e,n,i,h,d,r){"use strict";function a(t,e,n,h){this.x=i.defaultValue(t,0),this.y=i.defaultValue(e,0),this.width=i.defaultValue(n,0),this.height=i.defaultValue(h,0)}a.packedLength=4,a.pack=function(t,e,n){return n=i.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},a.unpack=function(t,e,n){return e=i.defaultValue(e,0),h.defined(n)||(n=new a),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},a.fromPoints=function(t,e){if(h.defined(e)||(e=new a),!h.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;const n=t.length;let i=t[0].x,d=t[0].y,r=t[0].x,c=t[0].y;for(let e=1;e<n;e++){const n=t[e],h=n.x,a=n.y;i=Math.min(h,i),r=Math.max(h,r),d=Math.min(a,d),c=Math.max(a,c)}return e.x=i,e.y=d,e.width=r-i,e.height=c-d,e};const c=new d.GeographicProjection,u=new n.Cartographic,o=new n.Cartographic;a.fromRectangle=function(t,n,d){if(h.defined(d)||(d=new a),!h.defined(t))return d.x=0,d.y=0,d.width=0,d.height=0,d;const r=(n=i.defaultValue(n,c)).project(e.Rectangle.southwest(t,u)),f=n.project(e.Rectangle.northeast(t,o));return e.Cartesian2.subtract(f,r,f),d.x=r.x,d.y=r.y,d.width=f.x,d.height=f.y,d},a.clone=function(t,e){if(h.defined(t))return h.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new a(t.x,t.y,t.width,t.height)},a.union=function(t,e,n){h.defined(n)||(n=new a);const i=Math.min(t.x,e.x),d=Math.min(t.y,e.y),r=Math.max(t.x+t.width,e.x+e.width),c=Math.max(t.y+t.height,e.y+e.height);return n.x=i,n.y=d,n.width=r-i,n.height=c-d,n},a.expand=function(t,e,n){n=a.clone(t,n);const i=e.x-n.x,h=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),h>n.height?n.height=h:h<0&&(n.height-=h,n.y=e.y),n},a.intersect=function(t,e){const n=t.x,i=t.y,h=e.x,d=e.y;return n>h+e.width||n+t.width<h||i+t.height<d||i>d+e.height?r.Intersect.OUTSIDE:r.Intersect.INTERSECTING},a.equals=function(t,e){return t===e||h.defined(t)&&h.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},a.prototype.clone=function(t){return a.clone(this,t)},a.prototype.intersect=function(t){return a.intersect(this,t)},a.prototype.equals=function(t){return a.equals(this,t)},t.BoundingRectangle=a}));
