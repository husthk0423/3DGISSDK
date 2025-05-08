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
define(["exports","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./defaultValue-96fcdfd6","./defined-841154bc","./Math-65e8389d"],(function(t,a,i,n,e,s){"use strict";function o(t,a,i,n,e,s,o){const r=function(t,a){return t*a*(4+t*(4-3*a))/16}(t,i);return(1-r)*t*a*(n+r*e*(o+r*s*(2*o*o-1)))}const r=new a.Cartesian3,h=new a.Cartesian3;function d(t,n,e,d){a.Cartesian3.normalize(d.cartographicToCartesian(n,h),r),a.Cartesian3.normalize(d.cartographicToCartesian(e,h),h),function(t,a,i,n,e,r,h){const d=(a-i)/a,c=r-n,u=Math.atan((1-d)*Math.tan(e)),l=Math.atan((1-d)*Math.tan(h)),M=Math.cos(u),g=Math.sin(u),_=Math.cos(l),p=Math.sin(l),f=M*_,m=M*p,C=g*p,H=g*_;let v,O,S,b,q,U=c,A=s.CesiumMath.TWO_PI,w=Math.cos(U),R=Math.sin(U);do{w=Math.cos(U),R=Math.sin(U);const t=m-H*w;let a;S=Math.sqrt(_*_*R*R+t*t),O=C+f*w,v=Math.atan2(S,O),0===S?(a=0,b=1):(a=f*R/S,b=1-a*a),A=U,q=O-2*C/b,isFinite(q)||(q=0),U=c+o(d,a,b,v,S,O,q)}while(Math.abs(U-A)>s.CesiumMath.EPSILON12);const E=b*(a*a-i*i)/(i*i),y=E*(256+E*(E*(74-47*E)-128))/1024,P=q*q,x=i*(1+E*(4096+E*(E*(320-175*E)-768))/16384)*(v-y*S*(q+y*(O*(2*P-1)-y*q*(4*S*S-3)*(4*P-3)/6)/4)),D=Math.atan2(_*R,m-H*w),T=Math.atan2(M*R,m*w-H);t._distance=x,t._startHeading=D,t._endHeading=T,t._uSquared=E}(t,d.maximumRadius,d.minimumRadius,n.longitude,n.latitude,e.longitude,e.latitude),t._start=i.Cartographic.clone(n,t._start),t._end=i.Cartographic.clone(e,t._end),t._start.height=0,t._end.height=0,function(t){const a=t._uSquared,i=t._ellipsoid.maximumRadius,n=t._ellipsoid.minimumRadius,e=(i-n)/i,s=Math.cos(t._startHeading),o=Math.sin(t._startHeading),r=(1-e)*Math.tan(t._start.latitude),h=1/Math.sqrt(1+r*r),d=h*r,c=Math.atan2(r,s),u=h*o,l=u*u,M=1-l,g=Math.sqrt(M),_=a/4,p=_*_,f=p*_,m=p*p,C=1+_-3*p/4+5*f/4-175*m/64,H=1-_+15*p/8-35*f/8,v=1-3*_+35*p/4,O=1-5*_,S=C*c-H*Math.sin(2*c)*_/2-v*Math.sin(4*c)*p/16-O*Math.sin(6*c)*f/48-5*Math.sin(8*c)*m/512,b=t._constants;b.a=i,b.b=n,b.f=e,b.cosineHeading=s,b.sineHeading=o,b.tanU=r,b.cosineU=h,b.sineU=d,b.sigma=c,b.sineAlpha=u,b.sineSquaredAlpha=l,b.cosineSquaredAlpha=M,b.cosineAlpha=g,b.u2Over4=_,b.u4Over16=p,b.u6Over64=f,b.u8Over256=m,b.a0=C,b.a1=H,b.a2=v,b.a3=O,b.distanceRatio=S}(t)}function c(t,a,s){const o=n.defaultValue(s,i.Ellipsoid.WGS84);this._ellipsoid=o,this._start=new i.Cartographic,this._end=new i.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,e.defined(t)&&e.defined(a)&&d(this,t,a,o)}Object.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return this._startHeading}},endHeading:{get:function(){return this._endHeading}}}),c.prototype.setEndPoints=function(t,a){d(this,t,a,this._ellipsoid)},c.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},c.prototype.interpolateUsingSurfaceDistance=function(t,a){const n=this._constants,s=n.distanceRatio+t/n.b,r=Math.cos(2*s),h=Math.cos(4*s),d=Math.cos(6*s),c=Math.sin(2*s),u=Math.sin(4*s),l=Math.sin(6*s),M=Math.sin(8*s),g=s*s,_=s*g,p=n.u8Over256,f=n.u2Over4,m=n.u6Over64,C=n.u4Over16;let H=2*_*p*r/3+s*(1-f+7*C/4-15*m/4+579*p/64-(C-15*m/4+187*p/16)*r-(5*m/4-115*p/16)*h-29*p*d/16)+(f/2-C+71*m/32-85*p/16)*c+(5*C/16-5*m/4+383*p/96)*u-g*((m-11*p/2)*c+5*p*u/2)+(29*m/96-29*p/16)*l+539*p*M/1536;const v=Math.asin(Math.sin(H)*n.cosineAlpha),O=Math.atan(n.a/n.b*Math.tan(v));H-=n.sigma;const S=Math.cos(2*n.sigma+H),b=Math.sin(H),q=Math.cos(H),U=n.cosineU*q,A=n.sineU*b,w=Math.atan2(b*n.sineHeading,U-A*n.cosineHeading)-o(n.f,n.sineAlpha,n.cosineSquaredAlpha,H,b,q,S);return e.defined(a)?(a.longitude=this._start.longitude+w,a.latitude=O,a.height=0,a):new i.Cartographic(this._start.longitude+w,O,0)},t.EllipsoidGeodesic=c}));
