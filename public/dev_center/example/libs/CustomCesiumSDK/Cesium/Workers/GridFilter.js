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
define((function(){"use strict";return class{constructor(t,s,i,l){let e=t/s,h=i/s;this.maxPerCell=null==l?1:l,this.cells={},this.d=e+2*h,this.n=e,this.padding=h,this.scale=e/t;let n=h/e*t;this.min=-n,this.max=t+n}filter(t,s){if(t<this.min||t>this.max||s<this.min||s>this.max)return!1;let i=this.convertToCellCoord(t),l=this.convertToCellCoord(s),e=Math.round(this.d*l+i);if(this.cells[e]>=this.maxPerCell)return!1;{let t=this.cells[e];return null==t?t=1:t+=1,this.cells[e]=t,!0}}clean(){this.cells={},this.saveCount=0}convertToCellCoord(t){return Math.max(0,Math.min(this.d-1,Math.floor(t*this.scale)+this.padding))}}}));
