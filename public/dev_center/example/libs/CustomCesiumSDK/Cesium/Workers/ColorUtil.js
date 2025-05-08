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
define((function(){"use strict";return class{constructor(){this.rgb=[],this.alpha=255,this.hex=""}fromHex(t){t=t.toUpperCase();if(/^#[0-9a-fA-F]{3,6}$/.test(t)){for(var r=[],s=1,e=1;e<=3;e++)t.length-2*e>3-e?(r.push(Number("0x"+t.substring(s,s+2))),s+=2):(r.push(Number("0x"+t.charAt(s)+t.charAt(s))),s+=1);this.rgb=r,this.hex=t}}fromRGB(t){if(/^(rgb|RGB)\([0-9]{1,3},\s?[0-9]{1,3},\s?[0-9]{1,3}\)$/.test(t)){t=t.replace(/(\(|\)|rgb|RGB)*/g,"").split(",");for(var r="#",s=0;s<t.length;s++){var e=Number(t[s]).toString(16);1==e.length&&(e="0"+e),r+=e}this.rgb=t,this.hex=r}}}}));
