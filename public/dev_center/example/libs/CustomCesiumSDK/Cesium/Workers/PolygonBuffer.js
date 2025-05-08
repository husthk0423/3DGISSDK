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
define(["./turf.min"],(function(e){"use strict";class t{static buffer(r,o){for(let n in r){r[n].map((r=>{for(let n=0;n<r.geometrys.length;n++){if(r.geometrys[n].length<8)continue;let s=t.convertGeometory(r.geometrys[n]),l=e.polygon(s),f=e.buffer(l,o,{units:"kilometers"});r.geometrys[n]=f.geometry.coordinates[0].flat()}}))}}static convertGeometory(e){e[0]==e[e.length-2]&&e[1]==e[e.length-1]||e.push(e[0],e[1]);let t=[];for(let r=0;r<e.length;r+=2)e[r],t.push([e[r],e[r+1]]);return[t]}}return t}));
