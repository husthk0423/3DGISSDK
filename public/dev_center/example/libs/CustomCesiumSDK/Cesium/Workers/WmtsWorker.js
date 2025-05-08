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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./defer-fe5560c8","./UPNG","./JPG","./PixelFormat-b58cbd11","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372","./WebGLConstants-fcb70ee3"],(function(e,r,t,o,a,n,f,i,s,u,c,l){"use strict";return e.createTaskProcessorWorker((function(e,f){let i=e.url;var s=new r.Resource({url:i});s.request.throttle=!1,s.request.throttleByServer=!0,s.request.type=1;var u=s.fetchArrayBuffer();if(!u)return!0;let c=t.defer();return u.then((function(e){if(!e)return void c.resolve({});let r,t,i=new Uint8Array(e);if(o.isPNG(i)){t=n.PixelFormat.RGBA;let a=o.decode(e);r=o.toRGBA8(a)[0]}else{t=n.PixelFormat.RGB;let e=new a;e.parse(i),r=e.getData(e.width,e.height).buffer}f.push(r),c.resolve({data:r,pixelFormat:t})}),(function(e){c.reject(e)})),c.promise}))}));
