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
define(["exports","./Cartesian2-cf084b8e","./defaultValue-96fcdfd6","./defined-841154bc","./Ellipsoid-8c7a76bb","./GeographicProjection-48a1ce64","./Math-65e8389d"],(function(e,t,i,n,o,s,r){"use strict";function l(e){e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT),this._ellipsoid=i.defaultValue(e.ellipsoid,o.Ellipsoid.WGS84),this._rectangle=i.defaultValue(e.rectangle,t.Rectangle.MAX_VALUE),this._projection=new s.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=i.defaultValue(e.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=i.defaultValue(e.numberOfLevelZeroTilesY,1)}Object.defineProperties(l.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),l.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},l.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},l.prototype.rectangleToNativeRectangle=function(e,i){const o=r.CesiumMath.toDegrees(e.west),s=r.CesiumMath.toDegrees(e.south),l=r.CesiumMath.toDegrees(e.east),u=r.CesiumMath.toDegrees(e.north);return n.defined(i)?(i.west=o,i.south=s,i.east=l,i.north=u,i):new t.Rectangle(o,s,l,u)},l.prototype.tileXYToNativeRectangle=function(e,t,i,n){const o=this.tileXYToRectangle(e,t,i,n);return o.west=r.CesiumMath.toDegrees(o.west),o.south=r.CesiumMath.toDegrees(o.south),o.east=r.CesiumMath.toDegrees(o.east),o.north=r.CesiumMath.toDegrees(o.north),o},l.prototype.tileXYToRectangle=function(e,i,o,s){const r=this._rectangle,l=this.getNumberOfXTilesAtLevel(o),u=this.getNumberOfYTilesAtLevel(o),a=r.width/l,h=e*a+r.west,c=(e+1)*a+r.west,f=r.height/u,g=r.north-i*f,d=r.north-(i+1)*f;return n.defined(s)||(s=new t.Rectangle(h,d,c,g)),s.west=h,s.south=d,s.east=c,s.north=g,s},l.prototype.positionToTileXY=function(e,i,o){const s=this._rectangle;if(!t.Rectangle.contains(s,e))return;const l=this.getNumberOfXTilesAtLevel(i),u=this.getNumberOfYTilesAtLevel(i),a=s.width/l,h=s.height/u;let c=e.longitude;s.east<s.west&&(c+=r.CesiumMath.TWO_PI);let f=(c-s.west)/a|0;f>=l&&(f=l-1);let g=(s.north-e.latitude)/h|0;return g>=u&&(g=u-1),n.defined(o)?(o.x=f,o.y=g,o):new t.Cartesian2(f,g)},e.GeographicTilingScheme=l}));
