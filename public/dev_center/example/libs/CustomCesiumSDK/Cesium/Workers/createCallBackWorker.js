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
define(["./defaultValue-96fcdfd6","./defined-841154bc"],(function(e,t){"use strict";return function(r){let s;return function(n){const f=n.data;let i=[],a=0,d=f.id;const o={id:d,result:void 0,error:void 0};r(f.parameters,i,(function(r){o.id=d-a,a++,o.result=r,t.defined(s)||(s=e.defaultValue(self.webkitPostMessage,self.postMessage)),f.canTransferArrayBuffer||(i.length=0);try{s(o,i)}catch(e){o.result=void 0,o.error="postMessage failed with error:",s(o)}finally{i.pop()}}))}}}));
