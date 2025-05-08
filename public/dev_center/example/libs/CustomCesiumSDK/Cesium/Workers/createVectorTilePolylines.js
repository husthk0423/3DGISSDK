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
define(["./Cartesian3-baad0d89","./combine-43f74aba","./AttributeCompression-7121dd0d","./Ellipsoid-8c7a76bb","./Math-65e8389d","./IndexDatatype-5150999f","./Cartesian2-cf084b8e","./createTaskProcessorWorker-86855e0c","./defaultValue-96fcdfd6","./defined-841154bc","./ComponentDatatype-30c22829","./WebGLConstants-fcb70ee3","./Matrix2-6acef2ae","./Matrix3-d40b977d","./RuntimeError-5ad5d372"],(function(e,a,t,n,r,s,i,o,c,f,u,d,p,l,b){"use strict";const C=32767,w=new n.Cartographic,h=new e.Cartesian3;const y=new i.Rectangle,k=new n.Ellipsoid,m=new e.Cartesian3,A={min:void 0,max:void 0};const g=new e.Cartesian3,x=new e.Cartesian3,E=new e.Cartesian3,D=new e.Cartesian3,I=new e.Cartesian3;return o.createTaskProcessorWorker((function(o,c){const f=new Uint16Array(o.positions),u=new Uint16Array(o.widths),d=new Uint32Array(o.counts),p=new Uint16Array(o.batchIds);!function(a){a=new Float64Array(a);let t=0;A.min=a[t++],A.max=a[t++],i.Rectangle.unpack(a,t,y),t+=i.Rectangle.packedLength,n.Ellipsoid.unpack(a,t,k),t+=n.Ellipsoid.packedLength,e.Cartesian3.unpack(a,t,m)}(o.packedBuffer);const l=k,b=m,P=function(a,s,i,o,c){const f=a.length/3,u=a.subarray(0,f),d=a.subarray(f,2*f),p=a.subarray(2*f,3*f);t.AttributeCompression.zigZagDeltaDecode(u,d,p);const l=new Float64Array(a.length);for(let a=0;a<f;++a){const t=u[a],f=d[a],b=p[a],y=r.CesiumMath.lerp(s.west,s.east,t/C),k=r.CesiumMath.lerp(s.south,s.north,f/C),m=r.CesiumMath.lerp(i,o,b/C),A=n.Cartographic.fromRadians(y,k,m,w),g=c.cartographicToCartesian(A,h);e.Cartesian3.pack(g,l,3*a)}return l}(f,y,A.min,A.max,l),T=P.length/3,U=4*T-4,M=new Float32Array(3*U),R=new Float32Array(3*U),F=new Float32Array(3*U),N=new Float32Array(2*U),L=new Uint16Array(U);let S,W=0,_=0,v=0,G=0,B=d.length;for(S=0;S<B;++S){const a=d[S],t=u[S],n=p[S];for(let r=0;r<a;++r){let s;if(0===r){const a=e.Cartesian3.unpack(P,3*G,g),t=e.Cartesian3.unpack(P,3*(G+1),x);s=e.Cartesian3.subtract(a,t,E),e.Cartesian3.add(a,s,s)}else s=e.Cartesian3.unpack(P,3*(G+r-1),E);const i=e.Cartesian3.unpack(P,3*(G+r),D);let o;if(r===a-1){const t=e.Cartesian3.unpack(P,3*(G+a-1),g),n=e.Cartesian3.unpack(P,3*(G+a-2),x);o=e.Cartesian3.subtract(t,n,I),e.Cartesian3.add(t,o,o)}else o=e.Cartesian3.unpack(P,3*(G+r+1),I);e.Cartesian3.subtract(s,b,s),e.Cartesian3.subtract(i,b,i),e.Cartesian3.subtract(o,b,o);const c=r===a-1?2:4;for(let a=0===r?2:0;a<c;++a){e.Cartesian3.pack(i,M,W),e.Cartesian3.pack(s,R,W),e.Cartesian3.pack(o,F,W),W+=3;const r=a-2<0?-1:1;N[_++]=a%2*2-1,N[_++]=r*t,L[v++]=n}}G+=a}const O=s.IndexDatatype.createTypedArray(U,6*T-6);let z=0,H=0;for(B=T-1,S=0;S<B;++S)O[H++]=z,O[H++]=z+2,O[H++]=z+1,O[H++]=z+1,O[H++]=z+2,O[H++]=z+3,z+=4;c.push(M.buffer,R.buffer,F.buffer),c.push(N.buffer,L.buffer,O.buffer);let V={indexDatatype:2===O.BYTES_PER_ELEMENT?s.IndexDatatype.UNSIGNED_SHORT:s.IndexDatatype.UNSIGNED_INT,currentPositions:M.buffer,previousPositions:R.buffer,nextPositions:F.buffer,expandAndWidth:N.buffer,batchIds:L.buffer,indices:O.buffer};if(o.keepDecodedPositions){const e=function(e){const a=e.length,t=new Uint32Array(a+1);let n=0;for(let r=0;r<a;++r)t[r]=n,n+=e[r];return t[a]=n,t}(d);c.push(P.buffer,e.buffer),V=a.combine(V,{decodedPositions:P.buffer,decodedPositionOffsets:e.buffer})}return V}))}));
