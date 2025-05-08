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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./Cache","./defer-fe5560c8","./UPNG","./JPG","./PixelFormat-b58cbd11","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372","./LinkedQueue","./WebGLConstants-fcb70ee3"],(function(e,r,t,i,o,n,u,a,f,s,c,d,l,h){"use strict";return new t(1e5),e.createTaskProcessorWorker((function(e,t){if(1==e.init)return void function(e){let r=i.defer();e.tileSize,r.resolve({}),r.promise}(e);var a=e.url,f=new r.Resource({url:a});f.request.throttle=!1,f.request.throttleByServer=!0,f.request.type=1;var s=f.fetchArrayBuffer();if(!s)return!0;let c=i.defer();return s.then((function(e){if(!e)return void c.resolve({});let r,i,a=new Uint8Array(e);if(o.isPNG(a)){i=u.PixelFormat.RGBA;let t=o.decode(e);r=o.toRGBA8(t)[0]}else{i=u.PixelFormat.RGB;let e=new n;e.parse(a),r=e.getData(e.width,e.height).buffer}t.push(r),c.resolve({data:r,pixelFormat:i})}),(function(e){c.reject(e)})),c.promise}))}));
