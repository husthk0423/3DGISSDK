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
define(["exports","./Cartesian3-baad0d89","./defined-841154bc"],(function(n,e,o){"use strict";function i(){this.high=e.Cartesian3.clone(e.Cartesian3.ZERO),this.low=e.Cartesian3.clone(e.Cartesian3.ZERO)}i.encode=function(n,e){let i;return o.defined(e)||(e={high:0,low:0}),n>=0?(i=65536*Math.floor(n/65536),e.high=i,e.low=n-i):(i=65536*Math.floor(-n/65536),e.high=-i,e.low=n+i),e};const t={high:0,low:0};i.fromCartesian=function(n,e){o.defined(e)||(e=new i);const h=e.high,a=e.low;return i.encode(n.x,t),h.x=t.high,a.x=t.low,i.encode(n.y,t),h.y=t.high,a.y=t.low,i.encode(n.z,t),h.z=t.high,a.z=t.low,e};const h=new i;i.writeElements=function(n,e,o){i.fromCartesian(n,h);const t=h.high,a=h.low;e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=a.x,e[o+4]=a.y,e[o+5]=a.z},n.EncodedCartesian3=i}));
