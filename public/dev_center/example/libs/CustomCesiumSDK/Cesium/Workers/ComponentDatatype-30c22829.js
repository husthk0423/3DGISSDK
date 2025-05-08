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
define(["exports","./defaultValue-96fcdfd6","./defined-841154bc","./WebGLConstants-fcb70ee3"],(function(r,e,n,t){"use strict";const a={BYTE:t.WebGLConstants.BYTE,UNSIGNED_BYTE:t.WebGLConstants.UNSIGNED_BYTE,SHORT:t.WebGLConstants.SHORT,UNSIGNED_SHORT:t.WebGLConstants.UNSIGNED_SHORT,INT:t.WebGLConstants.INT,UNSIGNED_INT:t.WebGLConstants.UNSIGNED_INT,FLOAT:t.WebGLConstants.FLOAT,DOUBLE:t.WebGLConstants.DOUBLE,getSizeInBytes:function(r){switch(r){case a.BYTE:return Int8Array.BYTES_PER_ELEMENT;case a.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case a.SHORT:return Int16Array.BYTES_PER_ELEMENT;case a.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case a.INT:return Int32Array.BYTES_PER_ELEMENT;case a.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case a.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case a.DOUBLE:return Float64Array.BYTES_PER_ELEMENT}},fromTypedArray:function(r){return r instanceof Int8Array?a.BYTE:r instanceof Uint8Array?a.UNSIGNED_BYTE:r instanceof Int16Array?a.SHORT:r instanceof Uint16Array?a.UNSIGNED_SHORT:r instanceof Int32Array?a.INT:r instanceof Uint32Array?a.UNSIGNED_INT:r instanceof Float32Array?a.FLOAT:r instanceof Float64Array?a.DOUBLE:void 0},validate:function(r){return n.defined(r)&&(r===a.BYTE||r===a.UNSIGNED_BYTE||r===a.SHORT||r===a.UNSIGNED_SHORT||r===a.INT||r===a.UNSIGNED_INT||r===a.FLOAT||r===a.DOUBLE)},createTypedArray:function(r,e){switch(r){case a.BYTE:return new Int8Array(e);case a.UNSIGNED_BYTE:return new Uint8Array(e);case a.SHORT:return new Int16Array(e);case a.UNSIGNED_SHORT:return new Uint16Array(e);case a.INT:return new Int32Array(e);case a.UNSIGNED_INT:return new Uint32Array(e);case a.FLOAT:return new Float32Array(e);case a.DOUBLE:return new Float64Array(e)}},createArrayBufferView:function(r,n,t,E){switch(t=e.defaultValue(t,0),E=e.defaultValue(E,(n.byteLength-t)/a.getSizeInBytes(r)),r){case a.BYTE:return new Int8Array(n,t,E);case a.UNSIGNED_BYTE:return new Uint8Array(n,t,E);case a.SHORT:return new Int16Array(n,t,E);case a.UNSIGNED_SHORT:return new Uint16Array(n,t,E);case a.INT:return new Int32Array(n,t,E);case a.UNSIGNED_INT:return new Uint32Array(n,t,E);case a.FLOAT:return new Float32Array(n,t,E);case a.DOUBLE:return new Float64Array(n,t,E)}},fromName:function(r){switch(r){case"BYTE":return a.BYTE;case"UNSIGNED_BYTE":return a.UNSIGNED_BYTE;case"SHORT":return a.SHORT;case"UNSIGNED_SHORT":return a.UNSIGNED_SHORT;case"INT":return a.INT;case"UNSIGNED_INT":return a.UNSIGNED_INT;case"FLOAT":return a.FLOAT;case"DOUBLE":return a.DOUBLE}}};var E=Object.freeze(a);r.ComponentDatatype=E}));
