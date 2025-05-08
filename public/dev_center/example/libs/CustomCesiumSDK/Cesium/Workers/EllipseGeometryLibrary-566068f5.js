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
define(["exports","./Cartesian3-baad0d89","./Math-65e8389d","./Matrix3-d40b977d","./Transforms-cbbbb1c6"],(function(a,t,e,n,i){"use strict";const r={},s=new t.Cartesian3,o=new t.Cartesian3,l=new i.Quaternion,c=new n.Matrix3;function C(a,e,r,C,y,u,m,h,x,M){const d=a+e;t.Cartesian3.multiplyByScalar(C,Math.cos(d),s),t.Cartesian3.multiplyByScalar(r,Math.sin(d),o),t.Cartesian3.add(s,o,s);let z=Math.cos(a);z*=z;let f=Math.sin(a);f*=f;const _=u/Math.sqrt(m*z+y*f)/h;return i.Quaternion.fromAxisAngle(s,_,l),n.Matrix3.fromQuaternion(l,c),n.Matrix3.multiplyByVector(c,x,M),t.Cartesian3.normalize(M,M),t.Cartesian3.multiplyByScalar(M,h,M),M}const y=new t.Cartesian3,u=new t.Cartesian3,m=new t.Cartesian3,h=new t.Cartesian3;r.raisePositionsToHeight=function(a,e,n){const i=e.ellipsoid,r=e.height,s=e.extrudedHeight,o=n?a.length/3*2:a.length/3,l=new Float64Array(3*o),c=a.length,C=n?c:0;for(let e=0;e<c;e+=3){const o=e+1,c=e+2,x=t.Cartesian3.fromArray(a,e,y);i.scaleToGeodeticSurface(x,x);const M=t.Cartesian3.clone(x,u),d=i.geodeticSurfaceNormal(x,h),z=t.Cartesian3.multiplyByScalar(d,r,m);t.Cartesian3.add(x,z,x),n&&(t.Cartesian3.multiplyByScalar(d,s,z),t.Cartesian3.add(M,z,M),l[e+C]=M.x,l[o+C]=M.y,l[c+C]=M.z),l[e]=x.x,l[o]=x.y,l[c]=x.z}return l};const x=new t.Cartesian3,M=new t.Cartesian3,d=new t.Cartesian3;r.computeEllipsePositions=function(a,n,i){const r=a.semiMinorAxis,s=a.semiMajorAxis,o=a.rotation,l=a.center,c=8*a.granularity,h=r*r,z=s*s,f=s*r,_=t.Cartesian3.magnitude(l),O=t.Cartesian3.normalize(l,x);let p=t.Cartesian3.cross(t.Cartesian3.UNIT_Z,l,M);p=t.Cartesian3.normalize(p,p);const w=t.Cartesian3.cross(O,p,d);let P=1+Math.ceil(e.CesiumMath.PI_OVER_TWO/c);const T=e.CesiumMath.PI_OVER_TWO/(P-1);let I=e.CesiumMath.PI_OVER_TWO-P*T;I<0&&(P-=Math.ceil(Math.abs(I)/T));const g=n?new Array(3*(P*(P+2)*2)):void 0;let E=0,V=y,b=u;const A=4*P*3;let R=A-1,W=0;const S=i?new Array(A):void 0;let B,v,Q,G,H;for(I=e.CesiumMath.PI_OVER_TWO,V=C(I,o,w,p,h,f,z,_,O,V),n&&(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z),i&&(S[R--]=V.z,S[R--]=V.y,S[R--]=V.x),I=e.CesiumMath.PI_OVER_TWO-T,B=1;B<P+1;++B){if(V=C(I,o,w,p,h,f,z,_,O,V),b=C(Math.PI-I,o,w,p,h,f,z,_,O,b),n){for(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,Q=2*B+2,v=1;v<Q-1;++v)G=v/(Q-1),H=t.Cartesian3.lerp(V,b,G,m),g[E++]=H.x,g[E++]=H.y,g[E++]=H.z;g[E++]=b.x,g[E++]=b.y,g[E++]=b.z}i&&(S[R--]=V.z,S[R--]=V.y,S[R--]=V.x,S[W++]=b.x,S[W++]=b.y,S[W++]=b.z),I=e.CesiumMath.PI_OVER_TWO-(B+1)*T}for(B=P;B>1;--B){if(I=e.CesiumMath.PI_OVER_TWO-(B-1)*T,V=C(-I,o,w,p,h,f,z,_,O,V),b=C(I+Math.PI,o,w,p,h,f,z,_,O,b),n){for(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,Q=2*(B-1)+2,v=1;v<Q-1;++v)G=v/(Q-1),H=t.Cartesian3.lerp(V,b,G,m),g[E++]=H.x,g[E++]=H.y,g[E++]=H.z;g[E++]=b.x,g[E++]=b.y,g[E++]=b.z}i&&(S[R--]=V.z,S[R--]=V.y,S[R--]=V.x,S[W++]=b.x,S[W++]=b.y,S[W++]=b.z)}I=e.CesiumMath.PI_OVER_TWO,V=C(-I,o,w,p,h,f,z,_,O,V);const N={};return n&&(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,N.positions=g,N.numPts=P),i&&(S[R--]=V.z,S[R--]=V.y,S[R--]=V.x,N.outerPositions=S),N};var z=r;a.EllipseGeometryLibrary=z}));
