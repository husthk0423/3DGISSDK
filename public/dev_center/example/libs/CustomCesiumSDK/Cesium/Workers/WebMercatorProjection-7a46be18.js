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
define(["exports","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./defined-841154bc","./Math-65e8389d"],(function(t,e,i,o,a,n){"use strict";function r(t){this._ellipsoid=o.defaultValue(t,i.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(r.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),r.mercatorAngleToGeodeticLatitude=function(t){return n.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-t))},r.geodeticLatitudeToMercatorAngle=function(t){t>r.MaximumLatitude?t=r.MaximumLatitude:t<-r.MaximumLatitude&&(t=-r.MaximumLatitude);const e=Math.sin(t);return.5*Math.log((1+e)/(1-e))},r.MaximumLatitude=r.mercatorAngleToGeodeticLatitude(Math.PI),r.prototype.project=function(t,i){const o=this._semimajorAxis,n=t.longitude*o,d=r.geodeticLatitudeToMercatorAngle(t.latitude)*o,u=t.height;return a.defined(i)?(i.x=n,i.y=d,i.z=u,i):new e.Cartesian3(n,d,u)},r.prototype.unproject=function(t,e){const o=this._oneOverSemimajorAxis,n=t.x*o,d=r.mercatorAngleToGeodeticLatitude(t.y*o),u=t.z;return a.defined(e)?(e.longitude=n,e.latitude=d,e.height=u,e):new i.Cartographic(n,d,u)},t.WebMercatorProjection=r}));
