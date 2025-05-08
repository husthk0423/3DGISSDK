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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./defer-fe5560c8","./Math-65e8389d","./RuntimeError-5ad5d372"],(function(e,r,t,u,s,a,c,o){"use strict";return e.createTaskProcessorWorker((function(e,t){var u=e.url,s=e.methodName,a=e.headers,c=new r.Resource({url:u});c.request.throttle=!1,c.request.throttleByServer=!0,c.request.type=1,c.headers=a;var o=c[s].call(c);return!!o&&o.then((function(e){return t.push(e),{result:e}}))}))}));
