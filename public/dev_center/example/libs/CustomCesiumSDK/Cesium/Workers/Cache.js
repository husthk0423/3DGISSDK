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
define(["./LinkedQueue"],(function(t){"use strict";return class{constructor(t){this.init(t)}init(e){this.limit=e||10,this.map={},this.keys=new t}set(t,e){let i=this.map,s=this.keys,n=null;if(!Object.prototype.hasOwnProperty.call(i,t)){if(s.length===this.limit){let t=s.shift();n=i[t],delete i[t]}s.push(t)}return i[t]=e,n}get(t){return this.map[t]}}}));
