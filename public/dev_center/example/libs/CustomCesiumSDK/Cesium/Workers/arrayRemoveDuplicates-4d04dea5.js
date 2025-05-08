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
define(["exports","./defaultValue-96fcdfd6","./defined-841154bc","./Math-65e8389d"],(function(e,d,n,i){"use strict";const t=i.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,i,f,u){if(!n.defined(e))return;f=d.defaultValue(f,!1);const s=n.defined(u),l=e.length;if(l<2)return e;let c,r,a,h=e[0],o=0,p=-1;for(c=1;c<l;++c)r=e[c],i(h,r,t)?(n.defined(a)||(a=e.slice(0,c),o=c-1,p=0),s&&u.push(c)):(n.defined(a)&&(a.push(r),o=c,s&&(p=u.length)),h=r);return f&&i(e[0],e[l-1],t)&&(s&&(n.defined(a)?u.splice(p,0,o):u.push(l-1)),n.defined(a)?a.length-=1:a=e.slice(0,-1)),n.defined(a)?a:e}}));
