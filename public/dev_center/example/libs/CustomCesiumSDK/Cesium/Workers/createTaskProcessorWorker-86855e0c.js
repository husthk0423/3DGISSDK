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
define(["exports","./defaultValue-96fcdfd6","./defined-841154bc"],(function(e,r,t){"use strict";function n(e){let r;const n=e.name,s=e.message;r=t.defined(n)&&t.defined(s)?`${n}: ${s}`:e.toString();const o=e.stack;return t.defined(o)&&(r+=`\n${o}`),r}e.createTaskProcessorWorker=function(e){let s;return function(o){const a=o.data,i=[],c={id:a.id,result:void 0,error:void 0};return Promise.resolve(function(e,r,t){let n;try{return n=e(r,t),n}catch(e){return Promise.reject(e)}}(e,a.parameters,i)).then((function(e){c.result=e})).catch((function(e){e instanceof Error?c.error={name:e.name,message:e.message,stack:e.stack}:c.error=e})).finally((function(){t.defined(s)||(s=r.defaultValue(self.webkitPostMessage,self.postMessage)),a.canTransferArrayBuffer||(i.length=0);try{s(c,i)}catch(e){c.result=void 0,c.error=`postMessage failed with error: ${n(e)}\n  with responseMessage: ${JSON.stringify(c)}`,s(c)}}))}},e.formatError=n}));
