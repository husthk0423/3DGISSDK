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
define(["./Math-65e8389d","./defaultValue-96fcdfd6"],(function(t,e){"use strict";class r{static upsample(e,a,i,s,n,l){var g=e.tileXYToRectangle(n.x,n.y,n.z),h=e.tileXYToRectangle(l.x,l.y,l.z);let o=new Int16Array(i*s);for(var u=0;u<s;++u)for(var f=t.CesiumMath.lerp(h.north,h.south,u/(s-1)),c=0;c<i;++c){var v=t.CesiumMath.lerp(h.west,h.east,c/(i-1)),H=r.interpolateHeight(a,1,256,1,false,g,i,s,v,f);H=1*H+0,o[u*i+c]=H}return o}static interpolateHeight(t,e,a,i,s,n,l,g,h,o){var u=(h-n.west)*(l-1)/(n.east-n.west),f=(o-n.south)*(g-1)/(n.north-n.south),c=0|u,v=c+1;v>=l&&(v=l-1,c=l-2);var H=0|f,p=H+1;p>=g&&(p=g-1,H=g-2);var d=u-c,w=f-H;H=g-1-H,p=g-1-p;var m=r.getHeight(t,e,a,i,s,H*l+c),y=r.getHeight(t,e,a,i,s,H*l+v),I=r.getHeight(t,e,a,i,s,p*l+c),M=r.getHeight(t,e,a,i,s,p*l+v);return r.triangleInterpolateHeight(d,w,m,y,I,M)}static getHeight(t,e,r,a,i,s){s*=a;var n,l=0;if(i)for(n=0;n<e;++n)l=l*r+t[s+n];else for(n=e-1;n>=0;--n)l=l*r+t[s+n];return l}static triangleInterpolateHeight(t,e,r,a,i,s){return e<t?r+t*(a-r)+e*(s-a):r+t*(s-i)+e*(i-r)}}return r}));
