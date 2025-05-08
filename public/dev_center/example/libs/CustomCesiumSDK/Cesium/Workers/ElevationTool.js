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
define(["./defer-fe5560c8"],(function(e){"use strict";return class{static getDBMap(t,r){let n=e.defer(),o=[];for(let n=0;n<t.length;n++){let l=t[n],s=e.defer(),u=indexedDB.open(l,1);u.onerror=function(){console.log(l+"数据库创建失败或者异常~"),s.reject()},u.onsuccess=function(e){console.log(l+"数据库连接成功~"),r[l]=e.target.result,s.resolve(!0)},u.onupgradeneeded=function(e){let t=e.target.result;r[l]=t,t.createObjectStore(l,{keyPath:"key",autoIncrement:!1}).createIndex("key","key",{unique:!0}),s.resolve(!0)},o.push(s.promise)}return Promise.all(o).then((function(){n.resolve(!0)})),n}static getElevation(t,r,n){let o=e.defer(),l=[],s=[];for(let o=0;o<r.length;o++){let u=r[o],c=t[u].transaction([u]).objectStore(u),i=e.defer(),a=c.get(n);a.onerror=function(e){s[u]=null,i.resolve(null)},a.onsuccess=function(e){a.result?(s[u]=a.result,i.resolve(a.result)):(s[u]=null,i.resolve(null))},l.push(e.defer.promise)}return Promise.all(l).then((function(){o.resolve(s)})),o.promise}static updateElevation(t,r,n,o){let l=e.defer(),s=t.transaction([r],"readwrite").objectStore(r).put({key:n,data:o});return s.onsuccess=function(e){l.resolve(!0)},s.onerror=function(e){l.reject()},l.promise}}}));
