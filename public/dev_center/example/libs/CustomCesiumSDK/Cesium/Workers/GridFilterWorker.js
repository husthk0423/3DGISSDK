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
define(["./createTaskProcessorWorker-86855e0c","./GridFilter","./defaultValue-96fcdfd6","./defined-841154bc"],(function(e,r,t,l){"use strict";let f,n=0,u=0,a=0;return e.createTaskProcessorWorker((function(e,t){if(1==e.init)return n=e.cellsize,u=e.buffer,a=e.maxPerCell,f=new r(360,n,u,a),!0;1==e.clean&&(f=new r(360,n,u,a));let l=new Float64Array(e.datas),s=[];for(let e=0;e<l.length;e++){let r=l[e],t=l[e+1];f.filter(r+180,t+90)&&(s.push(r),s.push(t),s.push(l[e+2])),e+=2}let c=new Float64Array(s);return t.push(c.buffer),c.buffer}))}));
