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
define((function(){"use strict";return function(){let t,n,e=function(t){this.ele=t,this.next=null},i=0;this.push=function(u){let r,l=new e(u);return 0==i?t=l:(r=n,r.next=l),n=l,i++,!0},this.shift=function(){let n=t;return t=t.next,i--,n.next=null,n.ele},this.size=function(){return i},this.getFront=function(){return t.ele},this.getRear=function(){return n.ele},this.toString=function(){let n="",e=t;for(;e;)n+=e.ele+" ",e=e.next;return n},this.clear=function(){return t=null,n=null,i=0,!0}}}));
