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
define(["./createTaskProcessorWorker-86855e0c","./Resource-6497b328","./defer-fe5560c8","./defaultValue-96fcdfd6","./defined-841154bc","./combine-43f74aba","./Math-65e8389d","./RuntimeError-5ad5d372"],(function(e,r,t,n,o,u,s,i){"use strict";var c=class{static createDB(e,r,n,o,u){let s=t.defer(),i=indexedDB.open(e,1);return i.onerror=function(){console.log(e+"数据库创建失败或者异常~"),s.reject()},i.onsuccess=function(r){console.log(e+"数据库连接成功~");let t=r.target.result;s.resolve(t)},i.onupgradeneeded=function(t){t.target.result.createObjectStore(e,{keyPath:r,autoIncrement:n}).createIndex(o,u,{unique:!0})},s.promise}static getByPkey(e,r,n){let o=t.defer(),u=e.transaction([r]).objectStore(r).get(n);return u.onerror=function(e){o.resolve(null)},u.onsuccess=function(e){u.result?o.resolve(u.result):o.resolve(null)},o.promise}static setByKey(e,r,n,o){let u=t.defer(),s=e.transaction([r],"readwrite").objectStore(r).put({key:n,data:o});return s.onsuccess=function(e){u.resolve(!0)},s.onerror=function(e){u.reject()},u.promise}};let l=!0,f={},a=null,d="",y=null,p=0;function m(e,r,n){let o=function(e){let r=e.split("//");r[0];let t=r[1],n=t.indexOf("/");return t.substring(n+1)}(e._url),u=t.defer();if(l)return h(e,o,u,r,n).promise;if(f[o])return h(e,o,u,r,n).promise;let s=t.defer();try{s.promise=c.getByPkey(a,d,o)}catch(e){k().then((function(){p--,0==p&&(y=null),s.promise=c.getByPkey(a,d,o)}))}return s.promise.then((function(t){t?(n.push(t.data),u.resolve(t.data)):h(e,o,u,r,n)})),u.promise}function h(e,r,n,o,u){let s;return"image"==o&&(s=e.fetchImage({skipColorSpaceConversion:!0,preferImageBitmap:!0,inWorker:!0})),"arrayBuffer"==o&&(s=e.fetchArrayBuffer()),s.then((function(e){if(l)return delete f[r],u.push(e),void n.resolve(e);let o=t.defer();try{o.promise=c.setByKey(a,d,r,e)}catch(t){k().then((function(){p--,0==p&&(y=null),o.promise=c.setByKey(a,d,r,e)}))}o.promise.finally((function(){delete f[r],u.push(e),n.resolve(e)}))}),(function(e){n.reject(e)})),n}function k(){return p++,y||(y=c.createDB(d,"key",!1,"keyIndex","key"),y.then((function(e){a=e,f={}})),y)}return e.createTaskProcessorWorker((function(e,n){if(1==e.init){d=e.tName;let r=t.defer();return e.useIndexDB?(c.createDB(d,"key",!1,"keyIndex","key").then((function(e){a=e,f={},l=!1,r.resolve()}),(function(e){l=!0,r.resolve()})),r.promise):(l=!0,r.resolve(),r.promise)}if("3dtile"==e.type){let t=e.url,u=new r.Resource({url:t});return u.request.throttle=!1,u.request.throttleByServer=!1,u.request.type=2,u.request.priorityFunction=(o=e.priority,function(){return o}),m(u,"arrayBuffer",n)}var o;if("image"==e.type){let t=e.url,o=new r.Resource({url:t});return o.request.throttle=!1,o.request.throttleByServer=!1,o.request.type=2,m(o,"image",n)}}))}));
