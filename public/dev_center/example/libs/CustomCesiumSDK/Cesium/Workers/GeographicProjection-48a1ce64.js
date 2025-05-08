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
define(["exports","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./defined-841154bc"],(function(i,e,t,o,s){"use strict";function n(i){this._ellipsoid=o.defaultValue(i,t.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(n.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),n.prototype.project=function(i,t){const o=this._semimajorAxis,n=i.longitude*o,r=i.latitude*o,d=i.height;return s.defined(t)?(t.x=n,t.y=r,t.z=d,t):new e.Cartesian3(n,r,d)},n.prototype.unproject=function(i,e){const o=this._oneOverSemimajorAxis,n=i.x*o,r=i.y*o,d=i.z;return s.defined(e)?(e.longitude=n,e.latitude=r,e.height=d,e):new t.Cartographic(n,r,d)},i.GeographicProjection=n}));
