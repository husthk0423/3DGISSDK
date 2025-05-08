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
define(["exports","./Cartesian3-baad0d89","./Ellipsoid-8c7a76bb","./defined-841154bc","./GeographicProjection-48a1ce64","./Math-65e8389d","./Matrix2-6acef2ae","./Cartesian2-cf084b8e"],(function(t,n,a,e,o,r,s,i){"use strict";const c=Math.cos,g=Math.sin,h=Math.sqrt,u={computePosition:function(t,n,a,o,r,s,i){const u=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let d=l.latitude-t.granYCos*o+r*t.granXSin;const S=c(d),M=g(d),w=u.z*M;let X=l.longitude+o*t.granYSin+r*t.granXCos;const Y=S*c(X),p=S*g(X),f=u.x*Y,m=u.y*p,x=h(f*Y+m*p+w*M);if(s.x=f/x,s.y=m/x,s.z=w/x,a){const n=t.stNwCorner;e.defined(n)?(d=n.latitude-t.stGranYCos*o+r*t.stGranXSin,X=n.longitude+o*t.stGranYSin+r*t.stGranXCos,i.x=(X-t.stWest)*t.lonScalar,i.y=(d-t.stSouth)*t.latScalar):(i.x=(X-C.west)*t.lonScalar,i.y=(d-C.south)*t.latScalar)}}},l=new s.Matrix2;let C=new n.Cartesian3;const d=new a.Cartographic;let S=new n.Cartesian3;const M=new o.GeographicProjection;function w(t,a,e,o,r,i,c){const g=Math.cos(a),h=o*g,u=e*g,d=Math.sin(a),w=o*d,X=e*d;C=M.project(t,C),C=n.Cartesian3.subtract(C,S,C);const Y=s.Matrix2.fromRotation(a,l);C=s.Matrix2.multiplyByVector(Y,C,C),C=n.Cartesian3.add(C,S,C),i-=1,c-=1;const p=(t=M.unproject(C,t)).latitude,f=p+i*X,m=p-h*c,x=p-h*c+i*X,G=Math.max(p,f,m,x),R=Math.min(p,f,m,x),b=t.longitude,y=b+i*u,O=b+c*w,P=b+c*w+i*u;return{north:G,south:R,east:Math.max(b,y,O,P),west:Math.min(b,y,O,P),granYCos:h,granYSin:w,granXCos:u,granXSin:X,nwCorner:t}}u.computeOptions=function(t,n,a,e,o,s,c){let g,h=t.east,u=t.west,l=t.north,C=t.south,X=!1,Y=!1;l===r.CesiumMath.PI_OVER_TWO&&(X=!0),C===-r.CesiumMath.PI_OVER_TWO&&(Y=!0);const p=l-C;g=u>h?r.CesiumMath.TWO_PI-u+h:h-u;const f=Math.ceil(g/n)+1,m=Math.ceil(p/n)+1,x=g/(f-1),G=p/(m-1),R=i.Rectangle.northwest(t,s),b=i.Rectangle.center(t,d);0===a&&0===e||(b.longitude<R.longitude&&(b.longitude+=r.CesiumMath.TWO_PI),S=M.project(b,S));const y=G,O=x,P=i.Rectangle.clone(t,o),W={granYCos:y,granYSin:0,granXCos:O,granXSin:0,nwCorner:R,boundingRectangle:P,width:f,height:m,northCap:X,southCap:Y};if(0!==a){const t=w(R,a,x,G,0,f,m);l=t.north,C=t.south,h=t.east,u=t.west,W.granYCos=t.granYCos,W.granYSin=t.granYSin,W.granXCos=t.granXCos,W.granXSin=t.granXSin,P.north=l,P.south=C,P.east=h,P.west=u}if(0!==e){a-=e;const t=i.Rectangle.northwest(P,c),n=w(t,a,x,G,0,f,m);W.stGranYCos=n.granYCos,W.stGranXCos=n.granXCos,W.stGranYSin=n.granYSin,W.stGranXSin=n.granXSin,W.stNwCorner=t,W.stWest=n.west,W.stSouth=n.south}return W};var X=u;t.RectangleGeometryLibrary=X}));
