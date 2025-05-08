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
define(["exports","./defaultValue-96fcdfd6","./defined-841154bc"],(function(e,t,n){"use strict";function o(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.position=t.defaultValue(e.position,!1),this.normal=t.defaultValue(e.normal,!1),this.st=t.defaultValue(e.st,!1),this.bitangent=t.defaultValue(e.bitangent,!1),this.tangent=t.defaultValue(e.tangent,!1),this.color=t.defaultValue(e.color,!1)}o.POSITION_ONLY=Object.freeze(new o({position:!0})),o.POSITION_AND_NORMAL=Object.freeze(new o({position:!0,normal:!0})),o.POSITION_NORMAL_AND_ST=Object.freeze(new o({position:!0,normal:!0,st:!0})),o.POSITION_AND_ST=Object.freeze(new o({position:!0,st:!0})),o.POSITION_AND_COLOR=Object.freeze(new o({position:!0,color:!0})),o.ALL=Object.freeze(new o({position:!0,normal:!0,st:!0,tangent:!0,bitangent:!0})),o.DEFAULT=o.POSITION_NORMAL_AND_ST,o.packedLength=6,o.pack=function(e,n,o){return o=t.defaultValue(o,0),n[o++]=e.position?1:0,n[o++]=e.normal?1:0,n[o++]=e.st?1:0,n[o++]=e.tangent?1:0,n[o++]=e.bitangent?1:0,n[o]=e.color?1:0,n},o.unpack=function(e,a,i){return a=t.defaultValue(a,0),n.defined(i)||(i=new o),i.position=1===e[a++],i.normal=1===e[a++],i.st=1===e[a++],i.tangent=1===e[a++],i.bitangent=1===e[a++],i.color=1===e[a],i},o.clone=function(e,t){if(n.defined(e))return n.defined(t)||(t=new o),t.position=e.position,t.normal=e.normal,t.st=e.st,t.tangent=e.tangent,t.bitangent=e.bitangent,t.color=e.color,t},e.VertexFormat=o}));
