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
define(["exports","./defaultValue-96fcdfd6","./defined-841154bc"],(function(e,t,n){"use strict";e.combine=function e(f,o,r){r=t.defaultValue(r,!1);const i={},d=n.defined(f),c=n.defined(o);let a,s,u;if(d)for(a in f)f.hasOwnProperty(a)&&(s=f[a],c&&r&&"object"==typeof s&&o.hasOwnProperty(a)?(u=o[a],i[a]="object"==typeof u?e(s,u,r):s):i[a]=s);if(c)for(a in o)o.hasOwnProperty(a)&&!i.hasOwnProperty(a)&&(u=o[a],i[a]=u);return i}}));
